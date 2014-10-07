createStencil();
graph = new myGraph("#graph");
//graph.addNode("A");
//graph.addNodewithPos("B", 250, 250);
var newNode = {id: "C", fixed: true, transitions: [], x: 450, y:250, type: "ofSwitch", type: "helpImage"};
//graph.addNodewithData(newNode);
//graph.addLink("A", "B");
var n = graph.getNodes();
console.log(n);

function createSwitches(){
    divPos = { x: 200, y:200};
    createofSwitch(divPos);
    divPos = { x: 400, y:200};
    createofSwitch(divPos);
}

//linkMgt(graph);

function createSwitch(){
    defaultSwitches();
    ofSwitch.prototype = new NetworkElement();
    var name = "00:0"+ graph.getNodes().length;
    var ofSw = new ofSwitch(name);
    ofSw.id = name;
    ofSw.setX(100*graph.getNodes().length);
    ofSw.setY(350);
    graph.addNodewithData(ofSw);
}

function defaultSwitches(){
    ofSwitch.prototype = new NetworkElement();
    var name = "00:0"+ graph.getNodes().length;
    var ofSw = new ofSwitch(name);
    ofSw.id = name;
    ofSw.setX(150);
    ofSw.setY(250);
    graph.addNodewithData(ofSw);
    
    ofSwitch.prototype = new NetworkElement();
    name = "00:0"+ graph.getNodes().length;
    ofSw = new ofSwitch(name);
    ofSw.id = name;
    ofSw.setX(250);
    ofSw.setY(250);
    graph.addNodewithData(ofSw);
}