import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Popup = ({ message, onClose, isSuccess = false }) => {

  const textColor = isSuccess ? "text-blue-600" : "text-red-600";
  const borderColor = isSuccess ? "border-blue-300" : "border-red-300";
  const buttonBg = isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600";
   const IconComponent  = isSuccess ? FaCheckCircle : FaExclamationTriangle;
  const iconColor      = isSuccess ? "text-green-600" : "text-red-600";
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className={`bg-white ${textColor} ${borderColor} px-6 py-4 rounded shadow-lg text-center w-[90%] max-w-md`}>
        <div className="flex items-center justify-center mb-4 space-x-2">
          <IconComponent className={`h-6 w-6 ${iconColor}`} />
          <p className="font-semibold">{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`${buttonBg} text-white px-4 py-2 rounded transition`}
        >
          OK
        </button>
      </div>
    </div>
  );
};
export default Popup;
