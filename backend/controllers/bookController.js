import bookModel from "../models/bookModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const addBook = async (req, res) => {
  try {
    const { title, author, isbn, price, quantity, description } = req.body;

    // Validate ISBN
    if (!isbn || isbn.length !== 13 || !/^[0-9]{13}$/.test(isbn)) {
      return res.status(400).json({ success: false, message: "ISBN must be exactly 13 digits." });
    }

    // Check if book with ISBN already exists
    const existingBook = await bookModel.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ success: false, message: "A book with this ISBN already exists." });
    }

    const newBook = new bookModel({
      title,
      author,
      isbn,
      price: Number(price),
      quantity: Number(quantity),
      description
    });

    await newBook.save();
    res.json({ success: true, message: "Book added successfully!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const generateDescription = async (req, res) => {
  try {
    const { title, author } = req.body;
    
    if (!title || !author) {
      return res.status(400).json({ success: false, message: "Title and author are required to generate a description." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Write a short 3-4 line description for a book titled "${title}" authored by "${author}". Focus on an engaging summary suitable for a book catalog.`;
    
    const result = await model.generateContent(prompt);
    const description = result.response.text();

    res.json({ success: true, description });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to generate description" });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.json({ success: true, books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const chatWithAI = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format history for Gemini
    const history = book.chatHistory.map(msg => ({
      role: msg.role, // 'user' or 'model'
      parts: [{ text: msg.content }]
    }));

    // Start chat session
    const chat = model.startChat({
      history: history,
      systemInstruction: `You are an AI assistant helping a user with a book titled "${book.title}" by ${book.author}. The book's description is: "${book.description || 'Not provided'}". Provide helpful, concise answers.`
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    // Save to DB
    book.chatHistory.push({ role: 'user', content: message });
    book.chatHistory.push({ role: 'model', content: responseText });
    await book.save();

    res.json({ success: true, chatHistory: book.chatHistory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to process chat message." });
  }
};

export { addBook, generateDescription, getBooks, chatWithAI };
