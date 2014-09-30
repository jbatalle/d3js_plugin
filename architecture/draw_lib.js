/**
* Draw library. This library creates the SVG and allows to add/remove nodes...
*
*/
function myGraph(el) {
 
    // Add and remove elements on the graph object
    this.addNode = function (id) {
        nodes.push({"id":id});
        update();
    }
 
    this.removeNode = function (id) {
        var i = 0;
        var n = findNode(id);
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
 
    // set up the D3 visualisation in the specified element
    var w = $(el).innerWidth(),
        h = $(el).innerHeight();
 
    var vis = this.vis = d3.select(el).append("svg:svg")
        .attr("width", w)
        .attr("height", h);
 
    var force = d3.layout.force()
        .gravity(.05)
        .distance(100)
        .charge(-500)
        .size([w, h]);
 
    var nodes = force.nodes(),
        links = force.links();
 
    var update = function () {
 
        var link = vis.selectAll("line.link")
            .data(links, function(d) { return d.source.id + "-" + d.target.id; });
 
        link.enter().insert("line")
            .attr("class", "link");
 
        link.exit().remove();
 
        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id;});
 
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .call(force.drag);
 
        nodeEnter.append("image")
            .attr("class", "circle")
            .attr("xlink:href", "helpImage.jpg")
            .attr("x", "-8px")
            .attr("y", "-8px")
            .attr("width", "0px")
            .attr("height", "0px")
            .transition()
            .ease("bounce")
            .duration(2000)
            .attr("width", "20px")
            .attr("height", "20px");
 
        nodeEnter.append("text")
            .attr("class", "nodetext")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) {return d.id});
 
        node.exit().remove();
 
        force.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
 
          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
 
        // Restart the force layout.
        force.start();
    }
 
    // Make it all go
    update();
}
 
