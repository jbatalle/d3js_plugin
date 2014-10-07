/* Network Element Model
* Other network elements are based on this.
*/

addJSFile('models/ports.js');
addJSFile('models/ofSwitch.js');

function NetworkElement(name, data) {
    this.name = name;
    this.type;
    this.data = data;
    this.ports = [];
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
    }
};