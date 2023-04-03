import React, { useContext } from "react";
import styles from "./HomeRight.module.css";

import SignUpDiv from "@/components/common/signUpDiv/SignUpDiv";
import Follow from "./follow/Follow";
import { useSession } from "next-auth/react";
import RecentLiked from "./RecentLiked";
import PostOption from "./postOption/PostOption";

export default function HomeRight({show="Follow",children}) {
  const session = useSession();
  console.log(show)
  return (
    <section className={styles.right}>
      <div>
        {session.status != "authenticated" ? (
          <SignUpDiv></SignUpDiv>
        ) : (
           
        show=="Follow" &&  <Follow></Follow>
        )}
  {children}

        {session.status == "authenticated" && <RecentLiked></RecentLiked>}
        <p>
          Terms of Service Privacy Policy Cookie Policy Accessibility Ads info
          More <br />© 2023 Twitter, Inc.
        </p>
      </div>
    </section>
  );
}
