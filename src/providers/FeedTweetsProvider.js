import { createContext, useState } from "react";

import React from "react";

export const FeedTweetsContext = createContext(null);

export default function FeedTweetsProvider({ children }) {
  const FeetTweets = [];

  return (
    <FeedTweetsContext.Provider value={useState(FeetTweets)}>
      {children}
    </FeedTweetsContext.Provider>
  );
}
