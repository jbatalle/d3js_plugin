
var graph,
    selected_node = null,
    selected_link = null,
    mousedown_link = null,
    mousedown_node = null,
    mouseup_node = null,
    ctrlKey = false;//ctrl key is pressed?;



function keyup() {
  ctrlKey = false;
}

function resetMouseVars() {
    mousedown_node = null;
    mouseup_node = null;
    mousedown_link = null;
}