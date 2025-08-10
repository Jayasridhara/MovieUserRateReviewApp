const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white text-red-600 border border-red-300 px-6 py-4 rounded shadow-lg text-center w-[90%] max-w-md">
        <p className="mb-4 font-semibold">⚠️ {message}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
