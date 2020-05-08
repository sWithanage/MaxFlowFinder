package lk.sasanka.coursework.AlgorithmMaxFlow.Pojo;

/*
 *
 * Flow edge pojo class to contain edge required data.
 *
 */
public class FlowEdge {
    private final int from, to;
    private double flow;
    private final String edgeName;
    private final double capacity;

    public FlowEdge(String edgeName, int from, int to, double capacity) {
        this.edgeName = edgeName;
        this.from = from;
        this.to = to;
        this.capacity = capacity;
    }

    public int getFrom() {
        return from;
    }

    public int getTo() {
        return to;
    }

    public double getCapacity() {
        return capacity;
    }

    public double getFlow() {
        return flow;
    }

    public void setFlow(double flow) {
        this.flow = flow;
    }

    public int getOtherSideOfNode(int vertex) {
        if (vertex == from) return to;
        else if (vertex == to) return from;
        else throw new RuntimeException("Endpoint is illegal");
    }

    public double getResidualCapacity(int node) {
        if (node == from) return flow;
        else if (node == to) return capacity - flow;
        else throw new IllegalArgumentException();
    }

    public void addResidualFlowTo(int node, double newFlowDifference) {
        if (node == from) flow -= newFlowDifference;
        if (node == to) flow += newFlowDifference;
        else throw new IllegalArgumentException();
    }

    public String getEdgeName() {
        return edgeName;
    }

    @Override
    public String toString() {
        return "FlowEdge{" +
                "edgeName='" + edgeName + '\'' +
                ", from=" + from +
                ", to=" + to +
                ", capacity=" + capacity +
                ", flow=" + flow +
                '}';
    }
}