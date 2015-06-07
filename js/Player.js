var Snake = function(color, type) {
    var direction,
        score= 0,
        color= color,
        length= 5,
        body= [],
        id= id,
        temp_direction;
    
    var setup = function(type, width, height){
        if (type == 1){
            direction = "down";
            for (var c = length - 1; c >= 0; c--){
                body.push({x:1,y:c});
            };
        }
        if (type == 2){
            direction = "up";
            for (var c = length; c > 0; c--){
                body.push({x:(width-2),y:(height-c)});
            };
        }
    }

    var movement = function(){
        //snake mov't
        currx = body[0].x;
        curry = body[0].y; // huhuhuhu Curry  ;)
        //updating coordinates of new box to add to snake

        //document.write("    " + curry); // switched the ++ and  --
        if(direction ==="up") curry--;
        else if (direction==="down")curry++;
        else if (direction==="right")currx++;
        else if (direction==="left")currx--;


        var temp_coordinates = {x:currx, y:curry};

        if (temp_coordinates.x == body[1].x && temp_coordinates.y == body[1].y) {
            currx = body[0].x;
            curry = body[0].y;
            direction = temp_direction;
            if(direction ==="up") curry--;
            else if (direction==="down")curry++;
            else if (direction==="right")currx++;
            else if (direction==="left")currx--;
        }

        temp_coordinates = {x:currx, y:curry};

        //checking if the coordinates are valid
        for(var stiven = 0; stiven < snake_name.length; stiven++){
            if(temp_coordinates.x == body[stiven].x && temp_coordinates.y == body[stiven].y){
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
            score++;
            length++;
            food();
        }



        body.unshift(temp_coordinates);


        //keeping or disposing of last box in the snake's body
        if(increase <= 0){
            body.pop();
        }
        else {
            increase--;
        }
    }
    //paint snake
    var minipainter = function minipainter(field){

        //painting  player body
        for(var steven = 0; steven < length; steven++){
            painter(body[steven].x,body[steven].y, color, field);
        }
    }

    var painter = function (coorx, coory, boxcolor, field){
        field.fillStyle=boxcolor; // make this player.color later
        field.strokeStyle="white";
        field.fillRect(coorx*box,coory*box,box,box);
        field.strokeRect(coorx*box,coory*box,box,box);
        field.fillStyle="white"; // make this player.color later
        field.strokeStyle="black";
    }
    
    
    return{
        direction: direction,
        score: score,
        length: length,
        body: body,
        id: id,
        temp_direction: temp_direction,
        setup: setup,
        movement: movement,
        minipainter: minipainter
    }
        