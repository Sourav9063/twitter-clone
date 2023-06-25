import React from "react";
import styles from "./ModalSignInDiv.module.css";
import TwitterLogo from "@/components/common/svg/TwitterLogo";
import Or from "@/components/common/Or";
import { MODAL_QUERY_SIGNIN } from "@/helper/constStrings";
import Link from "next/link";
import Loader from "@/components/common/loader/Loader";
import useUser, { UserActions } from "@/actions/useUser";
import Button from "@/components/common/button/button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Compressor from "compressorjs";

export default function ModalSignUpDiv() {
  const {
    userSignUpForm,
    setUserSignUpForm,
    error,
    loading,
    isVerified,
    setIsVerified,
    verifyString,
    setverifyString,
    userDispatch,
  } = useUser();

  const [parent] = useAutoAnimate();
  const [formParent] = useAutoAnimate();

  return (
    <div ref={parent} className={`${styles.signUpDiv} ${styles.showSignIn}`}>
      <TwitterLogo></TwitterLogo>
      <h1>Sign Up to Twitter</h1>
      <button
        className={`${styles.btnOutline} btn-primary`}
        onClick={userDispatch({ type: UserActions.postSignUpGithub })}
      >
        Sign in with Github
      </button>

      <Or></Or>

      <form
        ref={formParent}
        onSubmit={userDispatch({ type: UserActions.postSignUpEmail })}
        action=""
      >
        <div className={styles["input-group"]}>
          <input
            onChange={(e) =>
              setUserSignUpForm((state) => {
                return { ...state, userName: e.target.value };
              })
            }
            value={userSignUpForm.userName}
            placeholder="Hola"
            required
            type="text"
            name="name"
            autoComplete="off"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Username</label>
        </div>

        <div className={styles["input-group"]}>
          <input
            onChange={(e) =>
              setUserSignUpForm((state) => {
                return { ...state, email: e.target.value };
              })
            }
            value={userSignUpForm.email}
            placeholder="Hola"
            required
            type="email"
            name="email"
            autoComplete="off"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Email</label>
        </div>
        {isVerified || (
          <>
            {verifyString?.length < 1 && <p>Already have a code?</p>}
            <div className={styles["input-group"]}>
              <input
                onChange={(e) =>
                  setverifyString((state) => {
                    return e.target.value;
                  })
                }
                value={verifyString}
                placeholder="Hola"
                required
                type="text"
                name="Verification Code"
                autoComplete="off"
                className={styles["input"]}
              />
              <label className={styles["user-label"]}>Verification Code</label>
            </div>
          </>
        )}
        {isVerified && (
          <>
            <div className={styles["input-group"]}>
              <input
                onChange={(e) =>
                  setUserSignUpForm((state) => {
                    return { ...state, password: e.target.value };
                  })
                }
                placeholder="Hola"
                // required
                type="password"
                autoComplete="off"
                name="password"
                className={styles["input"]}
              />
              <label className={styles["user-label"]}>Password</label>
            </div>
            <div>
              <label htmlFor="img-upload">
                <input
                  accept="image/*"
                  id="img-upload"
                  hidden
                  type="file"
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];

                      new Compressor(file, {
                        quality: 0.6,
                        maxWidth: 300,
                        success(result) {
                          setUserSignUpForm((state) => {
                            return {
                              ...state,
                              selectedFile: result,
                            };
                          });
                        },
                        error(err) {
                          console.log(err.message);
                        },
                      });
                      setUserSignUpForm((state) => {
                        return {
                          ...state,
                          selectedImage: URL.createObjectURL(file),
                        };
                      });
                    }
                  }}
                />
                <div>
                  {userSignUpForm.selectedImage ? (
                    <img
                      className={styles.uploadPic}
                      src={userSignUpForm.selectedImage}
                      alt=""
                    />
                  ) : (
                    <svg
                      width={"20px"}
                      className={styles.picSVG}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <g>
                        <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                      </g>
                    </svg>
                  )}
                </div>
              </label>
            </div>

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
          </>
        )}

        {error && (
          <p className={styles.error} style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>

      {isVerified ||
        (verifyString?.length != 6 ? (
          <>
            <Or></Or>
            {loading ? (
              <Loader />
            ) : (
              <Button
                type="button"
                onclick={userDispatch({
                  type: UserActions.postVerificationEmail,
                })}
              >
                Send Verification Email
              </Button>
            )}
          </>
        ) : (
          <Button
            type="button"
            onclick={userDispatch({
              type: UserActions.postCheckVerificationCode,
            })}
          >
            Check Verification Code
          </Button>
        ))}

      <p>
        {`Already have an account? `}
        <Link replace={true} href={"/" + MODAL_QUERY_SIGNIN}>
          Log in
        </Link>
      </p>
    </div>
  );
}

// const [userName, setUserName] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [image, setImage] = useState("");
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState("");
// const [uploading, setUploading] = useState(false);
// const [selectedImage, setSelectedImage] = useState("");
// const [selectedFile, setSelectedFile] = useState();

// setLoading(true);
// e.preventDefault();

// const data = {
//   username: userName,
//   email: email,
//   password: password,
// };
// if (image != "") {
//   data.image = image;
// }

// const formData = new FormData();
// selectedFile && formData.append("image", selectedFile);
// formData.append("username", userName);
// formData.append("email", email);
// formData.append("password", password);

// try {
//   const response = await fetch("/api/auth/signup", {
//     method: "POST",
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//     // body: JSON.stringify(data),
//     body: formData,
//   });
//   const result = await response.json();

//   if (!response.ok) {
//     throw new Error(result.msg);
//   }

//   const res = await signIn("credentials", {
//     redirect: false,
//     email,
//     password,
//   });

//   setError(res.error);
//   if (!res.error) {
//     // setModal({ ...objectValueSetter(modal, false) })
//     router.replace("/");
//   } else {
//     router.replace("/" + "MODAL_QUERY_SIGNIN");
//   }
// } catch (error) {
//   setError(error.message);
// }

// setLoading(false);

// async (e) => {
//   e.preventDefault();
//   userDispatch({ type: UserActions.postSignUpEmail });
// }

// const signUpGithub = async (e) => {
//   userDispatch({ type: UserActions.postSignUpGithub });
// };

// onSubmit={async (e) => {
//   e.preventDefault();
//   userDispatch({ type: UserActions.postSignUpEmail });
// }}
