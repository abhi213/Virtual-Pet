//Create variables here
var dog, happyDog, sadDog, database, foodS=0, foodStock; 
var dogImage, happyDogImage;
var addFood, feedPet;
var lastFed, fedTime;
var foodObj;
var database;
var changingGameState, readingGameState;
var gameState;
var bedroom, garden, washroom;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/BedRoom.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/WashRoom.png");
}

function setup() {
  createCanvas(800, 500);
  dog = createSprite(500, 350, 30, 30);
  dog.addImage("dog", dogImage);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodObj = new Food();

  readState = database.ref('gameState');
  readState.on("value", function(data){
     gameState = data.val();
  });  
  
  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}

function update(state) {
  database.ref('/').update({
    gameState: state
  });
}

function draw() {  
  background(46, 139, 87);
  
  foodObj.updateFoodStock(foodS);
  foodObj.display();
  drawSprites();
  textSize(20);
  fill("yellow");
  stroke("black");
  text("Food Remaining : " + foodS, 150, 80);

  if(gameState != "Hungry"){
    feed.hide();
    addFood.hide();
  //  dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage("dog", dogImage);
  }
  
  currentTime = hour();
  if(currentTime ==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime ==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    if (frameCount % 100 === 0) {
      update("Hungry");
      foodObj.display();     
    }
  }

  fill(255, 255, 254);
  textSize(14);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);    
  }
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed=data.val();
  })
}

function feedDog() {
  if (foodS > 0 ) {
    update("Happy");
    dog.addImage("dog", happyDogImage);
    foodObj.deductFood();
    foodObj.updateFoodStock(foodObj.getFoodStock());
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
}

function addFoods() {
  if (foodS < 50) {
    foodS++;
    foodObj.updateFoodStock(foodS);
    database.ref('/').update({
      Food:foodS
    })  
  }
}

function readStock(data) {
   foodS = data.val();
}
