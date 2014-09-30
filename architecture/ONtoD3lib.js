/* OpenNaaS D3.js API
More generic functions
this script handle the topology information.

maintain the topolgy definition (json), allows to add, get or remove elements.

*/

/*
addJSFile('templates.js');
*/
var topology = [];

function canvasSize(x, y){
    
}

function getTopology(){
    return topology;
}

function createElement(type){
    
    
}


function createNetworkElement(){
    var netE = new NetworkElement();
    console.log(netE);
    topology.push(netE);
}

function createDomain(){
    
}

function createNetwork(){
    
}

function getNetworkElements(){
    console.log(topology);
    return topology;
}


function removeNetworkElement(){
    
}

function removeDomain(){
    
}

function removeNetwork(){
    
}

/*
* Add a new Javascript file in the html
*/
function addJSFile(jsFileName){
    var x = document.createElement('script');
    x.src = jsFileName;
    document.getElementsByTagName("head")[0].appendChild(x);
}
