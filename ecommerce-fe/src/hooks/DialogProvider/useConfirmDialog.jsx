import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useDialog } from ".";

export default function useConfirmDialog() {
  const { createDialog, closeDialog } = useDialog();
  const confirm = ({
    title,
    content,
    onClose,
    onConfirm,
    cancelText = "Không",
    confirmText = "Có",
  }) => {
    const handleClose = () => {
      closeDialog();
      onClose && onClose();
    };
    const handleConfirm = () => {
      closeDialog();
      onConfirm && onConfirm();
    };

    createDialog({
      children: (
        <>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{content}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              autoFocus
              variant="contained"
              color="secondary"
            >
              {confirmText}
            </Button>
          </DialogActions>
        </>
      ),
    });
  };
  return confirm;
}
