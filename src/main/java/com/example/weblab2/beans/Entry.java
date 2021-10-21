package com.example.weblab2.beans;

import java.io.Serializable;

public class Entry implements Serializable {
    private double xValue;
    private double yValue;
    private double rValue;
    private String currentTime;
    private String executionTime;
    private boolean hitResult;

    public Entry() {
        this(0.0, 0.0, 0.0, "", "", false);
    }

    public Entry(double xValue, double yValue, double rValue, String currentTime, String executionTime, boolean hitResult) {
        this.xValue = xValue;
        this.yValue = yValue;
        this.rValue = rValue;
        this.currentTime = currentTime;
        this.executionTime = executionTime;
        this.hitResult = hitResult;
    }

    public double getxValue() {
        return xValue;
    }

    public void setxValue(double xValue) {
        this.xValue = xValue;
    }

    public double getyValue() {
        return yValue;
    }

    public void setyValue(double yValue) {
        this.yValue = yValue;
    }

    public double getrValue() {
        return rValue;
    }

    public void setrValue(double rValue) {
        this.rValue = rValue;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(String executionTime) {
        this.executionTime = executionTime;
    }

    public boolean isHitResult() {
        return hitResult;
    }

    public void setHitResult(boolean hitResult) {
        this.hitResult = hitResult;
    }
}
