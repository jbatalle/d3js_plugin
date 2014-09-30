var startState, endState;

var drag = d3.behavior.drag()
            .on("drag", function( d, i) {
    console.log( "drag");
    if( startState) {
        return;
    }

    var selection = d3.selectAll( '.selected');

        // if dragged state is not in current selection
        // mark it selected and deselect all others
    if( selection[0].indexOf( this)==-1) {
        selection.classed( "selected", false);
        selection = d3.select( this);
        selection.classed( "selected", true);
    } 

        // move states
    selection.attr("transform", function( d, i) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        return "translate(" + [ d.x,d.y ] + ")"
    });

        // move transistion points of each transition 
        // where transition target is also in selection
    var selectedStates = d3.selectAll( 'g.node.selected').data();
    var affectedTransitions = selectedStates.reduce( function( array, state) {
        return array.concat( state.transitions);
    }, [])
    .filter( function( transition) {
        console.log(transition);
        return selectedStates.indexOf( transition.target)!=-1;
    });
    affectedTransitions.forEach( function( transition) {
        for( var i = transition.points.length - 1; i >= 0; i--) {
            var point = transition.points[i];
            point.x += d3.event.dx;
            point.y += d3.event.dy;
        }
    });

        // reappend dragged element as last 
        // so that its stays on top 
    selection.each( function() {
        this.parentNode.appendChild( this);
    });             

     

    d3.event.sourceEvent.stopPropagation();
})
.on( "dragend", function( d) {
    console.log( "dragend");
    // TODO : http://stackoverflow.com/questions/14667401/click-event-not-firing-after-drag-sometimes-in-d3-js

    // needed by FF
    drag_line
        .classed('hidden', true)
        .style('marker-end', '')
    ;

    if( startState && endState) {
        startState.transitions.push( { label : "transition label 1", points : [], target : endState});
        update();
    }

    startState = undefined;
    d3.event.sourceEvent.stopPropagation();
});
    
    
    
     