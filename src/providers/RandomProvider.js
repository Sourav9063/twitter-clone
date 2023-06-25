import { createContext, useState } from "react";

import React from "react";

export const RandomContext = createContext(null);

export default function RandomProvider({ children }) {
  const Random = {};

  return (
    <RandomContext.Provider value={useState(Random)}>
      {children}
    </RandomContext.Provider>
  );
}
