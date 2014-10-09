/* OpenFlow Switch Model
 * Specific parameters: name, dpid, ports
 */
function ofSwitch(dpid) {
    this.data = {"dpid": dpid};
    this.type = "ofSwitch";
    this.width = "60px";
    this.height = "60px";
    this.text_x = 0;
    this.text_y = 40;

    NetworkElement.call(this, dpid, this.data);
}

ofSwitch.prototype = {
    getPorts: function(){
        return this.ports;
    },setPorts: function(ports){
	this.ports = ports;
    }
};