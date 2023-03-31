import Renderer from "./Renderer.js"

class Paddle{
    width = 80
    height = 10
    color = "#754db8"

    constructor(){
        this.renderer = Renderer.getInstance()
        this.canvas = this.renderer.getCanvas()

        this.x = (this.canvas.width - this.width) / 2
        this.y = this.canvas.height - this.height

        this.addListeners()
    }

    addListeners = () => document.addEventListener("mousemove", this.movePaddle)

    movePaddle = (e) => {
        let rect = this.canvas.getBoundingClientRect()
        this.x = e.clientX - rect.left - (this.width / 2)

        this.checkWallCollision()
    }

    checkWallCollision = () => {
        if(this.x < 0) this.x = 0
        if(this.x + this.width > this.canvas.width) this.x = this.canvas.width - this.width
    }

    getRect = () => {
        return {
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.height,
            left: this.x
        }       
    }

    draw = () => this.renderer.drawRect(this.x, this.y,this.width, this.height, this.color) 
}

export default Paddle