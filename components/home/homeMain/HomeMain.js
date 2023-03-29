import React, { useContext } from 'react'
import Tweet from '@/components/tweet/tweet'
import style from "./HomeMain.module.css"
import Post from '@/components/common/post/post'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SelectedTweetContext } from '@/providers/SelectedTweet'

export default function HomeMain({ posts }) {
    const router = useRouter()
    const [ , setTweet ] = useContext(SelectedTweetContext);
    // 
    return (
        <section className={style.main}
        // style={{ borderInline: "1px solid var( --border-color)" }}
        >
            <div>
                <div className={style.glassPortion}>
                    <h1>Home</h1>
                </div>
                {/* <div style={{
                    height: "100px"
                }}></div> */}
                <Post></Post>
                {posts.map((tweet, index) => <div key={tweet._id} onClick={() => {

                    setTweet(tweet);

                    router.push({
                        pathname: router.pathname + "posts/" + tweet._id,


                    });


                }} >
                    <Tweet tweet={tweet}></Tweet>
                </div>)}

            </div>

        </section>
    )
}



























// const tweet = {
//     name: "name",
//     username: "@username",
//     tweet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quod eum repudiandae amet? Voluptatem amet quod quae repellendus ea repellat! Adipisci accusamus quam nesciunt ea dolorem deserunt recusandae cum optio ad tempora ut minus repellendus, quaerat cumque id quo ab saepe? A harum consectetur suscipit itaque soluta perferendis eligendi earum.",
//     day: "10d",
//     image: "https://sourav9063.github.io/my_portfolio/static/media/headLS1.685d407d113157028b1e.png",
//     likes: 10,
//     comments: 30,

// }

// const tweet2 = {
//     name: "name",
//     username: "@username",
//     tweet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quod eum repudiandae amet? Voluptatem amet quod quae repellendus ea repellat! Adipisci accusamus quam nesciunt ea dolorem deserunt recusandae cum optio ad tempora ut minus repellendus, quaerat cumque id quo ab saepe? A harum consectetur suscipit itaque soluta perferendis eligendi earum.",
//     day: "10d",
//     image: "https://sourav9063.github.io/my_portfolio/static/media/headLS1.685d407d113157028b1e.png",
//     likes: 10,
//     comments: 30,
//     tweetImg: "https://user-images.githubusercontent.com/53114581/118112856-61972c00-b407-11eb-8004-1f516bbf91f4.png"

// }

// const tweet3 = {
//     name: "name",
//     username: "@username",
//     tweet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quod eum repudiandae amet? Voluptatem amet quod quae repellendus ea repellat! Adipisci accusamus quam nesciunt ea dolorem deserunt recusandae cum optio ad tempora ut minus repellendus, quaerat cumque id quo ab saepe? A harum consectetur suscipit itaque soluta perferendis eligendi earum.",
//     day: "10d",
//     image: "https://sourav9063.github.io/my_portfolio/static/media/headLS1.685d407d113157028b1e.png",
//     likes: 10,
//     comments: 30,
//     tweetImg: "https://user-images.githubusercontent.com/53114581/148637656-447cdf3b-5267-4e43-99aa-7fb7237184b9.png"

// }


// const tweets = [ tweet, tweet2, tweet3, tweet, tweet2, tweet3, tweet, tweet2, tweet3, tweet, tweet2, tweet3, tweet, tweet2, tweet3, tweet, tweet2, tweet3, ]
