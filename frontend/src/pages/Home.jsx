import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { FiBookOpen, FiDollarSign, FiLayers } from "react-icons/fi";

const Home = () => {
  const { bookList } = useContext(AppContext);

  const totalBooks = bookList.length;
  const totalValue = bookList.reduce((acc, book) => acc + (book.price * book.quantity), 0);
  const totalQuantity = bookList.reduce((acc, book) => acc + book.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 pb-4">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#1e293b]">Dashboard Overview</h2>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 text-[#4361ee] rounded-full flex items-center justify-center">
              <FiBookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Unique Titles</p>
              <p className="text-2xl font-bold text-gray-800">{totalBooks}</p>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <FiLayers size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Inventory Items</p>
              <p className="text-2xl font-bold text-gray-800">{totalQuantity}</p>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <FiDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Inventory Value</p>
              <p className="text-2xl font-bold text-gray-800">₹{totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Books Preview */}
      {bookList.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 pb-4">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-[#1e293b]">Recently Added Books</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="py-3 px-4 font-semibold text-sm rounded-tl-md">Book Name</th>
                    <th className="py-3 px-4 font-semibold text-sm">Author</th>
                    <th className="py-3 px-4 font-semibold text-sm">Price</th>
                    <th className="py-3 px-4 font-semibold text-sm rounded-tr-md">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {bookList.slice(-5).reverse().map((book) => (
                    <tr key={book._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-3 px-4 text-sm text-[#475569] font-medium">{book.title}</td>
                      <td className="py-3 px-4 text-sm text-[#475569]">{book.author}</td>
                      <td className="py-3 px-4 text-sm text-[#475569]">₹{book.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-[#475569]">
                        <span className="bg-blue-100 text-[#4361ee] px-2 py-1 rounded text-xs font-semibold">
                          {book.quantity} in stock
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
