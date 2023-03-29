import React, { useState } from 'react'
import Avatar from '../avatar/avatar'
import style from "./post.module.css"
import Button from '../button/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from "../../modalComponents/signInDiv/ModalSignInDiv.module.css"

export default function Post
    ({ width = "100%", placeholder = "What's happening?" }) {
    const [ tweet, setTweet ] = useState("")
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");
    const [ imageLink, setImageLink ] = useState("");
    const [ picInputShow, setPicInputShow ] = useState(false)
    const session = useSession();
    const route = useRouter()

    return (
        <div className={style.post} style={{ width: "600px" }}>

            <section className={style.image}>
                <Avatar image={session.data?.user.image}></Avatar>
            </section>
            <section className={style.body}>


                <div className={style[ "privacy" ]}>Everyone
                    <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path></g></svg>
                </div>

                <form action="">
                    <textarea onChange={(e) => {
                        setTweet(e.target.value)
                    }} value={tweet} placeholder="What's happening?" type="text" />

                </form>

                <div className={style.privacyShow}>
                    <p> <span><svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z"></path></g></svg></span> Everyone can reply</p>
                </div>
                <div className={style.hr} ></div>

                <div className={style.likeNcommnet}>
                    <div onClick={() => {
                        let tmp = picInputShow;

                        tmp = !tmp;


                        setPicInputShow(tmp);
                    }}
                    >
                        {/* <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg> */}
                        {/* <span>{likes}</span> */}
                        <svg className={style.picSVG} viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>


                    </div>
                    {picInputShow ? <div

                        className={styles[ "input-group" ]}>
                        <input
                            // style={{ marginBlock: "1rem" }}

                            onChange={(e) => setImageLink(e.target.value)}

                            required type="email" name="Image" placeholder='Input Image Link' className={styles[ "input" ]} />
                        <label className={styles[ "user-label" ]}>Image link</label>
                    </div> : <div></div>}
                    <div>
                        <Button
                            disabled={tweet == ''}
                            style={{
                                paddingBlock: ".5rem",
                            }}
                            onclick={async () => {

                                setLoading(true)


                                const myHeaders = new Headers();
                                myHeaders.append("Content-Type", "application/json");

                                const data = {
                                    owner: session.data.user.id,
                                    postText: tweet,

                                }

                                if (imageLink != "") {
                                    data.postImage = imageLink;
                                }
                                const raw = JSON.stringify(data);



                                const requestOptions = {
                                    method: 'POST',
                                    headers: myHeaders,
                                    body: raw,
                                    redirect: 'follow'
                                };


                                try {
                                    const response = await fetch("http://localhost:3000/api/posts", requestOptions);

                                    const result = await response.json();
                                    route.replace('/')

                                } catch (error) {


                                }

                                setLoading(false)

                                setImageLink("");
                                setPicInputShow(false)

                                setTweet("")
                            }}
                        ></Button>
                    </div>
                    {/* <div>
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                        <span>{comments}</span>

                    </div> */}
                </div>
            </section>

        </div>
    )
}
