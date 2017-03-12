"use strict"
//Sortir le Object.defineProperties du constructeur. => Abandon
//Affiner les propriétés enumerable / Configurable => Abandon
//Abandon des property (accesseurs js) qui sont 4 fois plus lente qu'un accès par fonction / prototype et 
//qui occupe plus d'espace mémoire que les fonctions proto. En effet, les accesseurs sont "posés" sur chaque objet.

"use strict"

if (!HRDrawModule)
    var HRDrawModule = {};

if (!HRDrawModule.HRPoint)
     HRDrawModule.HRPoint = {};


HRDrawModule.HRPoint = function (xOrMatrix, y, z) {
	//Création des attributs privés :

    if (arguments.length == 1)//Matrix
    {
        this.__x = xOrMatrix.get([0, 0]);
        this.__y = xOrMatrix.get([1, 0]);
        this.__z = xOrMatrix.get([2, 0]);
    }
    else {
        this.__x = xOrMatrix;
        this.__y = y;
        this.__z = z;
    }
};

HRDrawModule.HRPoint.prototype.transform = function (matrix) {
    var tProjectedMatrix = math.multiply(matrix, this.getMatrix());
    this.__x = tProjectedMatrix.get([0, 0]);
    this.__y = tProjectedMatrix.get([1, 0]);
    this.__z = tProjectedMatrix.get([2, 0]);

};
HRDrawModule.HRPoint.prototype.clone = function(){
	return new HRDrawModule.HRPoint(this.__x, this.__y, this.__z);
};

HRDrawModule.HRPoint.prototype.getX = function () {
	return this.__x;
};
HRDrawModule.HRPoint.prototype.getY = function () {
	return this.__y;
};
HRDrawModule.HRPoint.prototype.getZ = function () {
	return this.__z;
};
HRDrawModule.HRPoint.prototype.setX = function (xValue) {
	this.__x = xValue;
};
HRDrawModule.HRPoint.prototype.setY = function (yValue) {
	this.__y = yValue;
};
HRDrawModule.HRPoint.prototype.setZ = function (zValue) {
	this.__z = zV;
};
HRDrawModule.HRPoint.prototype.getMatrix = function () {
    return math.matrix([[this.__x],
                        [this.__y],
                        [this.__z],
                        [1]]);
};