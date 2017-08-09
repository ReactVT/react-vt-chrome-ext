console.log('in d3 panel context');
var data = {};
var result;
// if data hasn't been received, add wait message
// if website doesn't have valid hooks, show wait message
if(Object.keys(data).length === 0) $("#tree-container").append('Waiting for data...');

// Create a connection to the background page
const backgroundPageConnection = chrome.runtime.connect({
  name: "panel"
});

// send tabId to backgroundjs to establish connection
backgroundPageConnection.postMessage({
  name: 'panelToBackgroundInit',
  tabId: chrome.devtools.inspectedWindow.tabId
});

// Listens for messages from backgroundjs to get the parsed dom tree
backgroundPageConnection.onMessage.addListener(function(newdata) {
  console.log('d3tree received message from content script', newdata);
  if (newdata.type === 'virtualdom') {
    data = newdata.data;
        // console.log(JSON.stringify(data))
        // console.log('object treedata: ', data);
    $("#tree-container").empty();
    tree();
	}
	// Display test results
	if (newdata.type === 'test-result') {
		console.log('d3 received result from content script');
		result = newdata.data;
		$('#test-result').text(result);
	}
});
var listOfAssertionBlocks = [];
var assertionId = 0;
var assertionBlock = [];
var currentNode;

// send assertions to webpage panel -> backgroundjs
$('#save-action').click(() => {
  let action = {};
  action.type = 'action';
  action.event = $('#event-type').val();
  action.loc = currentNode.address;
  console.log('action to be saved: ', action);
  assertionBlock.push(action);
  console.log('assertion block: ', assertionBlock);
});

$('#save-test').click(() => {
  let test = {};
  test.type = $('#eval-type').val();
  test.loc = currentNode.address;
  test.source = $('#state-props').val();
	test.property = $('#key').val() 
	test.modifier = $('#modifier').val();
  test.value = $('#expectation').val();
  test.dataType = $('#data-type').val();
  console.log('test to be saved: ', test);
  assertionBlock.push(test);
});

$('#save-assertion-block').click(() => {
    // send assertion block to webpage, panel -> backgroundjs
  backgroundPageConnection.postMessage({
    type: 'assertion',
    assertionId: assertionId,
    data: assertionBlock,
  });
  assertionId += 1;
  listOfAssertionBlocks.push(assertionBlock);
  assertionBlock = [];
  console.log('list of assertion blocks: ', listOfAssertionBlocks);
});
// setTimeout(() => {
//     console.log('hello');
//     $("#tree-container").empty();
//     data = data2; 
//     tree(); 
// }, 2000);

// setTimeout(() => {
//     console.log('hello');
//     $("#tree-container").empty();
//     data = data1; 
//     tree(); 
// }, 4000);

// setTimeout(() => {
//     console.log('hello');
//     $("#tree-container").empty();
//     data = data2; 
//     tree(); 
// }, 6000);

// setTimeout(() => {
//     console.log('hello');
//     $("#tree-container").empty();
//     data = data1; 
//     tree(); 
// }, 8000);
function tree() {

  console.log(data);
    // Calculate total nodes, max label length
  var totalNodes = 0;
  var maxLabelLength = 0;
    // variables for drag/drop
  var selectedNode = null;
  var draggingNode = null;
    // panning variables
  var panSpeed = 200;
  var panBoundary = 20; // Within 20px from edges will pan when dragging.
    // Misc. variables
  var i = 0;
  var duration = 500;
  var initialDuration = 0;
  var root;

    // size of the diagram
  var viewerWidth = $('#tree-container').width();
  var viewerHeight = $('#tree-container').height();

  var tree = d3.layout.tree()
        .size([viewerHeight, viewerWidth]);

    // define a d3 diagonal projection for use by the node paths later on.
  var diagonal = d3.svg.diagonal()
        .projection(function(d) {
          return [d.y, d.x];
        });

    // A recursive helper function for performing some setup by walking through all nodes

  function visit(parent, visitFn, childrenFn) {
    if (!parent) return;
    visitFn(parent);
    var children = childrenFn(parent);
    if (children) {
        var count = children.length;
        for (var i = 0; i < count; i++) {
            visit(children[i], visitFn, childrenFn);
          }
      }
  }

    // Call visit function to establish maxLabelLength
  visit(data, function(d) {
    totalNodes++;
    maxLabelLength = Math.max(d.name.length, maxLabelLength);

  }, function(d) {
      return d.children && d.children.length > 0 ? d.children : null;
    });


    // sort the tree according to the node names

  function sortTree() {
    tree.sort(function(a, b) {
        return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
      });
  }
    // Sort the tree initially incase the JSON isn't in a sorted order.
  sortTree();

    // Access node details
  function nodeDetails(node) {
    console.log('node vals', node);
    currentNode = node;
		// Populate name
    $('#details-name').text(currentNode.name);
		// populate state
		if (currentNode.state === null) $('#details-state').text('None');
    else {
				$('#details-state').html('');
        Object.keys(currentNode.state).forEach((key) => {					
            let text = key + ': ' + JSON.stringify(currentNode.state[key]).substring(0, 50);
            $('#details-state').append(`<ul class="state-property"> ${text} </ul>`);
          });
			}
		// populate props
		if (currentNode.props === null) $('#details-props').text('None');
    else {
				$('#details-props').html('');
        Object.keys(currentNode.props).forEach((key) => {					
            let text = key + ': ' + JSON.stringify(currentNode.props[key]).substring(0, 50);
            $('#details-props').append(`<ul class="props-property"> ${text} </ul>`);
          });
			}
    $('#node-address').text(node.address);
  }

    // TODO: Pan function, can be better implemented.

  function pan(domNode, direction) {
    var speed = panSpeed;
    if (panTimer) {
        clearTimeout(panTimer);
        translateCoords = d3.transform(svgGroup.attr("transform"));
        if (direction == 'left' || direction == 'right') {
            translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
            translateY = translateCoords.translate[1];
          } else if (direction == 'up' || direction == 'down') {
              translateX = translateCoords.translate[0];
              translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
            }
        scaleX = translateCoords.scale[0];
        scaleY = translateCoords.scale[1];
        scale = zoomListener.scale();
        svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
        d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
        zoomListener.scale(zoomListener.scale());
        zoomListener.translate([translateX, translateY]);
        panTimer = setTimeout(function() {
            pan(domNode, speed, direction);
          }, 50);
      }
  }

    // Define the zoom function for the zoomable tree

  function zoom() {
    svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }


    // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
  var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

    // define the baseSvg, attaching a class for styling and the zoomListener
  var baseSvg = d3.select("#tree-container").append("svg")
        .attr("width", viewerWidth)
        .attr("height", viewerHeight)
        .attr("class", "overlay")
        .call(zoomListener);

    // Helper functions for collapsing and expanding nodes.

  function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
  }

  function expand(d) {
    if (d._children) {
        d.children = d._children;
        d.children.forEach(expand);
        d._children = null;
      }
  }

  var overCircle = function(d) {
    selectedNode = d;
    updateTempConnector();
  };
  var outCircle = function(d) {
    selectedNode = null;
    updateTempConnector();
  };


    // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

  function centerNode(source) {
    scale = zoomListener.scale();
    x = -source.y0;
    y = -source.x0;
    x = x * scale + viewerWidth / 6;
    y = y * scale + viewerHeight / 2;
    d3.select('g').transition()
            .duration(duration)
            .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
    zoomListener.scale(scale);
    zoomListener.translate([x, y]);
  }

    // Toggle children function

  function toggleChildren(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else if (d._children) {
          d.children = d._children;
          d._children = null;
        }
    return d;
  }

    // Toggle children on click.

  function click(d) {
    if (d3.event.defaultPrevented) return; // click suppressed
    console.log('sup', d);
    d = toggleChildren(d);
    update(d);
    centerNode(d);
  }

  function update(source) {
        // Compute the new height, function counts total children of root node and sets tree height accordingly.
        // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
        // This makes the layout more consistent.
    var levelWidth = [1];
    var childCount = function(level, n) {

        if (n.children && n.children.length > 0) {
            if (levelWidth.length <= level + 1) levelWidth.push(0);

            levelWidth[level + 1] += n.children.length;
            n.children.forEach(function(d) {
                childCount(level + 1, d);
              });
          }
      };
    childCount(0, root);
    var newHeight = d3.max(levelWidth) * 25; // 25 pixels per line  
    tree = tree.size([newHeight, viewerWidth]);

        // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

        // Set widths between levels based on maxLabelLength.
    nodes.forEach(function(d) {
        d.y = (d.depth * (maxLabelLength * 10)); //maxLabelLength * 10px
            // alternatively to keep a fixed scale one can set a fixed depth per level
            // Normalize for fixed-depth by commenting out below line
            // d.y = (d.depth * 500); //500px per level.
      });

        // Update the nodes…
    node = svgGroup.selectAll("g.node")
            .data(nodes, function(d) {
              return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
              return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('contextmenu', click)
            .on('click', nodeDetails);

    nodeEnter.append("circle")
            .attr('class', 'nodeCircle')
            .attr("r", 0)
            .style("fill", function(d) {
              return d._children ? "lightsteelblue" : "#fff";
            });

    nodeEnter.append("text")
            .attr("x", function(d) {
              return d.children || d._children ? -10 : 10;
            })
            .attr("dy", ".35em")
            .attr('class', 'nodeText')
            .attr("text-anchor", function(d) {
              return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
              return d.name;
            })
            .style("fill-opacity", 0);

        // phantom node to give us mouseover in a radius around it
    nodeEnter.append("circle")
            .attr('class', 'ghostCircle')
            .attr("r", 30)
            .attr("opacity", 0.2) // change this to zero to hide the target area
        .style("fill", "red")
            .attr('pointer-events', 'mouseover')
            .on("mouseover", function(node) {
              overCircle(node);
            })
            .on("mouseout", function(node) {
              outCircle(node);
            });

        // Update the text to reflect whether node has children or not.
    node.select('text')
            .attr("x", function(d) {
              return d.children || d._children ? -10 : 10;
            })
            .attr("text-anchor", function(d) {
              return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
              return d.name;
            });

        // Change the circle fill depending on whether it has children and is collapsed
    node.select("circle.nodeCircle")
            .attr("r", 4.5)
            .style("fill", function(d) {
              return d._children ? "lightsteelblue" : "#fff";
            });

        // Transition nodes to their new position.
    var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) {
              return "translate(" + d.y + "," + d.x + ")";
            });

        // Fade the text in
    nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
              return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

    nodeExit.select("circle")
            .attr("r", 0);

    nodeExit.select("text")
            .style("fill-opacity", 0);

        // Update the links…
    var link = svgGroup.selectAll("path.link")
            .data(links, function(d) {
              return d.target.id;
            });

        // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
              var o = {
                x: source.x0,
                y: source.y0
              };
              return diagonal({
                source: o,
                target: o
              });
            });

        // Transition links to their new position.
    link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
    link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
              var o = {
                x: source.x,
                y: source.y
              };
              return diagonal({
                source: o,
                target: o
              });
            })
            .remove();

        // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
  }

    // Append a group which holds all nodes and which the zoom Listener can act upon.
  var svgGroup = baseSvg.append("g");

    // Define the root
  console.log('height', viewerHeight);
  console.log('width', viewerWidth);
  root = data;
  root.x0 = viewerHeight / 2;
  root.y0 = viewerWidth / 6;

    // Layout the tree initially and center on the root node.
  update(root);
  centerNode(root);
}