package lk.sasanka.coursework.AlgorithmMaxFlow.API;

import lk.sasanka.coursework.AlgorithmMaxFlow.Models.DataModel;
import lk.sasanka.coursework.AlgorithmMaxFlow.Models.ReturnMaxValuesInBulk;
import lk.sasanka.coursework.AlgorithmMaxFlow.Models.Stopwatch;
import lk.sasanka.coursework.AlgorithmMaxFlow.Pojo.FlowEdge;
import lk.sasanka.coursework.AlgorithmMaxFlow.Pojo.FlowNetwork;
import lk.sasanka.coursework.AlgorithmMaxFlow.Pojo.FordFulkerson;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

//User data controlling API.
@SpringBootApplication
@RestController
public class MultiFlowReqController {

    // Temporary data arrays.
    private ArrayList < DataModel > tempEdgesArrays = new ArrayList < > ();
    private ArrayList < ReturnMaxValuesInBulk > answerArray = new ArrayList < > ();

    // Adding all data to proper models and fitting.
    @CrossOrigin
    @RequestMapping(path = "/bulkMaxFlowFinder", method = RequestMethod.POST)
    public ResponseEntity < String > add(@RequestBody List < HashMap < String, Object >> edgeDetails) throws Exception {

        // Add data from whole data set.
        for (int x = 0; x < edgeDetails.size(); x++) {

            // Creating data model object for temporarily.
            DataModel tempDataObj = new DataModel();

            // Retrieve details for network and set those.
            int id = Integer.parseInt(edgeDetails.get(x).get("id").toString());
            int numberOfNodes = Integer.parseInt(edgeDetails.get(x).get("numberOfNodes").toString());
            String edgesDetails = edgeDetails.get(x).get("edges").toString();
            int source = Integer.parseInt(edgeDetails.get(x).get("source").toString());
            int sink = Integer.parseInt(edgeDetails.get(x).get("sink").toString());

            // Set network details to temporary object.
            tempDataObj.setId(id);
            tempDataObj.setNodeCount(numberOfNodes);
            tempDataObj.setSource(source);
            tempDataObj.setSink(sink);

            // Break edge data into correct format.
            String[] breakIntoEdge;
            String[] breakIntoDetails;
            ArrayList < FlowEdge > tempEdgeArrayList = new ArrayList < > ();

            // Break received string value using '-'
            breakIntoEdge = edgesDetails.split("-");
            //Add those values into object and add as edge details.
            for (int i = 0; i < breakIntoEdge.length; i++) {
                breakIntoDetails = breakIntoEdge[i].split("~");
                FlowEdge edge = new FlowEdge(breakIntoDetails[0],
                        Integer.parseInt(breakIntoDetails[1]),
                        Integer.parseInt(breakIntoDetails[2]),
                        Double.parseDouble(breakIntoDetails[3]));
                tempEdgeArrayList.add(edge);
            }
            tempDataObj.setEdgesArrays(tempEdgeArrayList);
            tempEdgesArrays.add(tempDataObj);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("success", "Edges Updated..");
        return ResponseEntity.ok().header("Custom-Header", "Bulk details recieved.").body("Custom header set");
    }

    // Return maxflow details.
    @CrossOrigin
    @GetMapping("/getBulkValues")
    public ArrayList < ReturnMaxValuesInBulk > getBulkValues() {
        // Starting time.
        Stopwatch stopWatchObj = new Stopwatch();
        answerArray = new ArrayList < > ();

        // Iterate all models.
        for (DataModel model: tempEdgesArrays) {
            FlowNetwork networkObj = new FlowNetwork(model.getNodeCount() + 1);

            for (FlowEdge e: model.getEdgesArrays()) {
                networkObj.addEdge(e);
            }

            //Create ford-fulkersons array.
            ArrayList < FordFulkerson > fordFulkersons = new ArrayList < > ();

            //Getting max flow.
            FordFulkerson maxFlow = new FordFulkerson(networkObj, model.getSource(), model.getSink());
            fordFulkersons.add(maxFlow);

            // Creating bulk answer model object.
            ReturnMaxValuesInBulk answerValues = new ReturnMaxValuesInBulk();
            // Adding details to that.
            answerValues.setId(model.getId());
            System.out.println(model.getId());
            float sec = (float) stopWatchObj.elapsedTime();
            answerValues.setMaxFlow(maxFlow.getMaxFlowValue());
            answerValues.setTime(sec);

            // Update values to new array.
            answerArray.add(answerValues);
        }
        tempEdgesArrays = new ArrayList < > ();
        return answerArray;
    }
}