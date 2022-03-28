import './Canvas.css'
import { useEffect, useState } from 'react'
import { Transaction } from '../../models/transaction'
import { TransactionBubble } from '../TransactionBubble/TransactionBubble'
import useWindowDimensions from '../../utils/getWindowDimensions'
import Sketch from 'react-p5'
import p5Types from 'p5'

function Canvas({ newTransaction = {} as Transaction, clearNew = () => {} }) {
    const { height, width } = useWindowDimensions()
    const [bubbles, setBubbles] = useState([] as TransactionBubble[])
    const [p5, setP5] = useState()
    const [ctx, setCtx] = useState()

    useEffect(() => {
        if (newTransaction && newTransaction.amount) {
            if (p5 && bubbles.length < 15) {
                const newBubble = new TransactionBubble(newTransaction, p5, ctx, width, height)
                setBubbles([...bubbles, newBubble])
                setTimeout(() => clearNew(), 1000)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTransaction])

    const setup = (p5: any, canvasParentRef: Element) => {
        setP5(p5)
        p5.createCanvas(width, height).parent(canvasParentRef)
        const ctx = p5.canvas.getContext('2d')
        setCtx(ctx)
        p5.frameRate(60);
    }

    const draw = (p5: any) => {
        p5.background(156, 163, 175)

        for (let bubble of bubbles) {
            bubble.draw()
            bubble.update()
        }

        for (let i = bubbles.length-1; i >= 0; i--) {
            if (bubbles[i].isOffscreen()) {
                const bubblesCopy = bubbles
                bubblesCopy.splice(i, 1)
                setBubbles(bubblesCopy)
            }
        }
    }

    return (
        <Sketch setup={setup} draw={draw} />
    );
}

export default Canvas