let defaultUrl = 'http://localhost:8080/';
let options = {};
let nodes = new vis.DataSet(options);
let edges = new vis.DataSet(options);
let numberOfNodesFinal = 0;
let numberOfEdges = 0;
const nodeArray = [];
let edgeArray = [];
let sourceAndSinkArray = [];


// Getting  number of nodes from the user.
function part1() {
    let numberOfNodes = document.getElementById("inputField").value;

    if (!Number.isInteger(parseInt(numberOfNodes))) {
        document.getElementById("alert").textContent = "Please enter integer value **";
    } else if (parseInt(numberOfNodes) < 6) {
        document.getElementById("alert").textContent = "Number of nodes atleast should be 6 **";
    } else if (parseInt(numberOfNodes) > 10) {
        document.getElementById("alert").textContent = "Number of nodes should be less than 10**";
    } else {
        document.getElementById("alert").textContent = "";
        numberOfNodesFinal = parseInt(numberOfNodes);
        for (i = 0; i < parseInt(numberOfNodes); i++) {
            nodes.add([{
                id: i,
                label: i.toString(),
                imagePadding: 2,
                size: 30
            }]);
        }
        document.getElementById("part1").style.display = "none";
        document.getElementById("part2").style.display = "block";
    }
}


// Section to add edges to the system.
function addEdgesAnother() {
    const edgeName = document.getElementById("edgeName").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const capacity = document.getElementById("capacity").value;

    if (edgeName.length == 0 || from.length == 0 || to.length == 0 || capacity.length == 0) {
        document.getElementById("alert").textContent = "All Fields are required **";
    } else if (!Number.isInteger(parseInt(from)) || parseInt(from) >= numberOfNodesFinal || parseInt(from) < 0) {
        document.getElementById("alert").textContent = "From field should be between 0 and " + (numberOfNodesFinal - 1) + " **";
    } else if (!Number.isInteger(parseInt(to)) || parseInt(to) >= numberOfNodesFinal || parseInt(to) < 0) {
        document.getElementById("alert").textContent = "To field should be between 0 and " + (numberOfNodesFinal - 1) + " **";
    } else if (!Number.isInteger(parseInt(capacity)) || parseInt(capacity) < 0) {
        document.getElementById("alert").textContent = "Capacity field should be positive.";
    } else {
        document.getElementById("alert").textContent = "";

        document.getElementById("edgeName").value = '';
        document.getElementById("from").value = '';
        document.getElementById("to").value = '';
        document.getElementById("capacity").value = '';

        let edgeDetails = {
            id: numberOfEdges,
            edgeName: edgeName,
            from: from,
            to: to,
            capacity: capacity
        };

        // Adding for vis.js
        edges.add([{
            id: numberOfEdges,
            from: from,
            to: to,
            arrows: 'to',
            label: edgeName + " | Cap : " + capacity
        }]);

        addRowsForTable(numberOfEdges,edgeName,from,to,capacity)


        numberOfEdges++;
        edgeArray.push(edgeDetails);
    }
}

let currentUpdatingId = 0;
function updateArray(id){
    currentUpdatingId = id;
    for(x = 0; x < edgeArray.length; x++){
        if(edgeArray[x]["id"] == id){

            document.getElementById("updatedEdgeName").value = edgeArray[x]["edgeName"];
            document.getElementById("updatedFrom").value = edgeArray[x]["from"];
            document.getElementById("updatedTo").value = edgeArray[x]["to"];
            document.getElementById("updatedCapacity").value = edgeArray[x]["capacity"];
        }
    }
}

function updateNewValues(){

    for(x = 0; x < edgeArray.length; x++){
        if(edgeArray[x]["id"] == currentUpdatingId){

            const edgeName = document.getElementById("updatedEdgeName").value;
            const from = document.getElementById("updatedFrom").value;
            const to = document.getElementById("updatedTo").value;
            const capacity = document.getElementById("updatedCapacity").value;

            if (edgeName.length == 0 || from.length == 0 || to.length == 0 || capacity.length == 0) {
                document.getElementById("updateModelAlert").textContent = "All Fields are required **";
            } else if (!Number.isInteger(parseInt(from)) || parseInt(from) >= numberOfNodesFinal || parseInt(from) < 0) {
                document.getElementById("updateModelAlert").textContent = "From field should be between 0 and " + (numberOfNodesFinal - 1) + " **";
            } else if (!Number.isInteger(parseInt(to)) || parseInt(to) >= numberOfNodesFinal || parseInt(to) < 0) {
                document.getElementById("updateModelAlert").textContent = "To field should be between 0 and " + (numberOfNodesFinal - 1) + " **";
            } else if (!Number.isInteger(parseInt(capacity)) || parseInt(capacity) < 0) {
                document.getElementById("updateModelAlert").textContent = "Capacity field should be positive.";
            } else {
                document.getElementById("updateModelAlert").textContent = "";
                edgeArray[x]["edgeName"] = edgeName;
                edgeArray[x]["from"] = from;
                edgeArray[x]["to"] = to;
                edgeArray[x]["capacity"] = capacity;

                data.edges.remove([currentUpdatingId]);
                // Adding for vis.js
                edges.add([{
                    id: currentUpdatingId,
                    from: from,
                    to: to,
                    arrows: 'to',
                    label: edgeName + " | Cap : " + capacity
                }]);
                updateDeletion();
                $('#updateDialogModel').modal('hide')
            }
        }
    }
}

// Finalize adding edges to the system.
function part2() {
    const edgeName = document.getElementById("edgeName").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const capacity = document.getElementById("capacity").value;

    let continueProgram = false;

    if (edgeArray.length == 0) {
        document.getElementById("alert").textContent = "Please enter atleast one edge **";
    } else if (edgeName.length != 0 || from.length != 0 || to.length != 0 || capacity.length != 0) {
        continueProgram = confirm("Current values are not added as an edge! Do you want to continue or add this value too!");
    } else {
        document.getElementById("alert").textContent = "";
        continueProgram = true;
    }

    if (continueProgram) {
        document.getElementById("part2").style.display = "none";
        document.getElementById("part3").style.display = "block";
    }
}

// Getting source and sink nodes from the user.
function part3() {
    const source = document.getElementById("source").value;
    const sink = document.getElementById("sink").value;

    if (!Number.isInteger(parseInt(source)) || parseInt(source) >= numberOfNodesFinal || parseInt(source) < 0) {
        document.getElementById("alert").textContent = "Source node should be between 0 and " + (numberOfNodesFinal - 1) + " **";
    } else if (!Number.isInteger(parseInt(sink)) || parseInt(sink) >= numberOfNodesFinal || parseInt(sink) < 0) {
        document.getElementById("alert").textContent = "Sink node should be between 0 and " + (numberOfNodesFinal - 1) + " **";
    } else if (parseInt(source) == parseInt(sink)) {
        document.getElementById("alert").textContent = "Source and sink node can't be the same node.**";
    } else {
        document.getElementById("alert").textContent = "";

        let sourceAndSink = {
            source: source,
            sink: sink
        };

        document.getElementById("sourceValue").textContent = source;
        document.getElementById("sinkValue").textContent = sink;

        sourceAndSinkArray.push(sourceAndSink);


        callAllMethods();
    }
}

//Sending sink and source node data to backend.
function setSinkAndSource() {
    $.ajax({
        url: defaultUrl + "setSinkAndSource",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(sourceAndSinkArray),
        success: setTimeout(updateMaxFlow,500),
        error: function(err) {}
    });
}



// Add all edges to the array.
function setEdges() {
    $.ajax({
        url: defaultUrl + "setEdges",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(edgeArray),
        success: setNodes(),
        error: function(err) {}
    });
}

// Set nodes to the vis js.
function setNodes() {
    let nodeDetails = {
        nodeCount: numberOfNodesFinal
    };

    nodeArray.push(nodeDetails);

    $.ajax({
        url: defaultUrl + "setNodes",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(nodeArray),
        success: setSinkAndSource(),
        error: function(err) {}
    });
}

// Get max flow from the backend and update the value in here.
function callAllMethods() {
    setEdges();
}

let pathCount=1;
//Update maxFlow Value
function updateMaxFlow(){
    //Clean Data table before update.
    let tableObj = document.getElementById("paths");
    let sizeOfTable = tableObj.rows.length;
    if(sizeOfTable!=1){
        for (i = 0; i < sizeOfTable-1; i++) {
            tableObj.deleteRow(1);
        }
    }

    $.getJSON(defaultUrl + "getDetails", function(data) {
        let maxFlow = data[0].maxFlowValue;
        document.getElementById("part3").style.display = "none";
        document.getElementById("part4").style.display = "block";
        document.getElementById("maxFlow").style.opacity = "1";
        document.getElementById("maxFlow").textContent = maxFlow;
        updatePathValue();
    });
}

function updatePathValue(){
    $.getJSON(defaultUrl + "getPath", function(data) {
        for(x = 0; x < data.length; x++){
            let edgeDetailsOfPath="";
            let edgeOfPath = data[x].flowEdgesList;
            for (i = 0; i < edgeOfPath.length; i++) {
                edgeDetailsOfPath += "EdgeName : "+edgeOfPath[i].edgeName + " | ";
                edgeDetailsOfPath += "From : "+edgeOfPath[i].from + " | ";
                edgeDetailsOfPath += "To : "+edgeOfPath[i].to + " | ";
                edgeDetailsOfPath += "Flow : "+edgeOfPath[i].flow + " | ";
                edgeDetailsOfPath += "Capacity : "+edgeOfPath[i].capacity + " <br><hr>";
            }
            let flowOfEachPath = data[x].flow;
            addPaths(pathCount,edgeDetailsOfPath,flowOfEachPath);
            pathCount++;
        }

    });
}




// Back buttons.
function backToPart2() {
    document.getElementById("part3").style.display = "none";
    document.getElementById("part2").style.display = "block";
}

function backToPart3() {
    document.getElementById("part4").style.display = "none";
    document.getElementById("part3").style.display = "block";
}


/*

 Set up vis.js content in here.

*/
let container = document.getElementById('mynetwork');
let data = {
    nodes: nodes,
    edges: edges
};
let network = new vis.Network(container, data, options);


/*

 Enter to submit button in part one.

*/
let input = document.getElementById("inputField");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("nextButtonId").click();
    }
});


// Add rows to the table.
function addRowsForTable(id, name, from, to, capacity) {
        let table = document.getElementById("edgeDetailsTable");
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        cell1.innerHTML = name;
        cell2.innerHTML = from;
        cell3.innerHTML = to;
        cell4.innerHTML = capacity;
        cell5.innerHTML = "<i class=\"fa fa-trash btnCursor\" onclick=\'deleteFromArrays("+id+")\'></i>";
        cell6.innerHTML = "<i class=\"fa fa-refresh btnCursor\" data-toggle=\"modal\"  data-target=\"#updateDialogModel\" onclick=\'updateArray("+id+")\'></i>";
}
// Add rows to the table.
function addPaths(number, paths, flow) {
        let table = document.getElementById("paths");
        let pathRow = table.insertRow();
        let pathCell1 = pathRow.insertCell(0);
        let pathCell2 = pathRow.insertCell(1);
        let pathCell3 = pathRow.insertCell(2);

        pathCell1.innerHTML = number;
        pathCell2.innerHTML = paths;
        pathCell3.innerHTML = flow;

}

// Delete values from the main array and the vis js array.
function deleteFromArrays(index){
    data.edges.remove([index]);
    for (i = 0; i < edgeArray.length; i++) {
        if(edgeArray[i]["id"] == index){
            edgeArray.splice(i, 1);
        }
    }
    deleteTableRow();
}

// Delete row from the tables.
function deleteTableRow(){
    let tableObj = document.getElementById("edgeDetailsTable");
    let sizeOfArray = edgeArray.length+1;
    for (i = 0; i < sizeOfArray; i++) {
        tableObj.deleteRow(1);
    }
    reCreateTable();
}

// Delete row from the tables to update values.
function updateDeletion(){
    let tableObj = document.getElementById("edgeDetailsTable");
    let sizeOfArray = edgeArray.length;
    for (i = 0; i < sizeOfArray; i++) {
        tableObj.deleteRow(1);
    }
    reCreateTable();
}

//Recreate table with updated values.
function reCreateTable(){
    let sizeOfArray = edgeArray.length;
    for (i = 0; i < sizeOfArray; i++) {
        addRowsForTable(edgeArray[i]["id"],edgeArray[i]["edgeName"],edgeArray[i]["from"],edgeArray[i]["to"],edgeArray[i]["capacity"],);
    }
}
