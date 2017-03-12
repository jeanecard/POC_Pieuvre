"use strict"
//------------------------------------------   TEST ----------------------------------------------------------------//
//Amelioration : inversifyjs pour notamment éviter aux documents d'instancier le layer ///
//Passer par des interfaces plutôt que par des instances.
//Etudier les appels de fonction d'un module dans son constructeur (ex dans HRPoint faire apoel a une fonction HRPoint dans le constructeur notamment pour faire un object.DefinePRopertie

//!Suppression du scroll Window pour permettre de getter proprement les scroll sur Canvas
window.onwheel = function(){ return false; }
 

//Création d'un document avec un Layer :
var hRdocument = new HRDrawModule.HRDocument();
hRdocument.createNewLayer();
//On s'assure que le context est suffisant pour se lancer :
if(hRdocument.getLayersRef() && hRdocument.getLayersRef()[0])
{
	//On référence une bonne fois pour toute le premier et unique Layer du document 
	var layer = hRdocument.getLayersRef()[0];
	layer.getShapesRef().push(new HRDrawModule.HRRectangle()); //Essai 1

	var polyline = new HRDrawModule.HRPolyLine();
	polyline.addPoint(new HRDrawModule.HRPoint(10, 10, 0));
	polyline.addPoint(new HRDrawModule.HRPoint(100, 200, 0));
	polyline.addPoint(new HRDrawModule.HRPoint(100, 400, 0));
	polyline.addPoint(new HRDrawModule.HRPoint(400, 300, 0));
	layer.getShapesRef().push(polyline);

	
	// //Translation via matrice (sur x)
	layer.getShapesRef()[0].setHandles(0, new HRDrawModule.HRPoint(500, 200, 1));
	layer.getShapesRef()[0].setHandles(2, new HRDrawModule.HRPoint(600, 400, 1));

	//mise en place temporaire de la rotation sur Shape 0
	var hrBarycentre = layer.getShapesRef()[0].getCentroid();
	var hrCentreRotation = new HRDrawModule.HRPoint(hrBarycentre.getX() + 50, hrBarycentre.getY(), 0);
	layer.getShapesRef()[0].setRotationPoint(hrCentreRotation);
	//layer.Shapes[0].rotate(3.14/4, 500, 200);

	//mise en place temporaire de la rotation sur Shape 1
	var hrBarycentre = layer.getShapesRef()[1].getCentroid();
	var hrCentreRotation = new HRDrawModule.HRPoint(hrBarycentre.getX() + 50, hrBarycentre.getY(), 0);
	layer.getShapesRef()[1].setRotationPoint(hrCentreRotation);

	//Fare un singleton pour la factory
	var factory = new HRDrawModule.HRFactory();
	
	//Création d'une vue 2D sur le canvas avec son modèle
	var domCanvas = document.getElementById("mon_canvas");
	var hrView1 = factory.CreateView(hRdocument, domCanvas);
	var domCanvas2 = document.getElementById("mon_canvas2");
	var hrView2 = factory.CreateView(hRdocument, domCanvas2);
	
	var view2Matrix = hrView2.getMatrixRef();
	view2Matrix.set([0, 0], 0.5);
	view2Matrix.set([1, 1], 0.5);
	view2Matrix.set([2, 2], 0.5);
	
	
	var views = new Array();
	views.push(hrView1);
	views.push(hrView2);

	//création d'un controller spécialisé dans la sélection
	var hrSelector = factory.createController(hRdocument, views);
	
	//rendre le document
	hrView1.render();
	hrView2.render();
	
}

