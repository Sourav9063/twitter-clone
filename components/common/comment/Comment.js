import React, { useEffect, useState } from "react";
import Avatar from "../avatar/avatar";
import CommentBox from "@/components/modalComponents/CommentBox";
import style from "../../tweet/tweet.module.css";
import { useSession } from "next-auth/react";

export default function Comment({ comment }) {
  const session = useSession();
  return (
    <div className="main">
      <div className={style.tweet} key={comment._id}>
        <section className={style.image}>
          <Avatar width="30px" image={comment.ownerimage}></Avatar>
          {comment.nodes.length > 0 && (
            // <svg viewBox="0 0 24 24" aria-hidden="true" className={style.threeDot} ><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
            //  svg vertical line with color var(--border-color)
            <div className="vLine"></div>
          )}
        </section>
        <section className={style.body}>
          <div className={"comment-header " + style["header"]}>
            <div className={style.names}>
              <span className={style["name"]}>{comment.ownerusername}</span>
              {/* <span className={style["username"]}>{owner?.username}</span> */}
              <span>·</span>
            </div>
            {session.data?.user.id == comment.owner && (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={style.threeDot}
              >
                <g>
                  <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                </g>
              </svg>
            )}
          </div>
          <div className={style.mainTweet}>{comment.body}</div>
          {/* <Button
            onclick={() => {
                router.query.modal = "comment"
                router.push(router)
            }}
            style={{ width: "100px", paddingBlock: ".3rem", marginTop: "1rem" }} >Reply</Button> */}
        </section>
      </div>

      <style jsx>{`
        .main {
          margin-bottom: 1rem;
        }
        .vLine {
          margin-top: auto;
          margin-bottom: auto;
          margin-left: auto;
          margin-right: auto;
          width: 2px;
          height: 70%;
          background-color: #1d9cf05d;
        }
        .comment-header {
          align-items: flex-start;
        }
      `}</style>
    </div>
  );
}
