function Ball() {
    this.id = "ball";
    this.x = ((document.body.getBoundingClientRect().width)-64)/2;
    this.y = ((document.body.getBoundingClientRect().height)-64)/2;
    this.vx = 24;
    this.vy = 24;
}

function Paddle(id, x) {
    this.id = id;
    this.x = x;
    this.y= 0;
}

function Buttons() {
    this.p1_up = false;
    this.p1_down = false;
    this.p2_up = false;
    this.p2_down = false;
}

function place_objects(objects) {
    for(let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}

function update() {
    paddle1.x = 0;
    paddle2.x = document.body.getBoundingClientRect().width-24;
    document.getElementById("scores").innerHTML =score_p1 + " - " + score_p2;
    

    if ( ball.y<0 || ball.y>((document.body.getBoundingClientRect().height)-64) ) {
        ball.vy = -ball.vy;
    }
    
    if ( (ball.x+32<24 && (ball.y+32>paddle1.y && ball.y+32<paddle1.y+192)) || (ball.x+32>document.body.getBoundingClientRect().width-24 && (ball.y+32>paddle2.y && ball.y+32<paddle2.y+192)) ) {
        ball.vx = -ball.vx;
    }
    else if ( ball.x<0 ) {
        score_p2 += 1;
        ball.x = ((document.body.getBoundingClientRect().width)-64)/2;
        ball.y = ((document.body.getBoundingClientRect().height)-64)/2;
        var random1 = Math.random() * (Math.PI/2) + (-Math.PI/4);
        //ball.vx = 24;
        ball.vy = Math.sin(random1)/Math.cos(random1)*24;
    }
    else if ( ball.x>((document.body.getBoundingClientRect().width)-64) ) {
        score_p1 += 1;
        ball.x = ((document.body.getBoundingClientRect().width)-64)/2;
        ball.y = ((document.body.getBoundingClientRect().height)-64)/2;
        var random2 = Math.random() * (Math.PI/2) + (3*Math.PI/4);
        //ball.vx = 24;
        ball.vy = Math.sin(random2)/Math.cos(random2)*24;
    }

    ball.x += ball.vx;
    ball.y += ball.vy;
    

    if ( buttons.p1_up && (paddle1.y>0) ) {
        paddle1.y -= 20;
    }
    if ( buttons.p1_down && (paddle1.y<document.body.getBoundingClientRect().height-192) ) {
        paddle1.y += 20;
    }
    if ( buttons.p2_up && (paddle2.y>0) ) {
        paddle2.y -= 20;
    }
    if ( buttons.p2_down && (paddle2.y<document.body.getBoundingClientRect().height-192) ) {
        paddle2.y += 20;
    }

    
    place_objects([ball, paddle1, paddle2]);
}

let ball;
let paddle1;
let paddle2;
score_p1 = 0;
score_p2 = 0;

function init() {
    ball = new Ball();
    paddle1 = new Paddle("paddle1", 0);
    paddle2 = new Paddle("paddle2", document.body.getBoundingClientRect().width-24);
    setInterval(update, 100);
}

let buttons = new Buttons();
function track_player_input(event) {
    if(event.type == "keydown") {
        switch(event.key) {
            case "a": buttons.p1_up = true; break;
            case "q": buttons.p1_down = true; break;
            case "p": buttons.p2_up = true; break;
            case "m": buttons.p2_down = true; break;
        }
    } else if(event.type == "keyup") {
        switch(event.key) {
            case "a": buttons.p1_up = false; break;
            case "q": buttons.p1_down = false; break;
            case "p": buttons.p2_up = false; break;
            case "m": buttons.p2_down = false; break;
        }
    }    
}

document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);



init();




