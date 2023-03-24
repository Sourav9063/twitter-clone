import React from 'react'

export default function Or({ text = "Or" }) {
    return (
        <div className='or'>

            <div></div>
            <p>{text}</p>
            <div></div>

            <style jsx>{`
            
            .or{
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                justify-content: center;
                align-items: center;
            }
            .or>div{
                background-color: var(--border-color-2);
                height: 1px;
                width: 100%;

            }
            .or>p{
                font-size: 1rem;
                margin-inline: .5rem;
            }
            
            ` }</style>
        </div>
    )
}
