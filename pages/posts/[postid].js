import { useRouter } from 'next/router'
import React from 'react'

export default function PostId() {
    const router = useRouter()
    console.log(router)
    return (
        <div>{router.toString()}</div>
    )
}