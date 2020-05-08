package lk.sasanka.coursework.AlgorithmMaxFlow.Models;

import lk.sasanka.coursework.AlgorithmMaxFlow.Pojo.FlowEdge;

import java.util.ArrayList;
/*
*
* Data model to save bulk edge details.
*
*/
public class DataModel {
    private int id;
    private int nodeCount;
    private ArrayList<FlowEdge> edgesArrays = new ArrayList<>();
    private int source;
    private int sink;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNodeCount() {
        return nodeCount;
    }

    public void setNodeCount(int nodeCount) {
        this.nodeCount = nodeCount;
    }

    public ArrayList<FlowEdge> getEdgesArrays() {
        return edgesArrays;
    }

    public void setEdgesArrays(ArrayList<FlowEdge> edgesArrays) {
        this.edgesArrays = edgesArrays;
    }

    public int getSource() {
        return source;
    }

    public void setSource(int source) {
        this.source = source;
    }

    public int getSink() {
        return sink;
    }

    public void setSink(int sink) {
        this.sink = sink;
    }

    @Override
    public String toString() {
        return "DataModel{" +
                "id=" + id +
                ", nodeCount=" + nodeCount +
                ", edgesArrays=" + edgesArrays +
                ", source=" + source +
                ", sink=" + sink +
                '}';
    }
}
