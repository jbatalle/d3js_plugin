graph = new myGraph("#graph");
console.log(graph.getWidth());
console.log(graph.getHeight());
//algorithm();

var xmlTopology = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <ns2:topology xmlns:ns2="opennaas.api"> <networkElements> <networkElement xsi:type="switch" id="openflowswitch:s1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <state> <congested>false</congested> </state> <ports> <port id="s1.1"> <state> <congested>false</congested> </state> </port> <port id="s1.2"> <state> <congested>false</congested> </state> </port> <port id="s1.3"> <state> <congested>false</congested> </state> </port> <port id="s1.4"> <state> <congested>false</congested> </state> </port> </ports> </networkElement> <networkElement xsi:type="switch" id="openflowswitch:s2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <state> <congested>false</congested> </state> <ports> <port id="s2.1"> <state> <congested>false</congested> </state> </port> <port id="s2.2"> <state> <congested>false</congested> </state> </port> <port id="s2.3"> <state> <congested>false</congested> </state> </port> </ports> </networkElement> <networkElement xsi:type="switch" id="openflowswitch:s3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <state> <congested>false</congested> </state> <ports> <port id="s3.1"> <state> <congested>false</congested> </state> </port> <port id="s3.2"> <state> <congested>false</congested> </state> </port> <port id="s3.3"> <state> <congested>false</congested> </state> </port> <port id="s3.4"> <state> <congested>false</congested> </state> </port> </ports> </networkElement> </networkElements> <links> <link> <state> <congested>false</congested> </state> <srcPort>s1.1</srcPort> <dstPort>s2.1</dstPort> </link> <link> <state> <congested>false</congested> </state> <srcPort>s1.2</srcPort> <dstPort>s3.1</dstPort> </link> <link> <state> <congested>false</congested> </state> <srcPort>s2.2</srcPort> <dstPort>s3.2</dstPort> </link> </links> <networkDevicePortIdsMap> <entry> <key>s1.1</key> <value> <deviceId>openflowswitch:s1</deviceId> <devicePortId>1</devicePortId> </value> </entry> <entry> <key>s1.2</key> <value> <deviceId>openflowswitch:s1</deviceId> <devicePortId>2</devicePortId> </value> </entry> <entry> <key>s1.3</key> <value> <deviceId>openflowswitch:s1</deviceId> <devicePortId>3</devicePortId> </value> </entry> <entry> <key>s1.4</key> <value> <deviceId>openflowswitch:s1</deviceId> <devicePortId>4</devicePortId> </value> </entry> <entry> <key>s2.1</key> <value> <deviceId>openflowswitch:s2</deviceId> <devicePortId>1</devicePortId> </value> </entry> <entry> <key>s2.2</key> <value> <deviceId>openflowswitch:s2</deviceId> <devicePortId>2</devicePortId> </value> </entry> <entry> <key>s2.3</key> <value> <deviceId>openflowswitch:s2</deviceId> <devicePortId>3</devicePortId> </value> </entry> <entry> <key>s3.1</key> <value> <deviceId>openflowswitch:s3</deviceId> <devicePortId>1</devicePortId> </value> </entry> <entry> <key>s3.2</key> <value> <deviceId>openflowswitch:s3</deviceId> <devicePortId>2</devicePortId> </value> </entry> <entry> <key>s3.3</key> <value> <deviceId>openflowswitch:s3</deviceId> <devicePortId>3</devicePortId> </value> </entry> <entry> <key>s3.4</key> <value> <deviceId>openflowswitch:s3</deviceId> <devicePortId>4</devicePortId> </value> </entry> </networkDevicePortIdsMap> </ns2:topology>';
var json = convertXml2JSon(xmlTopology);
console.log(eval("(" + json + ")"));
json = eval("(" + json + ")");

//drawTopology(json);

function drawTopology(){
    var networkElements = json.topology.networkElements.networkElement;
    var links = json.topology.links.link;
    var nodes = [];
    //for each network element
    console.log(json);
    for(var i=0; i<networkElements.length; i++){
        var type = networkElements[i]["_xsi:type"];
        var id = networkElements[i]._id.split(":")[1];
        var ports = networkElements[i].ports.port;
//        createSwitch(id, ports);
        var node = {};
        node.id = id;
        node.type = type;
        node.ports = ports;
        node.x = Math.floor((Math.random() * graph.getWidth()) + 1);
        node.y = Math.floor((Math.random() * graph.getHeight()) + 1);
        node.net_force = {};
        node.velocity = {x: 0, y:0};
        nodes.push(node);
        //{id:1, x: 10, y: 20, net_force: {}, velocity: {}
    }
    var edges = [];
    var edge = {};
    for(var i=0; i<links.length; i++){
        edge = {};
        for(var j=0; j<nodes.length; j++){
            for(t = 0; t < nodes[j].ports.length; t++){
                if( nodes[j].ports[t]._id === links[i].srcPort ){
                    srcP = j;
                }
                if( nodes[j].ports[t]._id === links[i].dstPort ){
                    dstP = j;
                }
            }
        }
        edge = {s: srcP, t: dstP};
        edges.push(edge);
    }

    //create edges
var matrix = [];
for(var i=0; i<nodes.length; i++) {
    matrix[i] = [];
    for(var j=0; j<nodes.length; j++) {
        matrix[i][j] = false;
    }
}
for(var i=0; i<edges.length; i++) {
    matrix[edges[i].s][edges[i].t] = true;
    matrix[edges[i].t][edges[i].s] = true;
}
console.log(matrix);

    nodes = StaticForcealgorithm(nodes, matrix);
    for(i=0; i < nodes.length; i++){
    console.log(nodes[i].x + " "+ nodes[i].y);
           if(nodes[i].x < 0){
               nodes[i].x = nodes[i].x + graph.getWidth()/2;
           }
           if(nodes[i].y < 0){
               nodes[i].y = nodes[i].y + graph.getHeight()/2;
           }
           if(nodes[i].x > graph.getWidth()){
               nodes[i].x = graph.getWidth();
           }
           if(nodes[i].y > graph.getHeight()){
               nodes[i].y = graph.getHeight();
           }
        createSwitch(nodes[i].id, nodes[i].ports, nodes[i].x, nodes[i].y);

       }

}
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

