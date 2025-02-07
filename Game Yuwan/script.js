function keyCheck(event) {
    var keyCode = event.which;

    if (keyCode == 13) {
        
        if (runAnimationId == 0) {
            runAnimationId = setInterval(boyRun, 100);
            runSoundClip.play();
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
            scoreAnimationId = setInterval(updateScore, 100);

            boxAnimationId = setInterval(moveBoxes, 110);

            backgroundMusic.play();
            
            document.getElementById("startGame").style.visibility = "hidden";
            document.getElementById("startGame2").style.visibility = "hidden";
        }
    }

    if (keyCode == 32) {
        if (jumpAnimationId == 0) {
            clearInterval(runAnimationId);
            runSoundClip.pause();
            jumpAnimationId = setInterval(boyJump, 100);
            jumpSoundClip.play();
            backgroundMusic.play();

            document.getElementById("startGame").style.visibility = "hidden";
            document.getElementById("startGame2").style.visibility = "hidden";
        }
    }
}

var runImgNum = 1;
var runAnimationId = 0;
var runSoundClip = new Audio("run.mp3");
runSoundClip.loop = true;

function boyRun() {

    runImgNum = runImgNum + 1;
    if (runImgNum == 9) {
        runImgNum = 1;
    }
    document.getElementById("boy").src = "Run (" + runImgNum + ").png";

}

var x = 0;
var moveBackgroundAnimationId = 0;

function moveBackground() {

    x = x - 20;

    document.getElementById("backgroundBox").style.backgroundPositionX = x + "px";

}

var score = 0;
var scoreAnimationId = 0;

function updateScore() {

    score = score + 1;

    document.getElementById("score").innerHTML = score;

}

var jumpImgNum = 1;
var jumpAnimationId = 0;
var jumpSoundClip = new Audio("jump.mp3");
var boyMarginTop = 368;

function boyJump() {

    if (jumpImgNum <= 6) {
        boyMarginTop = boyMarginTop - 30;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if (jumpImgNum >= 7) {
        boyMarginTop = boyMarginTop + 30;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    jumpImgNum = jumpImgNum + 1;

    if (jumpImgNum == 13) {
        jumpImgNum = 1;
        clearInterval(jumpAnimationId);
        jumpAnimationId = 0;
        runAnimationId = setInterval(boyRun, 100);
        runSoundClip.currentTime = 0;
        runSoundClip.play();

        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
        }

        if (scoreAnimationId == 0) {
            scoreAnimationId = setInterval(updateScore, 100);
        }

        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(moveBoxes, 100);
        }
    }

    document.getElementById("boy").src = "Jump (" + jumpImgNum + ").png"
}

var boxMarginLeft = 300;

function createBoxes() {
    for (var i = 0; i < 100; i++) {
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if (i <= 59) {
            boxMarginLeft = boxMarginLeft + 800;
        }

        if (i >= 60) {
            boxMarginLeft = boxMarginLeft + 500;
        }

        box.style.marginLeft = boxMarginLeft + "px";
        document.getElementById("backgroundBox").appendChild(box);
    }
}

var boxAnimationId = 0;
var boxPassSoundClip = new Audio("boxpass.mp3")

function moveBoxes() {
    for (var i = 0; i < 100; i++) {
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        box.style.marginLeft = newMarginLeft + "px";

        //160 - 0
        if (newMarginLeft >= 80 & newMarginLeft <= 160) {

            if (boyMarginTop > 318) {

                clearInterval(runAnimationId);
                runSoundClip.pause();
                runAnimationId = -1;

                clearInterval(jumpAnimationId);
                jumpSoundClip.pause();
                jumpAnimationId = -1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;

                clearInterval(scoreAnimationId);
                scoreAnimationId = -1;

                clearInterval(boxAnimationId);
                boxAnimationId = -1;

                deadAnimationID = setInterval(boyDead, 100);
                deadSoundClip.play();

                backgroundMusic.pause();
            }

            if (boyMarginTop < 318) {

                boxPassSoundClip.play();

            }
        }
    }
}

var deadImgNum = 0;
var deadAnimationID = 0;
var deadSoundClip = new Audio("dead.mp3");

function boyDead() {
    deadImgNum = deadImgNum + 1;

    if (deadImgNum == 9) {
        deadImgNum = 8;
    }

    document.getElementById("boy").src = "Dead (" + deadImgNum + ").png";
    document.getElementById("boy").style.marginTop = "368px";
    document.getElementById("endGame").style.visibility = "visible";
    document.getElementById("endGame2").style.visibility = "visible";
    document.getElementById("endScore").innerHTML = score + " points";
}

var backgroundMusic = new Audio("bgMusic.mp3");
backgroundMusic.loop = true;

function reload() {
    location.reload();
}
