var dog,sadDog,happyDog;
var foodObj;
var fedTime, lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();

  foodObj = new Food();
  foodObj.getFoodStock();
  foodObj.getfedTime();
  foodObj.deductFood();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  var feed = createButton("Feed Him");
  feed.position(600, 100);
  feed.mousePressed(feedDog);

  var addFood = createButton("Add Food For Him ");
  addFood.position(680, 100);
  // addFood.style('font-size', );
  addFood.mousePressed(addFoods);



}

function draw() {
  background(46,139,87);
  drawSprites();

  foodObj.display();

}

function feedDog(){
  dog.addImage(happyDog)
  image(foodObj.image, 600, 100, 70, 80)

  if(foodObj.getFoodStock() <= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
}

//function to read food Stock
function getFoodStock(){
  var foodStockRef = database.ref('addFood');
  foodStockRef.on("value", function (data){
      foodStock = data.val();
  })
}

//function to update food stock and last fed time
function updateFoodStock(){
  database.ref('/').update({
    foodStock: foodStock
});
}

//function to add food in stock
function addFoods(){
  foodObj.foodStock++;
  database.ref('addFood').update({
    Food:foodObj.foodStock
  })
}
