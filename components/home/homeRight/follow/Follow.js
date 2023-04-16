import Button from "@/components/common/button/button";
import ProfilePill from "@/components/profilePill/ProfilePill";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Follow({ header = "Who to Follow?", profiles }) {
  const [users, setUsers] = useState([]);
  const session = useSession();
  async function getUsers(number = 8) {
    try {
      const res = await fetch("api/v2/users?number=" + number, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      res.ok && setUsers(result.users);
    } catch (error) {}
  }
  useEffect(() => {
    getUsers();

    return () => {};
  }, []);

  return (
    <div className="follow">
      <h1>{header}</h1>
      <div className="inner">
        {users.map((user, index) => {
          if (user._id == session.data.user.id) return;
          return (
            <ProfilePill key={user._id} data={user} showOption={false}>
              {/* <Button
                style={{
                  paddingBlock: ".5rem",
                  backgroundColor: "Black",
                  width: "30%",
                }}
              >
                Follow
              </Button> */}
            </ProfilePill>
          );
        })}
      </div>
      {/* <ProfilePill data={profiles} showOption={false}>
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
      </ProfilePill> */}

      <Button
        style={{
          paddingBlock: ".5rem",
          backgroundColor: "transparent",
          color: "var(--primary-color)",
        }}
        onclick={() => {
          getUsers(users.length + 5);
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
