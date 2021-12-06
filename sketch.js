var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;
var eLife, eLiffe, elifes;
var bomb,bombimg, bombs;
var clear,clearimg,clearG;
var money,moneyimg,moneyG;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
  eLife = loadImage("herar.png")
  moneyimg = loadImage("money.png")
  clearimg = loadImage("clear.png")
  bombimg = loadImage("bomb.png")

}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  elifes = new Group();
  clearG = new Group();
  moneyG = new Group();
  bombs = new Group();
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(frameCount %400 === 0){
      drawELife();
    }

    if(frameCount %300 === 0){
      drawBomb();
    }

    if(frameCount %200 === 0){
      drawMoney();
    }

    if(frameCount %350 === 0){
      drawClear();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }

    

    if(score==10){
      bluebubble.velocityX = -12
      redbubble.velocityX = -12
    }
    
    /*if(blueBubbleGroup.(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    /*if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision();
    }*/
    
    /*if(blueBubbleGroup.collide()){
      handleBubbleCollision(blueBubbleGroup);
    }*/
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(elifes.collide(bulletGroup)){
      handleBubbleCollision(elifes);
      life +=1;
    }

    if(bombs.collide(bulletGroup)){
      handleBubbleCollision(bombs);
      life=1;

    }

    if(moneyG.collide(bulletGroup)){
      handleBubbleCollision(moneyG);
      score+=9;

    }

    if(clearG.collide(bulletGroup)){
      handleBubbleCollision(clearG);
      blueBubbleGroup.destroyEach();
      redBubbleGroup.destroyEach();
      elifes.destroyEach();
      bombs.destroyEach();
      moneyG.destroyEach();
      clearG.destroyEach();

    }


    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}
function drawELife(){
  eLiffe = createSprite(800,random(20,780),40,40);
 eLiffe.addImage(eLife);
 eLiffe.scale = 0.2;
  eLiffe.velocityX = -16;
 eLife.lifetime = 400;
 elifes.add(eLiffe);
}

function drawBomb(){
  bomb = createSprite(800,random(20,780),40,40);
 bomb.addImage(bombimg);
 bomb.scale = 0.2;
  bomb.velocityX = -7;
 bomb.lifetime = 400;
 bombs.add(bomb);
}

function drawMoney(){
  money = createSprite(800,random(20,780),40,40);
 money.addImage(moneyimg);
 money.scale = 0.1;
  money.velocityX = -10;
 money.lifetime = 400;
 moneyG.add(money);
}

function drawClear(){
  clear = createSprite(800,random(20,780),40,40);
 clear.addImage(clearimg);
 clear.scale = 0.1;
  clear.velocityX = -16;
 clear.lifetime = 400;
 clearG.add(clear);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

   blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.add(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life<=0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}