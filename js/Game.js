class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(c1);
    car2 = createSprite(300,200);
    car2.addImage(c2);
    car3 = createSprite(500,200);
    car3.addImage(c3);
    car4 = createSprite(700,200);
    car4.addImage(c4);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getNumber();
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("black");
      //index of the array
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;

  
      //x and y position of the cars
      var x = 150;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("white");
          stroke(10);
          ellipse(x,y,70,70);
          textSize(10);
         text(allPlayers[plr].name, x-50,y-150 );
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
      
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10;
     // console.log(player.distance);
      player.update();
    }

    if(player.distance>3600){
    //text("GAME OVER", displayWidth/2,-displayHeight*4);
    gameState = 2;
    player.rank+=1;
    Player.updateNum(player.rank);
    }
    drawSprites();
  }
  end(){
    fill("black");
    stroke(10);
    textSize(30);
    textFont("Gill Sans");
    //text(player.name,diplayWidth/2-50,-displayHeight*4-200);
    text("RANK: "+player.rank,displayWidth/2-100,-displayHeight*4-150);
    textSize(50);
    stroke("red");
    textFont("Kristen ITC");
    text("GAME OVER", displayWidth/2-100,-displayHeight*4-100);
   
  }
}
