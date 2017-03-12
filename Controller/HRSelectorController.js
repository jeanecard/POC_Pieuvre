"use strict"

if (!HRDrawModule)
    var HRDrawModule = {};

//Extension de HRDrawModule avec 	 :	

//Classe selection Controller -------------------------------------------------------------------------------------------------
//Constructeur
HRDrawModule.HRSelectorController = function (views) {
	//Appel du constructeur de base. 
    HRDrawModule.HRBaseController.prototype.constructor.call(this, views);
     this.__selectedShape = null;
    this.__selectedHandle = null;//-1 pour rotation Handle..
	this.__fromDocumentPoint = null;//Utilisé pour la translation..
    this.__document = null;
}
//On met en place l'héritage.
HRDrawModule.HRSelectorController.prototype = new HRDrawModule.HRBaseController();
//Traitement du clickDown.
HRDrawModule.HRSelectorController.prototype.processClickDown = function (docHRPoint, handleZoneWidthInDocument) {
    var position = docHRPoint;
	if(this.__document && this.__document.getLayersRef)
	{
		var layers = this.__document.getLayersRef();
		if(layers)
		{
			var layersCount = layers.length;
			for(var i = 0; i < layersCount; i++)
			{
				var layeri = layers[i];
				if(layeri&& layeri.getShapesRef )
				{
					var shapes = layeri.getShapesRef();
					var shapeCount = shapes.length;
					//On va rechercher dans les Shapes, dans l'ordre des layers du documents 
					for(var j = 0; j < shapeCount; j++)
					{
						//Si un Handle de déformation de la Shape est sous la souris, on sort
						var handles = shapes[j].getHandlesRef();
						var handleCount = handles.length;
						for (var k = 0; k < handleCount; k++) {
							if (position.getX() >= handles[k].point.getX() - handleZoneWidthInDocument && position.getX() <= handles[k].point.getX() + handleZoneWidthInDocument
							&& position.getY() >= handles[k].point.getY() - handleZoneWidthInDocument && position.getY() <= handles[k].point.getY() + handleZoneWidthInDocument) {
								this.__selectedShape = shapes[j];
								this.__selectedHandle = k;
								return;
							}
						}
						//Sinon, si on a trouvé aucun Handle, on regarde le Handle de rotation
						var roationPoint = shapes[j].getRotationPoint();
						if (roationPoint 
							&& position.getX() >= roationPoint.getX() - handleZoneWidthInDocument && position.getX() <= roationPoint.getX() + handleZoneWidthInDocument 
							&& position.getY() >= roationPoint.getY() - handleZoneWidthInDocument && position.getY() <= roationPoint.getY() + handleZoneWidthInDocument){
								this.__selectedShape = shapes[j];
								this.__selectedHandle = -1;
								return;
						}
						//Sinon, on regarde si on et sur un point quelconque de la Shape
						if(shapes[j].isOn(position))
						{
							this.__selectedShape = shapes[j];
							//Pas de Handle puisque on est sur un point quleconque.
							this.__selectedHandle = null;
							this.__fromDocumentPoint = position;
							return;
						}
						
					}
                }
            }
        }
    }
};
//traitement du clickup
HRDrawModule.HRSelectorController.prototype.processClickUp = function (docHRPoint) {
    this.__selectedShape = null;
    this.__selectedHandle = null;
	this.__fromDocumentPoint = null;
};
//Traitement du MouseMove
HRDrawModule.HRSelectorController.prototype.processMouseMove = function (docHRPoint) {
    if (this.__selectedShape != null && docHRPoint) 
	{
		if(this.__selectedHandle != null )
		{
			if (this.__selectedHandle != -1) 
				this.__selectedShape.setHandles(this.__selectedHandle, docHRPoint);
			else 
				this.__selectedShape.setRotationPoint(docHRPoint);
		}
		else
		{
			if(this.__fromDocumentPoint)
			{
				this.__selectedShape.translate(docHRPoint.getX() - this.__fromDocumentPoint.getX(),  docHRPoint.getY() - this.__fromDocumentPoint.getY());
				//Mise à jour du point de la prochaine translation.
				this.__fromDocumentPoint = docHRPoint;
			}
		}
		//Quoiqu'il arrive on peut forcer le rafraichissement des vues
		if(this.__views)
		{
			var viewsCount = this.__views.length;
			for(var i = 0; i < viewsCount; i++){
				this.__views[i].render();
			}
		}
    }
};

//Accesseurs
HRDrawModule.HRSelectorController.prototype.getDocumentRef = function () {
	return this.__document;
};
HRDrawModule.HRSelectorController.prototype.setDocumentRef = function (documentRef) {
	this.__document = documentRef;
};
