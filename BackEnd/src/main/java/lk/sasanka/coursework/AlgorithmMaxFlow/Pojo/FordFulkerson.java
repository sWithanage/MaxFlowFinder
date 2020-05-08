package lk.sasanka.coursework.AlgorithmMaxFlow.Pojo;

import lk.sasanka.coursework.AlgorithmMaxFlow.Models.PathWithDistributedFlow;

import java.util.ArrayList;
import java.util.LinkedList;

public class FordFulkerson {

    // Initializing required variables and arrays.
    private long startingTime;
    private long endingTime;
    private boolean[] marked;
    private FlowEdge[] edgeTo;
    private double tempMaxFlowValue;
    private ArrayList<PathWithDistributedFlow> pathWithDistributedFlowsObj = new ArrayList<>();

    // Ford fulkerson algorithm
    public FordFulkerson(FlowNetwork flowNetwork, int source, int sink) {

        // Checking whether source and sink nodes are equals or not.
        if (source == sink)
            throw new IllegalArgumentException("Please check the source and sink values that entered. Both can't be equals!");

        // Set temporary max flow into 0 in begin of the each iteration.
        tempMaxFlowValue = 0.0;

        // Find the max flow until augmented paths available.
        while (checkingAugmentingPath(flowNetwork, source, sink)) {

            // Setting bottle neck value into positive. With this initialization this variable will hold positive doubles.
            double bottle = Double.POSITIVE_INFINITY;

            // Calculate the bottle neck capacity of the each edge available.
            for (int v = sink; v != source; v = edgeTo[v].getOtherSideOfNode(v)) {

                // Set calculated bottle neck capacity into temporary variable.
                // Getting each value of the flow of the path and setting current minimum flow into the bottle neck capacity.
                bottle = Math.min(bottle, edgeTo[v].getResidualCapacity(v));
            }

            // This array will store path details.
            ArrayList<FlowEdge> temporaryPathDetailsArray = new ArrayList<>();


            // Update new flow details into the each edge. (Updating residual values.)
            for (int v = sink; v != source; v = edgeTo[v].getOtherSideOfNode(v)) {
                edgeTo[v].addResidualFlowTo(v, bottle);
                temporaryPathDetailsArray.add(edgeTo[v]);
            }

            // Create object that  hold values of all paths and bottle neck capacity of each.
            PathWithDistributedFlow path = new PathWithDistributedFlow(temporaryPathDetailsArray,bottle);

            // Add all values held objects into array.
            pathWithDistributedFlowsObj.add(path);

            // Adding bottleneck capacity into max-flow.
            tempMaxFlowValue += bottle;
        }
    }

    // Checking augmented paths availability and return the path.
    private boolean checkingAugmentingPath(FlowNetwork flowNetwork, int source, int sink) {
        // remove all the values from arrays.
        edgeTo = new FlowEdge[flowNetwork.getNode()];
        marked = new boolean[flowNetwork.getNode()];

        // Initializing linked list.
        LinkedList<Integer> edgesLinkedList = new LinkedList< >();

        // Adding first source node to linked list.
        edgesLinkedList.add(source);

        // Mark source node as visited.
        marked[source] = true;

        // Do this until linked list is not empty and sink node is not visited.
        // !edgesLinkedList.isEmpty() to check weather more paths are available or not.
        while (!edgesLinkedList.isEmpty() && !marked[sink]) {

            // Remove element from linked list.
            int v = edgesLinkedList.pop();

            // Continue for all edges in the network.
            for (FlowEdge flowEdgeObj: flowNetwork.getAdjacencyList(v)) {

                // Getting the other side of the edge.
                int otherSideNode = flowEdgeObj.getOtherSideOfNode(v);

                // Checking weather edge have residual value to pass more  and also check whether edge is marked or not.
                if (flowEdgeObj.getResidualCapacity(otherSideNode) > 0 && !marked[otherSideNode]) {

                    // Add edge to array.
                    edgeTo[otherSideNode] = flowEdgeObj;

                    // Set value as marked.
                    marked[otherSideNode] = true;

                    // Add value to current link list.
                    edgesLinkedList.add(otherSideNode);
                }
            }
        }

        // Return whether augmented paths available or not.
        return marked[sink];
    }

    //Getters and setters methods.
    public ArrayList<PathWithDistributedFlow> getPathWithDistributedFlowsObj() {
        return pathWithDistributedFlowsObj;
    }

    public void setPathWithDistributedFlowsObj(ArrayList<PathWithDistributedFlow> pathWithDistributedFlowsObj) {
        this.pathWithDistributedFlowsObj = pathWithDistributedFlowsObj;
    }

    public double getMaxFlowValue() {
        return tempMaxFlowValue;
    }

    public long getStartingTime() {
        return startingTime;
    }

    public long getEndingTime() {
        return endingTime;
    }


}