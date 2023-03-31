import Renderer from "./Renderer.js"
import Ball from "./Ball.js"
import Paddle from "./Paddle.js"
import Bricks from "./Bricks.js"

window.onload = () => game.init()

class Game{
    ballRadius = 10
    score = 0
    lives = 4
    paddleBallHit = 0

    init = () => {
        this.renderer = Renderer.getInstance()
        this.canvas = this.renderer.getCanvas()
        this.context = this.renderer.getContext()

        this.ball = new Ball(this.ballRadius)
        this.paddle = new Paddle()
        this.bricks = new Bricks()

        this.startGame()
    }

    startGame = () => {
        const fps = 60
        setInterval(this.updateGame, 1000 / fps)
    }

    updateGame = () => {
        this.ball.update()

        if(this.ball.checkPaddleCollision(this.paddle)) this.paddleBallHit++
        
        if(this.ball.checkBottomWallCollision()){
            this.lives--
            this.ball.restart()
        }

        if(this.bricks.detectBallCollision(this.ball)) this.score++
        
        if(this.lives <= 0) this.restart()
    
        if(this.bricks.checkAllBricksDestroyed()) this.restart()
        
        this.render()
    }

    render = () => {
        this.renderer.clearCanvas()

        this.bricks.drawAll()
        this.ball.draw()
        this.paddle.draw()

        this.renderer.drawText("Punkty: " + this.score,10, 20, "#754db8", "20px Verdana")

        this.renderer.drawText("Życia: " + this.lives,130, 20, "#754db8", "20px Verdana")    

    }

    restart = () => {
        this.ball.restart()
        this.score = 0
        this.lives = 4
        this.bricks.restart()
    }

}

const game = new Game()