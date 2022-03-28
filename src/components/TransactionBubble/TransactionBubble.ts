import p5Types from 'p5';
import { Transaction } from '../../models/transaction';

export class TransactionBubble {
    t: Transaction
    p5: p5Types
    ctx: any
    h: number
    x: number
    xCap: number
    y: number
    velocity: number
    r: number
    a: number
    
    constructor(
        t: Transaction,
        p5: p5Types,
        ctx: any,
        worldWidth: number,
        worldHeight: number
    ) {
        this.t = t
        this.p5 = p5
        this.ctx = ctx
        this.r = p5.map(t.amount, 0.000001, 0.1, 75, 600)
        this.h = worldHeight
        this.x = p5.random(this.r, worldWidth-this.r)
        this.xCap = 4
        this.y = p5.random(-this.r, -this.r * 2)
        this.velocity = 0.7
        this.a = 0
    }

    draw() {
        // Circle
        this.ctx.shadowColor = 'gray';
        this.ctx.shadowBlur = 15;
        this.p5.noStroke()
        this.p5.fill(249, 250, 251, 77) // #F9FAFB 30%
        this.p5.ellipse(this.x, this.y, this.r, this.r)
        
        // Text
        this.p5.fill(75, 85, 99) // 4B5563
        this.p5.textSize(this.r * 0.10)
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER)
        const formattedAmount = parseFloat(this.t.amount.toFixed(4))
        const label = `${formattedAmount > 0 ? formattedAmount : '<0.0000'} ${this.t.coin}`
        this.p5.text(label, this.x, this.y)
    }

    update() {
        // Move down
        this.y += this.velocity

        // Move side-to-side
        this.x += this.p5.map(this.p5.sin(this.a), -1, 1, -this.xCap, this.xCap)
        this.a -= 0.1
    }

    isOffscreen() {
        return this.y > this.h + this.r;
    }
}
