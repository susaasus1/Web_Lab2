package com.example.weblab2.servlets;

import com.example.weblab2.beans.EntriesBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class  ClearTableServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EntriesBean entries = (EntriesBean) request.getSession().getAttribute("entries");
        if (entries == null) entries = new EntriesBean();
        entries.getEntries().clear();
        request.getSession().setAttribute("entries", entries);
//        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        response.sendRedirect(request.getContextPath()+"/index.jsp");
    }
}