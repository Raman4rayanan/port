"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}

export default function CertificateModal({ isOpen, onClose, imageSrc, title }: CertificateModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-[#040405]/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white font-mono text-xs tracking-widest uppercase hover:text-[var(--accent)] transition-colors z-10 interactive"
            data-cursor-text="CLOSE"
          >
            [ CLOSE ]
          </button>

          {/* Image Container */}
          <motion.div 
            className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks on image from closing
          >
            <div className="relative w-full h-full border border-white/5 bg-black">
               <Image 
                 src={imageSrc} 
                 alt={title}
                 fill
                 sizes="100vw"
                 className="object-contain"
                 priority
               />
            </div>
            
            <div className="absolute -bottom-8 left-0 right-0 text-center font-mono text-[10px] text-zinc-600 tracking-widest uppercase hidden md:block">
              SYS.IMG.RENDER / {title}
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
