/**
 * Created by kavith on 7/31/14.
 */
var editorItemCounter = 0;
var currentId= null;
var count = 0;
var counter = 0;
var lastItem= null;
var lastItem1= null;
var dataString = null;
var CurElement = null;
var id = null;
var over = "false";
var CurElementisSource =null;
var CurElementisTarget = null;
var x =170; var x1 =170; var CurY = null;var divwidth = 200;var x3=60; var x5 = 120;
var elemSourceLocList = [];
var elemTargetLocList = [];
var elemSourceId = [];
var elemTargetId = [];
var elemSourceLocList1 = [];
var elemTargetLocList1 = [];
var elemSourceId1 = [];
var elemTargetId1 = [];
var elemSource = null;
var elemTarget = null;
var xSpace =0; var a =0;
var currentPopup = null;


jsPlumb.bind("ready", function () {
    initJsPlumb($("#jsPlumbContainer"));
});

//try to get the canvas inside the switch mediator item!!! :( :P Awanthikooo
function selectDeleteFunction() {
  if (CurElement != null)
   CurElement.removeClass('selected'); //deselect old

  CurElement = $(this);
  id = $(this).attr('id');
  CurElement.addClass('selected'); //select new
}




//connect function
function connectDivs(source,target){

console.log('connectDivs ' + source + '   ' + target);
jsPlumb.connect({
                 source:source,
                 target:target,
                 anchors:["Right", "Left" ],
			     paintStyle: { strokeStyle: "#3366FF", lineWidth: 1 },
                 connector: ["Flowchart", { curviness: 100}],
                 connectorStyle: [{ lineWidth: 1, strokeStyle: "#3366FF" }],
                 hoverPaintStyle: { strokeStyle: "#3366FF", lineWidth: 8 }
                 });
}

//add div functoin
function AddDiv(logMediatorObj) {

       jsonStr = '{"log":' + JSON.stringify(logMediatorObj) + ' }'
       jsonObj1 = $.parseJSON(jsonStr);

       editorItemCounter++;
       var objName = "draggedElem"+editorItemCounter;
       console.log('Adding a log mediator' + objName + '  ' + jsonStr);
       console.log(jsonObj1);
       var element = $("<div></div>");
       //var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
	   element.css({'top':x, 'left':250 + xSpace});
       element.attr('id', objName);
       element.addClass("draggable");//not working
	   element.prepend('<img src="icons/log-mediator.gif" />')
       element.click(selectDeleteFunction); //since this makes troubles
	   element.dblclick(openPopup);
	   element.data('jsonConfig', jsonObj1);
       element.addClass("wso2log_style");
       $("#jsPlumbContainer").append(element);
	   lastItem = $("#"+objName);
	   xSpace += 200;
	   return objName;
}

//end


function addSwitchMediator(element, objName, yLoc1, image) {

    $("#jsPlumbContainer").append('<div id='+objName+' style="height: 165px; width: '+divwidth+'px; background: #fff0f0;"></div>')
    $("#"+objName).append('<div id="jsPlumbContainer1" style=" height:100%; width:100%;"></div>')
    $("#jsPlumbContainer1").append('<table id="switchtableID" width="100%" height="100%"><table/>');
    $("#switchtableID").append('<tr><td  id="draggedSwitchMediatorin" rowspan="2" style="switchTableLeftTDStyle">Switch Mediator</td><td style="switchTableTDStyle"><div id="jsPlumbContainerWrapper11" class="well-lg"  style="height:100%; width:100%; background: #ffffff;">Case</div></td></tr>');
    $("#switchtableID").append('<tr><td style="switchTableTDStyle"><div id="jsPlumbContainerWrapper12" class="well-lg"  style="height:100%; width:100%; background: #ffffff;">Default</div></td></tr>');
    $("#draggedSwitchMediatorin").append(image);
    element.attr('id', objName+"inside");
    $("#"+objName).addClass("wso2log_style");
    $("#"+objName).draggable()
    $("#draggedSwitchMediatorin").append(element);
    $( "#"+objName+"inside" ).position({
          my: "left center",
          at: "left center",
          of: "#draggedSwitchMediatorin"
        });
    
    //$("#jsPlumbContainerWrapper12").append(element);
    $("#"+objName).css({'top':x5, 'left':yLoc1});
}



function openPopup(){
       if(a==0){     
      doubleClickedElementID = $(this).attr('id');
      $(document.body).append('<div id="logMpopup"></div>');
	    $("#logMpopup").attr('id', "logMpopup");
            $("#logMpopup").load('js/logMediator/logMediatorForm.html');
            $("#logMpopup").dialog({ autoOpen: false,
            	       bgiframe: true,
                     height: 400,
                     width: 600,
                     modal: false,
                     draggable: true,
                     resizable: true,
                     position: 'center' });
      $("#logMpopup").dialog('option', 'title', 'Log Mediator');
		currentPopup = $("#logMpopup"); ++a;}
      currentPopup.dialog("open");
		
}

//Susantha's Function
 function setUpdatedDataCallBack(obj) {
      var strID = CurElement.attr('id');
      var divMediator = document.getElementById(strID);
      $(divMediator).data('jsonConfig', obj);
      currentPopup.dialog("close");
    }

//end


function createDiv(objName, image,type,x2) {
			var yLoc1 = CurY-400;
            var element = $("<div></div>");

            element.click(selectDeleteFunction);
            element.dblclick(openPopup);
            setData(element, type);


            if(type== "SwitchMediator"){
                 addSwitchMediator(element, objName, yLoc1, image);
            }else{
                element.attr('id', objName);
                element.append(image);
                $("#jsPlumbContainer").append(element);
                jsPlumb.draggable(objName, {
                    containment: $("#jsPlumbContainer")
                });
                element.css({'top':x2, 'left':yLoc1});
                element.addClass("wso2log_style");
            }
 }



function initJsPlumb(container) {
    jsPlumb.setContainer(container);

}



$(document).ready(function () {



$(document).on('mouseenter','#jsPlumbContainerWrapper11',function() {
	currentId = $(this).attr('id'); //alert(currentId);
     over="true";console.log(over);

});
$(document).on('mouseleave','#jsPlumbContainerWrapper11',function() {
    over="false";console.log(over);

});


x2js = new X2JS();

 $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
     var tabName = $(e.target).html();
     if ( tabName == 'Source') {
         activateSourceView();
       } else {
         activateDesignView();
       }
 });


var logMediator = document.registerElement('wso2-log', {
prototype: Object.create(HTMLDivElement.prototype) });

$(document).mousemove(function(e){// to get the cursor point to drop an icon
		         CurY= e.pageX;
		  });



    $(".draggableIcon").draggable({
        helper: 'clone',
        containment: 'jsPlumbContainer',
        cursor: 'move',
        zIndex: 1000,
        //When first dragged
        stop: function (ev, ui) {

        }
    });




    //Make element droppable

    $("#jsPlumbContainer").droppable({

        drop: function (ev, ui) {//to locate the element
		var yLoc = CurY-400; //to get the current location in the div
		var currentConnectionList = jsPlumb.getAllConnections();
		for (var key in currentConnectionList){//getting a map of the existing elements in the canvas
			 elemSourceId[key] =currentConnectionList[key].sourceId ;
			 elemSource = document.getElementById(elemSourceId[key]);
			 elemSourceLocList[key] = elemSource.offsetLeft;

			 elemTargetId[key] =currentConnectionList[key].targetId ;
			 elemTarget = document.getElementById(elemTargetId[key]);
			 elemTargetLocList[key] = elemTarget.offsetLeft;
		}

		if (over=="false"){
		if ($(ui.draggable).attr('id').search(/dragged/) == -1) {
                editorItemCounter++;
                var element1 = $(ui.draggable).clone();
                element1.removeClass("draggableIcon");
                element1.removeClass("ui-draggable");
                var type = element1.attr('id');
		//getting the switch mediator background stuff created

        var objName = "dragged" +type+ editorItemCounter;
		createDiv(objName, element1,type,170);

		for(var mykey in elemSourceLocList){
		if(yLoc > elemSourceLocList[mykey] && yLoc < elemTargetLocList[mykey]){
		jsPlumb.detach(currentConnectionList[mykey]);
		var isMiddle = true;
		connectDivs(elemSourceId[mykey],$("#"+objName));
		connectDivs($("#"+objName),elemTargetId[mykey]);
		}}
		if(isMiddle!=true){
		if(lastItem == null){
			if(type== "SwitchMediator"){lastItem = $("#"+objName); }else{
                    lastItem = $("#"+objName);}
                }else{
		            connectDivs(lastItem,$("#"+objName));
                }
                if(type!= "SwitchMediator"){lastItem = $("#"+objName);}else{lastItem = $("#"+objName); }
		}
            }
		}else{//to locate the element
                  		x3 +=80;alert(x3);
				$("#draggedSwitchMediator1").css("width", divwidth+x3+"px");
				$("#jsPlumbContainer1").css("width", divwidth+x3+"px");
				$("#draggedSwitchMediator1").css("height", "300px");
				$("#draggedSwitchMediatorin").css("width", "80px");
				$("#jsPlumbContainer1").css("height", "300px");
                  		if ($(ui.draggable).attr('id').search(/dragged/) == -1) {
                                  editorItemCounter++;
                                  var element1 = $(ui.draggable).clone();
                                  element1.removeClass("draggableIcon");
                                  element1.removeClass("ui-draggable");
                                  var type = element1.attr('id');
                  		//getting the switch mediator background stuff created
                  		if(type== "SwitchMediator"){
                  			$('jsPlumbContainerWrapper1').show();
                  		}
                                  var objName = "dragged" +type+"switch"+ editorItemCounter;

				createDiv(objName, element1,type,x1);
                  		//trying to get from the map
                  		for(var mykey in elemSourceLocList){

                  		if(yLoc > elemSourceLocList1[mykey] && yLoc < elemTargetLocList1[mykey]){
                  		jsPlumb.detach(currentConnectionList1[mykey]);
                  		var isMiddle = true;
                  		connectDivs(elemSourceId1[mykey],$("#"+objName));
                  		connectDivs($("#"+objName),elemTargetId1[mykey]);
                  		}}
                  		if(isMiddle!=true){
                  		if(lastItem1 == null){
                                      lastItem1 = $("#"+objName);
                                  }else{
                  		connectDivs(lastItem1,$("#"+objName));
                                  }
                                  lastItem1 = $("#"+objName);
                  		}
                              }
                          }
        },
		tolerance: "pointer"

    });
});
//end of droppable two

$(document).keydown(function(e) {
		if (e.keyCode == 13){
		AddDiv();
		AddDiv();
		connectDivs("draggedElem1","draggedElem2");

		 }
         //alert(e.which); //run to find the keycode of the key you want, don't use backspace, that is used to go back in browser history
         if (e.keyCode == 46  && CurElement != null)
         {   var connectionList = jsPlumb.getAllConnections();
		for (var key in connectionList){

    			if(connectionList[key].sourceId==CurElement.attr('id')){ CurElementisSource =connectionList[key].targetId }
			if(connectionList[key].targetId==CurElement.attr('id')){ CurElementisTarget =connectionList[key].sourceId }
			//alert(i +" and "+ l);
		}

		if(CurElement.attr('id')==lastItem.attr('id') ){
			lastItem = $("#"+CurElementisTarget);
			//y = y - 100;
		}
		jsPlumb.detachAllConnections(id);
		CurElement.remove();


	      if(CurElementisTarget!= null && CurElementisSource!=null )
	      {
		connectDivs(CurElementisTarget,CurElementisSource);
		CurElementisSource = null;
		CurElementisTarget= null;
		}

               CurElement = null; //clear, that element doesn't exist anymore
         }
});
