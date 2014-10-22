var info_message, error_message;
var graph,
    selected_node = null,
    selected_link = null,
    mousedown_link = null,
    mousedown_node = null,
    mouseup_node = null,
    ctrlKey = false;//ctrl key is pressed?;

//Node images. The key option of the map is the node type defined in each model of data
var graphImage = {};
graphImage["ofSwitch"] =        "img/ofSwitch.png";
graphImage["router"] =        "img/router.png";
graphImage["ofController"] =    "img/ofController.png";
graphImage["laptop"] =    "img/laptop.png";
graphImage["helpImage"] =       "img/helpImage.png";

//Editor options
var multiSelectMode = false;

d3.select(window)
    .on('keydown', keydown)
    .on('keyup', keyup);

