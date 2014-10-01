
var graph,
    selected_node = null,
    selected_link = null,
    mousedown_link = null,
    mousedown_node = null,
    mouseup_node = null,
    ctrlKey = false;//ctrl key is pressed?;

//images...
var graphImage = {};
graphImage["ofSwitch"] = "img/ofSwitch.png";
graphImage["ofController"] = "img/ofController.png";
graphImage["helpImage"] = "img/helpImage.png";

d3.select(window)
    .on('keydown', keydown)
    .on('keyup', keyup);

function keyup() {
  ctrlKey = false;
}

function keydown() {
  ctrlKey = d3.event.ctrlKey || d3.event.metaKey;
}

function resetMouseVars() {
    mousedown_node = null;
    mouseup_node = null;
    mousedown_link = null;
}
