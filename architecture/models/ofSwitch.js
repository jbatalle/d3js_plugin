

function ofSwitch(dpid) {
    this.name;
    this.data = {dpid: dpid};
    this.type = "ofSwitch";
    this.width = "60px";
    this.height = "60px";
    this.ports = {};
    this.x;
    this.y;
    
    NetworkElement.call(this, name);
    //this.subject = subject;
}


ofSwitch.prototype.getPorts = function(){
  return this.ports;
};
ofSwitch.prototype.getData = function(){
  return this.data;
};