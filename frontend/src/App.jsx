import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import AddBook from "./pages/AddBook";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import ChatHistory from "./pages/ChatHistory";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/add-book" replace />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="book-details" element={<BookDetails />} />
          <Route path="chat-history/:id" element={<ChatHistory />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
