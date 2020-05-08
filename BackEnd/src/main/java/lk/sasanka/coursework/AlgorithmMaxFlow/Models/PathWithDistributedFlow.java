package lk.sasanka.coursework.AlgorithmMaxFlow.Models;

import lk.sasanka.coursework.AlgorithmMaxFlow.Pojo.FlowEdge;

import java.util.ArrayList;
/*
 *
 * Path details containing model with each max flow value.
 *
 */
public class PathWithDistributedFlow {
    private ArrayList<FlowEdge> flowEdgesList;
    private double flow;

    public PathWithDistributedFlow(ArrayList<FlowEdge> flowEdgesList, double flow) {
        this.flowEdgesList = flowEdgesList;
        this.flow = flow;
    }

    public ArrayList<FlowEdge> getFlowEdgesList() {
        return flowEdgesList;
    }

    public void setFlowEdgesList(ArrayList<FlowEdge> flowEdgesList) {
        this.flowEdgesList = flowEdgesList;
    }

    public double getFlow() {
        return flow;
    }

    public void setFlow(double flow) {
        this.flow = flow;
    }

    @Override
    public String toString() {
        return "PathWithDistributedFlow{" +
                "flowEdgesList=" + flowEdgesList +
                ", flow=" + flow +
                '}';
    }
}
