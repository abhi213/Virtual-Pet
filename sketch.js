//Create variables here
var dog, happyDog, database, foodS=0, foodStock; 
var dogImage, happyDogImage;
var database;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250, 250, 30, 30);
  dog.addImage("dog", dogImage);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)) {
    if(foodS > 0)
      dog.addImage("dog", happyDogImage);
    writeStock(foodS);
  }

  drawSprites();
  textSize(20);
  fill("blue");
  stroke("black");
  text("Food Remaining : " + foodS, 150, 80);
  
  if (frameCount % 100 === 0)
    dog.addImage("dog", dogImage);
}

function readStock(data) {
   foodS = data.val();
}

function writeStock(x) {
  if (x <= 0)
     x = 0;
  else 
     x--;
  database.ref('/').update({Food:x});
}