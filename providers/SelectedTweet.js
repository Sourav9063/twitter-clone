import { createContext, useState } from "react";

import React from 'react'

export const SelectedTweetContext = createContext(null);



export default function SelectedTweetProvider({ children }) {
    const SelectedTweet = {}

    return (
        <SelectedTweetContext.Provider value={useState(SelectedTweet)}>{children}</SelectedTweetContext.Provider>
    )
}
