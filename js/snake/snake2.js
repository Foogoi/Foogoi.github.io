$(document).ready(function ( ){
    var field = $("#field")[0].getContext('2d');
    var width = $("#field").width();
    var height = $("#field").height();
    var apples = {};
    var box = 10;
    var increase = 0;
    var increase_size = 3;
    width = width / box;
    height = height / box;
    var player = {};
    var player2 = {};
    var curry = 0;
    var currx = 0;
    var speed = 150;
    var interval = null;
    var temp_direction = null;
    
    
    
    
    
    //snake "class"
    function Snake(color, direction) {
        //basic properties of a snake
        this.direction = direction;
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
        
        
        //painting food
        painter(apples.x,apples.y, apples.color);
        
        movement(player);
        //movement(player2);
        
        minipainter(player);
        minipainter(player2);
        
        
        //score
        field.fillStyle="black";
        field.font=box+"px Georgia";
        field.fillText("Score: " + player.score,5,height*box-5);
        field.fillText("Score: " + player2.score, 5, height*box - (box + 5));
        field.fillStyle="white";

    }
            
        
    function minipainter(snake_name){
        //painting  player body
        for(var steven = 0; steven < snake_name.length; steven++){
            painter(snake_name.body[steven].x,snake_name.body[steven].y, snake_name.color);
        }
    }
    
    function movement(snake_name){
        //snake mov't
        currx = snake_name.body[0].x;
        curry = snake_name.body[0].y; // huhuhuhu Curry  ;)
        //updating coordinates of new box to add to snake
        
        //document.write("    " + curry); // switched the ++ and  --
        if(snake_name.direction ==="up") curry--;
        else if (snake_name.direction==="down")curry++;
        else if (snake_name.direction==="right")currx++;
        else if (snake_name.direction==="left")currx--;
        
        
        var temp_coordinates = {x:currx, y:curry};
        
        if (temp_coordinates.x == snake_name.body[1].x && temp_coordinates.y == snake_name.body[1].y) {
            currx = snake_name.body[0].x;
            curry = snake_name.body[0].y;
            snake_name.direction = temp_direction;
            if(snake_name.direction ==="up") curry--;
            else if (snake_name.direction==="down")curry++;
            else if (snake_name.direction==="right")currx++;
            else if (snake_name.direction==="left")currx--;
        }
        
        temp_coordinates = {x:currx, y:curry};
        
        //checking if the coordinates are valid
        for(var stiven = 0; stiven < snake_name.length; stiven++){
            if(temp_coordinates.x == snake_name.body[stiven].x && temp_coordinates.y == snake_name.body[stiven].y){
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
            snake_name.score++;
            snake_name.length++;
            food();
        }
        
        
        
        snake_name.body.unshift(temp_coordinates);
        
        
        //keeping or disposing of last box in the snake's body
        if(increase <= 0){
            snake_name.body.pop();
        }
        else {
            increase--;
        }
    }
            
    //reset function
    
    function reset(){
        alert("Play Again?");
        clearInterval(interval);
        setup();
        return;
    }
        
    
    //mini painting function
    function painter(coorx, coory, boxcolor){
        field.fillStyle=boxcolor; // make this player.color later
        field.strokeStyle="white";
        field.fillRect(coorx*box,coory*box,box,box);
        field.strokeRect(coorx*box,coory*box,box,box);
        field.fillStyle="white"; // make this player.color later
        field.strokeStyle="black";
    }

    
    function setup () {
        player = new Snake('black', "down");
        //initializing the body of the snake
        for (var c = player.length - 1; c >= 0; c--){
            player.body.push({x:1,y:c});
        }
        
        player2 = new Snake('blue', "up");
        //initializing the body of the snake
        for (var c = player2.length; c > 0; c--){
            player2.body.push({x:(width-2),y:(height-c)});
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
        else if((key == "39" || key == "68") && temp_direction !== "left") player.direction = "right";
        else if((key == "38" || key == "87") && temp_direction !== "down") player.direction = "up";
        else if((key == "37" || key =="65") && temp_direction !== "right") player.direction = "left";
    });
        
        
          
        
});
        
        
        
        
                    
        
    
   
    
    
    
        
        
