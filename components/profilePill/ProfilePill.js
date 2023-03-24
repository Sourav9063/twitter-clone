import React from 'react'
import Avatar from '../common/avatar/avatar'


export default function ProfilePill({ showOption = true, children }) {
    return (
        <div className='pill'>

            <div className="header">
                <Avatar width='60px' image="https://sourav9063.github.io/my_portfolio/static/media/headRS1.aee7abddddb9c68b52c5.png"></Avatar>
                <div className="names">
                    <div className="name" >Sourav</div>
                    <div className="username" >@Sourav</div>
                </div>
                {children}
                {showOption && <svg viewBox="0 0 24 24" aria-hidden="true" className="threeDot hover-effect" ><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                }    </div>


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

                .header {
    display: flex;
    align-items: center;

    justify-content: space-between;
}
.threeDot {
    color: var(--text-color-tertiary);
    fill: inherit;
    width: 25px;
}
.name {
    font-weight: 700;
    /* margin-right: .3rem; */

}

.names>* {
    font-size: 1.2rem;
    margin-right: .3rem;
}
.username {
    color: var(--text-color-tertiary);
}

                ` }</style>
        </div>
    )
}
