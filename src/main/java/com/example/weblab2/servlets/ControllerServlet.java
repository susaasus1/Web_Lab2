package com.example.weblab2.servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect(request.getContextPath()+"/index.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("clear") != null && request.getParameter("clear").equals("true")) {
            getServletContext().getNamedDispatcher("ClearTableServlet").forward(request, response);
        } else if (request.getParameter("xval") != null && request.getParameter("yval") != null &&
                request.getParameter("rval") != null) {
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
        } else
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
}
