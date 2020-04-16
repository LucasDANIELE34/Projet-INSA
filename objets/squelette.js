function squelette(variante){
  this.name='squelette';
  this.x=Math.random()*16*taille+2*taille;
  this.y=Math.random()*12*taille+4*taille;
  this.v=0.7;
  this.variante=variante;
  this.directionX=this.x;
  this.directionY=this.y;
  this.ptAttaques=0.5;
  this.delaiAttaque=0;
  this.orientation='B';
  this.textures = new Object();
  this.vie=5;
  this.aSupprimer = false;
}

squelette.prototype.afficher= function(){
  var img = new Image();
  img = texturesSources[this.name]['images'][this.variante][this.orientation];
  canvas.drawImage(img, this.x - perso.x + 300, this.y - perso.y + 200);
}

squelette.prototype.choisirDirection= function () {
  var angle = Math.random()*2*Math.PI;
  var distanceIndice = Math.random();
  var distance;
  //le pt de direction est à une distance aléatoire.
  //pour s'ammuser un peu je mets un peu de probas, il y a 15% d'avoir une distanced de 1 ou 5, 20% de 2 ou 4, 30% de 3;
  if (distanceIndice<=0.15){
    distance = 1;
  }
  else if ((distanceIndice>0.15) && (distanceIndice<=0.35)){
    distance = 2;
  }
  else if ((distanceIndice>0.35) && (distanceIndice<=0.65)){
    distance = 3;
  }
  else if ((distanceIndice>0.65) && (distanceIndice<=0.85)){
    distance = 4;
  }
  else if (distanceIndice>0.85){
    distance = 5;
  }
  this.directionX= this.x+ distance*taille*Math.cos(angle);
  this.directionY= this.y+ distance*taille*Math.sin(angle);
}

squelette.prototype.deplacer = function () {

  var a=this.directionX-this.x;
  var b=this.directionY-this.y;
  var d=Math.sqrt(a*a+b*b);

  var vX=0;
  var vY=0;

  if (d!=0) {
    vX=a*this.v/d;
    vY=b*this.v/d;
  }

  var posApresDeplacementX = this.x+vX;
  var posApresDeplacementY = this.y+vY;
  var iApresDeplacement = Math.round(posApresDeplacementX/taille);
  var jApresDeplacement = Math.round(posApresDeplacementY/taille);

  if (decor[iApresDeplacement][jApresDeplacement].franchissable){
    this.x += vX;
    this.y += vY;
  }

  //si le monstre atteind son point d'objectif il en prend un nouveau
  if ( (d<this.v) || (decor[iApresDeplacement][jApresDeplacement].franchissable==false) ) {
    this.choisirDirection();
  }
};

squelette.prototype.attaquer = function (){
  if (this.delaiAttaque > 0) {
    this.delaiAttaque--;
  }
  var d = distance(this.x,this.y,perso.x,perso.y);
  if (d<4*taille) {
    if ((d<taille) && (this.delaiAttaque == 0)) {
      perso.recevoirCoup(this.ptAttaques);
      this.delaiAttaque=100;
    }
    this.directionX=perso.x;
    this.directionY=perso.y;
  }
};

squelette.prototype.recevoirCoup = function (ptAttaques) {
  this.vie -= ptAttaques;
  if (this.vie<0) {
    this.mourir();
  }
};

squelette.prototype.mourir = function (){
  this.aSupprimer = true;
};
