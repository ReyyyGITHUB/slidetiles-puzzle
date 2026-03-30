"use client";

import React from "react";
import { X } from "lucide-react";

interface FeatureUnavailablePopupProps {
  open: boolean;
  onClose: () => void;
}

export default function FeatureUnavailablePopup({
  open,
  onClose,
}: FeatureUnavailablePopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-on-background/40 backdrop-blur-md">
      <div className="w-full max-w-sm rounded-[2rem] bg-tertiary-container shadow-2xl border border-on-background/5 p-6 text-center">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="action-icon w-10 h-10 hover:bg-surface-low"
            aria-label="Close"
          >
            <X size={16} className="text-on-background/60" />
          </button>
        </div>
        <h3 className="font-display text-2xl font-extrabold text-primary tracking-tighter mb-2">
          Fitur Belum Tersedia
        </h3>
        <p className="body-text text-sm mb-6">
          Fitur ini masih disiapkan. Segera hadir.
        </p>
        <button
          onClick={onClose}
          className="btn-restart w-full py-3 flex items-center justify-center"
        >
          Oke, Mengerti
        </button>
      </div>
    </div>
  );
}
