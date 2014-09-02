
/////////////////////////  set the data acording to the mediator     ///////////////////////////////////
function setData(element, type) {

if (type == 'logMediator') {
   var logString = $.parseJSON('{"log": {"_logLevel":0, "_separator":",", "_category":0, "properties":[], "description":"susindas log mediator"}}');
   element.data('jsonConfig' , logString);
} 
if (type == 'dropMediator') {
   var logString = $.parseJSON(JSON.stringify('{"logLevel":0, "separator":"- ", "category":1, "properties":[], "description":"susinda dropeedd"}'));
   element.data('jsonConfig' , logString);
} 

}
///////////////////////////////////////////////////////////////////////



////////////////////////////  this will openup the config dialog acording to the mediator   /////////////////////////////////
function openPopupDialog() {

var type = $(this).attr('id');

if(type.indexOf('logMediator') != -1){
   openLogMediatorPopup();
}

if(type.indexOf('propertyMediator') != -1){
   openLogMediatorPopup();
}

} 
////////////////////////////////////////////////////////////////////

function openLogMediatorPopup(){

      doubleClickedElementID = $(this).attr('id');
      var dElement = $("<div></div>");
      dElement.load('js/logMediator/logMediatorForm.html');
      dElement.dialog({ autoOpen: false,
      	       bgiframe: true,
               height: 400,
               width: 600,
               modal: false,
               draggable: true,
               resizable: true,
               position: 'center' });
      dElement.dialog('option', 'title', 'Log Mediator');
      dElement.dialog("open");
}




function convertXml2Json(xmlString) {
    var jsonLogMediator = (JSON.stringify(x2js.xml_str2json(xmlString)));
    return jsonLogMediator;
}

function convertJson2Xml(jsonObject) {
    var xmlString =  (x2js.json2xml_str($.parseJSON(jsonObject)));
    return xmlString;
}



function activateSourceView() {
console.log('activateSourceView');
var prevElement = null;
var nextElement = null;
var connectionList = jsPlumb.getAllConnections();

$('#sourceEditorTextBox').val('<sequence name="sample_sequence">');

for (var key in connectionList){

    if(connectionList[key].sourceId != null){
         prevElement = document.getElementById(connectionList[key].sourceId);
    }
	if(connectionList[key].targetId != null){
	     nextElement = document.getElementById(connectionList[key].targetId);
	}

    var jObj = $(prevElement).data('jsonConfig');
    console.log(prevElement);
    console.log('serializing ' + jObj);
    console.log(jObj);
    var xmlElement = '\n' + x2js.json2xml_str(jObj);
    var currentText = $('#sourceEditorTextBox').val();
    $('#sourceEditorTextBox').val(currentText + xmlElement);
}

var jObj = $(nextElement).data('jsonConfig');
console.log('serializing ' + jObj);
console.log(jObj);
var xmlElement = '\n' + x2js.json2xml_str(jObj);
var currentText = $('#sourceEditorTextBox').val() ;
$('#sourceEditorTextBox').val(currentText + xmlElement + '\n</sequence>');
}



function activateDesignView() {
   console.log('activateDesignView');
   var sequenceObj = x2js.xml_str2json($("#sourceEditorTextBox").val());
   var sequence = sequenceObj.sequence;
   var logArray = sequence.log;
   console.log(logArray);

   $("#jsPlumbContainer").empty();
   var prevDivElement = null;
   for (var i=0; i<logArray.length; i++) {
       console.log(logArray[i]);
       var currentDiv = AddDiv(logArray[i]);
       if (prevDivElement != null ) {
         connectDivs(prevDivElement, currentDiv);
       }
       prevDivElement = currentDiv;
   }

}

