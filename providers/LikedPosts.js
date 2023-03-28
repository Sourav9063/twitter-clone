import { createContext, useState } from "react";

import React from 'react'

export const LikedPostsContext = createContext(null);



export default function LikedPostsProvider({ children }) {
    const likedPosts = []

    return (
        <LikedPostsContext.Provider value={useState(likedPosts)}>{children}</LikedPostsContext.Provider>
    )
}
