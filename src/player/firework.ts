import { Maze } from "../maze/maze";
import { Player } from "./player";

class Firework {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: { x: number; y: number };
    gravity: number;
    opacity: number;
    maxOpacity: number;
    life: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        this.velocity = {
            x: Math.random() * 50 - 30,
            y: Math.random() * -100 - 100
        };
        this.gravity = 10;
        this.opacity = 1;
        this.maxOpacity = 1;
        this.life = 100;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x , this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.opacity = Math.max(0, (this.life / this.maxOpacity));
        this.life -= 2;
    }

    isAlive() {
        return this.life > 0;
    }
}

export { Firework };
