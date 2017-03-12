"use strict"

if (!HRDrawModule)
    var HRDrawModule = {};

//Constructeur
HRDrawModule.HRConst = function(){

};
//En passant les "constantes" dans le prototype on limite au maximum l'empreinte mémoire.
HRDrawModule.HRConst.prototype.ON_MOUSE_MOVE_ID = "onMouseMove";
HRDrawModule.HRConst.prototype.ON_CLICK_UP_ID = "onClickUp";
HRDrawModule.HRConst.prototype.ON_CLICK_DOWN_ID = "onClickDown";
//Définition de la taille de préhension des Handles de Shape en 2D
HRDrawModule.HRConst.prototype.D2_HANDLE_ZONE_WIDTH = 4;
HRDrawModule.HRConst.prototype.MOVING_HANDLE_COLOR = "#0052cc";
HRDrawModule.HRConst.prototype.BARYCENTRE_COLOR = "#DE3074";
HRDrawModule.HRConst.prototype.ROTATION_HANDLE_COLOR = "#33DE30";
HRDrawModule.HRConst.prototype.ROTATION_STROKE_STYLE = "#33DE30";
HRDrawModule.HRConst.prototype.DEFAULT_STROKE_STYLE = "#000500";
HRDrawModule.HRConst.prototype.DEFAULT_FILL_STYLE = "#5cb0e8";//"#b3e6ff";

