import React, { useState } from "react";
import ProfileMidPosts from "./ProfileMidPosts";
import ProfileMidFollowing from "./ProfileMidFollowing";
import { useSession } from "next-auth/react";

export default function ProfileMid({ data, posts }) {
  const [showWhat, setShowWhat] = useState("POSTS");
  const session = useSession();
  return (
    <section className="ProfileMid">
      <div className="buttons">
        <button
          style={{
            borderBottom:
              showWhat == "POSTS"
                ? "3px var(--primary-color) solid"
                : "3px var(--hover-primary-trans-color) solid",
          }}
          onClick={() => {
            setShowWhat("POSTS");
          }}
        >
          My Posts
        </button>
        <button
          style={{
            borderBottom:
              showWhat == "FOLLOWING"
                ? "3px var(--primary-color) solid"
                : "3px var(--hover-primary-trans-color) solid",
          }}
          onClick={() => {
            setShowWhat("FOLLOWING");
          }}
        >
          Following
        </button>
        <button
          style={{
            borderBottom:
              showWhat == "FOLLOWER"
                ? "3px var(--primary-color) solid"
                : "3px var(--hover-primary-trans-color) solid",
          }}
          onClick={() => {
            setShowWhat("FOLLOWER");
          }}
        >
          Follower
        </button>
      </div>

      {showWhat == "POSTS" && <ProfileMidPosts posts={posts} />}
      {showWhat == "FOLLOWING" && (
        <ProfileMidFollowing
          showUnfollow={session.data?.user.id == data._id}
          following={data.following}
        ></ProfileMidFollowing>
      )}
      {showWhat == "FOLLOWER" && (
        <ProfileMidFollowing
          header="Follower"
          following={data.follower}
        ></ProfileMidFollowing>
      )}

      <style jsx>{`
        .buttons {
          display: flex;
          justify-content: center;
          align-items: stretch;
          align-content: stretch;
           {
            /* padding-bottom: .5rem; */
          }
           {
            /* border-bottom: 1px var(--border-color-2) solid; */
          }
        }
        button {
          all: unset;
          width: 100%;
          height: 100%;
          padding: 1rem;
          text-align: center;
          font-size: 1.2rem;
        }
        button:hover {
          background-color: var(--hover-primary-trans-color);
          border-bottom: 3px var(--hover-primary-trans-color) solid;
        }
      `}</style>
    </section>
  );
}
