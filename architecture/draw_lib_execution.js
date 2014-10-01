graph = new myGraph("#graph");
graph.addNode("A");
graph.addNodewithPos("B", 250, 250);
var newNode = {id: "C", fixed: true, transitions: [], x: 450, y:250, type: "ofSwitch", type: "helpImage"};
graph.addNodewithData(newNode);
//graph.addLink("A", "B");
var n = graph.getNodes();
console.log(n);

//linkMgt(graph);

function createSwitch(){
    var netE = new NetworkElement();
    console.log(netE);
    var ofSw = new ofSwitch("00:;0");
    console.log(ofSw);
    ofSw.x = 550;
    ofSw.y = 350;
    graph.addNodewithData(ofSw);
}