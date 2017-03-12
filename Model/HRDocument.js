"use strict"
if (!HRDrawModule)
    var HRDrawModule = {};
//Extension de HRDrawModule avec Document	
 
 
 //Constructeur
 HRDrawModule.HRDocument = function (){
	this.__layers = new Array();
};
//Prorpiétés Layers
//!TODO Rendre immutable et const.
HRDrawModule.HRDocument.prototype.getLayersRef = function(){
	return this.__layers;
}
//Ajout de layer
HRDrawModule.HRDocument.prototype.createNewLayer = function(){
	//!Idéalement on devrait faire de l'injection de dépendance ici pour créer cette instance de Layer :
	var newLayer = new HRDrawModule.HRLayer();
	this.__layers.push(newLayer);
}
//Méthode retournant la surface du document.
HRDrawModule.HRDocument.prototype.getBoundingRect = function(){
	//!TODO calcul dynamique en fonction des Layers et indirectement de leus Shapes.
	var retour = new HRDrawModule.HRBoundingRect(new HRDrawModule.HRPoint(0,0,0), new HRDrawModule.HRPoint(1000,1000,1000));
	return retour;
}


