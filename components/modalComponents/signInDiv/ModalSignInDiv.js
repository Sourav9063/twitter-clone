import { signIn } from 'next-auth/react';
import React, { useContext, useState } from 'react'

import styles from "./ModalSignInDiv.module.css"
import { ModalContext } from '@/providers/ModalProvider';

import Button from '@/components/common/button/button';
import TwitterLogo from '@/components/common/svg/TwitterLogo';
import Or from '@/components/common/Or';

export default function ModalSignInDiv() {
    const [ modal, setModal ] = useContext(ModalContext)
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    return (
        <div className={`${styles.signUpDiv} ${modal.showModal && styles.showSignIn}`}


        >
            <TwitterLogo></TwitterLogo>
            <h1>Sign in to Twitter</h1>

            {modal.showSignIn || <Button
                onclick={() => {
                    modal.showSignIn = true;
                    modal.showModal = true
                    setModal({ ...modal })
                }}
                style={{ paddingBlock: ".5rem", }}
            >Log in</Button>}






            <button
                className={`${styles.btnOutline} btn-primary`}
                onClick={() => {
                    modal.showSignUp = true;
                    setModal({ ...modal })
                }}
            // style={{
            //     backgroundColor: "White",
            //     color: "Black",
            //     border: "1px var(--border-color) solid",
            //     paddingBlock: ".5rem",
            //     // marginBlock: "1rem"
            // }}
            >Sign in with Github</button>
            <button
                className={`${styles.btnOutline} btn-primary`}
                onClick={() => {
                    modal.showSignUp = true;
                    setModal({ ...modal })
                }}
            // style={{
            //     backgroundColor: "White",
            //     color: "Black",
            //     border: "1px var(--border-color) solid",
            //     paddingBlock: ".5rem",
            //     // marginBlock: "1rem"
            // }}
            >Create account</button>

            <Or></Or>
            {modal.showSignIn && <>
                <form action=""

                    onSubmit={async (e) => {
                        e.preventDefault();
                        console.log({ email, password })

                        try {
                            const res = await signIn("credentials", { redirect: false, email, password })
                            console.log(res)
                        } catch (e) {
                            console.log(e)
                        }

                    }}


                >

                    <div className={styles[ "input-group" ]}>
                        <input
                            onChange={(e) => setEmail(e.target.value)}

                            required type="email" name="email" placeholder='Hola' className={styles[ "input" ]} />
                        <label className={styles[ "user-label" ]}>Email</label>
                    </div>
                    <div className={styles[ "input-group" ]}>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required type="password" autoComplete='false' placeholder='Hola' name="password" className={styles[ "input" ]} />
                        <label className={styles[ "user-label" ]}>Password</label>
                    </div>


                    <input className='btn-primary' type="submit"
                        style={{
                            paddingBlock: ".5rem",
                            backgroundColor: 'black'
                        }}
                    />
                </form>
            </>
            }
            {/* <p>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use</span>.</p> */}
            <p>{`Don't have an account?`} <a href="">Sign up</a></p>
        </div>
    )
}
