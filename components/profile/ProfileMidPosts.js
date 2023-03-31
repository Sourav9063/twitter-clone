import React from 'react'
import Tweet from '../tweet/tweet';

export default function ProfileMidPosts({ posts }) {
    return (
        <>  {
            posts.map((tweet, index) => <div key={tweet._id} onClick={() => {

                // setTweet(tweet);

                router.push({
                    pathname: '/' + "posts/" + tweet._id,


                });


            }} >
                <Tweet tweet={tweet}></Tweet>
            </div>)
        }
        </>
    )
}
