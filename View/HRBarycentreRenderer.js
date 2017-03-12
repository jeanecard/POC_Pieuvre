"use strict"

if (!HRDrawModule)
    var HRDrawModule = {};
//Extension de HRDrawModule avec 	 :	

//Interface 2DShapeRenderer -------------------------------------------------------------------------------------------------
//Constructeur
HRDrawModule.HRBarycentreRenderer = function () {
};

//Rendu spécifique Shape
HRDrawModule.HRBarycentreRenderer.prototype.render = function(dc, shape, projectionMatrix){
	var handleWidth = new HRDrawModule.HRConst().D2_HANDLE_ZONE_WIDTH;
	var barycentre = shape.getCentroid();
	barycentre.transform(projectionMatrix);
	dc.fillStyle = new HRDrawModule.HRConst().BARYCENTRE_COLOR;
	dc.fillRect(barycentre.getX() - handleWidth, barycentre.getY() - handleWidth, 2*handleWidth, 2*handleWidth);
};


