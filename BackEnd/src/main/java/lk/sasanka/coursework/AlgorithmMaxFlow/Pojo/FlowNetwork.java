package lk.sasanka.coursework.AlgorithmMaxFlow.Pojo;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
 *
 * Flow network model to contain flow network related data.
 *
 */
public class FlowNetwork {
    private final int node;
    private List< FlowEdge >[] adjacencyList;

    public FlowNetwork(int node) {
        this.node = node - 1;
        adjacencyList = (List< FlowEdge >[]) new List[node];
        for (int v = 0; v < node; v++)
            adjacencyList[v] = new ArrayList< >();
    }

    public void addEdge(FlowEdge flowEdge) {
        int v = flowEdge.getFrom();
        int w = flowEdge.getTo();
        adjacencyList[v].add(flowEdge);
        adjacencyList[w].add(flowEdge);
    }

    public Iterable< FlowEdge > getAdjacencyList(int v) {
        return adjacencyList[v];
    }

    public int getNode() {
        return node;
    }

    @Override
    public String toString() {
        return "FlowNetwork{" +
                "vertices=" + node +
                ", adj=" + Arrays.toString(adjacencyList) +
                '}';
    }

}