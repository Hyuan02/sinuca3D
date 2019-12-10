var balls = [];
var whiteBall;

export default class BallsController{
    constructor(){
        this.balls = balls;
        this.whiteBall = whiteBall; 
    }

    updateBalls(ball){
        balls.push(ball);
        this.balls = balls;
        if(ball.whiteBall){
            whiteBall = ball;
            this.whiteBall = ball;
        }
    }
    
}