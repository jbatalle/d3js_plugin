createStencil();
graph = new myGraph("#graph");
//graph.addNode("A");
//graph.addNodewithPos("B", 250, 250);
var newNode = {id: "C", fixed: true, transitions: [], x: 450, y:250, type: "ofSwitch", type: "helpImage"};
//graph.addNodewithData(newNode);
//graph.addLink("A", "B");
var n = graph.getNodes();
console.log(n);


function createSwitch(id, ports, x, y){
    OfSwitch.prototype = new NetworkElement();
    OfSwitch.prototype.constructor = OfSwitch;
    var name = "00:0"+id;
    var ofSw = new OfSwitch(name);
    ofSw.id = name;
    ofSw.setX(x);
    ofSw.setY(y);
    ofSw.setPorts(ports, ofSw.id);
    graph.addNodewithData(ofSw);
}

function defaultSwitches(){
    OfSwitch.prototype = new NetworkElement();
    var name = "00:0"+ graph.getNodes().length;
    var ofSw = new OfSwitch(name);
    ofSw.id = name;
    ofSw.setX(150);
    ofSw.setY(250);
    graph.addNodewithData(ofSw);

    OfSwitch.prototype = new NetworkElement();
    name = "00:0"+ graph.getNodes().length;
    ofSw = new OfSwitch(name);
    ofSw.id = name;
    ofSw.setX(250);
    ofSw.setY(250);
    graph.addNodewithData(ofSw);
}

