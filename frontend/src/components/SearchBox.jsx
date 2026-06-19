const SearchBox = ({ search, setSearch }) => {
  return (
    <>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="border border-gray-300 outline-none px-3 py-2 rounded"
        type="text"
        placeholder="Search..."
      />
    </>
  );
};

export default SearchBox;
