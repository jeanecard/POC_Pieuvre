"use strict"


//!TODO : Ne prend en compte que les poygons.
//Prendre en compte les cercles, polylignes, Arc de cercle, beziers et autres.
//!Todo amener une notion de css (global et déduit des propriétés métiers de la Shape).


if (!HRDrawModule)
    var HRDrawModule = {};
//Extension de HRDrawModule avec 	 :	

//Interface 2DShapeRenderer -------------------------------------------------------------------------------------------------
//Constructeur
HRDrawModule.HR2DShapeRenderer = function () {
    //Appel du constructeur de base.
    HRDrawModule.AbstractShapeRenderer.prototype.constructor.call(this);}

//Mise en place del'héritage
HRDrawModule.HR2DShapeRenderer.prototype = new HRDrawModule.AbstractShapeRenderer();

//Rendu spécifique Shape
HRDrawModule.HR2DShapeRenderer.prototype.renderShape = function(dc, shape, projectionMatrix){
	//Récupération des Handles qui sont projétés dans la vue
	var handles = shape.getHandlesRef();
	var handlesCount = handles.length;
	//On préparer le dessin de la Polyline
	dc.beginPath();
	for (var i = 0; i < handlesCount; i++) {
		var pointi = handles[i].point.clone();
		pointi.transform(projectionMatrix);
		if (i == 0) {
			dc.moveTo(pointi.getX(), pointi.getY());
		}
		else {
			dc.lineTo(pointi.getX(), pointi.getY());
		}
	}
	dc.closePath();
	dc.fillStyle = new HRDrawModule.HRConst().DEFAULT_FILL_STYLE;
	dc.fill();
	
	dc.setLineDash([0, 0]);
	dc.strokeStyle = new HRDrawModule.HRConst().DEFAULT_STROKE_STYLE;
	dc.stroke(); //On surligne le contour pour l'instant pour voir ce que l'on dessine ;-).

	var handleWidth = new HRDrawModule.HRConst().D2_HANDLE_ZONE_WIDTH;
	var movingHandleColor = new HRDrawModule.HRConst().MOVING_HANDLE_COLOR;
	
	for (i = 0; i < handlesCount; i++) {
		var pointi = handles[i].point.clone();
		pointi.transform(projectionMatrix);
		//Ajout des Handles et les virer de la et les faire tourner.
		dc.fillStyle = movingHandleColor;
		dc.fillRect(pointi.getX() - handleWidth, pointi.getY() - handleWidth, 2*handleWidth, 2*handleWidth);
	}
};


