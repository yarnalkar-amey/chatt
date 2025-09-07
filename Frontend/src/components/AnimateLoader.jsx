// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function AnimatedLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      {/* Rotating White Ring */}
      <motion.div
        className="relative w-14 h-14 rounded-full border-4 border-white border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Message Icon in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
      </motion.div>
    </div>
  );
}
