/**
* Draw library. This library creates the SVG and allows to add/remove nodes...
* 
* · on_lib/globalPluginFunctions contains the Global variables (graph, pushed keys...)
* · Multiselection is handled by on_lib/multiselect file and the vis.on function in this file.
* · Link management (create links, see link info, remove links...) in on_lib/link_mgt
*
*/

addJSFile('models/elements.js');

var startState, endState, drag_line;
var drag_line;

function myGraph(el) {
     
    // Add and remove elements on the graph object
    this.addNode = function (id) {
        nodes.push({id: id, fixed: true, type: "helpImage", transitions: [], x: 200, y:200, width: "20px", height: "20px"});
        update();
    }
    
    this.addNodewithPos = function (id, x, y) {
        nodes.push({id: id, fixed: true, type: "helpImage", transitions: [], x: x, y: y, width: "20px", height: "20px"});
        update();
    }
    
    this.addNodewithData = function (data) {
        data.fixed = true;
        data.transitions = [];
        nodes.push(data);
        update();
    }
 
    this.removeNode = function (id) {
        var i = 0,
            n = findNode(id);
        while (i < links.length) {
            if ((links[i]['source'] == n)||(links[i]['target'] == n)) links.splice(i,1);
            else i++;
        }
        nodes.splice(findNodeIndex(id),1);
        update();
    }
 
    this.addLink = function (source, target) {
console.log("add link");        
        links.push({id: source+"-"+target, source:findNode(source), target:findNode(target)});
        console.log(links);
        update();
    }
    
    this.removeLink = function (id) {
        links.splice(findLinkIndex(id),1);
        update();
    }
 
    var findNode = function(id) {
        for (var i in nodes) {if (nodes[i]["id"] === id) return nodes[i]};
    }
    
    var findLink = function(id) {
        for (var i in links) {if (link[i]["id"] === id) return link[i]};
    }
 
    var findNodeIndex = function(id) {
        for (var i in nodes) {if (nodes[i]["id"] === id) return i};
    }
    
    var findLinkIndex = function(id) {
        for (var i in links) {if (links[i]["id"] === id) return i};
    }
    
    this.getNodes = function() {
        return nodes;   
    }
    
    this.getNode = function(nodeId) {
        return findNode(nodeId);
    }
    
    this.setNode = function(node) {
        nodes[node.id] = node;
    }
    
    this.getLinks = function() {
        return links;   
    }
 
    // set up the D3 visualisation in the specified element
    var w = $(el).innerWidth(),
        h = $(el).innerHeight();
 
    this.getWidth = function() {
        return w;   
    }
    this.getHeight = function() {
        return h;   
    }
    
    var vis = this.vis = d3.select(el).append("svg:svg")
        .attr("width", w)
        .attr("height", h);
 
    var force = d3.layout.force()
        .linkDistance(30)
        .size([w, h]);
 
    drag_line = vis.append('svg:path')
        .attr({ 'class' : 'dragline hidden', 'd' : 'M0,0L0,0'});
    
    var nodes = force.nodes(),
        links = force.links();
 
    var link = vis.append("svg:g").selectAll("link.sw");
    
    var update = this.update = function () {
 console.log("Updated executed");
        link = link.data(links);
 
        link.enter().append("svg:line")
            .attr('id', function (d) {return d.id;})
            .attr("class", "link")
            .attr("stroke", "black")
            .on("mousedown", function(d){
                linkMouseDown(d);
            })
            .on('mouseover', function (d) {
            })
            .on('mouseup', function (d) {
                linkMouseUp(d);
            });
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; })
        
        link.exit().remove();
 
        var node = vis.selectAll("g.node")
            .data(nodes);
 
        var nodeEnter = this.nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("px", function (d) {return d.x;})
            .attr("py", function (d) {return d.y;})
            .on("mousedown", function(d){
                if (!ctrlKey) {
                    startState =d, endState = undefined;
                    // reposition drag line
                    nodeMouseDown(d);
                }
            })
            .on('mouseover', function (d) {

            })
            .on('mouseup', function (d) {
                nodeMouseUp(d);
            })
            .call(drag);
        
        nodeEnter.append("image")
            .attr("xlink:href", function(d){return graphImage[d.type];})
            .attr("fixed", false)
            .attr("x", "-20px")//-8px
            .attr("y", "-20px")
            .attr("width", function(d){ return d.width;})
            .attr("height", function(d){ return d.height;});
 
        nodeEnter.append("text")
            .attr("class", "nodetext")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) {return d.id});

        nodeEnter.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        
        node.exit().remove();
 
        /****************** Multi selection - Rectangle that allows select ****************************/
            /************** Should need an activation. multiSelectMode var **************/
        var radius = 40;
        vis.on({
            mousedown: function () {
                console.log("Selection enabled");
                if (d3.event.target.tagName == 'svg') {
                    if (!d3.event.ctrlKey) {
                        d3.selectAll('g.selected').classed("selected", false);
                    }

                    var p = d3.mouse(this);

                    vis.append("rect")
                        .attr({
                            rx: 6,
                            ry: 6,
                            class: "selection",
                            x: p[0],
                            y: p[1],
                            width: 0,
                            height: 0
                        });
                }
            },
            mousemove: function () {
                var p = d3.mouse(this),
                    s = vis.select("rect.selection");

                if (!s.empty()) {
                    var d = {
                        x: parseInt(s.attr("x"), 10),
                        y: parseInt(s.attr("y"), 10),
                        width: parseInt(s.attr("width"), 10),
                        height: parseInt(s.attr("height"), 10)
                    },
                        move = {
                            x: p[0] - d.x,
                            y: p[1] - d.y
                        };
                    if (move.x < 1 || (move.x * 2 < d.width)) {
                        d.x = p[0];
                        d.width -= move.x;
                    } else {
                        d.width = move.x;
                    }

                    if (move.y < 1 || (move.y * 2 < d.height)) {
                        d.y = p[1];
                        d.height -= move.y;
                    } else {
                        d.height = move.y;
                    }

                    s.attr(d);

                    // deselect all temporary selected state objects
                    d3.selectAll('g.node.selection.selected').classed("selected", false);
                    console.log("Select");
                    d3.selectAll('g.node').each(function (state_data, i) {
                        if (!d3.select(this).classed("selected") &&
                            // inner circle inside selection frame
                            state_data.x - radius >= d.x && state_data.x + radius <= d.x + d.width &&
                            state_data.y - radius >= d.y && state_data.y + radius <= d.y + d.height
                        ) {

                            d3.select(this)
                                .classed("selection", true)
                                .classed("selected", true);
                        }
                    });
                } else if (startState) {
                    // update drag line
                    drag_line.attr('d', 'M' + startState.x + ',' + startState.y + 'L' + p[0] + ',' + p[1]);

                    //                var state = d3.select( 'g.node .inner.hover');
                    var state = d3.select('g.node');

                    endState = (!state.empty() && state.data()[0]) || undefined;
                }
            },
            mouseup: function () {
                console.log("mouseup");
                // remove selection frame
                vis.selectAll("rect.selection").remove();

                // remove temporary selection marker class
                d3.selectAll('g.node.selection').classed("selection", false);
            },
            mouseout: function () {
                if (!d3.event.relatedTarget || d3.event.relatedTarget.tagName == 'HTML') {
                    // remove selection frame
                    vis.selectAll("rect.selection").remove();

                    // remove temporary selection marker class
                    d3.selectAll('g.node.selection').classed("selection", false);
                }
            }
        });
       
        /* END Multi selection */
        
        force.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
 
          //node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
 
        // Restart the force layout.
        force.start();
    }
 
    // Make it all go
    update();
}

function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
}

function updateNodes(){
    
}