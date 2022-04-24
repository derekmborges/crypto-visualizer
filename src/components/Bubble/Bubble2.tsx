import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from 'react-spring';
import { useAppDispatch } from "../../hooks";
import { removeTransaction } from "../../state/transactionsSlice";

function Bubble2({
    id = '',
    amount = 0,
    coin = '',
    canvasWidth = 1000,
    canvasHeight = 1000,
}) {
    const dispatch = useAppDispatch()
    const [animate, setAnimate] = useState(false)
    const randX = useRef(Math.random() * canvasWidth)
    const size = useRef(200 * (1 + amount))

    const onRest = () => {
        console.log(id, 'completed')
        dispatch(removeTransaction(id))
    }

    const { transform } = useSpring({
        from: {
            transform: `translate3d(${randX.current}px, -${size.current}px, 0px)`
        },
        to: {
            transform: `translate3d(${randX.current}px, ${canvasHeight}px, 0px)`
        },
        config: {
            duration: 8000 + (size.current * 4)
        },
        onRest
    })

    useEffect(() => {
        setAnimate(true)
        setTimeout(onRest, 10000)
    }, [])

    return animate ? (
        <animated.svg
            aria-roledescription={id}
            style={{ transform }}
            xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 128 128'
            width={`${size.current}px`} height={`${size.current}px`}>
            <defs>
                <radialGradient
                    id='radialGradient4470'
                    cx='5.814'
                    cy='42.526'
                    r='49.214'
                    gradientTransform='matrix(1.7539 0 0 1.6958 2.817 -25.281)'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop offset='0' stopColor='#d5f6ff'></stop>
                    <stop offset='0.337' stopColor='#0cf'></stop>
                    <stop offset='0.714' stopColor='#d4f6ff'></stop>
                    <stop offset='1' stopColor='#00aad4'></stop>
                </radialGradient>
                <radialGradient
                    id='radialGradient4472'
                    cx='33.549'
                    cy='20.564'
                    r='49.214'
                    gradientTransform='matrix(2.5937 0 0 2.4304 -53.447 -27.171)'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop offset='0' stopColor='#fff'></stop>
                    <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                    id='radialGradient4474'
                    cx='5.814'
                    cy='42.526'
                    r='49.214'
                    gradientTransform='matrix(1.7539 0 0 1.6958 2.817 -25.281)'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop offset='0' stopColor='#c0dde6'></stop>
                    <stop offset='0.337' stopColor='#00b8e6'></stop>
                    <stop offset='0.714' stopColor='#bfdde6'></stop>
                    <stop offset='1' stopColor='#0099bf'></stop>
                </radialGradient>
            </defs>
            <g transform='translate(0 -924.36)'>
                <g
                    fillRule='evenodd'
                    opacity='0.57'
                    transform='translate(30.723 381.89) scale(.93829)'
                >
                    <path
                        fill='url(#radialGradient4470)'
                        d='M83.728 71.585c0 27.18-22.034 49.214-49.214 49.214S-14.7 98.765-14.7 71.585 7.334 22.371 34.514 22.371s49.214 22.034 49.214 49.214z'
                        transform='translate(0 572.36)'
                    ></path>
                    <path
                        fill='url(#radialGradient4472)'
                        d='M83.728 71.585c0 27.18-22.034 49.214-49.214 49.214S-14.7 98.765-14.7 71.585 7.334 22.371 34.514 22.371s49.214 22.034 49.214 49.214z'
                        transform='matrix(.52922 0 0 .29221 15.609 592.19)'
                    ></path>
                    <path
                        fill='url(#radialGradient4474)'
                        d='M65.062 33.031c8.906 8.906 14.406 21.222 14.406 34.812 0 27.18-22.038 49.219-49.219 49.219-11.434 0-21.926-3.927-30.281-10.469 8.887 8.769 21.06 14.219 34.531 14.219 27.18 0 49.219-22.038 49.219-49.219 0-15.629-7.296-29.547-18.656-38.562z'
                        transform='translate(0 572.36)'
                    ></path>
                </g>
            </g>
            <text x="50%" y="50%" fontSize='0.5em'
                dominantBaseline="middle" textAnchor="middle">
                {amount} {coin}
            </text>
        </animated.svg>
    ) : <></>;
}

export default Bubble2;
