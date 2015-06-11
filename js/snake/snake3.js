$(document).ready(function ( ){
    var field = $("#field")[0].getContext('2d'),
        width = $("#field").width(),
        height = $("#field").height(),
        apples = {},
        box,
        increase = 0,
        increase_size = 3,
        player = {},
        player2 ={},
        curry = 0,
        currx = 0,
        speed = 100,
        interval = null,
        snake_color = "black",
        name,
        players = [player, player2],
        initial_length = 5;
    
    
    /*
    -2 is "down"
    -1 is "left"
    1 is "right"
    2 is "up"
    */
    
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
    
    customize();
    
    width = width - (width%box);
    height = height - (height%box);
    width = width/box;
    height= height/box;
    
    
    
    
    
    //snake "class"
    function Snake(color, direction, name) {
        //basic properties of a snake
        this.direction = direction;
        this.score = 0;
        this.color = color;
        this.length = initial_length; 
        this.body = [];
        this.tempdirect = null;
        this.name = name;
        
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
        movement(player2);
        
        minipainter(player);
        minipainter(player2);
        
        
        //score
        field.fillStyle="black";
        field.font="20px Georgia";
        field.fillText("Player 1 Score: " + player.score,5,height*box-5);
        field.fillText("Player 2 Score: " + player2.score, 5, height*box - 25);
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
        if(snake_name.direction ===2) curry--;
        else if (snake_name.direction===-2)curry++;
        else if (snake_name.direction===1)currx++;
        else if (snake_name.direction===-1)currx--;
        
        
        var temp_coordinates = {x:currx, y:curry};
        
        if (temp_coordinates.x == snake_name.body[1].x && temp_coordinates.y == snake_name.body[1].y) {
            currx = snake_name.body[0].x;
            curry = snake_name.body[0].y;
            snake_name.direction = snake_name.tempdirect;
            if(snake_name.direction ===2) curry--;
            else if (snake_name.direction===-2)curry++;
            else if (snake_name.direction===1)currx++;
            else if (snake_name.direction===-1)currx--;
        }
        
        temp_coordinates = {x:currx, y:curry};
        
        //checking if the coordinates are valid
        for(var stiven = 0; stiven < snake_name.length; stiven++){
            if(temp_coordinates.x == snake_name.body[stiven].x && temp_coordinates.y == snake_name.body[stiven].y){
                reset(snake_name.name);
                return;
            }
        }
        
        
        if(currx<=-1||currx>=width||curry<=-1||curry>=height){
            reset(snake_name.name);
            return;
        }
        
        //checking if there is any food 
        if (temp_coordinates.x == apples.x && temp_coordinates.y == apples.y){
            increase += increase_size; //this is how many boxes the snake increases by
            snake_name.score++;
            snake_name.length++;
            food();
        }
        
        
        
        //checking if there is anyother snake
        /*
        for (var i = 0; i < players.length; i++){
            if (players[i] != snake_name) {
                for (var j = 0; j < players[i].length; j++) {
                    if (temp_coordinates.x == players[i].body[j].x && temp_coordinates.y == players[i].body[j].y) {
                        snake_collision(snake_name, players[i], j);
                    }
                }
            }
        }
        */
        
        if (snake_name == player){
            for (var j = 0; j < player2.length; j++) {
                    if (temp_coordinates.x == player2.body[j].x && temp_coordinates.y == player2.body[j].y) {
                        snake_collision(player, player2, j);
                    }
            }
        }
        else if (snake_name = player2){
            for (var j = 0; j < player.length; j++) {
                    if (temp_coordinates.x == player.body[j].x && temp_coordinates.y == player.body[j].y) {
                        snake_collision(player2, player, j);
                    }
            }
        }
                    
        
        
        
        
        
        snake_name.body.unshift(temp_coordinates);
        
        
        //keeping or disposing of last box in the snake's body
        if(increase <= 0){
            snake_name.body.pop();
        } else {
            increase--;
        }
    }
       

    function snake_collision(attacker, victim, position){
        var temp_body = null;
        if (attacker.length > victim.length){
            if (attacker.direction == -1*victim.direction && (position == 0)){
                alert(attacker.name + " has won, play again?");
                clearInterval(interval);
                setup();
                return;
            } else {
                if (position == 0 || position == 1) {
                    alert(attacker.name + " has won, play again?");
                    clearInterval(interval);
                    setup();
                    return;
                } else {
                    victim.body = victim.body.slice(0,position);
                    victim.score = position - initial_length;
                    victim.length = position;
                }
            }
        } else if (attacker.length < victim.length) {
            alert(victim.name + " has won, play again?");
            clearInterval(interval);
            setup();
            return;
        } else if (attacker.length == victim.length) {
            if (attacker.direction != -1*victim.direction){
                if (position == 0 || position == 1) {
                    alert(attacker.name + " has won, play again?");
                    clearInterval(interval);
                    setup();
                    return;
                } else {
                    victim.body = victim.body.slice(0,position);
                    victim.score = position - initial_length;
                    victim.length = position;
                }
            }
        }
    }
                
    //reset function
    
    function reset(name){
        alert(name + " has lost the game, play again?");
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
        player = new Snake(snake_color, -2, "Player 1");
        //initializing the body of the snake
        for (var c = player.length - 1; c >= 0; c--){
            player.body.push({x:1,y:c});
        }
        
        player2 = new Snake('blue', 2, "Player 2");
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
        
        player.tempdirect = player.direction;
        if((key == "83") && player.tempdirect !== 2) player.direction = -2;
        else if((key == "68") && player.tempdirect !== -1) player.direction = 1;
        else if((key == "87") && player.tempdirect !== -2) player.direction = 2;
        else if((key =="65") && player.tempdirect !== 1) player.direction = -1;
        
        player2.tempdirect = player2.direction;
        if((key == "75") && player2.tempdirect !== 2) player2.direction = -2;
        else if((key == "76") && player2.tempdirect !== -1) player2.direction = 1;
        else if((key == "73") && player2.tempdirect !== -2) player2.direction = 2;
        else if((key == "74") && player2.tempdirect !== 1) player2.direction = -1;
    });
        
        
          
        
});
        
        
        
        
                    
        
    
   
    
    
    
        
        
