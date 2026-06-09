import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AppContext from "../contexts/AppContext";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { backendUrl, token } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateAI = async () => {
    if (!formData.title || !formData.author) {
      toast.error("Please enter Title and Author to generate a description.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post(
        `${backendUrl}/book/generate-description`,
        { title: formData.title, author: formData.author },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        setFormData((prev) => ({
          ...prev,
          description: response.data.description,
        }));
        toast.success("Description generated!");
      } else {
        toast.error(response.data.message || "Failed to generate description");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error generating description",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate ISBN
    if (formData.isbn.length !== 13) {
      toast.error("ISBN must be exactly 13 digits.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${backendUrl}/book/add`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Book added successfully!");
        // Reset form
        setFormData({
          title: "",
          author: "",
          isbn: "",
          price: "",
          quantity: "",
          description: "",
        });
      } else {
        toast.error(response.data.message || "Failed to add book");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Add Book</h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="md:col-span-7 flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div className="md:col-span-5 flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="md:col-span-4 flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Isbn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 text-sm"
                required
                maxLength="13"
              />
            </div>
            <div className="md:col-span-4 flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 text-sm"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="md:col-span-4 flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 text-sm"
                required
                min="0"
              />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              About the book (short description){" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter about"
                className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-blue-500 text-sm min-h-30 resize-y"
                required
              ></textarea>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="absolute bottom-4 right-4 bg-[#7d78fa] hover:bg-[#6b66d6] text-white text-xs font-medium py-1.5 px-3 rounded flex items-center transition-colors disabled:bg-blue-300"
              >
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
                </svg>
                {isGenerating ? "Generating..." : "Generate with AI"}
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: "",
                  author: "",
                  isbn: "",
                  price: "",
                  quantity: "",
                  description: "",
                });
              }}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
