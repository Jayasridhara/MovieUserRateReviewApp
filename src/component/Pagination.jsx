const Pagination = ({ currentPage, totalResults, onPageChange }) => {
  if (!totalResults || totalResults <= 10) return null;

  const totalPages = Math.ceil(totalResults / 10);
  const pageGroupSize = 5;

  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {startPage > 1 && (
        <button
          onClick={() => onPageChange(startPage - 1)}
          className="px-3 py-1 bg-gray-100 rounded hidden lg:inline-block md:inline-block"
        >
          &laquo;
        </button>
      )}
 <div className="hidden sm:flex gap-2">
       {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`px-3 py-1 rounded ${
            pageNum === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-300'
          }`}
        >
          {pageNum} 
        </button>
      ))}
 </div>
     
      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(endPage + 1)}
          className="px-3 py-1 bg-gray-100 rounded hidden lg:inline-block"
        >
          &raquo;
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
