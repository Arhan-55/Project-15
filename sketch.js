var PLAY = 1;
var END = 0;
var gameState = PLAY;

var swordImg,swooshsound;
var fruit1,fruit2,fruit3,fruit4;
var back;
var fruitsGroup,enemyGroup;
var enemy,score;

var gameOverImg,gameOverSound;

function preload(){
  swordImg = loadImage("knife.png");
  swooshsound = loadSound("Swoosh.mp3");
  enemy = loadAnimation("alien1.png","alien2.png");
  
  gameOverImg = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  back = loadImage("background.png");
}

function setup() {
  createCanvas(400,400);
  
  canvas = createSprite(200,200,20,20);
  canvas.addImage(back);
  canvas.scale = 4.5;
  
  sword = createSprite(200,200,20,20);
  sword.addImage(swordImg);
  sword.scale = 0.5;
  
  
  sword.setCollider("circle",20,-30,40);
  
  fruitsGroup = new Group();
  enemyGroup = new Group();
  
  score = 0;
}

function draw(){
  
  sword.x = World.mouseX;
  sword.y = World.mouseY;

  if(fruitsGroup.isTouching(sword)){
     fruitsGroup.destroyEach();
     swooshsound.play();
    
    score = score+2;
     }
  
  if(gameState === PLAY){
     fruits();
     Enemy();
  
  }else if(gameState === END){
    sword.addImage(gameOverImg);
    sword.scale = 1.5;
    
    fruitsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
    fruitsGroup.setLifetimeEach(-1);
     enemyGroup.setLifetimeEach(-1);
    
    sword.x = 200;
    sword.y = 200;
  }
  
  if(enemyGroup.isTouching(sword)){
     gameState = END;
     gameOverSound.play();
  }
  
  drawSprites();
  
  strokeWeight(7.5);
  stroke("black");
  fill("white");
  textSize(20);
  textFont("Cooper Black");
  text("Score : "+ score, 260,50);
}

function fruits(){
  if(frameCount % 80 === 0){
    position = Math.round(random(1,2)) 
    fruit = createSprite(400,200,20,20);
     fruit.scale = 0.2;
    
    if(position == 1){
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    } else if(position == 2){
      fruit.x = 0;
      fruit.velocityX = +(7+score/4);
    }
    
    rand = Math.round(random(1,4));
    
  if (rand === 1){
      fruit.addImage(fruit1);
    }else if (rand === 2){
      fruit.addImage(fruit2);
    }else if (rand === 3){
      fruit.addImage(fruit3);
    }else {
      fruit.addImage(fruit4);
    }
   fruit.y = Math.round(random( 50,340)) 
   fruit.setLifetime = 100;
    
    fruitsGroup.add(fruit);
  }
}

function Enemy(){
  if(frameCount % 200 === 0){
     monster = createSprite(400,200,20,20);
     monster.addAnimation("moving",enemy);
     monster.y = Math.round(random(50,340));
     monster.velocityX = -(8+(score/10));
     monster.setLifetime = 50;
    
     enemyGroup.add(monster);
  }
}