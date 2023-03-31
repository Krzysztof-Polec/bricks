import Renderer from "./Renderer.js"

class Bricks{
    bricks = []

    constructor({
        numRows = 4,
        numCols = 7,
        brickWidth = 60,
        brickHeight = 20,
        brickGap = 10,
        brickMarginTop = 30,
        brickMarginLeft = 20
    } = {} ){
        this.numRows = numRows
        this.numCols = numCols
        this.brickWidth = brickWidth
        this.brickHeight = brickHeight
        this.brickGap = brickGap
        this.brickMarginTop = brickMarginTop
        this.brickMarginLeft = brickMarginLeft

        this.renderer = Renderer.getInstance()

        this.generateBricks()
    }

    generateBricks = () => {
        for(let rows = 0; rows < this.numCols; rows++){
            this.bricks[rows] = []

            for(let cols = 0; cols < this.numCols; cols++){
                const x = (cols * (this.brickWidth + this.brickGap)) + this.brickMarginLeft

                const y = (rows * (this.brickHeight + this.brickGap)) + this.brickMarginTop
                
                this.bricks[rows][cols] = {
                    x: x,
                    y: y,
                    width: this.brickWidth,
                    height: this.brickHeight,
                    alive: true,
                    color: "#754db8"
                }
            }
        }
    }

    drawAll = () => {
        for(let rows = 0; rows < this.numRows; rows++){
            for(let cols = 0; cols < this.numCols; cols++){
                const b = this.bricks[rows][cols]

                if(b.alive) this.renderer.drawRect(b.x, b.y,b.width, b.height, b.color)
            }
        }
    }

    detectBallCollision = (ball) => {
        for(let rows = 0; rows < this.numRows; rows++){
            for(let cols = 0; cols < this.numCols; cols++){
                const brick = this.bricks[rows][cols]

                if(brick.alive){
                    if(ball.x > brick.x && ball.x < brick.x + brick.width && ball.y > brick.y && ball.y < brick.y + brick.height){
                        ball.brickCollision()

                        brick.alive = false

                        return true
                    } 
                }
            }
        }

        return false
    }

    checkAllBricksDestroyed = () => {
        for(let rows = 0; rows < this.numRows; rows++){
            for(let cols = 0; cols < this.numCols; cols++){
                const b = this.bricks[rows][cols]

                if(b.alive) return false
            }
        }
        
        return true
    }

    restart = () => {
        this.generateBricks()
    }
}

export default Bricks