import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    minlength: 13,
    maxlength: 13,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
  },
  chatHistory: [{
    role: { type: String, enum: ['user', 'model'], required: true },
    content: { type: String, required: true }
  }]
}, { timestamps: true });

const bookModel = mongoose.models.book || mongoose.model("book", bookSchema);

export default bookModel;
