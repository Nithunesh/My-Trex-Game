var trex, trex_running, edges;
var groundImage;        
var invisibleground;
var cloud,cloudImage;
var obs1,obs2,obs3,obs4,obs5,obs6,obstacle;
var score;
var cloudsgrp,obsgrp;
var PLAY=1;
var END=0;
var gameState=PLAY;
var trex_collided;
var gameOver,gameOverImage,restart,restartImage;
var jumpsound,cpsound,diesound;


function preload(){
  //console.log("in preload function")
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
   trex_collided=loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloudImage=loadImage("cloud.png")
  
  obs1=loadImage("obstacle1.png")
  
   obs2=loadImage("obstacle2.png")
  
   obs3=loadImage("obstacle3.png")
  
   obs4=loadImage("obstacle4.png")
  
   obs5=loadImage("obstacle5.png")
  
   obs6=loadImage("obstacle6.png")
  
  gameOverImage=loadImage("gameOver.png")
  
  restartImage=loadImage("restart.png")
  
  jumpsound=loadSound("jump.mp3")
  
  diesound=loadSound("die.mp3")
  
  cpsound=loadSound("checkPoint.mp3")
  
  var message="hello";
  console.log("scope",message);
}

function setup(){
 //console.log("in setup function")
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  //adding scale and position to trex
  trex.scale = 0.5
  trex.x = 50
  trex.addAnimation("collided",trex_collided);
  
  edges = createEdgeSprites();
  
  ground=createSprite(200,180,400,20)
  ground.addImage('ground',groundImage)
  
  invisibleground=createSprite(200,190,400,10)
  invisibleground.visible=false
  
  gameOver=createSprite(250,50);
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.7
  restart=createSprite(300,100);
  restart.addImage(restartImage)
  restart.scale=0.5
  
  var rand=Math.round(random(1,100))
//  console.log(rand)
 
  obsgrp=createGroup();
  cloudgrp=createGroup();
  
  score=0;
  
  trex.debug=false
trex.setCollider("circle",0,0,40)
 
  //console.log("scope",message);
  
}
 

function draw(){
    //set background color 
    background("white");
  text("Score:"+score,500,50);
  //  console.log("in draw function")
  //logging the y position of the trex
 // console.log("trex.y--",trex.y)
   // console.log("trex.x--",trex.x)
  
  if (gameState===PLAY){
  gameOver.visible=false;
  restart.visible=false;
ground.velocityX = -(6 + 3*score/100);
  score = score + Math.round(getFrameRate()/60); 
    if (ground.x<0){
     ground.x=200
      
   } 
  if(score>0 && score%100===0){
    cpsound.play()
  }
    //jump when space key is pressed
    if(keyDown("space") && (trex.y>164 && trex.y<=165.5)){
      trex.velocityY = -10;
      jumpsound.play()
    } 
    //add gravity
    trex.velocityY = trex.velocityY + 0.5;
     spawnClouds();
 
  spawnObstacles();
  if (obsgrp.isTouching(trex)){
    gameState=END
    diesound.play()
  }  
  }
   
  else if (gameState===END){
   restart.visible=true
  gameOver.visible=true
  ground.velocityX=0
 trex.velocityY=0
  obsgrp.setVelocityXEach(0)
  cloudgrp.setVelocityXEach(0)
  obsgrp.setLifetimeEach(-1)
  cloudgrp.setLifetimeEach(-1)  
  trex.changeAnimation("collided",trex_collided);
  if (mousePressedOver(restart)){
    reset();
  }
  }
  
      //stop trex from falling down
     trex.collide(invisibleground )
  
     
  
    drawSprites();

 
  
}
function spawnClouds(){
  if (frameCount%60 === 0){
   cloud=createSprite(600,100,40,10);
  cloud.velocityX=-3
    cloud.addImage(cloudImage)
    cloud.y=Math.round(random(10,60))
    cloud.scale=0.5
    cloud.depth=trex.depth
    trex.depth=trex.depth+1
    cloud.lifetime=201
 // console.log(frameCount)
    cloudgrp.add(cloud);
  }
  
 
}
function spawnObstacles(){
if (frameCount%60===0){
obstacle=createSprite(400,160,10,40)
obstacle.velocityX=-6  
var rand=Math.round(random(1,6))
switch(rand){
    
  case 1:obstacle.addImage(obs1);
 break;
 
 case 2:obstacle.addImage(obs2);
 break;
 
 case 3:obstacle.addImage(obs3);
 break;
 
 case 4:obstacle.addImage(obs4);
 break;
 
 case 5:obstacle.addImage(obs5);
 break;
 
 case 6:obstacle.addImage(obs6);
 break;
 
 default:break;
 
}
obstacle.scale=0.5  
obstacle.lifetime=200
obsgrp.add(obstacle)
}
  
  
}
function reset(){
gameState=PLAY;
  restart.visible=false
  gameOver.visible=false
  score=0
  obsgrp.destroyEach()
  cloudgrp.destroyEach()
  trex.changeAnimation("running",trex_running);
  
}




