//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;
var fruit,fruit1,fruit2,fruit3,fruitGroup;
var monster,monsterImg;
var monsterGroup;
var gameOverImg


function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1 = loadImage("APPLE.png");
  fruit2 = loadImage("banana.png");
  fruit3 = loadImage("orange.png");
  monsterImg=loadImage("monster.png");
  gameOverImg=loadImage("gameOver.png");
  
  
  
}



function setup() {
  createCanvas(600, 600);
  
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function\
    fruits();
    Monster();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
    
    if(fruitGroup.isTouching(knife)){
          fruitGroup.destroyEach();
          score=score+2;
       }
    if(monsterGroup.isTouching(knife)){
      gameState=END;
   }
}
  else 
    {
      monsterGroup.destroyEach();
      fruitGroup.destroyEach();
      monsterGroup.setVelocityXEach(0);
      fruitGroup.setVelocityXEach(0);
          knife.addImage(gameOverImg);
          knife.x=300;
          knife.y=200;
          
       
    }
    
   
       
  
  
   
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
  
  
}

function fruits(){
  if(frameCount%80===0)
    {
      fruit=createSprite(400,200,20,20);
      fruit.scale=0.05;
      r=Math.round(random(1,4))
      if(r==1){
      fruit.addImage(fruit1);
      fruit.scale=0.01;
      }
      
      else if(r==2)
      fruit.addImage(fruit2);
      
      
      else if(r==3)
      fruit.addImage(fruit3);
      
      fruit.y=Math.round(random(50,340));
     // fruit.velocityX=-7;
      fruit.setLifetime=100;
      fruitGroup.add(fruit);
      
      position=Math.round(random(1,2));
      if(position===1)
        {
        fruit.x=600;
        fruit.velocityX=-(7+(score/4));
        }
      else
    {
      fruit.x=0;
      fruit.velocityX=(7+(score/4));
      
    }
      
     
        
    }
}

function Monster(){
  if(frameCount%80===0)
    {
      monster=createSprite(400,200,20,20);
      monster.addImage(monsterImg);
      monster.scale=0.05;
    
      
      
      monster.y=Math.round(random(50,340));
     // monster.velocityX=-7;
      monster.setLifetime=100;
     // monsterGroup.add(monster);
      
      position=Math.round(random(1,2));
      if(position===1)
        {
        monster.x=600;
        monster.velocityX=-(7+(score/10));
        }
      else
    {
      monster.x=0;
      monster.velocityX=(7+(score/10));
      
      
      
    }
      monsterGroup.add(monster);
    }
}
