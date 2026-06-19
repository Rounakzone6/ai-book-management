import { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";
import { FiEye } from "react-icons/fi";
import SearchBox from "../components/SearchBox";

const BookDetails = () => {
  const { bookList, navigate } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Filter books based on search
  const filteredBooks = bookList.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.isbn.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;

  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 pb-8">
      <div className="px-6 py-5 flex justify-between border-b border-gray-100">
        <h2 className="text-lg font-bold text-[#1e293b]">Book Details</h2>
        <SearchBox search={search} setSearch={handleSearch} />
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#4361ee] text-white">
                <th className="py-3.5 px-4 font-semibold text-sm rounded-tl-md">
                  Book ID
                </th>
                <th className="py-3.5 px-4 font-semibold text-sm">Book Name</th>
                <th className="py-3.5 px-4 font-semibold text-sm">Author</th>
                <th className="py-3.5 px-4 font-semibold text-sm">ISBN</th>
                <th className="py-3.5 px-4 font-semibold text-sm">Price (₹)</th>
                <th className="py-3.5 px-4 font-semibold text-sm">Quantity</th>
                <th className="py-3.5 px-4 font-semibold text-sm">Date</th>
                <th className="py-3.5 px-4 font-semibold text-sm rounded-tr-md text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentBooks.length > 0 ? (
                currentBooks.map((book, index) => {
                  const globalIndex =
                    (currentPage - 1) * itemsPerPage + index + 1;

                  return (
                    <tr
                      key={book._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm text-[#475569]">
                        {globalIndex}
                      </td>

                      <td className="py-4 px-4 text-sm text-[#475569] font-medium">
                        {book.title}
                      </td>

                      <td className="py-4 px-4 text-sm text-[#475569]">
                        {book.author}
                      </td>

                      <td className="py-4 px-4 text-sm text-[#475569]">
                        {book.isbn}
                      </td>

                      <td className="py-4 px-4 text-sm text-[#475569]">
                        ₹{book.price.toFixed(2)}
                      </td>

                      <td className="py-4 px-4 text-sm text-[#475569]">
                        {book.quantity}
                      </td>

                      <td className="py-4 px-4 text-sm text-[#475569]">
                        {new Date(book.createdAt).toLocaleDateString("en-GB")}
                      </td>

                      <td className="py-4 px-4 text-sm text-center">
                        <button
                          onClick={() => navigate(`/chat-history/${book._id}`)}
                          className="text-[#4361ee] hover:text-[#304bc0] hover:bg-blue-50 p-1.5 rounded-full transition-colors"
                          title="View Chat History"
                        >
                          <FiEye size={18} className="mx-auto" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="py-12 text-center text-gray-500 text-sm border-b border-gray-100"
                  >
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBooks.length > 0 && (
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex items-center border border-gray-200 rounded overflow-hidden shadow-sm">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-[#4361ee] bg-white hover:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-not-allowed border-r border-gray-200 transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 text-sm font-medium border-r border-gray-200 transition-colors ${
                      currentPage === page
                        ? "bg-[#4361ee] text-white"
                        : "text-[#4361ee] bg-white hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-[#4361ee] bg-white hover:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>

            <span className="text-sm text-[#64748b] mt-3 font-medium">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
