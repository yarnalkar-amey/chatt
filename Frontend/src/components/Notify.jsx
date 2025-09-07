/* eslint-disable react-refresh/only-export-components */
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle, Info } from "lucide-react";

// 🔹 Global notify function
export const notify = (type, ...args) => {
  switch (type) {
    case "success":
      toast.success(args[0], {
        style: {
          background: "#000",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid #22c55e",
        },
        icon: <CheckCircle size={20} className="text-green-400" />,
      });
      break;

    case "error":
      toast.error(args[0], {
        style: {
          background: "#000",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid #ef4444",
        },
        icon: <XCircle size={20} className="text-red-400" />,
      });
      break;

    case "info":
      toast(args[0], {
        style: {
          width:"auto",
          background: "#000",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid #3b82f6",
        },
        icon: <Info size={20} className="text-blue-400" />,
      });
      break;

    case "promise":
      { const [fnc, pendingMsg, successMsg, errorMsg] = args;
      toast.promise(
        fnc,
        {
          loading: pendingMsg,
          success: successMsg,
          error: errorMsg,
        },
        {
          style: {
            background: "#000",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "10px",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#000",
          },
        }
      );
      break; }

    default:
      console.warn("⚠️ Invalid toast type provided:", type);
  }
};

// 🔹 Toast container component
const Notify = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
      }}
    />
  );
};

export default Notify;
