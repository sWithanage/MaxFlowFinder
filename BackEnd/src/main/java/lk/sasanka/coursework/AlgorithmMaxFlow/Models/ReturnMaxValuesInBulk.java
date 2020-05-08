package lk.sasanka.coursework.AlgorithmMaxFlow.Models;


/*
 *
 * Model for return max value as bulk content.
 *
 */
public class ReturnMaxValuesInBulk {
    private int id;
    private double maxFlow;
    private float time;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getMaxFlow() {
        return maxFlow;
    }

    public void setMaxFlow(double maxFlow) {
        this.maxFlow = maxFlow;
    }

    public float getTime() {
        return time;
    }

    public void setTime(float time) {
        this.time = time;
    }
}
