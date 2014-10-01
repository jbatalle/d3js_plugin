function linkMouseDown(link) {
    console.log("Click down on Link");
}

function linkMouseUp(link) {
    console.log("Click up on Link");
}

function nodeMouseDown(node) {
    // select node
    mousedown_node = node;
    if (mousedown_node === selected_node) selected_node = null;
    else selected_node = mousedown_node;
    selected_link = null;
    $(document).on("dragstart", function () {
        return false;
    }); //disable drag in Firefox 3.0 and later
    // reposition drag line
    drag_line
        .style('marker-end', 'url(#end-arrow)')
        .classed('hidden', false)
        .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);
}

/* End create Link */
function nodeMouseUp(d) {
    var links = graph.getLinks();
    var nodes = graph.getNodes();
    if (!mousedown_node) return;

    // needed by FF
    drag_line
        .classed('hidden', true)
        .style('marker-end', '');
    // check for drag-to-self
    mouseup_node = d;
    if (mouseup_node === mousedown_node) {
        resetMouseVars();
        return;
    }
    // add link to graph (update if exists)
    // NB: links are strictly source < target; arrows separately specified by booleans
    var source, target, newSource;
    source = mousedown_node;
    target = mouseup_node;
    newSource = source;
    console.log("Source " + source.id + " to Dest " + target.id);
    var link;
    link = links.filter(function (l) { return (l.source === source && l.target === target); })[0];

    d3.selectAll('.dragline').attr('d', 'M0,0L0,0'); //Remove the requested path

    graph.addLink(source.id, target.id);

    // select new link
    selected_link = link;
    selected_node = null;
    //            updateLinks();

}