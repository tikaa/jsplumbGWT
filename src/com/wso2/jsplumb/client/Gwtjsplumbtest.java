package com.wso2.jsplumb.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.datepicker.client.DatePicker;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class Gwtjsplumbtest implements EntryPoint {
	 FlowPanel window1 = new FlowPanel();
     FlowPanel window2 = new FlowPanel();
     Label window3 = new Label("I'm a Label");
     DatePicker window4 = new DatePicker();
     
     /**
      * This is the entry point method.
      */
     public void onModuleLoad() {
             
             /* Create a couple of GWT widgets */
             window1.add(new Label("I'm a Flowpanel"));
             window2.add(new Label("I'm a Flowpanel 2"));
             
             window1.getElement().setId("window1");
             window2.getElement().setId("window2");
             window3.getElement().setId("window3");
             window4.getElement().setId("window4");
             window1.getElement().setClassName("window");
             window2.getElement().setClassName("window");
             window3.getElement().setClassName("window");
             window4.getElement().setClassName("window");
             
             RootPanel.get("main").add(window1);
             RootPanel.get("main").add(window2);
             RootPanel.get("main").add(window3);
             RootPanel.get("main").add(window4);
             
             
             gwtjsPlumbDemo();
     }
     
     public static native void gwtjsPlumbDemo() /*-{
     
             $wnd.gwtjsplumbdemo();
             
     }-*/;
     
}
