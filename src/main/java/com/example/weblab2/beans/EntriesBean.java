package com.example.weblab2.beans;

import java.util.ArrayList;
import java.util.List;

public class EntriesBean {
    private List<Entry> entries;

    public EntriesBean() {
        this(new ArrayList<>());
    }

    public EntriesBean(List<Entry> entries) {
        this.entries = entries;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}