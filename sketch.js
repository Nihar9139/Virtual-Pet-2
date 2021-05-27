var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var Feed,addFood;
var fedTime, lastFed,foodObj;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,400);

foodObj=new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  Feed=createButton("Feed The Dog");
  Feed.position(700,95);
  Feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);
}

// function to display UI
function draw() {
  background(46,139,87);

  foodObj.display();
 
  drawSprites();

  fedTime=database.ref('feedTime');
  fedTime.on('value',function(data){
    lastFed=data.val();
  });
  fill (255,255,254);
  textSize(15)

  if(lastFed>=12){
    text("Last Feed: "+lastFed%12+"PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    text("Last Feed: "+lastFed+"AM",350,30);
  }
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{ dog.addImage(dogImg1); 
  if(foodObj.getFoodStock()<= 0)
  { foodObj.updateFoodStock(foodObj.getFoodStock()*0);
   }else{ foodObj.updateFoodStock(foodObj.getFoodStock()-1); }
    database.ref('/').update({ Food:foodObj.getFoodStock(), feedTime:hour() }) }
   
    //function to add food in stock 
   
   function addFoodS()
   { foodS++;
     database.ref('/').update({ Food:foodS }) }


