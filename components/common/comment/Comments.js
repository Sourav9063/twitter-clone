import React, { useEffect, useState } from "react";
import Avatar from "../avatar/avatar";
import CommentBox from "@/components/modalComponents/CommentBox";
import style from "../../tweet/tweet.module.css";
import CommentUI from "@/components/common/comment/Comment";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export default function Comments({ comment }) {
  const owner = comment.owner;
  console.log(comment);
  const session = useSession();
  const router = useRouter();
  const url = "/api/comments/" + comment._id;

  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    // fetch comments from "api/comments/"+comment._id

    async function getNodes() {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.comments) {
          setNodes(data.comments.nodes);
        }
      } catch (e) {}
    }

    getNodes();

    return () => {};
  }, [router, url]);

  return (
    <div className="main">
      <div className={style.tweet} key={comment._id}>
        <section className={style.image}>
          <Avatar width="40px" image={owner?.image}></Avatar>
          {nodes.length > 0 && (
            // <svg viewBox="0 0 24 24" aria-hidden="true" className={style.threeDot} ><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
            //  svg vertical line with color var(--border-color)
            <div className="vLine"></div>
          )}
        </section>
        <section className={style.body}>
          <div className={style["header"]}>
            <div className={style.names}>
              <span className={style["name"]}>{owner?.username}</span>
              <span className={style["username"]}>{owner?.username}</span>
              <span>·</span>
            </div>
            {session.data?.user.id == owner._id && (
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
          {nodes.length > 0 && (
            <div className="replies">
              {nodes.map((node) => {
                return <CommentUI key={node._id} comment={node} />;
              })}
            </div>
          )}
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
          width: 1.5px;
          height: 100%;
          background-color: #1d9cf034;
        }
      `}</style>
    </div>
  );
}
