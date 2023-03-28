import React from 'react'
import Avatar from '../common/avatar/avatar'


export default function ProfilePill({ showOption = true, children, data = { username: "sourav", email: "@sourav", image: "https://sourav9063.github.io/my_portfolio/static/media/headRS1.aee7abddddb9c68b52c5.png" } }) {
    return (
        <div className='pill'>


            <Avatar width='60px' image={data.image}></Avatar>
            <div className="names">
                <div className="name" >{data.username}</div>
                <div className="username" >{data.email}</div>
            </div>
            {children}
            {showOption && <svg viewBox="0 0 24 24" aria-hidden="true" className="threeDot hover-effect" ><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
            }



            <style jsx>{`
                .pill{
                    padding: .5rem;  
               border-radius: 1000px;
               position: relative;
               bottom: 0;
    
                }
                .pill:hover{
                    background-color: var( --hover-secondary-trans-color);
                }

                .pill {
    display: flex;
    align-items: center;

    justify-content: space-between;
    align-content: flex-start;
}
.threeDot {
    color: var(--text-color-tertiary);
    fill: inherit;
    width: 25px;
}
.names {
    font-weight: 500;
    width: 60%;
margin-inline: .3rem;

}

.names>* {
    font-size: 1.2rem;

    font-size: clamp(16px, 1.2em, 24px); /* set the font size using clamp */
  overflow: hidden; /* hide any overflow text */
  text-overflow: ellipsis; /* add ellipsis to indicate truncated text */
  white-space: nowrap;

}
.username {
    color: var(--text-color-tertiary);
}

                ` }</style>
        </div>
    )
}
