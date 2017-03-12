"use strict"

//!TODO Trop Bourrin on efface tout et on refait tout ..... Introduire la notion de BoundingRect et d'invalidate sur le Canvas.

if (!HRDrawModule)
    var HRDrawModule = {};
//Extension de HRDrawModule avec 	 :	

//Interface ShapeRenderer -------------------------------------------------------------------------------------------------
//Constructeur
HRDrawModule.AbstractShapeRenderer = function () {
	//!Ioc Injection de dépendance à faire ici.
	this._barRenderer =  new HRDrawModule.HRBarycentreRenderer();
	this._rotationRenderer = new HRDrawModule.HRRotationRenderer();
}


//Méthode de rendu
HRDrawModule.AbstractShapeRenderer.prototype.render = function (d2canvasCtx, topLeftHRPoint, bottomRightHRPoint, projectionMatrix, hrDocument){
	if(d2canvasCtx)
	{
		
		if(topLeftHRPoint && bottomRightHRPoint)
		{
			//d2canvasCtx.clearRect(topLeftHRPoint.getX(),topLeftHRPoint.getY(), bottomRightHRPoint.getX(), bottomRightHRPoint.getY());
			d2canvasCtx.clearRect(topLeftHRPoint.x,topLeftHRPoint.y, bottomRightHRPoint.x, bottomRightHRPoint.y);
		}
		else //!Temporaire. Idéalemet il vaudrat mieux avoir la taille du canvas et tout invalider
		{
			d2canvasCtx.clearRect(0,0,1000,1000);
		}
		//On va dessiner chaque Layer dans l'ordre renvoyé par le document.
		this.renderLayers(d2canvasCtx, projectionMatrix, hrDocument.getLayersRef());
	}
};

//Traitement du rendu pour tous les layers passés en argument.
HRDrawModule.AbstractShapeRenderer.prototype.renderLayers = function (dc, projectionMatrix, hrLayers) {
	if(hrLayers)
	{
		var layersCount = hrLayers.length;
		for(var i = 0; i < layersCount; i++)
		{
			var layeri = hrLayers[i];
			if(layeri)
			{
				var shapes = layeri.getShapesRef();
				if(shapes)
				{
					var shapeCount = shapes.length;
					for(var j = 0; j < shapeCount; j++)
					{
						var shapej = shapes[j];
						//Fonction renderShape abstraire
						this.renderShape(dc, shapej, projectionMatrix);
						//Fonction Render des Handles de la Shape.
						this._barRenderer.render(dc, shapej, projectionMatrix);
						//Fonction Render du Handle de rotation.
						this._rotationRenderer.render(dc, shapej, projectionMatrix);
					}
				}
			}
		}
	}
};

//Méthode virtuelle de traitement de rendu pour les Shapes passées en argument.
HRDrawModule.AbstractShapeRenderer.prototype.renderShape = function(dc, shape, projectionMatrix){
};

