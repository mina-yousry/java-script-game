
gameOn = false;
var firstTime = true;
var increaseSpeed = true;
sharkSpeed = 20;
score = 0;
addition = 1;
sharkLeft = 50;
sharkDirection = "right";
var xPoints = [];
var audio = new Audio('Produce.wav');
var chew = new Audio('chew.wav');

function moveImage(event) {

    if (gameOn) {
        var direction = "right";
        var fish = document.getElementById("fish");
        var ball = document.getElementById("ball");
        var ballDimension = ball.getBoundingClientRect();
        var fishDimension = fish.getBoundingClientRect();
        fish.style.left = event.clientX;
        fish.style.top = event.clientY - 30;
        xPoints.push(event.clientX);
        if (xPoints[xPoints.length - 1] - xPoints[xPoints.length - 2] > 0) {
            document.getElementById("fish").src = "fishRight.png";
            direction = "right";
        }

        if (xPoints[xPoints.length - 1] - xPoints[xPoints.length - 2] < 0) {
            document.getElementById("fish").src = "fish.png";
            direction = "left";
        }
        checkEat(ballDimension, fishDimension, direction);
    }


}


function checkEat(ballDimension, fishDimension, direction) {

    if ((fishDimension.right >= ballDimension.left && fishDimension.right <= ballDimension.right) && (ballDimension.top >= fishDimension.top && ballDimension.bottom <= fishDimension.bottom)) {
        chew.play();
        ballLeft = Math.floor(Math.random() * window.innerWidth - 40);
        if (ballLeft <= 0) {
            ballLeft = 100;
        }
        ball.style.left = ballLeft;
        ballTop = Math.floor(Math.random() * window.innerHeight - 40);
        if (ballTop <= 0) {
            ballTop = 100;
        }
        ball.style.top = ballTop;
        score = score + addition;
        document.getElementById("score").innerHTML = "Score : " + score;
    }

    if ((fishDimension.left >= ballDimension.left && fishDimension.left <= ballDimension.right) && (ballDimension.top >= fishDimension.top && ballDimension.bottom <= fishDimension.bottom)) {
        chew.play();
        ballLeft = Math.floor(Math.random() * window.innerWidth - 40);
        if (ballLeft <= 0) {
            ballLeft = 100;
        }
        ball.style.left = ballLeft;
        ballTop = Math.floor(Math.random() * window.innerHeight - 40);
        if (ballTop <= 0) {
            ballTop = 100;
        }
        ball.style.top = ballTop;
        score = score + addition;
        document.getElementById("score").innerHTML = "Score : " + score;
    }
}


function moveShark() {
    var shark = document.getElementById("shark");
    var sharkDimension = shark.getBoundingClientRect();

    if (sharkDimension.right >= window.innerWidth - 10) {
        sharkDirection = "left";
        document.getElementById("shark").src = "sharkLeft.png";
        document.getElementById("shark").style.top = Math.floor(Math.random() * window.innerHeight - 100);
    }
    if (sharkDimension.left <= 0) {
        sharkDirection = "right";
        document.getElementById("shark").src = "shark.png";
        document.getElementById("shark").style.top = Math.floor(Math.random() * window.innerHeight - 100);
    }

    if (sharkDirection === 'right') {
        sharkLeft = sharkLeft + 10;
    }
    if (sharkDirection === 'left') {
        sharkLeft = sharkLeft - 10;
    }

    shark.style.left = sharkLeft;

    if (score % 20 == 0 && score != 0 && increaseSpeed == true) {
        sharkSpeed = sharkSpeed - 5;
        increaseSpeed = false;
    }
    if (score % 18 == 0 && score != 0 && increaseSpeed == false) {
        increaseSpeed = true;
    }
    sharkEatFish();
    if (gameOn) {
        setTimeout(moveShark, sharkSpeed);
    }
}

function onTimer() {
    audio.play();
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    var fishStart = document.getElementById("fish");
    var sharkStart = document.getElementById("shark");
    var startButton = document.getElementById("btnStart");
    startButton.style.display = 'none';
    fishStart.style.left = 10;
    fishStart.style.top = 500;
    sharkStart.style.left = 1000;

    gameOn = true;
    if (firstTime) {
        firstTime = false;
        score = 0;
        document.getElementById("score").innerHTML = "Score : " + score;
        document.getElementById('timer').innerHTML = 03 + ":" + 00;
        startTimer();
        if (gameOn) {
            moveShark();
        }
    }
}

function GenerateMyDiv(msg) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    modal_bodyObj = modal.children[0].children[1];
    modal_bodyObj.innerText = msg;
}

function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        gameOn = false;
        GenerateMyDiv("Time Out\nScore : " + score);
        firstTime = true;
    }

    if (gameOn) {
        document.getElementById('timer').innerHTML = m + ":" + s;
        setTimeout(startTimer, 1000);
    }
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
}

function sharkEatFish() {
    var fishEaten = document.getElementById("fish");
    var sharkEat = document.getElementById("shark");
    var fishEatenDimension = fishEaten.getBoundingClientRect();
    var sharkDimension = sharkEat.getBoundingClientRect();

    if ((sharkDimension.right >= fishEatenDimension.left && sharkDimension.right <= fishEatenDimension.right) && (fishEatenDimension.top >= sharkDimension.top && fishEatenDimension.bottom <= sharkDimension.bottom)) {
        gameOn = false;
        firstTime = true;
        sharkSpeed = 30;
        document.getElementById('timer').innerHTML = 03 + ":" + 00;
        GenerateMyDiv("Game Over\nScore : " + score);
        audio.pause();
        audio.currentTime = 0;
    }

    if ((sharkDimension.left >= fishEatenDimension.left && sharkDimension.left <= fishEatenDimension.right) && (fishEatenDimension.top >= sharkDimension.top && fishEatenDimension.bottom <= sharkDimension.bottom)) {
        gameOn = false;
        firstTime = true;
        sharkSpeed = 30;
        document.getElementById('timer').innerHTML = 03 + ":" + 00;
        GenerateMyDiv("Game Over\nScore : " + score);
        audio.pause();
        audio.currentTime = 0;
    }

}