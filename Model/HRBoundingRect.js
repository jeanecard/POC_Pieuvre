"use strict"

if (!HRDrawModule)
    var HRDrawModule = {};
//Extension de HRDrawModule avec Document	
 
 //Constructeur
 HRDrawModule.HRBoundingRect = function (topLeftHRPoint, bottomRightHRPoint){
	 if(topLeftHRPoint && topLeftHRPoint instanceof HRDrawModule.HRPoint)
		this.__topLeft = topLeftHRPoint.clone();
	else 
		this.__topLeft = null;
	if(bottomRightHRPoint && bottomRightHRPoint instanceof HRDrawModule.HRPoint)
		this.__bottomRight = bottomRightHRPoint.clone();
	else
		this.__bottomRight = null;
};

//Accesseurs
HRDrawModule.HRBoundingRect.prototype.getTopLeftHRPointRef = function(){
	if(this.__topLeft)
		return this.__topLeft;
	else
		return null;
};
HRDrawModule.HRBoundingRect.prototype.setTopLeftHRPointRef = function(topLeftHRPoint){
	 if(topLeftHRPoint && topLeftHRPoint instanceof HRDrawModule.HRPoint)
		this.__topLeft = topLeftHRPoint;
};
HRDrawModule.HRBoundingRect.prototype.getBottomRightHRPointRef = function(){
	if(this.__bottomRight )
		return this.__bottomRight;
	else
		return null;
};
HRDrawModule.HRBoundingRect.prototype.setBottomRightHRPointRef = function(bottomRightHRPoint){
	if(bottomRightHRPoint && bottomRightHRPoint instanceof HRDrawModule.HRPoint)
		this.__bottomRight = bottomRightHRPoint;
}




