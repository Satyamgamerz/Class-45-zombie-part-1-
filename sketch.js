var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup
var bullets=55
var life=3
var score=0
var bullet,bulletImg,bulletGroup


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  //bulletImg = loadImage("assets/")


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
zombieGroup = new Group() 
bulletGroup = new Group() 

}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)

  bullet = createSprite(windowWidth-1150,player.y-30,20,10)
  bullet.velocityX=20
  bulletGroup.add(bullet)
  bullets=bullets-1
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
enemy()
if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy()
    bulletGroup.destroyEach()
    score=score+5
    
    }
  }

}
drawSprites();
textSize(40)
fill("white")
text("Bullets "+bullets,100,50)

text("Life "+life,1300,50)

text("Score "+score,650,50)

}
function enemy(){
  if(World.frameCount%70===0){
  zombie = createSprite(random(500,1100),random(100,500),50,50)
  zombie.addImage(zombieImg)
  zombie.scale=0.15
  zombie.velocityX=-3
  zombie.lifetime=400
  zombieGroup.add(zombie)
}
}
