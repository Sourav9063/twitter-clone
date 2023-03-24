import React, { useContext, useState } from 'react'

import styles from "./ModalSignInDiv.module.css"
import { ModalContext } from '@/providers/ModalProvider';

import Button from '@/components/common/button/button';
import TwitterLogo from '@/components/common/svg/TwitterLogo';
import Or from '@/components/common/Or';

export default function ModalSignUpDiv() {
    const [ modal, setModal ] = useContext(ModalContext)

    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");



    return (
        <div className={`${styles.signUpDiv} ${styles.showSignIn}`}


        >
            <TwitterLogo></TwitterLogo>
            <h1>Sign Up to Twitter</h1>

            {modal.showSignUp || <Button
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
            >Sign up with Github</button>
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
            {modal.showSignUp && <>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log({ userName, email, password })
                    }}

                    action="">
                    <div className={styles[ "input-group" ]}>
                        <input

                            onChange={(e) => setUserName(e.target.value)}

                            placeholder='Hola' required type="text" name="name" className={styles[ "input" ]} />
                        <label className={styles[ "user-label" ]}>Username</label>
                    </div>

                    <div className={styles[ "input-group" ]}>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Hola' required type="email" name="email" className={styles[ "input" ]} />
                        <label className={styles[ "user-label" ]}>Email</label>
                    </div>
                    <div className={styles[ "input-group" ]}>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Hola' required type="password" autoComplete='false' name="password" className={styles[ "input" ]} />
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
            <p>{`Already have an account?`} <a href="">Log in</a></p>
        </div>
    )
}
