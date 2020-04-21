function chauveSouris (variante){
  this.nom = "chauveSouris";
  this.centreX=Math.random()*10*taille+5*taille;
  this.centreY=Math.random()*14*taille+3*taille;
  this.x=this.centreX;
  this.y=this.centreY;
  this.vitesse=0.05;
  this.rayon=100;
  this.radian=0;
  this.pointsAttaque=0.7;
  this.delaiAttaque=0;
  this.aSupprimer=false;
  this.vie=5;

  this.variante=0;
  this.compteurDouleur=0;
  this.delaiDouleur=30;
}

chauveSouris.prototype.attaquer = function (){
  if ((distance(this.x,this.y,perso.x,perso.y) < taille) && (this.delaiAttaque == 0)) {
    perso.recevoirCoup(this.pointsAttaque);
    this.delaiAttaque=50;
  }

  if (this.delaiAttaque >0) {
    this.delaiAttaque--;
  }
}

chauveSouris.prototype.deplacer= function (){
  var arreterDeTourner =false;
  var Vx=0;
  var Vy=0
  while (!arreterDeTourner) {
    this.radian+=this.vitesse;
    Vx=Math.cos(this.radian)*this.rayon;
    Vy=Math.sin(this.radian)*this.rayon;

    ijApresDeplacement = xyVersIj(this.centreX + Vx, this.centreY + Vy);
    if (decor[ijApresDeplacement[0]][ijApresDeplacement[1]].franchissable) {
      this.x = this.centreX + Vx;
      this.y = this.centreY + Vy;
      arreterDeTourner = true;
    }
    else{
      this.vitesse *= -1;
    }
  }
}

chauveSouris.prototype.recevoirCoup = function(pointsAttaque){
  this.vie -= pointsAttaque;

  this.variante=1;
  this.compteurDouleur=compteur;
  if (this.vie < 0) {
    this.mourir();
  }
}

chauveSouris.prototype.afficher = function(){
 var img = new Image();
 img = texturesSources[this.nom]['images'][this.variante]['B'];
 canvas.drawImage(img, this.x - perso.x + 300, this.y - perso.y + 200);
}

chauveSouris.prototype.mourir = function(){
  this.aSupprimer = true;
}

chauveSouris.prototype.animation = function(){
  if (this.variante == 1) {
    if (compteur>this.compteurDouleur + this.delaiDouleur) {
      this.variante = 0;
    }
  }
  
}

chauveSouris.prototype.boucle = function(){
  this.animation();
  this.deplacer();
  this.attaquer();
}