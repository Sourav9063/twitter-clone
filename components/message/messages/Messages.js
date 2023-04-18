import React, { useEffect, useState } from "react";
import style from "./Message.module.css";
import styleList from "../messageList/MessageList.module.css";
import Loader from "@/components/common/loader/Loader";
import { getUserbyEmailorID } from "@/helper/helperFunc/frontEnd";
import Avatar from "@/components/common/avatar/avatar";
export default function Messages({ _id, email }) {
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const profile = await getUserbyEmailorID(null, _id);
      console.log(profile);
      setProfile(profile);
    };
    getProfile();
    return () => {};
  }, []);

  const handleSendMsg = async (e) => {
    e.preventDefault();
    const msg = e.target.value;
    setMessages(msg);
    
  }

  return (
    <section className={style.messages}>
      {profile ? (
        profile.user ? (
          <>
            <div className={styleList.glassPortion}>
              <div className={styleList.header}>
                {profile.user && <h3>{profile.user.username} </h3>}
              </div>
            </div>
            <section className={style.description}>
              <Avatar image={profile.user.image}></Avatar>
              <div className={style.name}>{profile.user.username}</div>
              <p className={style.email}>@{profile.user.email}</p>
              <p>{profile.user.bio}</p>
              {profile.user.createdAt && (
                <p>Joined {profile.user.createdAt.slice(0, 10)}</p>
              )}
            </section>

            <div className={style.chatsContainer}>
              <div className={style.msgOwn}>
                Lorem ipsum dolor sit amet consectetur
              </div>
              <span className={style.msgTimeOwn}>11:44PM</span>
              <div className={style.msgOther}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                possimus.
              </div>
              <span className={style.msgTimeOther}>11:44PM</span>
              {/* 2 */}
              <div className={style.msgOwn}>
                Lorem ipsum dolor sit amet consectetur
              </div>
              <span className={style.msgTimeOwn}>11:44PM</span>
              <div className={style.msgOther}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                possimus.
              </div>
              <span className={style.msgTimeOther}>11:44PM</span>
              {/* 3 */}
              <div className={style.msgOwn}>
                Lorem ipsum dolor sit amet consectetur
              </div>
              <span className={style.msgTimeOwn}>11:44PM</span>
              <div className={style.msgOther}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                possimus.
              </div>
              <span className={style.msgTimeOther}>11:44PM</span>
            </div>
            <div className={style.input}>
              <svg
                className={style.picSVG}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <g>
                  <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                </g>
              </svg>
              <textarea
                placeholder="Start a new message"
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => {
                  setMessages(e.target.value);
                }}
              ></textarea>
              <div className="" onClick={handleSendMsg}>
                <svg
                  className={style.picSVG}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div>{profile.msg}</div>
        )
      ) : (
        <Loader />
      )}
    </section>
  );
}
