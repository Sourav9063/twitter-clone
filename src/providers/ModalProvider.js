import { createContext, useState } from "react";

export const ModalContext = createContext(null);

import React from "react";

export default function ModalProvider({ children }) {
  const ui = {
    showModal: false,
    showSignIn: false,
    showSignUp: false,
    showPostEditor: false,
  };

  return (
    <ModalContext.Provider value={useState(ui)}>
      {children}
    </ModalContext.Provider>
  );
}
