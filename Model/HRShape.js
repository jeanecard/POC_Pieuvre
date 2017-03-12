"use strict"
//Suppose que tous les HRDrwModule est importé...

if (!HRDrawModule)
    HRDrawModule = {};
//Extension de HRDrawModule avec 		


//Classe de base pour les Shape----------------------------------------------------------------------------------
HRDrawModule.HRShape = function () {
    this.__shapeTransformationMatrix = math.matrix([[1, 0, 0, 0],
													[0, 1, 0, 0],
													[0, 0, 1, 0],
													[0, 0, 0, 1]]);//Matrice identité
    this.__rotationPoint = null;
};

//Fonction de rÃƒÂ©cupÃƒÂ©ration des Handles offerts par la Shape.
HRDrawModule.HRShape.prototype.getHandlesRef = function () {
    //Pas de Handle pour la Shape de base.
    return null;
};
//Fonction de rÃƒÂ©cupÃƒÂ©ration des Handles offerts par la Shape.
//On pourrait faire un rÃƒÂ©cupÃƒÂ©rateur d'evenement direct a la React Js ... et aire un canvas virtuel...
HRDrawModule.HRShape.prototype.setHandles = function (handleIndex, hrPoint) {
    //Pas de Handle pour la Shape de base.
};
//Fonction de translation de la Shape.
HRDrawModule.HRShape.prototype.translate = function (x, y) {
    //On ajoute le vecteur translation a la matrice de transofrmation de la Shape
    var tx = this.__shapeTransformationMatrix.get([0, 3]);
    var ty = this.__shapeTransformationMatrix.get([1, 3]);

    this.__shapeTransformationMatrix.set([0, 3], tx + x);
    this.__shapeTransformationMatrix.set([1, 3], ty + y);
};
//Fonction de stretch de la Shape. Pour le moment homotethie de centre 0,0
HRDrawModule.HRShape.prototype.stretch = function (x, y, originex, originey) {
    var tx = this.__shapeTransformationMatrix.get([0, 0]);
    var ty = this.__shapeTransformationMatrix.get([1, 1]);
    this.__shapeTransformationMatrix.set([0, 0], tx * x);
    this.__shapeTransformationMatrix.set([1, 1], ty * y);
};
//Fonction de rotation de la Shape. 
HRDrawModule.HRShape.prototype.rotate = function (angle, originex, originey) {
    //Pour le momnet on prend que l'angle, sous entendu rotation en 0,0
    var trotationMatrix = math.matrix([[Math.cos(angle), -Math.sin(angle), 0, 0],
	   [Math.sin(angle), Math.cos(angle), 0, 0],
	   [0, 0, 1, 0],
		   [0, 0, 0, 1]]);
    this.translate(-originex, -originey);
    this.__shapeTransformationMatrix = math.multiply(trotationMatrix, this.__shapeTransformationMatrix);
    this.translate(originex, originey);
};
//Fonction de détection de la résence d'un point sur la Shape.
HRDrawModule.HRShape.prototype.isOn = function (hrDocumentPoint) {
	//Par défaut, on retourne faux.
	//Les dérivés retourneront le résultat en fonction de leur contexte.
	return false;
};

//Fonction retournant le barycentre. Pure abstract à ce niveau
HRDrawModule.HRShape.prototype.getCentroid = function () {
 return null;
};


