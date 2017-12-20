window.onload = function() {
    var stage = new createjs.Stage("canvas");
    var STAGE_W = 1000;
    var STAGE_H = 500;
    var count = 0;
    var enemyList = [];
    var bulletList = [];
    var score = 0;

    var bg = new createjs.Shape();
    bg.graphics.beginFill("green").drawRect(0, 0, STAGE_W, STAGE_H);
    stage.addChild(bg);

    var player = new createjs.Shape();
    player.graphics.beginFill("blue").moveTo(5, 0).lineTo(-20, 10).lineTo(-20, -10);
    player.x = 100;
    player.y = 100;
    stage.addChild(player);

    var scoreText = new createjs.Text("0", "24px sans-serif", "white");
    stage.addChild(scoreText);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick() {
        player.x = stage.mouseX;
        player.y = stage.mouseY;
        count ++;

        if (count % 120 == 0) {
            createEnemy();
        }

        for (var i = 0; i < enemyList.length; i++) {
            enemyList[i].x -= 2;
            if (enemyList[i].x < 1) {
                gameOver();
            }
        }
        for (var i = 0; i < bulletList.length; i++) {
            bulletList[i].x += 10;
        }
        for (var j = 0; j < enemyList.length; j++) {
            for (var i = 0; i < bulletList.length; i++) {
                var bullet = bulletList[i];
                var enemy = enemyList[j];
                var local = bullet.localToLocal(0, 0, enemy);
        
                if (enemy.hitTest(local.x, local.y) == true) {
                    stage.removeChild(enemyList[j]);
                    enemyList.splice(j, 1);
                    score += 100;
                    scoreText.text = score;
                }
            }
        }

        if (count % 60 == 0) {
            shot()
        }

        stage.update();
    }

    function createEnemy() {
        var enemy = new createjs.Shape();
        enemy.graphics.beginFill("red").moveTo(-5, 0).lineTo(10, +5).lineTo(10, -5).closePath();
        enemy.x = STAGE_W;
        enemy.y = STAGE_H * Math.random();
        stage.addChild(enemy);
        enemyList.push(enemy);
    }

    function shot() {
        var bullet = new createjs.Shape();
        bullet.graphics.beginFill("white").drawCircle(0, 0, 3);
        bullet.x = player.x;
        bullet.y = player.y;
        stage.addChild(bullet);
        bulletList.push(bullet);
    }

    stage.addEventListener("click", shot);
  
    function gameOver() {
        createjs.Ticker.removeAllEventListeners();
        stage.removeAllEventListeners();

        var text = new createjs.Text("Game Over", "48px sans-serif", "white");
        text.textAlign = "center";
        text.x = STAGE_W / 2;
        text.y = STAGE_H / 2;
        stage.addChild(text);
    }
}