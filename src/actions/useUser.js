import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const UserActions = {
  postSignUpEmail: "POST_SIGNUP_EMAIL",
  postSingInEmail: "POST_SIGNIN_EMAIL",
  postSignUpGithub: "POST_SIGNUP_GITHUB",
  postVerificationEmail: "POST_VERIFICATION_EMAIL",
  postCheckVerificationCode: "POST_CHECK_VERIFICATION_CODE",
};

const useUser = (init) => {
  const router = useRouter();
  const [verifyString, setverifyString] = useState(
    router.query.verifyString == "undefined" ||
      router.query.verifyString == null
      ? ""
      : router.query.verifyString
  );
  const [isVerified, setIsVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [userSignUpForm, setUserSignUpForm] = useState({
    userName:
      router.query.username == "undefined" || router.query.username == null
        ? ""
        : router.query.username,
    email:
      router.query.email == "undefined" || router.query.email == null
        ? ""
        : router.query.email,
    password: "",
    image: "",
    selectedImage: "",
    selectedFile: null,
  });

  const { userName, email, password, image, selectedImage, selectedFile } =
    userSignUpForm;
  useEffect(() => {
    if (
      verifyString != "undefined" &&
      verifyString?.length == 6 &&
      userSignUpForm.email
    ) {
      postCheckVerificationCodeFn();
    } else {
    }
    return () => {};
  }, [verifyString, userSignUpForm.email]);

  const userReducer = (state, action) => {
    switch (action.type) {
      case UserActions.postSignUpEmail:
        return postSignUpEmailFn;
        break;
      case UserActions.postSignUpGithub:
        return postSignUpGithubFn;
        break;
      case UserActions.postSingInEmail:
        return postSignInEmailFn;
        break;
      case UserActions.postVerificationEmail:
        return postVerificationFn;
        break;
      case UserActions.postCheckVerificationCode:
        return postCheckVerificationCodeFn;
        break;
    }
  };

  const userDispatch = (action) => {
    return userReducer(null, action);
  };
  const postCheckVerificationCodeFn = async (e) => {
    setLoading(true);
    setError("Verifying");
    const data = {
      email: userSignUpForm.email,
      verifyString: verifyString,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    try {
      var response = await fetch("/api/v2/users/codeVerify", requestOptions);
      var result = await response.json();

      if (response.ok) {
        if (result.msg == "MATCHED") {
          setIsVerified(true);
          setError("");
        } else {
          setIsVerified(false);
          setError("Code not matched.");
        }
      } else {
        throw new Error(result.msg);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const postVerificationFn = async (e) => {
    setLoading(true);
    const data = {
      email: userSignUpForm.email,
      username: userSignUpForm.userName,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    try {
      var response = await fetch("/api/v2/users/emailVerify", requestOptions);
      var result = await response.json();

      if (response.ok) {
        setError("Verification email sent. Check inbox and span folder.");
      } else {
        throw new Error(result.msg);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  const postSignInEmailFn = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setError(res.error);
      if (!res.error) {
        // setModal({ ...objectValueSetter(modal, false) })
        router.replace("/");
      }
    } catch (e) {}
    setLoading(false);
  };
  const postSignUpEmailFn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: userName,
      email: email,
      password: password,
    };
    if (image != "") {
      data.image = image;
    }

    const formData = new FormData();
    selectedFile && formData.append("image", selectedFile);
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg);
      }
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setError(res.error);
      if (!res.error) {
        // setModal({ ...objectValueSetter(modal, false) })
        router.replace("/");
      } else {
        router.replace("/" + "MODAL_QUERY_SIGNIN");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const postSignUpGithubFn = async (e) => {
    setLoading(true);
    const res = await signIn("github", { callbackUrl: "/" });
    setLoading(false);
  };
  return {
    isVerified,
    setIsVerified,
    userSignUpForm,
    setUserSignUpForm,
    verifyString,
    setverifyString,
    error,
    loading,
    setError,
    setLoading,
    userDispatch,
  };
};

export default useUser;
