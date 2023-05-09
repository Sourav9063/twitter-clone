import React, { useState } from "react";
import ProfilePill from "../profilePill/ProfilePill";
import { useSession } from "next-auth/react";
import Button from "../common/button/button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export default function ProfileMidFollowing({
  following,
  setUserData,
  header = "Following",
  showUnfollow = false,
}) {
  const session = useSession();
  const [parent, enableAnimations] = useAutoAnimate();

  // useState(initialState)
  return (
    <>
      <h1>{header}</h1>
      <div ref={parent}>
        {following.length > 0 ? (
          following.map((follow, index) => {
            return (
              <ProfilePill
                margin={"1rem 0 1rem 0"}
                borderRadius="1rem"
                showOption={false}
                // key={follow._id}
                key={index}
                data={follow}
              >
                {header == "Following" && showUnfollow && (
                  <Button
                    onclick={async (e) => {
                      e.stopPropagation();
                      try {
                        const body = {
                          owner: session.data.user.id,
                          who: follow._id,
                          what: "UNFOLLOW",
                        };
                        const res = await fetch("/api/v2/users/follow", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(body),
                        });
                        const result = await res.json();
                        const follower = following.filter((f) => {
                          console.log(f._id);
                          console.log(follow._id);
                          return f._id != follow._id;
                        });
                        console.log(follower.length);
                        setUserData((state) => {
                          return { ...state, following: follower };
                        });
                      } catch (error) {}
                    }}
                    style={{
                      paddingBlock: ".5rem",
                      backgroundColor: "Black",
                      width: "30%",
                    }}
                  >
                    Unfollow
                  </Button>
                )}
              </ProfilePill>
            );
          })
        ) : (
          <div className="no-follow">No {header}</div>
        )}
      </div>

      <style jsx>{`
        h1 {
          font-size: 2rem;
          padding: 1rem;
        }
        .no-follow {
          text-align: center;
        }
      `}</style>
    </>
  );
}
