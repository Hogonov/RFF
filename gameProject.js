var pjs = new PointJS('2d', 2000, 400);
pjs.system.initFullPage();

var vector = pjs.vector;
var log = pjs.system.log;
var game = pjs.game;
var point = vector.size;
var brush = pjs.brush;
var OOP = pjs.OOP;
var key = pjs.keyControl;//.initKeyControl();
var mouse = pjs.mouseControl;
var touch = pjs.touchControl;
mouse.initMouseControl();
touch.initTouchControl();

var height = game.getWH().h;
var width = game.getWH().w;


var fon1 = game.newImageObject({
    file: "image/fon.jpg",
    x: 0, y: 0,
    h: height,
    onload: function () {
        fon2.x = fon1.x + fon1.w;
        fon3.x = fon1.x + fon1.w + fon1.w;
    }
});

var fon2 = game.newImageObject({
    file: "image/fon.jpg",
    x: 0, y: 0,
    h: height
});

var fon3 = game.newImageObject({
    file: "image/fon.jpg",
    x: 0, y: 0,
    h: height
});

var fonM = game.newImageObject({
    file: "image/fonMenu.JPG",
    x: 0, y: 0,
    w: width, h: height

});

var face = game.newImageObject({
    file: 'image/logo.png',
    x: width / 2, y: height / 2,
    h: height / 2,
    angle: 1,
    onload: function () {
        face.x = width / 2.3;
        face.y = height / 3.5;
    }
});
pjs.keyControl.setInputMode( true );

const Y_TEXT = height / 2;
var colorTextRecords = "#a6ff2f";
var colorTextPlay = "#a6ff2f";
var colorTextInformation = "#a6ff2f";
var colorTextBack = "#a6ff2f";
var colorTextAccept = "#a6ff2f";
var shadowPlay = 'green';
var shadowRecords = 'green';
var shadowInf = 'green';
var shadowBack = 'green';
var shadowAccept = 'green';
var angleFace = 1;
var positionInfWin = width * 1.5;

var nockFace = 1;
var musicMenu;

var positionPlayX = width / 2 - width / 14;
var positionRecordsX = width / 2 - width / 8;
var positionInfX = width / 2 - width / 6;
var positionBack = width * 2;
var positionRecordsWin = positionInfWin;
var positionEnterText = positionInfWin;
var positionAccept = width * 2;
var textByPlayer = "Martha";

var probability;
var namePlayer;

// ***Menu***
game.newLoop('menu', function () {
    fonM.draw();
    face.draw();
    if (nockFace == 1) {
        nockFace = pjs.wAudio.newAudio("audio/stroke.mp3", 0.3);
        musicMenu = pjs.wAudio.newAudio("audio/menu.mp3", 0.5);
    }
    musicMenu.play();

    if (face.x + face.w / 15 < 0) {
        nockFace.stop();
        nockFace.play();
        x = pjs.math.random(0, 4, true);
        angleFace = pjs.math.random(-2, 2, true);
    }
    else if (face.x + face.w > width + face.w / 20) {
        nockFace.stop();
        nockFace.play();
        x = pjs.math.random(-4, 0, true);
        angleFace = pjs.math.random(-2, 2, true);
    }
    else if (face.y + face.h / 10 < 0) {
        nockFace.stop();
        nockFace.play();
        y = pjs.math.random(0, 4, true);
        angleFace = pjs.math.random(-2, 2, true);
    }
    else if (face.y + face.h > height + face.h / 10) {
        nockFace.stop();
        nockFace.play();
        y = pjs.math.random(-4, 0, true);
        angleFace = pjs.math.random(-2, 2, true);
    }

    face.move(vector.point(x, y));
    face.angle += angleFace;

    var name = game.newTextObject({
        x: width / 2 - width / 3.3, y: height / 25,
        text: "Ground Runner",
        color: "#a6ff2f",
        size: width / 10,
        style: "bold",
        font: "font1"
    });

    var play = game.newTextObject({
        x: positionPlayX, y: Y_TEXT - width / 28,
        text: "Play",
        size: width / 14,
        color: colorTextPlay,
        style: "bold",
        font: "font1"
    });


    var records = game.newTextObject({
        x: positionRecordsX, y: Y_TEXT + width / 20,
        text: "Records",
        color: colorTextRecords,
        size: width / 14,
        style: "bold",
        font: "font1"
    });

    var information = game.newTextObject({
        x: positionInfX, y: Y_TEXT + width / 7.5,
        text: "Information",
        color: colorTextInformation,
        size: width / 14,
        style: "bold",
        font: "font1"
    });

    var back = game.newTextObject({
        x: positionBack + width / 6, y: Y_TEXT + width / 7.5,
        text: "Back",
        size: width / 14,
        color: colorTextBack,
        style: "bold",
        font: "font1"
    });

  /*  var accept = game.newTextObject({
        x: positionAccept + width / 7, y: Y_TEXT + height / 8,
        text: "Accept",
        size: width / 14,
        color: colorTextAccept,
        style: "bold",
        font: "font1"
    });*/

    name.setShadow({
        shadowColor: "green",
        shadowBlur: 3,
        shadowX: 5,
        shadowY: 5
    });

    play.setShadow({
        shadowColor: shadowPlay,
        shadowBlur: 3,
        shadowX: 5,
        shadowY: 5
    });

    records.setShadow({
        shadowColor: shadowRecords,
        shadowBlur: 3,
        shadowX: 5,
        shadowY: 5
    });

    information.setShadow({
        shadowColor: shadowInf,
        shadowBlur: 3,
        shadowX: 5,
        shadowY: 5
    });

    back.setShadow({
        shadowColor: shadowBack,
        shadowBlur: 3,
        shadowX: 5,
        shadowY: 5
    });

   /* accept.setShadow({
        shadowColor: shadowAccept,
        shadowBlur: 3,
        shadowX: 5,
        shadowY: 5
    });*/


    name.draw();
    play.draw();
    records.draw();
    information.draw();
    back.draw();
   // accept.draw();


    brush.drawTextLines({
        x: positionInfWin + width / 4, y: height / 2.5,
        lines: ["Control:", "jump - left mouse button",
            "high jump - right mouse button"],
        size: 60,
        style: "bold",
        font: "font2",
        color: "#a6ff2f",
        align: "center",
    });

    brush.drawTextLines({
        x: positionRecordsWin + width / 4, y: height / 2.5,
        lines: [" 1 - " + localStorage.getItem("nameFirst") + " - " + localStorage.getItem("scoreFirst") + " ",
            " 2 - " + localStorage.getItem("nameSecond") + " - " + localStorage.getItem("scoreSecond") + " ",
            " 3 - " + localStorage.getItem("nameThird") + " - " + localStorage.getItem("scoreThird") + " "],
        size: 60,
        style: "bold",
        font: "font2",
        color: "#a6ff2f",
        align: "center"
    });

   /* brush.drawText({
        x: positionEnterText, y: Y_TEXT - width / 10,
        text: "Enter name your character:",
        size: width / 14,
        color: "#a6ff2f",
        style: "bold",
        font: "font2",
        align: "center"
    });*/

    if (mouse.isVisible()) {
        if (mouse.isInStatic(play)) {
            colorTextPlay = "#ffba24";
            shadowPlay = "red";
            if (mouse.isPress("LEFT") && (mouse.isInStatic(play))) {
                /*positionPlayX = width * 2;
                positionRecordsX = width * 2;
                positionInfX = width * 2;
                positionEnterText = width / 2;
                positionAccept = width / 4;
                positionBack = width / 4;*/
                namePlayer = prompt("Enter name your character:", "Martha");
                localStorage.setItem("name", namePlayer);
                game.startLoop("game");

            }
        }
        else if (colorTextPlay != "#a6ff2f") {
            colorTextPlay = "#a6ff2f";
            shadowPlay = "green";
        }

        if (mouse.isInStatic(records)) {
            colorTextRecords = "#ffba24";
            shadowRecords = "red";
            if (mouse.isPress("LEFT") && (mouse.isInStatic(records))) {
                positionBack = width / 4;
                positionPlayX = width * 2;
                positionRecordsX = width * 2;
                positionInfX = width * 2;
                positionRecordsWin = width / 4;
                key.setInputMode(true);
            }
        }
        else if (colorTextRecords != "#a6ff2f") {
            colorTextRecords = "#a6ff2f";
            shadowRecords = "green";
        }


        if (mouse.isInStatic(information)) {
            colorTextInformation = "#ffba24";
            shadowInf = "red";
            if (mouse.isPress("LEFT") && (mouse.isInStatic(information))) {
                positionInfWin = width / 4;
                positionBack = width / 4;
                positionPlayX = width * 2;
                positionRecordsX = width * 2;
                positionInfX = width * 2;
            }
        }
        else if (colorTextInformation != "#a6ff2f") {
            colorTextInformation = "#a6ff2f";
            shadowInf = "green";
        }
        // back.drawStaticBox();

        if (mouse.isInStatic(back)) {
            colorTextBack = "#ffba24";
            shadowBack = "red";
            if (mouse.isPress("LEFT") && (mouse.isInStatic(back))) {
                positionInfWin = width * 2;
                positionBack = width * 2;
                positionPlayX = width / 2 - width / 14;
                positionRecordsX = width / 2 - width / 8;
                positionInfX = width / 2 - width / 6;
                positionRecordsWin = width * 2;
                //positionAccept = width * 2;
                positionEnterText = width * 2;
            }
        }
        else if (colorTextBack != "#a6ff2f") {
            colorTextBack = "#a6ff2f";
            shadowBack = "green";
        }

       /* if (mouse.isInStatic(accept)) {
            colorTextAccept = "#ffba24";
            shadowAccept = "red";
            if (mouse.isPress("LEFT") && (mouse.isInStatic(accept))) {
                namePlayer = textByPlayer;
                localStorage.setItem("name", namePlayer);
                positionBack = width * 2;
                positionPlayX = width / 2 - width / 14;
                positionRecordsX = width / 2 - width / 8;
                positionInfX = width / 2 - width / 6;
                positionAccept = width * 2;
                positionEnterText = width * 2;
                game.startLoop('game');
            }
        }
        else {
            colorTextAccept = "#a6ff2f";
            shadowAccept = "green";
        }*/

    }
});
game.startLoop('menu');


var gr1 = game.newImageObject({
    file: "image/ground.png",
    x: 0, y: 0,
    h: height / 8, w: width,
    onload: function () {
        gr3.y = gr2.y = gr1.y = height - gr1.h;
        gr2.x = gr1.x + gr1.w;
        gr3.x = gr1.x + gr1.w + gr1.w;
    }
});

var gr2 = game.newImageObject({
    file: "image/ground.png",
    x: 0, y: 0,
    h: height / 8, w: width
});

var gr3 = game.newImageObject({
    file: "image/ground.png",
    x: 0, y: 0,
    h: height / 8, w: width
});

const FLOOR = height - gr1.h * 2.7;
const WIDTH_COLS = width / 30;
const Y_COLS = height - gr1.h * 2;

var col1 = game.newImageObject({
    file: "image/col.png",
    x: width + 20, y: Y_COLS,
    w: WIDTH_COLS
});

var col2 = game.newImageObject({
    file: "image/col.png",
    x: width * 1.4, y: Y_COLS,
    w: WIDTH_COLS
});

var col3 = game.newImageObject({
    file: "image/col.png",
    x: width * 1.8, y: Y_COLS,
    w: WIDTH_COLS
});

col1.setBox({
    offset: pjs.vector.point(10, 10),
    size: pjs.vector.size(-20, -60)
});

col2.setBox({
    offset: pjs.vector.point(10, 10),
    size: pjs.vector.size(-20, -60)
});

col3.setBox({
    offset: pjs.vector.point(10, 10),
    size: pjs.vector.size(-20, -60)
});

var man = game.newAnimationObject({
    animation: pjs.tiles.newAnimation('image/runner2800.png', 280, 375, 10),
    delay: 2,
    x: width / 8, y: height - gr1.h * 2.7,
    w: width / 12, h: height / 4
});

man.setBox({
    offset: pjs.vector.point(30, 20),
    size: pjs.vector.size(-60, -70)
});

var moveBackGround = function (s) {
    var fonXW = fon1.x + fon1.w;
    var grXW = gr1.x + gr2.w;

    fon1.move(pjs.vector.point(-s / 2, 0));
    fon2.move(pjs.vector.point(-s / 2, 0));
    fon3.move(pjs.vector.point(-s / 2, 0));


    gr1.move(pjs.vector.point(-s, 0));
    gr2.move(pjs.vector.point(-s, 0));
    gr3.move(pjs.vector.point(-s, 0));

    col1.move(pjs.vector.point(-s, 0));
    col2.move(pjs.vector.point(-s, 0));
    col3.move(pjs.vector.point(-s, 0));

    heartManInSpace.x -= s;
    flyShoes.x -= s;

    if (fonXW < 0)
        fon1.x = fonXW;
    if (fonXW < 0)
        fon2.x = fonXW + fon1.w;
    if (fonXW < 0)
        fon3.x = fonXW + fon1.w * 2;


    if (grXW < 0)
        gr1.x = grXW;
    if (grXW < 0)
        gr2.x = grXW + gr1.w;
    if (grXW < 0)
        gr3.x = grXW + gr1.w * 2;

    if (col1.x + col1.w < 0) {
        col1.x = pjs.math.random(col1.x + col2.w * 10, col2.x - col1.w) + width;
    }
    if (col2.x + col1.w < 0) {
        col2.x = pjs.math.random(col1.x + col2.w, col3.x - col1.w * 2) + width;
    }
    if (col3.x + col1.w < 0) {
        col3.x = pjs.math.random(col2.x + col3.w * 4, width - col1.w) + width;
    }


    if (heartManInSpace.x + heartManInSpace.w < 0) {
        probability = Math.random() * (-s * 2 + 1.5) + s;
        if (probability > 0 && probability < s / 100)
            heartManInSpace.x = pjs.math.random(20, width) + width;
    }
    if (flyShoes.x + flyShoes.w < 0) {
        probability = Math.random() * (-s * 2 + 1.5) + s;
        if (probability > 0 && probability < s / 100)
            flyShoes.x = pjs.math.random(10, width) + width;
        if (heartManInSpace.isIntersect(flyShoes)) {
            flyShoes.x += heartManInSpace.w * 2 + flyShoes.w;
        }
    }
};


var x = pjs.math.random(-1, 1, true);
var y = pjs.math.random(-1, 1, true);


const ROOF = height / 2 - man.h / 2;
var jump = 0;
var s = 7;
var number = 0;
var coefJump = 1;
var coefSpeed = 1;
var gameScore = 0;
var numberHighJump = 30;
var heart = 3;
var flag = false;
var flagH = false;
var flagF = false;

var music = 1;
var musicGame;
var heartSound;
var heartFlyShoes;

var a = +localStorage.getItem("scoreFirst");
var b = +localStorage.getItem("scoreSecond");
var c = +localStorage.getItem("scoreThird");

var colorTextToMenu = "#a6ff2f";
var shadowToMenu = "green";

var heartManInSpace = game.newImageObject({
    file: "image/heart.png",
    x: width * 2, y: height / 4,
    h: 50
});

var flyShoes = game.newImageObject({
    file: "image/shoes.png",
    x: width * 2.5, y: height / 2,
    h: 50
});
var heartMan = game.newImageObject({
    file: "image/heart.png",
    x: 10, y: 50,
    h: 50
});

var highJump = game.newImageObject({
    file: "image/shoes.png",
    x: 10, y: 70 + flyShoes.h,
    h: 50
});

heartManInSpace.setBox({
    offset: vector.point(20, 20),
    size: vector.point(-20, 20)
});

flyShoes.setBox({
    offset: vector.point(20, 20),
    size: vector.point(-20, 20)
});

/*
var stH = '000';
var h = {
    width: 50,
    height: 50,
    source: [
        '',
        stH
    ]
};

var objs = [];


var hearts = function () {
    OOP.forArr(h.source, function (string, Y) {
        OOP.forArr(string, function (symbol, X) {
            if (!symbol || symbol == '')
                return;
            if (symbol == '0')
                objs.push(game.newImageObject({
                    file: "image/heart.png",
                    h: h.h,
                    x: h.width * X, y: h.height * Y
                }));
        });
    })
};
*/

// ***Game***
game.newLoop('game', function () {
    musicMenu.stop();
    if (music == 1) {
        if (localStorage.getItem("scoreFirst") === null) {
            localStorage.setItem("scoreFirst", "0");
            localStorage.setItem("nameFirst", "Nobody");
        }
        if (localStorage.getItem("scoreSecond") === null) {
            localStorage.setItem("scoreSecond", "0");
            localStorage.setItem("nameSecond", "Nobody");
        }
        if (localStorage.getItem("scoreThird") === null) {
            localStorage.setItem("scoreThird", "0");
            localStorage.setItem("nameThird", "Nobody");
        }
        music = pjs.wAudio.newAudio("audio/cryOfVelgelm.mp3", 0.7);
        musicGame = [pjs.wAudio.newAudio("audio/first.mp3", 0.4),
            pjs.wAudio.newAudio("audio/second.mp3", 0.4),
            pjs.wAudio.newAudio("audio/third.mp3", 0.4),
            pjs.wAudio.newAudio("audio/fourth.mp3", 0.4),
            pjs.wAudio.newAudio("audio/fifth.mp3", 0.4)
        ];
        heartSound = pjs.wAudio.newAudio("audio/heart.mp3", 0.7);
        heartFlyShoes = pjs.wAudio.newAudio("audio/highJump.mp3", 0.7);
        musicGame[pjs.math.random(0, 4)].play();
    }
    musicGame[0].setNextPlay(musicGame[pjs.math.random(0, 4, true)]);
    musicGame[1].setNextPlay(musicGame[pjs.math.random(2, 4)]);
    musicGame[2].setNextPlay(musicGame[pjs.math.random(0, 1) || pjs.math.random(3, 4)]);
    musicGame[3].setNextPlay(musicGame[pjs.math.random(0, 2) || 4]);
    musicGame[4].setNextPlay(musicGame[pjs.math.random(0, 3)]);


    fon1.draw();
    fon2.draw();
    fon3.draw();
    col1.draw();
    col2.draw();
    col3.draw();
    gr1.draw();
    gr2.draw();
    gr3.draw();
    heartManInSpace.draw();
    flyShoes.draw();
    heartMan.draw();
    highJump.draw();


    if ((mouse.isPress("LEFT")) && jump == 0) {
        jump = 1;
        coefJump = 1;
        coefSpeed = 1
    }

    if ((mouse.isPress("RIGHT")) && jump == 0 && numberHighJump != 0) {
        jump = 1;
        coefJump = 0.5;
        coefSpeed = 1.5;
        numberHighJump -= 1;
    }


    if (man.y >= ROOF * coefJump && jump == 1)
        man.y -= s * coefSpeed;
    else if (man.y <= ROOF * coefJump)
        jump = 2;

    if (man.y <= FLOOR && jump == 2)
        man.y += 6 * coefSpeed + s / 4;
    else if (man.y >= FLOOR)
        jump = 0;

    var score = brush.drawText({
        x: 10, y: 0,
        text: "SCORE: " + gameScore,
        color: "white",
        style: "bold",
        font: "Noto Serif",
        size: 30
    });

    brush.drawText({
        x: highJump.x + highJump.w, y: highJump.y,
        text: " : " + numberHighJump,
        color: "white",
        font: "font2",
        style: "bold",
        size: 30
    });

    brush.drawText({
        x: heartMan.x + heartMan.w, y: heartMan.y,
        text: " : " + heart,
        color: "white",
        font: "font2",
        style: "bold",
        size: 30
    });

    gameScore += Math.floor(s);
    man.draw();
    man.delay -= 1;

    // man.drawStaticBox();

    // col1.drawStaticBox();
    // col2.drawStaticBox();
    // col3.drawStaticBox();
    //heartManInSpace.drawStaticBox();

    moveBackGround(s);
    s += 0.001;
    if (heartManInSpace.isInCamera()) {
        if (heartManInSpace.isIntersect(man)) {
            flagH = true;
            heartSound.stop();
            heartSound.play();
            heartManInSpace.x -= width;
            heart += 1;
        }
        else if (flagH) {
            flagH = false;
        }
    }

    if (flyShoes.isInCamera()) {
        if (flyShoes.isIntersect(man)) {
            flagF = true;
            heartFlyShoes.stop();
            heartFlyShoes.play();
            flyShoes.x -= width;
            numberHighJump += 1;
        }
        else if (flagF) {
            flagF = false;
        }
    }
    if (col1.isInCamera() || col1.isInCamera() || col3.isInCamera()) {
        if ((col1.isIntersect(man) || col2.isIntersect(man) || col3.isIntersect(man))) {
            flag = true;
            if (heart == 0) {
                music.stop();
                music.play();
                if (a < gameScore) {
                    localStorage.setItem("nameFirst", namePlayer);
                    localStorage.setItem("scoreFirst", gameScore.toString());
                }
                else if (b < gameScore) {
                    localStorage.setItem("nameSecond", namePlayer);
                    localStorage.setItem("scoreSecond", gameScore.toString());
                }
                else if (c < gameScore) {
                    localStorage.setItem("nameThird", namePlayer);
                    localStorage.setItem("scoreThird", gameScore.toString());
                }
                //gameOver();
                for (var i = 0; i < musicGame.length; i++)
                    musicGame[i].stop();
                s = 0;
                music.stop();

                fonM.draw();

                var name = game.newTextObject({
                    x: width / 2 - width / 3.3, y: height / 25,
                    text: "Ground Runner",
                    color: "#a6ff2f",
                    size: width / 10,
                    style: "bold",
                    font: "font1"
                });

                var toMenu = game.newTextObject({
                    x: width / 2.8, y: Y_TEXT + width / 7.5,
                    text: "To Menu",
                    size: width / 14,
                    color: colorTextToMenu,
                    style: "bold",
                    font: "font1"
                });

                toMenu.setShadow({
                    shadowColor: shadowToMenu,
                    shadowBlur: 3,
                    shadowX: 5,
                    shadowY: 5
                });

                name.setShadow({
                    shadowColor: "green",
                    shadowBlur: 3,
                    shadowX: 5,
                    shadowY: 5
                });

                name.draw();
                toMenu.draw();

                brush.drawText({
                    x: width / 2, y: height / 2,
                    text: "Your Score: " + gameScore,
                    color: "#a6ff2f",
                    size: width / 14,
                    style: "bold",
                    font: "font2",
                    align: "center"
                });

                if (mouse.isInStatic(toMenu)) {
                    colorTextToMenu = "#ffba24";
                    shadowToMenu = "red";
                    if (mouse.isPress("LEFT") && mouse.isInStatic(toMenu)) {
                        location.reload();
                    }
                }
                else if (colorTextToMenu != "#a6ff2f") {
                    colorTextToMenu = "#a6ff2f";
                    shadowToMenu = "green";
                }
            }
        }
        else if (flag) {
            heart -= 1;
            flag = false;
            music.stop();
            music.play();
        }
    }
});