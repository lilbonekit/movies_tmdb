import React from 'react';

const Spinner = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
                'display': 'block',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)'
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

export default Spinner;
