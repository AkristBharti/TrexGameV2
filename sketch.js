var trex, trexrunning, grounImg, ground, invisibleGround, cloudgroup, cloudImg, trexded;
var obs1,obs2, obs3,obs4, obs5, obs6, obstacle, obstacleGroup, count, Gamestate, Play, End, gameOver, gameOverimg, restart, restartImg;
function preload(){  
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexded = loadImage("trex_collided.png");
  gameOverimg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png");
  groundImg = loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
}
  
function setup() {
  Play = 0;
  End = 1;
  Gamestate = Play;
  createCanvas(600, 200)
  count = 0;
  cloudgroup = new Group();
  obstacleGroup = new Group();
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trexrunning);
  trex.addAnimation("Dead", trexded);
  trex.scale = 0.5; 
  //trex.debug = true;
  trex.setCollider("circle", 0, 0, 30);
  ground = createSprite(200, 180, 400, 10);
  ground.addImage("ground", groundImg);
  invisibleGround = createSprite(200,185,400,5);
  invisibleGround.visible = false;
  gameOver = createSprite(300, 80)
  gameOver.addImage("GameOver", gameOverimg);
  restart = createSprite(300, 127);
  restart.addImage("ResrartBtn", restartImg);
  
  
}

function draw() {
  background("white");
  textSize(18);
  textFont("Arial Black");
  textStyle(BOLD);
  text("Score: "+ count, 250, 30);
  
  if (Gamestate === Play){
    gameOver.visible = false;
    restart.visible = false;
    spawnClouds();
    spawnObstacles()
    restart.depth = 100;
    if (ground.x < 0){
      ground.x = ground.width/2;
      }
    ground.velocityX = -7 -(1.4*(Math.round(count/1000 )));
  
    count = Math.round(1)+ count;
    
  
    if (obstacleGroup.isTouching(trex)){
      Gamestate = End;
    }
  
    if(keyDown("space") && trex.y >= 159){  
    trex.velocityY = -12 ;
    }
  trex.velocityY = trex.velocityY + 0.8;
  }
  
  
  if (Gamestate === End){
    ground.velocityX=0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.changeAnimation("Dead", trexded)
    gameOver.visible = true;
    restart.visible = true;
  }
  
  if (mousePressedOver(restart)){
      reset();
  }
  
  
  trex.collide(invisibleGround); 
  drawSprites();
  
  
  
  
  
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0 || frameCount ===1) {
    cloud = createSprite(625,120,40,10);
    cloud.y = random(080,120);
    cloud.addImage("cloud",cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 260;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudgroup.add(cloud);
  }
}  
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(615,165,10,40);
    obstacle.velocityX = ground.velocityX;//-7 -(1.4*(Math.round(count/1000))); 
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
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
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    //console.log(obstacle.x);
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  Gamestate = Play;
  count = 0;
  trex.changeAnimation("running", trexrunning);
  obstacleGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  cloudgroup.destroyEach();
}