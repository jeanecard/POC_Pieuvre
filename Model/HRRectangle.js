"use strict"
//Suppose que tous les HRDrwModule est importé...

if (!HRDrawModule)
    HRDrawModule = {};
//Extension de HRDrawModule avec 


HRDrawModule.HRRectangle = function () {
    //Appel du constructeur de base. 
    HRDrawModule.HRPolyLine.prototype.constructor.call(this);
    //Appel du Polyline en ajoutant 4 points confondus en (0,0).
    //!TODO repredre l'appel.
    for (var i = 0; i < 4; i++) {
        HRDrawModule.HRPolyLine.prototype.addPoint.call(this, new HRDrawModule.HRPoint(0, 0, 0));
    }
};
//Mise en place de l'hÃƒÂ©ritage
HRDrawModule.HRRectangle.prototype = new HRDrawModule.HRPolyLine();

//Fonction de mise à jour des Handles de la Shape
HRDrawModule.HRRectangle.prototype.setHandles = function (handleIndex, hrPoint) {

    //Reprojection locale du nouveau point//
    var inversedMatrix = math.inv(this.__shapeTransformationMatrix);
    var pointHandle = new HRDrawModule.HRPoint(hrPoint.getMatrix());
    pointHandle.transform(inversedMatrix);
    //Application des nouvelles coordonnées pour le nouveau point. 
    var pointMatrice = this.pointsMatrices[handleIndex];
    pointMatrice.set([0, 0], pointHandle.getX());
    pointMatrice.set([1, 0], pointHandle.getY());
    pointMatrice.set([2, 0], pointHandle.getZ());
    //Déplacement des autres points pour conserver le rectangle

    switch (handleIndex) {
        case 0:
            //Mise à jour de 1 et 3 qui arde resp. le même y et x que 0
            var pointMatrice1 = this.pointsMatrices[1];
            pointMatrice1.set([1, 0], pointHandle.getY());
            var pointMatrice3 = this.pointsMatrices[3];
            pointMatrice3.set([0, 0], pointHandle.getX());

            break;
        case 1:
            //Mise à jour de 0 et 2 qui garde resp. le même y et x que 0
            var pointMatrice0 = this.pointsMatrices[0];
            pointMatrice0.set([1, 0], pointHandle.getY());
            var pointMatrice2 = this.pointsMatrices[2];
            pointMatrice2.set([0, 0], pointHandle.getX());

            break;

        case 2:
            //Mise à jour de 1 et 3 qui garde resp. le même y et x que 0
            var pointMatrice3 = this.pointsMatrices[3];
            pointMatrice3.set([1, 0], pointHandle.getY());
            var pointMatrice1 = this.pointsMatrices[1];
            pointMatrice1.set([0, 0], pointHandle.getX());
            break;

        case 3:
            //Mise à jour de 2 et 0 qui garde resp. le même y et x que 0
            var pointMatrice2 = this.pointsMatrices[2];
            pointMatrice2.set([1, 0], pointHandle.getY());
            var pointMatrice0 = this.pointsMatrices[0];
            pointMatrice0.set([0, 0], pointHandle.getX());
            break;
        default:

    }
};
