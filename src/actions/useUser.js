import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const UserActions = {
  postSignUpEmail: "POST_SIGNUP_EMAIL",
  postSignUpGithub: "POST_SIGNUP_GITHUB",
};

const useUser = (init) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [userSignUpForm, setUserSignUpForm] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
    selectedImage: "",
    selectedFile: null,
  });

  const { userName, email, password, image, selectedImage, selectedFile } =
    userSignUpForm;
  const userReducer = (state, action) => {
    switch (action.type) {
      case UserActions.postSignUpEmail:
        return postSignUpEmailFn;
        break;
      case UserActions.postSignUpGithub:
        return postSignUpGithubFn;
        break;
    }
  };

  const userDispatch = (action) => {
    return userReducer(null, action);
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
    userSignUpForm,
    setUserSignUpForm,
    error,
    loading,
    setError,
    setLoading,
    userDispatch,
  };
};

export default useUser;
