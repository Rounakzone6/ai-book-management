import express from 'express';
import { addBook, generateDescription, getBooks, chatWithAI, getBookDetails } from '../controllers/bookController.js';
import auth from '../middleware/auth.js';

const bookRouter = express.Router();

bookRouter.post('/add', auth, addBook);
bookRouter.get('/', auth, getBooks);
bookRouter.get('/:id', auth, getBookDetails);

bookRouter.post('/generate-description', auth, generateDescription);
bookRouter.post('/chat/:id', auth, chatWithAI);

export default bookRouter;
