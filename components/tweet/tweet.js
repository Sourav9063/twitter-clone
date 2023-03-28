import React, { useContext, useState } from 'react'
import style from "./tweet.module.css"
import Avatar from '../common/avatar/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useSession } from 'next-auth/react';
import { headers } from '@/next.config';
import { useRouter } from 'next/router';
import { LikedPostsContext } from '@/providers/LikedPosts';
import ModalComponent from '../modal/ModalComponent';

// import Image from 'next/image';
export default function Tweet(props) {


    const { owner, postImage, createdDate, postText, likes, comments, _id } = props.tweet;
    const [likesState, setLikesState] = useState(likes)

    // 
    const session = useSession();
    const router = useRouter();
    const [liked, setLiked] = useContext(LikedPostsContext);
    let likedPost = liked.find((post) => post._id == _id)
    likedPost = likedPost ? true : false

    return (
        <div className={style.tweet}>

            <section className={style.image}>
                <Avatar image={owner?.image}></Avatar>
            </section>
            <section className={style.body}>
                <div className={style["header"]}>
                    <div className={style.names}>
                        <span className={style["name"]}>{owner?.username}</span>
                        <span className={style["username"]}>{owner?.username}</span>
                        <span>·</span>
                        <span className={style["day"]}>{formatDistanceToNow(new Date(createdDate))}</span>
                    </div>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className={style.threeDot} ><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                </div>
                <div className={style.mainTweet}>{postText}</div>
                {postImage && <div className={style.tweetImg}>
                    <img src={postImage} alt="" />
                </div>}
                <div>{likedPost}</div>
                {session.status == "authenticated" && <div className={style.likeNcommnet}>
                    <div className={`${likedPost ? style.likedPost : ""} ${style.likes}`}
                        onClick={async (e) => {

                            e.stopPropagation();



                            try {
                                const myHeaders = new Headers();
                                myHeaders.append("Content-Type", "application/json");

                                const res = await fetch("/api/posts/" + _id + "/like", {
                                    method: "POST",
                                    body: JSON.stringify({ userid: session.data.user.id }),
                                    headers: myHeaders,

                                });
                                const data = await res.json();

                                setLikesState(data.likes)
                            } catch (e) {

                            }
                            const res = await fetch(`/api/users/likedposts/${session.data.user.id}`, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",

                                },

                            })
                            const data = await res.json()
                            if (data) {
                                // 

                                setLiked(data.likedb.likedPost)
                            }




                        }}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                        <span>{likesState}</span>
                    </div>
                    <div

                        onClick={(e) => {

                            router.push({
                                pathname: router.pathname,
                                query: { modal: "comment", id: _id },

                            });

                            // 
                        }}

                        className={style.comments}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                        <span>{comments.length}</span>

                    </div>
                </div>}
            </section >

        </div >
    )
}
