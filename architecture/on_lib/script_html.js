var stencil_image_width = 60;//px

$(function () {
    /* Information message */
    $(".ui-widget").hide();
    
    /* END Information message */
    
    /* Stencil - Images draggables to d3js */
    $(".netEl-drag").draggable({
        helper: "clone"
    }); //Network elements draggable
    $("#graph").droppable({
        drop: function (event, ui) {
            x = ui.helper.clone();
            ui.helper.remove();
            x.draggable({
                	helper: 'original',
                	cursor: 'move',
                //containment: '#droppable',
	                tolerance: 'fit',
                	drop: function (event, ui) {
	                    $(ui.draggable).remove();
	        	}
            });
            var nodeType = ui.draggable.attr("id"),//select the id of the element
                divPos = {},
                $div = $("#graph"),
                e = window.event;

            divPos = {//position where the element is dropped
                x: e.pageX - $div.offset().left,
                y: e.pageY - $div.offset().top
            };

            createElement(nodeType, divPos);
            showInfoMessage();
            //$("#"+nodeType").remove();
        }
    });
    /* END Stencil - Images draggables to d3js */
});

function createElement(type, divPos) {
    console.log("Create element " + type + " " + divPos);
    switch (type) {
    case "ofSwitch":
        createofSwitch(divPos);
        break;
    case "ofController":
        createofController(divPos);
        break;
    case "host":
        createHost(divPos);
        break;
    case "laptop":
        console.log("Element not defined yet");
        createLaptop(divPos);
        break;
    default:
        console.log("Element not defined");
        return;
    }
    
}

function createofSwitch(divPos) {
    ofSwitch.prototype = new NetworkElement();
    var name = "ofSw" + graph.getNodes().length;
    var ofSw = new ofSwitch(name);
    ofSw.id = name;
    ofSw.setX(divPos.x);
    ofSw.setY(divPos.y);
    var ports = [{"id": ofSw.id+"1", "name": "ge-0/1", x: (ofSw.x+45), y: (ofSw.x+12), posx: 23, posy: 12, parent: ofSw.id},
	             {"id": ofSw.id+"2", "name": "ge-2/1", x: (ofSw.x+45), y: (ofSw.y+12), posx: 45, posy: 12, parent: ofSw.id}];
    ofSw.setPorts(ports);
    console.log(ofSw);
    graph.addNodewithData(ofSw);
}

function showInfoMessage(){
    $("#info_message").show();
    setInterval(function () { $("#info_message").hide();}, 3000);
}

function showErrorMessage(){
    $("#error_message").show();
    setInterval(function () { $("#error_message").hide();}, 3000);
}

function createLaptop(){
    showErrorMessage();
}

function createStencil(){
	var stencilDiv = document.getElementById("stencil");
	el = generateHtmlDivElement("ofSwitch");
	stencilDiv.appendChild(el);
    el = generateHtmlDivElement("laptop");
	stencilDiv.appendChild(el);
}

function generateHtmlDivElement(type){
	var imgEl = document.createElement("img");
	imgEl.src = "img/"+type+".png";
    imgEl.width = stencil_image_width;
	var el = document.createElement("div");
	el.id = type;
	el.className = "ui-widget-content netEl-drag";
	el.appendChild(imgEl);
	return el;
}