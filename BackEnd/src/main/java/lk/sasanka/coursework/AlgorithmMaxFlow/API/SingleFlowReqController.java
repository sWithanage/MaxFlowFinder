package lk.sasanka.coursework.AlgorithmMaxFlow.API;

import lk.sasanka.coursework.AlgorithmMaxFlow.Models.PathWithDistributedFlow;
import lk.sasanka.coursework.AlgorithmMaxFlow.Pojo.FlowEdge;
import lk.sasanka.coursework.AlgorithmMaxFlow.Pojo.FlowNetwork;
import lk.sasanka.coursework.AlgorithmMaxFlow.Pojo.FordFulkerson;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

//User data controlling API.
@SpringBootApplication
@RestController
public class SingleFlowReqController {
    private int numberOfNodes=0;
    private ArrayList<FlowEdge> edgesArrays = new ArrayList<FlowEdge>();
    private ArrayList<PathWithDistributedFlow> tempPathWithDistributedFlowsObj = new ArrayList<>();



    // Set node value to object.
    @CrossOrigin
    @RequestMapping(path = "/setNodes", method = RequestMethod.POST)
    public ResponseEntity addNodes(@RequestBody List<HashMap<String, Object>> nodeDetails) throws Exception
    {
        for(int x=0; x<nodeDetails.size();x++){
            numberOfNodes = Integer.parseInt(nodeDetails.get(x).get("nodeCount").toString()) ;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("success", "Edges Updated..");
        return new ResponseEntity(headers, HttpStatus.OK);
    }


    // Set edge value to object.
    @CrossOrigin
    @RequestMapping(path = "/setEdges", method = RequestMethod.POST)
    public ResponseEntity add(@RequestBody List<HashMap<String, Object>> edgeDetails) throws Exception
    {
        // creating temporary edge array.
        ArrayList<FlowEdge> tempEdgesArrays = new ArrayList<FlowEdge>();

        // iterate through all edges.
        for(int x=0; x<edgeDetails.size();x++){
            String name = edgeDetails.get(x).get("edgeName").toString();
            int from = Integer.parseInt(edgeDetails.get(x).get("from").toString());
            int to = Integer.parseInt(edgeDetails.get(x).get("to").toString());
            int capacity = Integer.parseInt(edgeDetails.get(x).get("capacity").toString());

            // set retrieved values into object.
            FlowEdge edge = new FlowEdge(name, from, to, capacity);
            tempEdgesArrays.add(edge);
        }
        edgesArrays = tempEdgesArrays;
        HttpHeaders headers = new HttpHeaders();
        headers.add("success", "Edges Updated..");
        return new ResponseEntity(headers, HttpStatus.OK);
    }


    // Set sink and source to object.
    int source = 0;
    int sink = 1;
    @CrossOrigin
    @RequestMapping(path = "/setSinkAndSource", method = RequestMethod.POST)
    public ResponseEntity setSinkAndSource(@RequestBody List<HashMap<String, Object>> edgeDetails) throws Exception
    {
        for(int x=0; x<edgeDetails.size();x++){
            source = Integer.parseInt(edgeDetails.get(x).get("source").toString());
            sink = Integer.parseInt(edgeDetails.get(x).get("sink").toString());
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("success", "Edges Updated..");
        return new ResponseEntity(headers, HttpStatus.OK);
    }


    // Retrieve max flow from the object.
    @CrossOrigin
    @GetMapping("/getDetails")
    public ArrayList<FordFulkerson> getCustomerDetails() {
        FlowNetwork networkObj = new FlowNetwork(numberOfNodes + 1);

        for (FlowEdge e: edgesArrays) {
            networkObj.addEdge(e);
        }
        ArrayList<FordFulkerson> fordFulkersons = new ArrayList<>();
        FordFulkerson maxFlow = new FordFulkerson(networkObj, source, sink);
        fordFulkersons.add(maxFlow);
        tempPathWithDistributedFlowsObj = maxFlow.getPathWithDistributedFlowsObj();
        System.out.println(tempPathWithDistributedFlowsObj);
        return fordFulkersons;
    }


    @CrossOrigin
    @GetMapping("/getPath")
    public ArrayList<PathWithDistributedFlow> getPath() {
        return tempPathWithDistributedFlowsObj;
    }

}