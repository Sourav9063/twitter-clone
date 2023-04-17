import React, { useEffect, useState } from "react";
import style from "./Message.module.css";
import styleList from "../messageList/MessageList.module.css";
import Loader from "@/components/common/loader/Loader";
import { getUserbyEmailorID } from "@/helper/helperFunc/frontEnd";
import Avatar from "@/components/common/avatar/avatar";
export default function Messages({ _id, email }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await getUserbyEmailorID(null, _id);
      console.log(profile);
      setProfile(profile);
    };
    getProfile();
    return () => {};
  }, []);

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
