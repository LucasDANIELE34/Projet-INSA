function arraignee(variante){
	this.name="arraignee";
	this.x= Math.random()*18*taille + taille;
	this.y= Math.random()*16*taille + 2*taille;
	this.variante = variante;
	this.vie = 9;
	this.ptAttaque = 1;
	this.aSupprimer = false;

	this.delaiMouvementArretMax=50;
	this.delaiMouvement=0;
	this.delaiArret=0;

	this.delaiAttaqueMax=50;
	this.delaiAttaque=0
	this.v= 2;
}

arraignee.prototype.attaquer = function() {
	if (this.delaiAttaque==0) {
		if (distance(this.x,this.y,perso.x,perso.y)<taille) {
			this.delaiAttaque=this.delaiAttaqueMax;
			perso.recevoirCoup(this.ptAttaque);
		}
	}
	else{
		this.delaiAttaque--;
	}
	
};

arraignee.prototype.recevoirCoup = function (ptAttaque) {
	this.vie-=ptAttaque;
	if (this.vie<0) {
		this.aSupprimer = true;
	}
}

arraignee.prototype.deplacer = function(){
	var Vx=0;
	var Vy=0;
	this.compteur();
	if (this.delaiMouvement>0) {
		Vx = Math.cos(this.angle)*this.v;
		Vy = Math.sin(this.angle)*this.v;

		ijApresDeplacement = xyVersIj(this.x+Vx, this.y+Vy);
	    if (decor[ijApresDeplacement[0]][ijApresDeplacement[1]].franchissable) {
	      this.x +=Vx;
	      this.y +=Vy;
	    }
		else{
			this.delaiMouvement=0;
			this.delaiArret= this.delaiMouvementArretMax;
		}
	}
}

arraignee.prototype.nouvelAngle= function(){
	this.angle=Math.random()*2*Math.PI;
}

arraignee.prototype.compteur = function(){
	if ((this.delaiMouvement == 0) && (this.delaiArret == 0)) {
		this.nouvelAngle();
		this.delaiMouvement = this.delaiMouvementArretMax;
	}
	else if (this.delaiMouvement > 0){
		this.delaiMouvement--;
		if (this.delaiMouvement==0) {
			this.delaiArret=this.delaiMouvementArretMax;
		}
	}

	if (this.delaiArret>0) {
		this.delaiArret--;
	}
}

arraignee.prototype.afficher = function(){
	var img = new Image();
	img = texturesSources[this.name]['images'][this.variante]['B'];
	canvas.drawImage(img, this.x - perso.x + 300, this.y - perso.y + 200);
}