var balloon,balloonImg1,balloonImg2,balloonImg3;
var backgroundImg;
var database,position;

function preload(){
  backgroundImg = loadImage("images/Hot Air Ballon-01.png");
  balloonImg1 = loadImage("images/Hot Air Ballon-02.png");
  balloonImg2 = loadImage("images/Hot Air Ballon-03.png");
  balloonImg3 = loadImage("images/Hot Air Ballon-04.png"); 
}

function setup() {
  createCanvas(1200,600);
  balloon = createSprite(60, 400, 50, 50);
  balloon.scale = 0.4;

  database = firebase.database();
  var balloonposition = database.ref("balloon/position");
  balloonposition.on("value",readposition,showError);
}

function draw() {
  background(backgroundImg); 
  fill(255,0,255); 
  textSize(15)
  text("Use the arrow keys to move the Hot Air Balloon",10,18);
  stroke(255,0,255);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10;
}
  else if(keyDown(RIGHT_ARROW)){
      balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){
      balloon.y = balloon.y -10;
  }
  else if(keyDown(DOWN_ARROW)){
      balloon.y = balloon.y +10;
  }

  if(keyDown(UP_ARROW)){
    updateposition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    balloon.scale = balloon.scale -0.01;
  }

  if(keyDown(DOWN_ARROW)){
    updateposition(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImg1);
    balloon.scale = balloon.scale +0.01;
  }

  if(keyDown(LEFT_ARROW)){
    updateposition(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg3);
  }

  if(keyDown(RIGHT_ARROW)){
    updateposition(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg1);
  }
  drawSprites();
}

function updateposition(x,y){
    database.ref("balloon/position").set({
      'x': position.x + x,
      'y': position.y + y
    })
}

function readposition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}