"use strict"

if (!HRDrawModule)
    var HRDrawModule = {};

//Constructeur
HRDrawModule.HRLayer = function(){
this.__shapes = new Array();
};

//Propriété getShapesRef. 
HRDrawModule.HRLayer.prototype.getShapesRef = function(){
	return this.__shapes;
};




