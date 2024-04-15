import { Dialog } from "@mui/material";
import React from "react";
import "./dialog.scss";
const DialogContext = React.createContext({
  createDialog: () => {},
  closeDialog: () => {},
});

export function DialogProvider({ children }) {
  const [dialogs, setDialogs] = React.useState([]);

  const createDialog = (option) => {
    const dialog = { ...option, open: true };
    setDialogs((dialogs) => [...dialogs, dialog]);
  };

  const closeDialog = () => {
    setDialogs((dialogs) => {
      const latestDialog = dialogs.pop();
      if (!latestDialog) return dialogs;
      if (latestDialog.onClose) latestDialog.onClose();
      return [...dialogs].concat({ ...latestDialog, open: false });
    });
  };

  const contextValue = { createDialog, closeDialog };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {dialogs?.map((dialog, i) => {
        return <DialogContainer key={i} {...dialog} />;
      })}
    </DialogContext.Provider>
  );
}
export const useDialog = () => React.useContext(DialogContext);

function DialogContainer({ children, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} sx={{ borderRadius: 50 }}>
      {children}
    </Dialog>
  );
}
