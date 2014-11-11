d3js_plugin
===========

TODO:
-----
 - Selection. First 5 seconds doesn't work
 - Create links with drag (1/2). Put mode type
 - Add ports (1/2) <img width="20" src="http://www.clipartbest.com/cliparts/Kin/q5R/Kinq5Rkiq.png"/> Problem updating nodes view
 - Add modes (create links, selection...)
 - Simplify the core, externalize more functions
 - Create the html architecture

-----
 - Templates (1/2) More templates. Organize js.
 - Stencil/sticker (1/2). CSS beauty

-----

 - Text position <img width="20" src="http://www.clipartbest.com/cliparts/dT8/5e6/dT85e6aqc.png"/>
 - Mouseover port show name
 - Port position as a variable (depends on the tempalte/model)
 - Add ports to created element (1/2). Position of ports, different from each element
 - Disable multiselect rect when is disabled <img width="20" src="http://www.clipartbest.com/cliparts/dT8/5e6/dT85e6aqc.png"/>
 - Right button on node open a popup menu with node info <img width="20" src="http://www.clipartbest.com/cliparts/dT8/5e6/dT85e6aqc.png"/>

lib <--> genericTemplate (onMouseDown) <--> depends on the node type (proxy?) <--> call specific function


Guide:
--------------

- external --> external libraries
- img --> Images
- models --> Models of data
- on_lib --> OpenNaaS library. Required for OpenNaaS GUI. Multi-select, port management, link management, initial_vars...
- ONtoD3lib.css --> Css
- ONtoD3lib.html --> Basic html template
- ONtoD3lib.js --> Basic javascript functions.
- draw_lib_execution.js --> Contain automatic function calls. To remove in production

