"use strict"
//Suppose que tous les HRDrwModule est importé...

if (!HRDrawModule)
    var HRDrawModule = {};
//Extension de HRDrawModule avec 	
//Classe de base pour les Handle de mouvement----------------------------------------------------------------------------------
HRDrawModule.HRMovingHandle = function () {
    this.index = 0;
    this.point = null;
};
HRDrawModule.HRMovingHandle = function (index, hRPoint) {
    this.index = index;
    this.point = hRPoint;
};