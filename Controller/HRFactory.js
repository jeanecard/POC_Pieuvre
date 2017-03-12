"use strict"
if (!HRDrawModule)
    var HRDrawModule = {};

"use strict"
//Extension de HRDrawModule avec 		

//Classe Vue 2D-------------------------------------------------------------------------------------------------
//Constructeur 
//domCanvas est le canvas HTML5.
//iHRDocument : l'interface sur le HRDocument que la view va représenter. Il s'agit là du modèle(M) à représenter par la vue (V)
//Inversion de dépendance par le constructeur.
//Principe : Il n'y a qu'un controleur actif à la fois pour l'application. Il va falooir intégrer cette notion dans un gestionnaire de controlleur.
 HRDrawModule.HRFactory = function (){
};

HRDrawModule.HRFactory.prototype.CreateView = function(hrDocument, domCanvas)
{
	var retour = new HRDrawModule.HR2DView(domCanvas, hrDocument);
	domCanvas.addEventListener("mousemove", retour.onMouseMove, true);
	domCanvas.addEventListener("mouseup", retour.onClickUp, true);
	domCanvas.addEventListener("mousedown", retour.onClickDown, true);
	domCanvas.addEventListener("mousewheel", retour.onMouseWheel, true);
	domCanvas.hrView = retour;//Une seule vue par Canvas bien entendu.
	return retour;
};

HRDrawModule.HRFactory.prototype.createController = function(hrDocument, views){
	var retour = new HRDrawModule.HRSelectorController(views);
	retour.setDocumentRef(hrDocument);
	//Pour toutes les vues observées, on va brancher l'observateur
	var viewsCount = views.length;
	for( var i = 0; i < viewsCount; i++)
	{
		var viewi = views[i];
		//!TODO repenser cette référence circulaire et prendre en compte la mise à 0 du controller, il faut se dérefernecer.
		viewi.addObserver(retour);
	}
	return retour;
};

	
