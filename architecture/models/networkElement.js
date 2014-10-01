/* Network Element Model
* Other network elements are based on this.
*/

addJSFile('models/ports.js');
addJSFile('models/ofSwitch.js');

function NetworkElement() {
    this.name;
    this.type;
    this.data = {};
    this.ports = {};
}

NetworkElement.prototype.getName = function(){
  return this.name;
};
NetworkElement.prototype.getType = function(){
  return thus.type;
};