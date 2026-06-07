import express from 'express';
import { addBook, generateDescription, getBooks, chatWithAI } from '../controllers/bookController.js';
import auth from '../middleware/auth.js';

const bookRouter = express.Router();

bookRouter.post('/add', auth, addBook);
bookRouter.post('/generate-description', auth, generateDescription);
bookRouter.get('/', auth, getBooks);
bookRouter.post('/chat/:id', auth, chatWithAI);

export default bookRouter;
