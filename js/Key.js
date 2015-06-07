var Keys = function(direction){
    var onKeyDown = function(e) {
        var key = e.keyCode,
            temp = null;
        
        temp_direction = direction;
        if((key == "40" || key == "83") && temp_direction !== "up") temp = "down";
        else if((key == "39" || key == "68") && temp_direction !== "left") temp = "right";
        else if((key == "38" || key == "87") && temp_direction !== "down") temp = "up";
        else if((key == "37" || key =="65") && temp_direction !== "right") temp = "left";
    };
    return {
        direction:temp,
        prev_direction:temp_direction
    };
};
