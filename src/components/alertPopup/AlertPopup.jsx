/* eslint-disable no-unused-vars */
// import React from "react";

// export default function AlertPopup({
//   show,
//   onClose,
//   title,
//   message,
//   type,
//   onConfirm,
//   autoHide = 0,
// }) {
//   const [progress, setProgress] = React.useState(100);

//   React.useEffect(() => {
//     let timer;
//     let interval;

//     if (show && autoHide > 0) {
//       // Reset progress
//       setProgress(100);

//       const duration = autoHide;
//       const start = Date.now();

//       interval = setInterval(() => {
//         const elapsed = Date.now() - start;
//         const percentage = Math.max(0, 100 - (elapsed / duration) * 100);
//         setProgress(percentage);
//       }, 30);

//       timer = setTimeout(() => {
//         onClose();
//         clearInterval(interval);
//       }, autoHide);

//       return () => {
//         clearTimeout(timer);
//         clearInterval(interval);
//       };
//     } else {
//       setProgress(100);
//     }
//   }, [show, autoHide, onClose]);

//   if (!show) return null;

//   const handleConfirm = () => {
//     if (onConfirm) onConfirm();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
//       <div className="relative bg-[#1E1E2F] text-white p-6 rounded-3xl w-80 md:w-96 text-center border border-teal-400 backdrop-blur-md shadow-[0_0_25px_rgba(20,184,166,0.4)] animate-fadeIn overflow-hidden">
//         {/* 🔹 Progress Bar */}
//         {autoHide > 0 && (
//           <div
//             className="absolute top-0 left-0 h-1 bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 transition-all duration-100 linear"
//             style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
//           ></div>
//         )}

//         <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 mt-2">
//           {title}
//         </h3>

//         <p className="text-gray-300 mb-4">{message}</p>

//         <div className="flex justify-center gap-4">
//           {type === "alert" && (
//             <button onClick={onClose} className="okBtn">
//               OK
//             </button>
//           )}

//           {type === "confirm" && (
//             <>
//               <button onClick={handleConfirm} className="yesBtn">
//                 Yes
//               </button>
//               <button onClick={onClose} className="noBtn">
//                 No
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

const AlertPopup = ({ data, onClose, onConfirm }) => {
  if (!data.show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded text-black w-80">
        <h2 className="font-bold text-lg">{data.title}</h2>
        <p className="mt-2">{data.message}</p>

        <div className="mt-4 flex justify-end gap-2">
          {data.type === "confirm" && (
            <button onClick={onConfirm} className="btn">
              Yes
            </button>
          )}
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default AlertPopup;

