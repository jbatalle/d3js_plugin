graph = new myGraph("#graph");
graph.addNode("A");
//graph.addNodewithPos("B", 250, 250);
var newNode = {id: "C", fixed: true, transitions: [], x: 450, y:250, type: "ofSwitch", type: "helpImage"};
//graph.addNodewithData(newNode);
//graph.addLink("A", "B");
var n = graph.getNodes();
console.log(n);

//linkMgt(graph);
defaultSwitches();

function createSwitch(){
    defaultSwitches();
    ofSwitch.prototype = new NetworkElement();
    var name = "00:0"+ graph.getNodes().length;
    var ofSw = new ofSwitch(name);
    ofSw.id = name;
    ofSw.x = 550;
    ofSw.y = 350;
    graph.addNodewithData(ofSw);
}

function defaultSwitches(){
    ofSwitch.prototype = new NetworkElement();
    var name = "00:0"+ graph.getNodes().length;
    var ofSw = new ofSwitch(name);
    ofSw.id = name;
    ofSw.x = 150;
    ofSw.y = 250;
    graph.addNodewithData(ofSw);
    
    var name = "00:0"+ graph.getNodes().length;
    var ofSw = new ofSwitch(name);
    ofSw.id = name;
    ofSw.x = 250;
    ofSw.y = 250;
    graph.addNodewithData(ofSw);
}