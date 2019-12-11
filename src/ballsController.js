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


    checkBallsAction(){
        for (let index = 0; index < balls.length; index++) {
            if(balls[index].movement.x > 0 || balls[index].movement.x < 0 || balls[index].movement.z > 0 || balls[index].movement.z < 0 ){
                return true;
            }
        }
        return false;
    }
    
}