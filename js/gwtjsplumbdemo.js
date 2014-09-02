function gwtjsplumbdemo() {
        
    var fillColor = "gray"; 
    jsPlumb.Defaults.Connector = [ "Bezier", { curviness:50 } ];
    jsPlumb.Defaults.DragOptions = { cursor: "pointer", zIndex:2000 };
    jsPlumb.Defaults.PaintStyle = { strokeStyle:"gray", lineWidth:2 };
    jsPlumb.Defaults.EndpointStyle = { radius:9, fillStyle:"gray" };
    jsPlumb.Defaults.Anchors =  [ "BottomCenter", "TopCenter" ];

    // declare some common values:
    var arrowCommon = { foldback:0.7, fillStyle:fillColor, width:14 };
    // use three-arg spec to create two different arrows with the common values:
    var overlays = [
        [ "Arrow", { location:0.5 }, arrowCommon ]
    ];
                
    jsPlumb.connect({source:"window1", target:"window2", overlays:overlays});
    jsPlumb.connect({source:"window2", target:"window3", overlays:overlays});
    jsPlumb.connect({source:"window3", target:"window4", overlays:overlays});
    
 }