import { signIn } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

import styles from "./ModalSignInDiv.module.css";
import { ModalContext } from "@/providers/ModalProvider";

import Button from "@/components/common/button/button";
import TwitterLogo from "@/components/common/svg/TwitterLogo";
import Or from "@/components/common/Or";
import { objectValueSetter } from "@/helper/helperFunc/objectValueSetter";
import Loader from "@/components/common/loader/Loader";
import { useRouter } from "next/router";
import { BASE_URL, MODAL_QUERY_SIGNUP } from "@/helper/constStrings";
import Link from "next/link";
import useUser, { UserActions } from "@/actions/useUser";

export default function ModalSignInDiv() {
  // const [ modal, setModal ] = useContext(ModalContext)
  // const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [password, setPassword] = useState("");

  const router = useRouter();
  const { userSignUpForm, setUserSignUpForm, error, loading, userDispatch } =
    useUser();

  return (
    <div className={`${styles.signUpDiv} ${styles.showSignIn}`}>
      <TwitterLogo></TwitterLogo>
      <h1>Sign in to Twitter</h1>

      <button
        className={`${styles.btnOutline} btn-primary`}
        onClick={userDispatch({ type: UserActions.postSignUpGithub })}
      >
        Sign in with Github
      </button>
      <button
        className={`${styles.btnOutline} btn-primary`}
        onClick={() => {
          router.replace("/" + MODAL_QUERY_SIGNUP);
        }}
      >
        Create account
      </button>

      <Or></Or>

      <form
        action=""
        onSubmit={userDispatch({ type: UserActions.postSingInEmail })}
      >
        <div className={styles["input-group"]}>
          <input
            onChange={(e) =>
              setUserSignUpForm((state) => {
                return { ...state, email: e.target.value };
              })
            }
            required
            type="email"
            name="email"
            placeholder="Hola"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Email</label>
        </div>
        <div className={styles["input-group"]}>
          <input
            onChange={(e) =>
              setUserSignUpForm((state) => {
                return { ...state, password: e.target.value };
              })
            }
            required
            type="password"
            autoComplete="false"
            placeholder="Hola"
            name="password"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Password</label>
        </div>
        <p>
          <a
            className={styles.resetpass}
            href={BASE_URL + "/?modal=reset-password"}
          >
            Forgot password
          </a>
        </p>

        {error && (
          <p className={styles.error} style={{ color: "red" }}>
            {error}
          </p>
        )}

        {loading ? (
          <Loader />
        ) : (
          <input
            className="btn-primary"
            type="submit"
            style={{
              paddingBlock: ".5rem",
              backgroundColor: "black",
            }}
          />
        )}
      </form>

      {/* <p>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use</span>.</p> */}
      <p>
        {`Don't have an account?`}
        <Link replace={true} href={"/" + MODAL_QUERY_SIGNUP}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
