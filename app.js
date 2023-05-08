// Crearea unui obiect de date pentru a reprezenta graful
var nodes = new vis.DataSet([
    { id: 1, label: "A", title: "10" },
    { id: 2, label: "B", title: "20" },
    { id: 3, label: "C", title: "30" },
    { id: 4, label: "D", title: "40" },
    { id: 5, label: "E", title: "50" },
  ]);
  
  var edges = new vis.DataSet([
    { from: 1, to: 2, label: "1", title: "10km" },
    { from: 1, to: 3, label: "2", title: "20km" },
    { from: 2, to: 4, label: "3", title: "30km" },
    { from: 2, to: 5, label: "4", title: "40km" },
  ]);
  
  // Crearea unui obiect de configurare pentru a specifica aspectul grafului
  var options = {
    nodes: {
      shape: "circle",
      size: 20,
      font: {
        size: 20,
        color: "white",
      },
      color: {
        border: "black",
        background: "#3182bd",
      },
    },
    edges: {
      font: {
        size: 16,
        color: "#404040",
      },
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" },
      },
    },
    interaction: {
      tooltipDelay: 200,
      hover: true,
      hoverConnectedEdges: true,
    },
  };
  
  // Crearea unui obiect de configurare pentru a specifica interacțiunea cu graful
  var interaction = {
    hover: true,
    tooltipDelay: 200,
  };
  
  // Crearea unui obiect de configurare pentru a specifica interacțiunea cu graful
  var container = document.getElementById("graph-container");
  
  // Crearea obiectului grafic folosind obiectele de date și configurare
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var network = new vis.Network(container, data, options);
  
  // Adăugarea evenimentului de click la noduri
  network.on("click", function (params) {
    if (params.nodes.length > 0) {
      var node = nodes.get(params.nodes[0]);
      alert("Clicked node " + node.label);
    }
  });
  
  // Adăugarea evenimentului de hover la noduri și muchii
  network.on("hoverNode", function (params) {
    document.body.style.cursor = "pointer";
  });
  network.on("blurNode", function (params) {
    document.body.style.cursor = "default";
  });
  network.on("hoverEdge", function (params) {
    document.body.style.cursor = "pointer";
  });
  network.on("blurEdge", function (params) {
    document.body.style.cursor = "default";
  });
  
  // Get references to the buttons
var addNodeButton = document.getElementById("addNodeButton");
var addEdgeButton = document.getElementById("addEdgeButton");
var editButton = document.getElementById("editButton");
var deleteButton = document.getElementById("deleteButton");
var moveButton = document.getElementById("moveButton");

// Add event listeners to the buttons
addNodeButton.addEventListener("click", function() {
    var nextNodeId = nodes.length + 1;
    var newNode = {
      id: nextNodeId,
      label: "New Node " + nextNodeId,
      title: "(null) "
    };
    nodes.add(newNode);
});

addEdgeButton.addEventListener("click", function() {
    // Prompt the user to click on the source and target nodes
    alert("Please click on the source node.");
    var fromNodeId;
    network.once("click", function(event) {
      fromNodeId = event.nodes[0];
      alert("Please click on the target node.");
      network.once("click", function(event) {
        var toNodeId = event.nodes[0];
        
        // Add a new edge between the selected nodes
        var newEdge = {
          from: fromNodeId,
          to: toNodeId,
          label: "New Edge",
          title: "(null)"
        };
        edges.add(newEdge);
      });
    });
  });
  
  editButton.addEventListener("click", function() {
    // Set the edit mode to true
    editMode = true;
    
    // Listen for the click event on the graph
    network.once("click", function(params) {
      // Check if a node or edge was clicked
      var selectedItem = null;
      if (params.nodes.length > 0) {
        // A node was clicked
        selectedItem = nodes.get(params.nodes[0]);
        var isNode = true;
      } else if (params.edges.length > 0) {
        // An edge was clicked
        selectedItem = edges.get(params.edges[0]);
        var isNode = false;
      }
      
      // If a node or edge was selected, prompt the user to edit its label and title
      if (selectedItem) {
        var newLabel = prompt("Enter the new label for the selected item:", selectedItem.label);
        var newTitle = prompt("Enter the new value for the selected item:", selectedItem.title);
  
        // Update the label and title of the selected node or edge
        selectedItem.label = newLabel;
        selectedItem.title = newTitle;
  
        // Update the node or edge in the dataset and redraw the graph
        if (isNode) {
          nodes.update(selectedItem);
        } else {
          edges.update(selectedItem);
        }
        network.redraw();
      }
      
      // Set the edit mode back to false
      editMode = false;
    });
  });
  
deleteButton.addEventListener("click", function() {
    var selectedNodes = network.getSelectedNodes();
    var selectedEdges = network.getSelectedEdges();
  
    // If there is a selected edge, remove it
    if (selectedEdges.length > 0) {
      edges.remove(selectedEdges);
    }
  
    // If there is a selected node, remove it and any edges connected to it
    if (selectedNodes.length > 0) {
      var nodeId = selectedNodes[0];
      nodes.remove(nodeId);
      edges.remove(edges.get({filter: function(edge) {
        return (edge.from === nodeId || edge.to === nodeId);
      }}));
    }
  });
  
moveButton.addEventListener("click", function() {
    options.interaction.dragNodes = !options.interaction.dragNodes;
    options.interaction.dragEdges = !options.interaction.dragEdges;
    network.setOptions(options);
  });
  
  

