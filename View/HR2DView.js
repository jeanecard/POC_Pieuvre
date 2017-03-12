"use strict"

if (!HRDrawModule)
    var HRDrawModule = {};

//Extension de HRDrawModule avec 		



//Classe Vue 2D-------------------------------------------------------------------------------------------------
//Constructeur 
//domCanvas est le canvas HTML5.
//iHRDocument : l'interface sur le HRDocument que la view va représenter. Il s'agit là du modèle(M) à représenter par la vue (V)
//Inversion de dépendance par le constructeur.
HRDrawModule.HR2DView = function (domCanvas, iHRDocument) {
	this.__domCanvas = domCanvas;
	this.__hRDocument = iHRDocument;
	this.__hrObservers = new Array();
	this.__renderer = new HRDrawModule.HR2DShapeRenderer();//Mériterait une injection.
	//Au début, aucun controlleur n'est positionné.
	this.__isClickedDown = false;
	this.__matrix = math.matrix([[1, 0, 0, 0],
								[0, 1, 0, 0],
								[0, 0, 1, 0],
								[0, 0, 0, 1]]);//Matrice identité
}

//Propriété Get MatrixRef
HRDrawModule.HR2DView.prototype.getMatrixRef = function (){
	return this.__matrix;
};

//Propriété Get Matrix => !Passer par une propriété js
HRDrawModule.HR2DView.prototype.getMatrix = function (){
	if(this.__matrix)
		return this.__matrix.clone();
	else
		return null;
};

//Propriété Get isClickDown
HRDrawModule.HR2DView.prototype.getIsClickDown = function (){
	return this.__isClickedDown;
};
//Propriété Set  isClickDown
HRDrawModule.HR2DView.prototype.setIsClickDown = function (value){
	this.__isClickedDown = value;
};
//Méthode de rendering.
HRDrawModule.HR2DView.prototype.render = function(){
	//On s'assure d'être dans un context consistant
	if(this.__hRDocument && this.__domCanvas && this.__renderer)
	{
		var d2canvasCtx = this.__domCanvas.getContext("2d");
		this.__renderer.render(d2canvasCtx, null, null, this.__matrix, this.__hRDocument);
	}
};
//Méthode de rendering.
HRDrawModule.HR2DView.prototype.getDOMCanvas = function(){
	return this.__domCanvas;
};
//fontion globale temporaire
  HRDrawModule.HR2DView.prototype.getMousePos = function(evt) {
	var retour = null;
	if(this.__domCanvas && evt)
	{
		var rect = this.__domCanvas.getBoundingClientRect();
		if(rect)
		retour = {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top,
			z: 0
		}
	}
	return retour;
};

HRDrawModule.HR2DView.prototype.onMouseWheel= function (evt) {
	if(this.hrView)
	{
		var view = this.hrView;
		var canvasPosition = view.getMousePos(evt);
		var origineStretchPoint = new HRDrawModule.HRPoint(canvasPosition.x, canvasPosition.y, canvasPosition.z);
		
		//Application d'une translation et d'un stretctch
		var viewMatrix = view.getMatrixRef();

		var wheelSens = evt.wheelDelta;
		var zoomStep = 1;
		if(wheelSens > 0)
			zoomStep = 1.1;
		else
			zoomStep = 0.9;

		//Stretch sur origine
		var tx = viewMatrix.get([0, 0]);
		var ty = viewMatrix.get([1, 1]);
		var tz = viewMatrix.get([2, 2]);
		viewMatrix.set([0, 0], tx * zoomStep);
		viewMatrix.set([1, 1], ty * zoomStep);
		viewMatrix.set([2, 2], tz * zoomStep);
		
		//Translation sur le point de vue.
		var tx = viewMatrix.get([0, 3]);
		var ty = viewMatrix.get([1, 3]);
		viewMatrix.set([0, 3], tx - (origineStretchPoint.getX() * zoomStep - origineStretchPoint.getX()));
		viewMatrix.set([1, 3], ty - (origineStretchPoint.getY() * zoomStep - origineStretchPoint.getY()));
	
		view.render();
	}
};

//Méthode de propagation des évenements au controller actif de la vue.
HRDrawModule.HR2DView.prototype.onClickDown = function (evt) {
	//La propagation n'a un sens que si le DOM a une 2DView puisque c'est à elle que je délégue la gestion des évenements.
	if(this.hrView)
	{
		var view = this.hrView;
		var canvasPosition = view.getMousePos(evt);
		console.log("Evenement : "  + evt);
		view.setIsClickDown(true);
		//On va notifier tous les observer
		var observers =  view.getObservers();
		if(observers)
		{
			var observersCount = observers.length;
			for(var i = 0; i < observersCount; i++)
			{
				var observeri = observers[i];
				var viewHRPoint = new HRDrawModule.HRPoint(canvasPosition.x, canvasPosition.y, 0);
				//On projette le point dans les coordonnées du document :
				var invertedViewMatrix = math.inv(view.getMatrixRef());
				viewHRPoint.transform(invertedViewMatrix);	
								//On transmet la sensibilité de la zone de Grip dans le référentiel du Document :
				var handleZoneWidthInDocument = view.getHandleZoneWidthInDocument();
				observeri.notify(new HRDrawModule.HRConst().ON_CLICK_DOWN_ID, viewHRPoint, handleZoneWidthInDocument);				
			}
		}
	}
};

//Méthode de gestion de l'évnement on clickUp
HRDrawModule.HR2DView.prototype.onClickUp = function (evt) {
	if(this.hrView && this.hrView.getIsClickDown())
	{
		var view = this.hrView;
		view.setIsClickDown(false);
		//On va notifier tous les observer
		var observers =  view.getObservers();
		if(observers)
		{
			var observersCount = observers.length;
			for(var i = 0; i < observersCount; i++)
			{
				var observeri = observers[i];
				var canvasPosition = view.getMousePos(evt);
				var viewHRPoint = new HRDrawModule.HRPoint(canvasPosition.x, canvasPosition.y, 0);
				//On projette le point dans les coordonnées du document :
				var invertedViewMatrix = math.inv(view.getMatrixRef());
				viewHRPoint.transform(invertedViewMatrix);	
				observeri.notify(new HRDrawModule.HRConst().ON_CLICK_UP_ID, viewHRPoint);				
			}
		}
	}
};
//Méthode de gestion de l'évnement onMouseMove
HRDrawModule.HR2DView.prototype.onMouseMove = function (evt) {
	//On vérifit si le contexte est suffisant pour traiter le mouse Move.
	if(this.hrView && this.hrView.getIsClickDown())
	{
		var view = this.hrView;
		//On va notifier tous les observer
		var observers =  view.getObservers();
		if(observers)
		{
			var observersCount = observers.length;
			for(var i = 0; i < observersCount; i++)
			{
				var observeri = observers[i];
				var canvasPosition = view.getMousePos(evt);
				var viewHRPoint = new HRDrawModule.HRPoint(canvasPosition.x, canvasPosition.y, 0);
				var viewHRPoint = new HRDrawModule.HRPoint(canvasPosition.x, canvasPosition.y, 0);
				//On projette le point dans les coordonnées du document :
				var invertedViewMatrix = math.inv(view.getMatrixRef());
				viewHRPoint.transform(invertedViewMatrix);	
				observeri.notify(new HRDrawModule.HRConst().ON_MOUSE_MOVE_ID, viewHRPoint);
			}
		}
	}
};	

//Retourne la zone de préhension des Handles de Shape dans le référentiel du document.
HRDrawModule.HR2DView.prototype.getHandleZoneWidthInDocument = function(){
	var retour = new HRDrawModule.HRConst().D2_HANDLE_ZONE_WIDTH;
	if(this.getMatrixRef())
	{
		//Récupération du stretch de la matrice de vue (On suppose que le stretch est identique en x, y et z).
		var stretchFactor = this.getMatrixRef().get([0, 0]);
		if(stretchFactor != 0)
			retour = retour * 1 / stretchFactor;
	}
	return retour;
}

//METHODES DE L'OBSERVABLE
//Propriété Get controller
HRDrawModule.HR2DView.prototype.getObservers = function (){
	return this.__hrObservers;
};
//Propriété addObserver 
HRDrawModule.HR2DView.prototype.addObserver = function (hrObserver){
	if(hrObserver)
		this.__hrObservers.push(hrObserver);
};

//Propriété removeObserver 
HRDrawModule.HR2DView.prototype.removeObserver = function (hrObserver){
	//!TODO
};
