import React, { useContext, useState } from "react";

import styles from "../signInDiv/ModalSignInDiv.module.css";
import TwitterLogo from "@/components/common/svg/TwitterLogo";
import Or from "@/components/common/Or";

import Loader from "@/components/common/loader/Loader";
import Link from "next/link";

import { useRouter } from "next/router";
import { MODAL_QUERY_SIGNIN } from "@/helper/constStrings";
import { useSession } from "next-auth/react";

export default function EditProfile() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [bio, setBio] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className={`${styles.signUpDiv} ${styles.showSignIn}`}>
      <TwitterLogo></TwitterLogo>
      <h1>Edit Profile</h1>
      <form
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();

          const data = {
            _id: session.data.user.id,
          };
          if (userName != "") {
            data.username = userName;
          }
          if (image != "") {
            data.image = image;
          }
          if (bio != "") {
            data.bio = bio;
          }
          if (coverImage != "") {
            data.coverImage = coverImage;
          }

          try {
            const response = await fetch("/api/users/", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            const result = await response.json();

            console.log(result);
            if (!response.ok) {
              throw new Error(result.msg);
            }

            setError(result.error);
            if (!result.error) {
              router.replace({
                pathname: "/profile",

                query: { id: session.data.user.id },
              });
            }
          } catch (error) {
            console.log(error);
            setError(error.message);
          }

          setLoading(false);
        }}
        action=""
      >
        <div className={styles["input-group"]}>
          <input
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            type="text"
            name="name"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Username</label>
        </div>

        {/* <div className={styles["input-group"]}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Hola"
            required
            type="email"
            name="email"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Email</label>
        </div>
        <div className={styles["input-group"]}>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hola"
            required
            type="password"
            autoComplete="false"
            name="password"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Password</label>
        </div> */}
        <div className={styles["input-group"]}>
          <input
            onChange={(e) => setBio(e.target.value)}
            placeholder="Hola"
            type="text"
            autoComplete="false"
            name="bio"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Bio</label>
        </div>
        <div className={styles["input-group"]}>
          <input
            onChange={(e) => setImage(e.target.value)}
            placeholder="Hola"
            type="text"
            autoComplete="false"
            name="image"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Image link</label>
        </div>
        <div className={styles["input-group"]}>
          <input
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Hola"
            type="text"
            autoComplete="false"
            name="coverImage"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Cover Image link</label>
        </div>
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
            value="Edit Profile"
            style={{
              paddingBlock: ".5rem",
              backgroundColor: "black",
            }}
          />
        )}
      </form>
      {/* <p>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use</span>.</p> */}
      <p>
        {`Already have an account?`}
        <Link replace={true} href={"/" + MODAL_QUERY_SIGNIN}>
          Log in
        </Link>
      </p>
    </div>
  );
}
