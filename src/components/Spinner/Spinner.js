import React from 'react';

const Spinner = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
                display: 'block',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '999999999'
            }}
            width="200px"
            height="200px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <path d="M5 50A45 45 0 0 0 95 50A45 47 0 0 1 5 50" fill="#f40c2b" stroke="none">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="1s"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    values="0 50 51;360 50 51"
                ></animateTransform>
            </path>
        </svg>
    );
};

export const SpinnerWithOverlay = () => {
    return(
        <div style={{
            position: 'fixed', 
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.2)',
            zIndex: '123213213'}}>
        <Spinner/>
        </div>
    )
}

export default Spinner;
