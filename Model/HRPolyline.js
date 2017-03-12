"use strict"
//Suppose que tous les HRDrwModule est importé...

//!Algorithme du Ray Casting a mettre sur le Polygon et pas la polyline.

if (!HRDrawModule)
    var HRDrawModule = {};
//Extension de HRDrawModule avec 
//Classe de base pour les polyLine----------------------------------------------------------------------------------
//Classe pour les polyLine.
HRDrawModule.HRPolyLine = function () {
    //Appel du constructuer de base.
    HRDrawModule.HRShape.prototype.constructor.call(this);
    //On stocke les points sous formes de Matrice.
    this.pointsMatrices = new Array();
}
//Mie en place de l'héritage
HRDrawModule.HRPolyLine.prototype = new HRDrawModule.HRShape();
//Méthode d'ajout d'un point.
HRDrawModule.HRPolyLine.prototype.addPoint = function (hrpoint) {
    //On ajoute en fin le nouveau Point.
    this.pointsMatrices.push(math.matrix([[hrpoint.getX()],
                                [hrpoint.getY()],
                                [hrpoint.getZ()],
                                [1]]));
};
//Méthode de récupération des Handles offerts par la Shape.
HRDrawModule.HRPolyLine.prototype.getHandlesRef = function () {
    var retour = new Array();
    //1 construction des Handles des points
    var pointsCount = this.pointsMatrices.length;
    for (var i = 0; i < pointsCount; i++) {
        //On convertit chaque point de la polyligne dans le référentiel du document
        var pointi = new HRDrawModule.HRPoint(this.pointsMatrices[i]);
        pointi.transform(this.__shapeTransformationMatrix);
        var handlei = new HRDrawModule.HRMovingHandle(i, pointi);
        retour.push(handlei);
    }
    //2 Construction du RotatingHadle.

    return retour;
};

//Méthode pour obtenir le centre de rotation de la Shape.
HRDrawModule.HRPolyLine.prototype.getRotationPoint = function () {
    return this.__rotationPoint;
};
//Méthode pour setter le centr ede rotation de la shape.
HRDrawModule.HRPolyLine.prototype.setRotationPoint = function (hrPoint) {

    //Nouvelle position du point permettant la rotation par rapport au barycentre
    var point1 = this.__rotationPoint;
    var barycentre = this.getCentroid();
    var angleRadians = 0;
    if (point1) {
        //Line 1 : barycentre / point1
        //line 2 = barycentre / hrpoint
        var angle1 = Math.atan2(barycentre.getY() - point1.getY(),
                           barycentre.getX() - point1.getX());
        var angle2 = Math.atan2(barycentre.getY() - hrPoint.getY(),
                           barycentre.getX() - hrPoint.getX());
        angleRadians = -(angle1 - angle2);

    }
    this.__rotationPoint = hrPoint;
    //Rotation de la Shape.
    var barycentre = this.getCentroid();

    this.rotate(angleRadians, barycentre.getX(), barycentre.getY());
};
//Fonction retournant la surface du polygon associé.
HRDrawModule.HRPolyLine.prototype.getArea = function () {
    var area = 0,
        i,
        j,
        handle1,
        handle2;
    var pointsCount = this.pointsMatrices.length;
    var handles = this.getHandlesRef();
    for (i = 0, j = pointsCount - 1; i < pointsCount; j = i, i++) {
        handle1 = handles[i];
        handle2 = handles[j];
        area += handle1.point.getX() * handle2.point.getY();
        area -= handle1.point.getY() * handle2.point.getX();
    }
    area /= 2;

    return area;
};
//Fonction déterminant le baycentre du polygon associé.
HRDrawModule.HRPolyLine.prototype.getCentroid = function () {
    var x = 0,
        y = 0,
        i,
        j,
        f,
        handle1,
        handle2;
    var pointsCount = this.pointsMatrices.length;
    var handles = this.getHandlesRef();
    for (i = 0, j = pointsCount - 1; i < pointsCount; j = i, i++) {
        handle1 = handles[i];
        handle2 = handles[j];
        f = handle1.point.getX() * handle2.point.getY() - handle2.point.getX() * handle1.point.getY();
        x += (handle1.point.getX() + handle2.point.getX()) * f;
        y += (handle1.point.getY() + handle2.point.getY()) * f;
    }

    f = this.getArea() * 6;

    return new HRDrawModule.HRPoint(x / f, y / f, 0);
};


//Méthode de mise à jour des Handles offerts par la Shape.
HRDrawModule.HRPolyLine.prototype.setHandles = function (handleIndex, hrPoint) {
    //Reprojection locale du nouveau point
    var inversedMatrix = math.inv(this.__shapeTransformationMatrix);
    var pointHandle = new HRDrawModule.HRPoint(hrPoint.getMatrix());
    pointHandle.transform(inversedMatrix);
    //Application des nouvelles coordonnées 
    var pointMatrice = this.pointsMatrices[handleIndex];
    pointMatrice.set([0, 0], pointHandle.getX());
    pointMatrice.set([1, 0], pointHandle.getY());
    pointMatrice.set([2, 0], pointHandle.getZ());
};


//Merci à + Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [rev. #0]
HRDrawModule.HRPolyLine.prototype.isOn = function (hrDocumentPoint) {
	 
	var retour = false;
	if(hrDocumentPoint && this.getHandlesRef())
	{
	    var handles = this.getHandlesRef();
		var pointsCount = handles.length;	
		for(var i = -1, l = pointsCount, j = l - 1; ++i < l; j = i)
		{
			((handles[i].point.getY() <= hrDocumentPoint.getY() && hrDocumentPoint.getY() < handles[j].point.getY()) || (handles[j].point.getY() <= hrDocumentPoint.getY() && hrDocumentPoint.getY() < handles[i].point.getY()))
			&& (hrDocumentPoint.getX() < (handles[j].point.getX() - handles[i].point.getX()) * (hrDocumentPoint.getY() - handles[i].point.getY()) / (handles[j].point.getY() - handles[i].point.getY()) + handles[i].point.getX())
			&& (retour = !retour);
		}
	}
    return retour;
};

