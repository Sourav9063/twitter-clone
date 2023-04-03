import Button from "@/components/common/button/button";
import ProfilePill from "@/components/profilePill/ProfilePill";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function PostOption({ header = "Post Options", postid, tweet }) {
  const router = useRouter();
  // useState(initialState)
  const [deletePost, setDeletePost] = useState(false);
  const [error, setError] = useState("");

  const deletePostFunc = async () => {
    try {
      setError("Loading");

      const res = await fetch("/api/posts/" + postid, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg);
      } else {
        setError("Post deleted");

        router.replace("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="delete-post">
      <h1>{header}</h1>

      <button
        onClick={() => {
          router.push({
            pathname: "/posts/" + router.query.postid,
            query: { modal: "edit-tweet" },
          });
        }}
      >
        Edit Post
      </button>

      <button
        className="delete"
        onClick={(e) => {
          setDeletePost(!deletePost);
        }}
      >
        Delete
      </button>
      {deletePost && (
        <div className="delete-confirmation">
          <div className="hr"></div>
          <p>Delete action cannot be undone!</p>
          <p>Are you sure about deleting the tweet?</p>
          <div className="delete-options">
            <button onClick={deletePostFunc}>Yes</button>
            <button
              onClick={() => {
                setDeletePost(false);
                setError("");
              }}
            >
              No
            </button>
          </div>
          {error != "" && <p className="error">{error}</p>}
        </div>
      )}
      <style jsx>
        {`
          .delete-post {
            background-color: var(--bg-hover);
            width: 100%;
            border-radius: 1rem;
            padding: 1rem;
            margin-top: 1rem;
            transition: height 300ms ease;
          }
          .delete-post > * {
            margin-bottom: 0.5rem;
          }
          button {
            display: block;
            width: 100%;
            border: none;
            background-color: transparent;
            padding: 1rem;
            font-size: 1.3rem;
            font-weight: 500;
            border-radius: 1rem;
          }
          button:hover {
            background-color: var(--hover-primary-trans-color);
          }
          .hr {
            width: 100%;
            background-color: var(--border-color-2);
            height: 1px;
            margin-block: 0.5rem;
            margin-bottom: 1rem;
          }

          .delete,
          .delete-options button:first-child {
            color: red;
          }
          .delete:hover,
          .delete-options button:first-child:hover {
            background-color: rgba(255, 0, 0, 0.25);
          }

          .delete-options {
            display: flex;
            font-size: 1rem;
          }
          .delete-options button {
            font-size: 1.2rem;
          }

          .delete-options button:last-child {
            color: green;
          }

          .error {
            margin-top: 0.5rem;
            color: red;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
