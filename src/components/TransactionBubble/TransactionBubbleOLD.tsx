import React, { useEffect, useState } from 'react';
import { Transaction } from '../../models/transaction'
import './TransactionBubble.css';

interface BubbleStyle {
    bubbleSize: number;
    amountFontSize: string;
    priceFontSize: string;
    labelSpacing: string
}

const sizeMap: { [key: string]: BubbleStyle } = {
    0.000499: { bubbleSize: 50, amountFontSize: 'text-xs', priceFontSize: 'text-xs', labelSpacing: 'space-y-0' },
    0.000999: { bubbleSize: 75, amountFontSize: 'text-sm', priceFontSize: 'text-xs', labelSpacing: 'space-y-0' },
    0.00499: { bubbleSize: 100, amountFontSize: 'text-lg', priceFontSize: 'text-base', labelSpacing: 'space-y-0.5' },
    0.00999: {bubbleSize: 150, amountFontSize: 'text-xl', priceFontSize: 'text-lg', labelSpacing: 'space-y-1.5' },
    0.09: { bubbleSize: 250, amountFontSize: 'text-2xl', priceFontSize: 'text-xl', labelSpacing: 'space-y-2' },
    0.3: { bubbleSize: 500, amountFontSize: 'text-6xl', priceFontSize: 'text-5xl', labelSpacing: 'space-y-2.5' },
    "0100": { bubbleSize: 750, amountFontSize: 'text-8xl', priceFontSize: 'text7xl', labelSpacing: 'space-y-4' }
}

function TransactionBubble({ transaction = {} as Transaction }) {
    const [canvasWidth, setCanvasWidth] = useState(document.documentElement?.clientWidth || document.body?.clientWidth || 0)
    const [canvasHeight, setCanvasHeight] = useState(document.documentElement?.clientHeight || document.body?.clientHeight || 0)
    const [bubbleStyle, setBubbleStyle] = useState({} as BubbleStyle)
    const [random] = useState(Math.random())
    const [position, setPosition] = useState(0)

    useEffect(() => {
        // Determine size of bubble
        if (transaction != null) {
            for (let cutoffString of Object.keys(sizeMap)) {
                const cutoffAmount = Number.parseFloat(cutoffString)
                if (transaction.amount <= cutoffAmount) {
                    setBubbleStyle(sizeMap[cutoffAmount])
                    break;
                }
            }
        }
    }, [transaction])

    useEffect(() => {
        if (bubbleStyle && bubbleStyle.bubbleSize) {
            let newPosition = (random * canvasWidth)
            if (newPosition + bubbleStyle.bubbleSize > canvasWidth) {
                newPosition -= bubbleStyle.bubbleSize
            } else if (newPosition - bubbleStyle.bubbleSize < 0) {
                newPosition += bubbleStyle.bubbleSize
            }
            setPosition(newPosition)
        }
    }, [bubbleStyle, random, canvasWidth])

    const getWindowSize = () => {
        setCanvasWidth(document.documentElement?.clientWidth || document.body?.clientWidth || 0)
        setCanvasHeight(document.documentElement?.clientHeight || document.body?.clientHeight || 0)
        console.log('canvas:', canvasWidth, 'x', canvasHeight)
    }

    useEffect(() => {
        window.addEventListener('resize', getWindowSize)
        return () => window.removeEventListener('resize', getWindowSize)
    }, [])

    return (
        <div className={`bubble flex flex-col place-items-center justify-center ${bubbleStyle.labelSpacing}`}
            style={{
                left: `${position}px`,
                width: `${bubbleStyle.bubbleSize}px`,
                height: `${bubbleStyle.bubbleSize}px`
            }}>
            <span className={`transaction-amount ${bubbleStyle.amountFontSize}`}>
                {transaction?.amount} {transaction?.coin}
            </span>
            <span className={`transaction-price mt-2 ${bubbleStyle.priceFontSize}`}>
                ${transaction?.price}
            </span>
        </div>
    );
}

export default TransactionBubble;