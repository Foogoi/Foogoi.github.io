$(document).ready(function ( ){
    var field = $("#field")[0].getContext('2d'),
        width = $("#field").width(),
        height = $("#field").height(),
        apples = {},
        box,
        increase = 0,
        increase_size = 3,
        player = {},
        curry = 0,
        currx = 0,
        speed = 150,
        interval = null,
        temp_direction = null,
        snake_color = "black",
        name;
    
    function customize (){
        box = 10;
        snake_color = "black";//snake_color_choice;
        name = "shan";//player_name;
        /*
        width=window.innerWidth();
        width=width-(width%box) - 1000;
        height=height.innerHeight();

        height=height-(height%box) - 1000;
        */
    }
        
    width = width / box;
    height = height / box;
  
    
    
    
    //snake "class"
    function Snake(color) {
        //basic properties of a snake
        this.direction = "down";
        this.score = 0;
        this.color = color;
        this.length = 5; 
        this.body = [];
        
    }
    
    //food maker
    function food () {
        apples = {x:Math.round((width - 1)*Math.random()), y:Math.round((height-1)*Math.random()), color:"red"}
    }
    
    //function that repeats and paints stuff
    function repeat() {
        //Canvas
        
        field.fillRect(0,0,width*box,height*box);
        field.fillStyle="white";
        field.strokeStyle="black";
        field.strokeRect(0,0,width*box,height*box);
        //snake mov't
        currx = player.body[0].x;
        curry = player.body[0].y; // huhuhuhu Curry  ;)
        //updating coordinates of new box to add to snake
        
        //document.write("    " + curry); // switched the ++ and  --
        if(player.direction ==="up") curry--;
        else if (player.direction==="down")curry++;
        else if (player.direction==="right")currx++;
        else if (player.direction==="left")currx--;
        
        
        var temp_coordinates = {x:currx, y:curry};
        
        if (temp_coordinates.x == player.body[1].x && temp_coordinates.y == player.body[1].y) {
            currx = player.body[0].x;
            curry = player.body[0].y;
            player.direction = temp_direction;
            if(player.direction ==="up") curry--;
            else if (player.direction==="down")curry++;
            else if (player.direction==="right")currx++;
            else if (player.direction==="left")currx--;
        }
        
        temp_coordinates = {x:currx, y:curry};
        
        //checking if the coordinates are valid
        for(var stiven = 0; stiven < player.length; stiven++){
            if(temp_coordinates.x == player.body[stiven].x && temp_coordinates.y == player.body[stiven].y){
                reset();
                return;
            }
        }
        
        
        if(currx<=-1||currx>=width||curry<=-1||curry>=height){
            reset();
            return;
        }
        
        //checking if there is any food 
        if (temp_coordinates.x == apples.x && temp_coordinates.y == apples.y){
            increase += increase_size; //this is how many boxes the snake increases by
            player.score++;
            player.length++;
            food();
        }
        //painting food
        painter(apples.x,apples.y, apples.color);
        
        
        player.body.unshift(temp_coordinates);
        
        
        //keeping or disposing of last box in the snake's body
        if(increase <= 0){
            player.body.pop();
        }
        else {
            increase--;
        }
         
        
        
        //painting  player body
        for(var steven = 0; steven < player.length; steven++){
            painter(player.body[steven].x,player.body[steven].y, player.color);
        }
        
        //score
        field.fillStyle="black";
        field.font="20px Georgia";
        field.fillText("Score: " + player.score,5,height*box-5);
        field.fillStyle="white";

    }
            
        
        
            
    //reset function
    
    function reset(){
        alert("Play Again?");
        setup();
        clearInterval(interval);
        return;
    }
        
    
    //mini painting function
    function painter(coorx, coory, boxcolor){
        field.fillStyle= boxcolor; // make this player.color later
        field.strokeStyle="white";
        field.fillRect(coorx*box,coory*box,box,box);
        field.strokeRect(coorx*box,coory*box,box,box);
        field.fillStyle="white"; 
        field.strokeStyle="black";
    }

    
    function setup () {
        player = new Snake('black');
        //initializing the body of the snake
        for (var c = player.length - 1; c >= 0; c--){
            player.body.push({x:1,y:c});
        }
        food();
        interval = setInterval(function(){ repeat() }, speed);
    }
    
    setup();

    //controls mapping
    $(document).keydown(function(stuff){
        var key = stuff.which;
        temp_direction = player.direction;
        if((key == "40" || key == "83") && temp_direction !== "up") player.direction = "down";
        else if((key == "39" || key == "68") && temp_direction !== "left") player.direction = "right" ;
        else if((key == "38" || key == "87") && temp_direction !== "down") player.direction = "up";
        else if((key == "37" || key =="65") && temp_direction !== "right") player.direction = "left";
    });
        
        
          
        
});
        
        
        
        
                    
        
    
   
    
    
    
        
        
