import React, { useContext } from 'react'
import styles from "./HomeRight.module.css"


import SignUpDiv from '@/components/common/signUpDiv/SignUpDiv'
import Follow from './follow/Follow'

export default function HomeRight() {

    return (
        <section className={styles.right}>

            <div>
                <SignUpDiv></SignUpDiv>
                <Follow></Follow>
                <p>Terms of Service
                    Privacy Policy
                    Cookie Policy
                    Accessibility
                    Ads info
                    More <br />
                    © 2023 Twitter, Inc.</p>
            </div>

        </section>
    )
}
