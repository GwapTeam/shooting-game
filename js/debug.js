window.onload = function() {
  var stage = new createjs.Stage("canvas");
  var STAGE_W = 1000;
  var STAGE_H = 500;
  var count = 0;
  var enemyList = [];

  var bg = new createjs.Shape();
  bg.graphics.beginFill("green").drawRect(0, 0, STAGE_W, STAGE_H);
  stage.addChild(bg);

  var player = new createjs.Shape();
  player.graphics.beginFill("blue").moveTo(5, 0).lineTo(-20, 10).lineTo(-20, -10);
  stage.addChild(player);

  player.x = 100;
  player.y = 100;
  

  stage.update();
}