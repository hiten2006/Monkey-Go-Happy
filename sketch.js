var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var survival=0;
var ground;
var gameState="play";


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);

  monkey=createSprite(100,200,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.12;
  
  ground=createSprite(0,390,800,10);
  ground.velocityX=-5;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
  background(255);
  
  text("score:"+score,300,10);
  text("survival time:"+survival,200,10);
  
  if(ground.x<0){
      ground.x=ground.width/2;
    }
  
  if(gameState==="play"){
    monkey.velocityY=monkey.velocityY+0.8;       
    
    survival=Math.ceil(frameCount/frameRate());
    
    
    console.log(score);
    
    if(keyDown("space") && monkey.y>=120){
      monkey.velocityY=-12;
    }
  
    monkey.collide(ground);
  
    if(monkey.isTouching(foodGroup)){
        foodGroup.destroyEach();
        score=score+1;
       }   
    if(monkey.isTouching(obstaclesGroup)){
      gameState="end";
      
    }
    
    bananas();
    rock();
  }
  
  if(gameState==="end"){
     monkey.x=500;
     obstaclesGroup.destroyEach();
     foodGroup.destroyEach();
    
  }
  
   
  drawSprites();
}

function bananas(){
  if(frameCount%80===0){
    yb=Math.round(random(120,200));
    banana=createSprite(400,yb,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=150;
    
    foodGroup.add(banana);
  }
}

function rock(){
  if(frameCount%300===0){
    obstacle=createSprite(400,370,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.2;
    obstacle.lifetime=150;
    obstaclesGroup.add(obstacle);
  }
}




