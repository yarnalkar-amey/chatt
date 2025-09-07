import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const WaitingStatus = ({ show = false, message = "Please wait..." }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center space-y-4"
      >
        {/* Loader Icon */}
        <Loader2 className="w-10 h-10 animate-spin text-white" />

        {/* Message */}
        <p className="text-white text-lg font-medium">{message}</p>
      </motion.div>
    </motion.div>
  );
};

export default WaitingStatus;
