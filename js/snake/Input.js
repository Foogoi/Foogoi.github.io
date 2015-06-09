function Input() {};

Input.tempdirect = null;
Input.currdirect = null;


Input.onKeyDown = function(e) {
    Input.tempdirect = Input.currdirect;
    switch (e.keyCode) {
        case 37:
        case 65:
          Input.currdirect = ;
          break;
        case 38:
        case 87:
          Input.UP = true;
          break;
        case 39:
        case 68:
          Input.RIGHT = true;
          break;
        case 40:
        case 83:
          Input.DOWN = true;
          break;
    };
};