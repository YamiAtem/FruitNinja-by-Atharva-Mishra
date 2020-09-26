//Gamestate
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Sword
var swordSprite, swordImage, swordSwooshSound;

//Groups
var fruitGroup, enemyGroup;

//Fruits
var fruit, fruitImage, fruitImage2, fruitImage3, fruitImage4;

//Enemy
var enemy, enemyImage, enemyImage2;

//Gameover
var gameOver, gameOverImage, gameOverSound;

//Score
var score;
score = 0;

//Random Var
var rand, rand2;

//Random Position
var randpos, randpos2;

function preload() {
  //Sword
  swordImage = loadImage("sword.png");
  swordSwooshSound = loadSound("knifeSwooshSound.mp3");
  
  //fruits
  fruitImage = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  
  //enemy
  enemyImage = loadImage("alien1.png");
  enemyImage2 = loadImage("alien2.png");
  
  //gameover
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 600);

  swordSprite = createSprite(40, 200, 20, 20);
  swordSprite.addImage(swordImage);
  swordSprite.scale = 0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {
  background("teal");
  
  if (gameState === PLAY) {
    swordSprite.x = World.mouseX;
    swordSprite.y = World.mouseY;
    
    spawnFruits();
    spawnEnemy();
    
    if (swordSprite.isTouching(fruitGroup)) {
      fruitGroup.destroyEach();
      swordSwooshSound.play();
      score += 1;
    }
    
    if (swordSprite.isTouching(enemyGroup)) {
      enemyGroup.destroyEach();
      gameOverSound.play();
      gameState = END;
    }
  } 
  else if (gameState === END) {
    swordSprite.x = 300;
    swordSprite.y = 300;
    swordSprite.addImage(gameOverImage);
    swordSprite.scale = 2;
  }
  
  textSize(20);
  fill("red");
  text("Score: " + score, 334, 18);
  
  drawSprites();
}

function spawnFruits() {
  if (frameCount%80===0) {
    fruit = createSprite(400, 200, 20);
    fruit.scale = 0.2;
    
    //random
    rand = Math.round(random(1, 4));
    
    if (rand === 1) {
      fruit.addImage(fruitImage);
    }
    
    if (rand === 2) {
      fruit.addImage(fruitImage2);
    }
    
    if (rand === 3) {
      fruit.addImage(fruitImage3);
    }
    
    if (rand === 4) {
      fruit.addImage(fruitImage4);
    }
    
    randpos = Math.round(random(1, 2));
    if (randpos === 1) {
      fruit.x = 400;
      fruit.velocityX = -(7 + score/4)
    } else if (randpos === 2) {
      fruit.x = 0;
      fruit.velocityX = 7 + score/4
    }
    
    fruit.y = Math.round(random(50, 340));
    fruit.setlifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function spawnEnemy() {
  if (frameCount%200 === 0) {
    enemy = createSprite(400, 200, 20);
    
    rand2 = Math.round(random(1, 2))
    
    if (rand2 === 1) {
      enemy.addImage(enemyImage);
    }
    
    if (rand2 === 2) {
      enemy.addImage(enemyImage2);
    }
    
    randpos2 = Math.round(random(1, 2));
    if (randpos === 1) {
      enemy.x = 400;
      enemy.velocityX = -(7 + score/10);
    } else if (randpos === 2) {
      enemy.x = 0;
      enemy.velocityX = 7 + score/10
    }
    
    enemy.y = Math.round(random(50, 340));
    enemy.setlifetime = 100;
    
    enemyGroup.add(enemy);
  }
}