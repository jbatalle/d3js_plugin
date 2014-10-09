/* Network Element Model
* Other network elements are based on this.
*/

addJSFile('models/ports.js');
addJSFile('models/OfSwitch.js');
addJSFile('models/Router.js');

function NetworkElement(name, data, ports) {
    this.name = name;
    this.type;
    this.data = data;
    this.ports = ports;//[]
    this.x;
    this.y;
    this.posx;
    this.posy;
}

NetworkElement.prototype = {
    getName: function(){
        return this.name;
    },
    getType: function(){
        return this.type;
    },
    getData: function(){
        return this.data;
    },
    setX: function(x){
        this.x = x;
    },
    setY: function(y){
        this.y = y;
    },
    setPorts: function(ports){
	   this.ports = ports;
    },
    getPorts: function(){
	   return this.ports;
    }
};