import React, { useState } from 'react'
import ProfilePill from '../profilePill/ProfilePill'
import { useSession } from 'next-auth/react'
import Button from '../common/button/button'

export default function ProfileMidFollowing({ following, header = "Following", showUnfollow = false }) {
    const session = useSession()
    // useState(initialState)
    const [ followState, setFollowState ] = useState(following)
    return (
        <>
            <h1>{header}</h1>
            {followState.length > 0 ?
                followState.map((follow, index) => {
                    return <ProfilePill margin={"1rem 0 1rem 0"} borderRadius='1rem' showOption={false}
                        // key={follow._id}
                        key={index}
                        data={follow} >
                        {header == "Following" && showUnfollow && <Button

                            onclick={async (e) => {
                                e.stopPropagation()
                                try {

                                    const body = {
                                        owner: session.data.user.id,
                                        who: follow._id,
                                        what: "UNFOLLOW"
                                    }

                                    const res = await fetch("/api/follow", {

                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(body)
                                    })

                                    const result = await res.json();

                                    setFollowState(result.data)
                                    console.log(result)

                                } catch (error) {
                                    console.log(error)
                                }

                            }}
                            style={{ paddingBlock: ".5rem", backgroundColor: "Black", width: "30%" }}

                        >Unfollow</Button>
                        }                    </ProfilePill>
                }) : <div className='no-follow'>No {header}</div>
            }

            <style jsx>{`
                    h1{
                        font-size: 2rem;
                        padding: 1rem;
                    }
                    .no-follow{
                        text-align: center;
                    }

                
                ` }</style>

        </>
    )
}
