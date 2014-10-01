graph = new myGraph("#graph");
graph.addNode("A");
graph.addNodewithPos("B", 250, 250);
graph.addLink("A", "B");
var n = graph.getNodes();
console.log(n);

linkMgt(graph);
