/**
* Draw library. This library creates the SVG and allows to add/remove nodes...
*
*/
var startState, endState, drag_line;

function myGraph(el) {
     
    // Add and remove elements on the graph object
    this.addNode = function (id) {
        nodes.push({id: id, fixed: true, transitions: [], x: 200, y:200});
        update();
    }
    
    this.addNodewithPos = function (id, x, y) {
        nodes.push({id: id, fixed: true, transitions: [], x: x, y:y});
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
        links.push({"source":findNode(source),"target":findNode(target)});
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
    
    this.getLinks = function() {
        return links;   
    }
 
    // set up the D3 visualisation in the specified element
    var w = $(el).innerWidth(),
        h = $(el).innerHeight();
 
    var vis = this.vis = d3.select(el).append("svg:svg")
        .attr("width", w)
        .attr("height", h);
 
    var force = d3.layout.force()
        .linkDistance(30)
        .size([w, h]);
 
    var drag_line = vis.append('svg:path')
        .attr({
            'class' : 'dragline hidden',
            'd'     : 'M0,0L0,0'
        });
    
    var nodes = force.nodes(),
        links = force.links();
 
    var update = this.update = function () {
 
        var link = vis.selectAll("line.link")
            .data(links, function(d) { return d.source.id + "-" + d.target.id; });
 
        link.enter().insert("line")
            .attr("class", "link")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        link.exit().remove();
 
        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id;});
 
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .on("mousedown", function(d){
                startState =d, endState = undefined;
                // reposition drag line
            })
            .call( drag);
        /*d3.behavior.drag()
                .on("dragstart", function(d){
console.log("Dragstart enabled");
                d3.event.sourceEvent.stopPropagation();
                d3.select(this).classed("dragging", true);
            })
            .on("drag", function(d) {
                node_id = findNodeIndex(d.id);
                d.px += d3.event.dx;
                    d.py += d3.event.dy;
                    d.x = d3.event.x, d.y = d3.event.y;
                    nodes[node_id].x = d.x;
                    nodes[node_id].y = d.y;
                    nodes[node_id].fixed = true;
                console.log(links);
                    node.filter(function(n) { return n.id === d.id; }).attr("transform", transform);
                    link.filter(function(l) { console.log("LinkFilter");console.log(l); return l.source === d; }).attr("x1", d.x).attr("y1", d.y);
//                    link.filter(function(l) { return l.target === d; }).attr("x2", d.x).attr("y2", d.y);
                console.log(links[0].source.x + " " +links[0].source.y);
            })
            .on("dragend", function(d){
console.log("Dragend");
                //updateTopology(nodes, links);
                d3.select(this).classed("dragging", false);
            })
	);
 */
        nodeEnter.append("image")
            .attr("class", "circle")
            .attr("xlink:href", "helpImage.jpg")
            .attr("fixed", false)
            .attr("x", "-8px")
            .attr("y", "-8px")
            .attr("cx", function (d) {return d.x - 20;})
            .attr("cy", function (d) {return d.y - 15;})
            .attr("width", "20px")
            .attr("height", "20px");
 
        nodeEnter.append("text")
            .attr("class", "nodetext")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) {return d.id});

        nodeEnter.attr("transform", function (d) {
        console.log(d.x + "," + d.y);
        return "translate(" + d.x + "," + d.y + ")";
    });
        node.exit().remove();
 
        /* Multi selection */
        var radius = 40;
        vis.on({
            mousedown : function() {
                console.log("Selection enabled");
                if( d3.event.target.tagName=='svg') {
                    if( !d3.event.ctrlKey) {
                        d3.selectAll( 'g.selected').classed( "selected", false);
                    }

                    var p = d3.mouse( this);

                    vis.append( "rect")
                        .attr({
                            rx      : 6,
                            ry      : 6,
                            class   : "selection",
                            x       : p[0],
                            y       : p[1],
                            width   : 0,
                            height  : 0
                        });
                    }
            },
            mousemove : function() {
            var p = d3.mouse( this),
                s = vis.select( "rect.selection");

            if( !s.empty()) {
                var d = {
                        x       : parseInt( s.attr( "x"), 10),
                        y       : parseInt( s.attr( "y"), 10),
                        width   : parseInt( s.attr( "width"), 10),
                        height  : parseInt( s.attr( "height"), 10)
                    },
                    move = {
                        x : p[0] - d.x,
                        y : p[1] - d.y
                    };
                if( move.x < 1 || (move.x*2<d.width)) {
                    d.x = p[0];
                    d.width -= move.x;
                } else {
                    d.width = move.x;       
                }

                if( move.y < 1 || (move.y*2<d.height)) {
                    d.y = p[1];
                    d.height -= move.y;
                } else {
                    d.height = move.y;       
                }

                s.attr( d);

                    // deselect all temporary selected state objects
                d3.selectAll( 'g.node.selection.selected').classed( "selected", false);
console.log("Select");
                d3.selectAll( 'g.node').each( function( state_data, i) {
                    if( 
                        !d3.select( this).classed( "selected") && 
                            // inner circle inside selection frame
                        state_data.x-radius>=d.x && state_data.x+radius<=d.x+d.width && 
                        state_data.y-radius>=d.y && state_data.y+radius<=d.y+d.height
                    ) {

                        d3.select( this)
                        .classed( "selection", true)
                        .classed( "selected", true);
                    }
                });
            } else if( startState) {
                    // update drag line
                drag_line.attr('d', 'M' + startState.x + ',' + startState.y + 'L' + p[0] + ',' + p[1]);

//                var state = d3.select( 'g.node .inner.hover');
                var state = d3.select( 'g.node');
                
                endState = (!state.empty() && state.data()[0]) || undefined;
            }
        },
        mouseup : function() {
            console.log( "mouseup");
                // remove selection frame
            vis.selectAll( "rect.selection").remove();

                // remove temporary selection marker class
            d3.selectAll( 'g.node.selection').classed( "selection", false);
        },
        mouseout : function() {
            if( !d3.event.relatedTarget || d3.event.relatedTarget.tagName=='HTML') {
                    // remove selection frame
                vis.selectAll( "rect.selection").remove();

                    // remove temporary selection marker class
                d3.selectAll( 'g.node.selection').classed( "selection", false);
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