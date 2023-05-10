import Button from "@/components/common/button/button";
import ProfilePill from "@/components/profilePill/ProfilePill";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Follow({ header = "Who to Follow?", profiles }) {
  const [users, setUsers] = useState([]);
  const session = useSession();
  const [parent] = useAutoAnimate();
  async function getUsers(number = 4) {
    try {
      const res = await fetch("/api/v2/users?number=" + number, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      res.ok && setUsers(result.users.reverse());
    } catch (error) {}
  }
  useEffect(() => {
    getUsers();

    return () => {};
  }, []);

  return (
    <div className="follow">
      <h1>{header}</h1>
      <div className="inner" ref={parent}>
        {users.map((user, index) => {
          if (user._id == session.data?.user.id) return;
          return (
            <ProfilePill
              key={user._id}
              data={user}
              showOption={false}
            ></ProfilePill>
          );
        })}
      </div>
      <Button
        style={{
          paddingBlock: ".5rem",
          backgroundColor: "transparent",
          color: "var(--primary-color)",
        }}
        onclick={() => {
          getUsers(users.length + 3);
        }}
      >
        Show more
      </Button>
      <style jsx>
        {`
          .follow {
            background-color: var(--bg-hover);
            width: 100%;
            border-radius: 1rem;
            padding: 1rem;
            margin-top: 1rem;
          }
          .inner {
            max-height: 30vh;
            overflow-y: scroll;
          }
          .inner::-webkit-scrollbar {
            display: none;
          }

          .inner {
            -ms-overflow-style: none;
            /* IE and Edge */
            scrollbar-width: none;
            /* Firefox */
          }

          .follow > * {
            margin-bottom: 0.5rem;
          }
        `}
      </style>
    </div>
  );
}

{
  /* <ProfilePill data={profiles} showOption={false}>
        <Button
          style={{
            paddingBlock: ".5rem",
            backgroundColor: "Black",
            width: "30%",
          }}
        >
          Follow
        </Button>
      </ProfilePill>
      <ProfilePill showOption={false}>
        <Button
          style={{
            paddingBlock: ".5rem",
            backgroundColor: "Black",
            width: "30%",
          }}
        >
          Follow
        </Button>
      </ProfilePill>
      <ProfilePill showOption={false}>
        <Button
          style={{
            paddingBlock: ".5rem",
            backgroundColor: "Black",
            width: "30%",
          }}
        >
          Follow
        </Button>
      </ProfilePill> */
}

{
  /* <Button
                style={{
                  paddingBlock: ".5rem",
                  backgroundColor: "Black",
                  width: "30%",
                }}
              >
                Follow
              </Button> */
}
