import Button from '@/components/common/button/button'
import { useSession } from 'next-auth/react'
import React, { useContext, useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { LikedPostsContext } from '@/providers/LikedPosts';

export default function RecentLiked() {
    const header = "Recent Liked"

    const session = useSession()

    const [liked, setLiked] = useContext(LikedPostsContext);

    useEffect(() => {

        //fetch liked posts from api/user/likedPosts and set it to likedPosts

        async function fetchLikedPosts() {
            const res = await fetch(`/api/users/likedposts/${session.data.user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                },

            })
            const data = await res.json()
            if (data) {
                // console.log(data.likedb.likedPost)

                setLiked(data.likedb.likedPost)
            }
        }


        fetchLikedPosts()
        return () => {

        }
    }, [])


    return (
        <>
            {liked.length != 0 && <div className='follow'>
                <h1>{header}</h1>
                {
                    liked.map((tweet, index) => {
                        return (
                            <div className='post' key={index} >
                                <div>{tweet.postText}</div>
                                <p>{formatDistanceToNow(new Date(tweet.createdDate))} </p>
                            </div>
                        )
                    })
                }
                {/* <Button
                    style={{ paddingBlock: ".5rem", backgroundColor: "transparent", color: "var(--primary-color)" }}
                >Show more</Button> */}
            </div>
            }
            <style jsx>{`
        
         .follow{
             background-color: var(--bg-hover);
             width: 100%;
             border-radius: 1rem;
             padding: 1rem;
             margin-top: 1rem;
         }
         .follow> *{
             margin-bottom: .5rem;
         }
            .follow>h1{
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--text-color-primary);

            }
        
         .post{
             background-color:var(--hover-secondary-trans-color);
             border-bottom: 1px solid var(--border-color);
             padding: 1rem;
             border-radius: 1rem;
             cursor: pointer;
         }
         div>p {
            {/* padding: 1rem; */}
            font-size: .85rem;
            letter-spacing: normal;
            color: var(--text-color-tertiary);
        }
        
         `}
            </style>
        </>
    )
}
