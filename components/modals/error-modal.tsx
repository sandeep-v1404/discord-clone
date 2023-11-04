"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { useEffect } from "react";

export const ErrorModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  const origin = useOrigin();

  useEffect(() => {
    onOpen("error");
  }, [onOpen]);

  const isModalOpen = isOpen && type === "error";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invalid Invite URL
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
