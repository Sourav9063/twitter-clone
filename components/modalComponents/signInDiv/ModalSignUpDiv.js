import React, { useContext, useState } from 'react'

import styles from "./ModalSignInDiv.module.css"
import { ModalContext } from '@/providers/ModalProvider';

import Button from '@/components/common/button/button';
import TwitterLogo from '@/components/common/svg/TwitterLogo';
import Or from '@/components/common/Or';
import { useRouter } from 'next/router';
import { MODAL_QUERY_SIGNIN } from '@/helper/constStrings';
import Link from 'next/link';
import Loader from '@/components/common/loader/Loader';
import { signIn } from 'next-auth/react';

export default function ModalSignUpDiv() {
    // const [ modal, setModal ] = useContext(ModalContext)

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const router = useRouter();



    return (
        <div className={`${styles.signUpDiv} ${styles.showSignIn}`}


        >
            <TwitterLogo></TwitterLogo>
            <h1>Sign Up to Twitter</h1>

            {/* {modal.showSignUp || <Button
                onclick={() => {
                    // modal.showSignIn = true;
                    // modal.showModal = true
                    // setModal({ ...modal })
                    router.push("/" + MODAL_QUERY_SIGNIN)
                }}
                style={{ paddingBlock: ".5rem", }}
            >Log in</Button>} */}






            {/* <button
                className={`${styles.btnOutline} btn-primary`}
                onClick={() => {
                    // modal.showSignUp = true;
                    // modal.showModal = true

                    // setModal({ ...modal })
                }}
            // style={{
            //     backgroundColor: "White",
            //     color: "Black",
            //     border: "1px var(--border-color) solid",
            //     paddingBlock: ".5rem",
            //     // marginBlock: "1rem"
            // }}
            >Sign up with Github</button> */}
            <button
                className={`${styles.btnOutline} btn-primary`}
                onClick={async () => {
                    // modal.showSignUp = true;
                    // setModal({ ...modal })

                    setLoading(true)
                    const res = await signIn("github", { callbackUrl: "/" })
                    setLoading(false)

                    // router.replace("/" + MODAL_QUERY_SIGNUP)
                }}
            // style={{
            //     backgroundColor: "White",
            //     color: "Black",
            //     border: "1px var(--border-color) solid",
            //     paddingBlock: ".5rem",
            //     // marginBlock: "1rem"
            // }}
            >Sign in with Github</button>
            {/* {<button
                className={`${styles.btnOutline} btn-primary`}
                onClick={() => {
                    modal.showSignUp = true;
                    modal.showModal = true

                    setModal({ ...modal })
                }}
            // style={{
            //     backgroundColor: "White",
            //     color: "Black",
            //     border: "1px var(--border-color) solid",
            //     paddingBlock: ".5rem",
            //     // marginBlock: "1rem"
            // }}
            >Create account</button>} */}

            <Or></Or>
            {/* {modal.showSignUp && <> */}
            <form
                onSubmit={async (e) => {
                    setLoading(true);
                    e.preventDefault();



                    const data = {
                        username: userName,
                        email: email,
                        password: password,
                    };
                    if (image != "") {
                        data.image = image;
                    }

                    console.log(data)

                    try {
                        const response = await fetch("/api/auth/signup", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        });
                        const result = await response.json();


                        if (!(response.ok)) {
                            throw new Error(result.msg)
                        }


                        const res = await signIn("credentials", { redirect: false, email, password })

                        setError(res.error);
                        if (!res.error) {



                            // setModal({ ...objectValueSetter(modal, false) })
                            router.replace('/')

                        }
                        else {

                            router.replace("/" + "MODAL_QUERY_SIGNIN")

                        }



                    } catch (error) {

                        setError(error.message)
                    }

                    setLoading(false)



                }}

                action="">
                <div className={styles["input-group"]}>
                    <input

                        onChange={(e) => setUserName(e.target.value)}

                        placeholder='Hola' required type="text" name="name" className={styles["input"]} />
                    <label className={styles["user-label"]}>Username</label>
                </div>

                <div className={styles["input-group"]}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Hola' required type="email" name="email" className={styles["input"]} />
                    <label className={styles["user-label"]}>Email</label>
                </div>
                <div className={styles["input-group"]}>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Hola' required type="password" autoComplete='false' name="password" className={styles["input"]} />
                    <label className={styles["user-label"]}>Password</label>
                </div>

                <div className={styles["input-group"]}>
                    <input
                        onChange={(e) => setImage(e.target.value)}
                        placeholder='Hola' type="text" autoComplete='false' name="image" className={styles["input"]} />
                    <label className={styles["user-label"]}>Image link</label>
                </div>


                {error && <p className={styles.error} style={{ color: "red" }}>{error}</p>}

                {loading ? <Loader /> :
                    <input className='btn-primary' type="submit"
                        style={{
                            paddingBlock: ".5rem",
                            backgroundColor: 'black'
                        }}
                    />}
            </form>
            {/* </>
            } */}
            {/* <p>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use</span>.</p> */}
            <p>{`Already have an account?`} <Link replace={true} href={"/" + MODAL_QUERY_SIGNIN}>Log in</Link></p>
        </div>
    )
}
