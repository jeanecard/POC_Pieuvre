"use strict"

if (!HRDrawModule)
    var HRDrawModule = {};
//Extension de HRDrawModule avec 		

//Classe Base Controller -------------------------------------------------------------------------------------------------
//Constructeur
//!Il faudrait passer par des Interfaces sur des vues.
HRDrawModule.HRBaseController = function (iviews) {
    this.__isClickedDown = false;
	this.__views = iviews;
}
//Méthode à implémenter dans les classes filles.
HRDrawModule.HRBaseController.prototype.processClickDown = function (docHRPoint, handleZoneWidthInDocument) {
	//Dummy.
};
//Méthode à implémenter dans les classes filles.
HRDrawModule.HRBaseController.prototype.processClickUp = function (docHRPoint) {
	//Dummy.
};
//Méthode à implémenter dans les classes filles.
HRDrawModule.HRBaseController.prototype.processMouseMove = function (docHRPoint) {
	//Dummy.
};

//Méthode sealed //!TODO
HRDrawModule.HRBaseController.prototype.onClickDown = function (docHRPoint, handleZoneWidthInDocument) {
    this.__isClickedDown = true;
	this.processClickDown(docHRPoint, handleZoneWidthInDocument);
};

HRDrawModule.HRBaseController.prototype.onClickUp = function (docHRPoint) {
    this.__isClickedDown = false;
	this.processClickUp(docHRPoint);
};
HRDrawModule.HRBaseController.prototype.onMouseMove = function (docHRPoint) {
	if(this.__isClickedDown)
	{
		this.processMouseMove(docHRPoint);
	}
};

//Méthode de l'OBSERVER
HRDrawModule.HRBaseController.prototype.notify = function(eventID, docPoint, handleZoneWidthInDocument){
	 switch (eventID) {
        case new HRDrawModule.HRConst().ON_CLICK_DOWN_ID:
			this.onClickDown(docPoint, handleZoneWidthInDocument);
            break;
        case new HRDrawModule.HRConst().ON_CLICK_UP_ID:
			this.onClickUp(docPoint);
            break;
        case new HRDrawModule.HRConst().ON_MOUSE_MOVE_ID:
			this.onMouseMove(docPoint);
            break;
        default:

    }
};
