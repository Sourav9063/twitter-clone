import Button from "@/components/common/button/button";
import ProfilePill from "@/components/profilePill/ProfilePill";
import React from "react";

export default function Follow({ header = "Who to Follow?", profiles }) {
  return (
    <div className="follow">
      <h1>{header}</h1>
      <ProfilePill data={profiles} showOption={false}>
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
      </ProfilePill>

      <Button
        style={{
          paddingBlock: ".5rem",
          backgroundColor: "transparent",
          color: "var(--primary-color)",
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
          .follow > * {
            margin-bottom: 0.5rem;
          }
        `}
      </style>
    </div>
  );
}
