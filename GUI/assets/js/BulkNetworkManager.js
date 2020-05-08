let defaultUrl = 'http://localhost:8080/';
let systemAllowForInput = true;
let xAxisData =0;

// Initialize chart details.
let chart = new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            label: "Dataset Size",
            borderColor: "#3e95cd",
            fill: false
        }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Time and dataset size'
        },scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time (s)'
                }
            }], xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Variable (Node Count / Edge Count / Dataset Size)'
                }
            }]
        }
    }
});

// block button until data received.
function buttonFunctionUpdate() {
    if(systemAllowForInput){
        document.getElementById("setDataSize").disabled = false;
    }else
        document.getElementById("setDataSize").disabled = true;
}


let requiredDatasetSize=0;
let requiredNodeCount=0;
let requiredEdgesCount=0;
let count=1;
let DatasetArray=[];
let doubling  = true;
let edgeCount = 0;
let edgesDetails='';
let edgeDetailsForTable='';
let doublingType='';

// Updating data set with new random array.
function updateDataSetToTable(){
    doubling = false;
    requiredDatasetSize = document.getElementById("datasetRequiredSize").value;
    requiredNodeCount = document.getElementById("numOfNodes").value;
    requiredEdgesCount = document.getElementById("numOfEdges").value;

    if(requiredNodeCount==""){
        document.getElementById("alert").textContent = "Number of nodes is required **";
    }else if(requiredEdgesCount == ""){
        document.getElementById("alert").textContent = "Number of edges is required **";
    }else if(requiredDatasetSize == ""){
        document.getElementById("alert").textContent = "Size of dataset is required **";
    }else if(!Number.isInteger(parseInt(requiredNodeCount)) || requiredNodeCount < 5){
        document.getElementById("alert").textContent = "Please enter valid node number, Should be higher than 5 **";
    }else if(!Number.isInteger(parseInt(requiredEdgesCount)) || requiredNodeCount <= 0){
        document.getElementById("alert").textContent = "Please enter valid edges number **";
    }else if(!Number.isInteger(parseInt(requiredDatasetSize)) || requiredNodeCount <= 0){
        document.getElementById("alert").textContent = "Please enter valid size of dataset **";
    }else{
        xAxisData = requiredDatasetSize;
        document.getElementById("alert").textContent = "";
        bulkDataSetCreator(requiredDatasetSize,requiredNodeCount,requiredEdgesCount,true);
    }

}


// doubling nodes.
function makeNodesDouble(){
    doublingType = "node";
    doubling = true;
    if(requiredDatasetSize!=1){
        alert("Dataset Size should be 1...")
    }else{
        document.getElementById("doubleNodes").disabled = true;
        document.getElementById("doubleEdges").disabled = true;
        document.getElementById("setDataSize").disabled = true;
        requiredNodeCount = requiredNodeCount * 2;
        xAxisData = requiredNodeCount;
        document.getElementById("numOfNodes").value = requiredNodeCount;
        bulkDataSetCreator(requiredDatasetSize,requiredNodeCount,requiredEdgesCount,false);
    }
}

// Call doubling edges function.
function makeEdgesDouble(){
    document.getElementById("doubleNodes").disabled = true;
    document.getElementById("doubleEdges").disabled = true;
    document.getElementById("setDataSize").disabled = true;
    doublingType = "edge";
    let confirmToContinue;
    let maxValueEdgesCanBe = (requiredNodeCount * (requiredNodeCount-1)) - (requiredNodeCount-1);
    let doubledEdgeCount = requiredEdgesCount * 2;
    if(maxValueEdgesCanBe < doubledEdgeCount){
        confirmToContinue = confirm("Maximum value for this number of node is :"+maxValueEdgesCanBe+". Do you wish to continue with this value ?")
    }

    if(confirmToContinue){
        requiredEdgesCount = maxValueEdgesCanBe;
    }else{
        requiredEdgesCount = doubledEdgeCount;
    }
    doubling = true;
    if(requiredDatasetSize!=1){
        alert("Dataset Size should be 1...")
    }else{

        xAxisData = requiredEdgesCount;
        document.getElementById("numOfEdges").value = requiredEdgesCount;
        bulkDataSetCreator(requiredDatasetSize,requiredNodeCount,requiredEdgesCount,true);
    }
}


// Create bulk data set as required.
function bulkDataSetCreator(numberOfValues,numberOfNodes,numberOfEdges,updateEdges){
    //Clean Data table before update.
    let tableObj = document.getElementById("bulkDetails");
    systemAllowForInput = false;
    buttonFunctionUpdate();
    let sizeOfTable = tableObj.rows.length;
    if(sizeOfTable!=1){
        for (i = 0; i < sizeOfTable-1; i++) {
            tableObj.deleteRow(1);
        }
    }

    if(!doubling){
        count = 1;
        DatasetArray = [];
    }

    let currentEdgeDetails = [];
    for (let networkCount = 0; networkCount < numberOfValues; networkCount++) {
        let source =  getRandomNumber(0,(numberOfNodes-1));
        let sink =  getRandomNumber(0,(numberOfNodes-1));
        while(sink == source){
            source =  getRandomNumber(0,(numberOfNodes-1));
            sink =  getRandomNumber(0,(numberOfNodes-1));
        }


        if(!doubling){
            edgesDetails='';
            edgeDetailsForTable='';
            edgeCount = 0;
        }
        if(updateEdges){
            for (edgeCount; edgeCount < numberOfEdges ; edgeCount++){
                let edgeName = networkCount+"Set"+edgeCount;
                console.log("numberOfNodes : "+numberOfNodes);
                let from =  getRandomNumber(0,(numberOfNodes-2));
                let to =  getRandomNumber(0,(numberOfNodes-1));
                let capacity =  getRandomNumber(1,100);
                let valueAllowed = true;

                while (from==to ||  from < 0 || to < 0){
                    from =  getRandomNumber(0,(numberOfNodes-2));
                    to =  getRandomNumber(0,(numberOfNodes-1));
                }

                for (i = 0; i < currentEdgeDetails.length; i++) {
                    if(from == currentEdgeDetails[i].from){
                        if(currentEdgeDetails[i].to == to){
                            valueAllowed = false;
                            edgeCount--;
                        }
                    }
                }

                if(valueAllowed){

                    let edge = {
                        to: to,
                        from: from
                    };
                    currentEdgeDetails.push(edge);



                    edgeDetailsForTable += "<span class='edgeDetailTopics'>Name : </span>"+edgeName+
                                            "<span class='edgeDetailTopics'> | From : </span>"+from+
                                            "<span class='edgeDetailTopics'> | To : </span>"+to+
                                            "<span class='edgeDetailTopics'> | Capacity : </span>"+capacity+"<br>";

                    let edgeDetails = edgeName+"~"+from+"~"+to+"~"+capacity;
                    if(edgeCount==0){
                        edgesDetails =edgeDetails;
                    }else{
                        edgesDetails += "-"+edgeDetails;
                    }
                }
            }
        }
        console.log(currentEdgeDetails);
        let dataSetArray = {
            id: networkCount,
            numberOfNodes:numberOfNodes,
            edges: edgesDetails,
            source: source,
            sink: sink
        };

        addRowsForTable(count, numberOfNodes,edgeDetailsForTable,source,sink,"<span id=\"id"+networkCount+"\"></span>")
        DatasetArray.push(dataSetArray);
        count++;
    }

    let jsonStringedValues = JSON.stringify(DatasetArray);

    let name = '';
    $.ajax({
        url: defaultUrl + "bulkMaxFlowFinder",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: jsonStringedValues,
        success: function(res) {name = res ; console.log(res);},
        error: function(err) {}
    });

    setTimeout(setupFlowNetworkValues,2000);
}

// Retrieve data from back end and set to html.
let time;
function setupFlowNetworkValues(){
    let maxFlowDataArray  = [];
    $.getJSON(defaultUrl + "getBulkValues", function(data) {
        maxFlowDataArray = data;
        for (i = 0; i < data.length; i++) {
            if(doubling){
                document.getElementById("id0").textContent = data[i]["maxFlow"];
            }else{
                document.getElementById("id"+i).textContent = data[i]["maxFlow"];
            }
            time = data[i]["time"];
        }
        addData(chart,xAxisData,time);
        document.getElementById("executionTime").textContent = time;
    });

    systemAllowForInput = true;
    if(doublingType=="edge"){
        document.getElementById("doubleEdges").disabled = false;
        systemAllowForInput = false;
    }else if(doublingType=="node"){
        document.getElementById("doubleNodes").disabled = false;
        systemAllowForInput = false;
    }

    buttonFunctionUpdate();
}

// Update table with values.
function addRowsForTable(number, nodeCount, edgeDetails, sourceNode, sinkNode, maxFlow) {
    let table = document.getElementById("bulkDetails");
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell1.innerHTML = number;
    cell2.innerHTML = nodeCount;
    cell3.innerHTML = edgeDetails;
    cell4.innerHTML = sourceNode;
    cell5.innerHTML = sinkNode;
    cell6.innerHTML = maxFlow;
}

// Getting random values.
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
/*

 Enter to submit button in part one.

*/
let input = document.getElementById("datasetRequiredSize");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if(systemAllowForInput){
            document.getElementById("setDataSize").click();
        }
    }
});


// Add data to chart
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

// Reset the table.
function reset() {
    location.reload();
}