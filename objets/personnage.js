function personnage(i,j){
  this.name = 'personnage';
  this.w=30;
  this.h=30;
  this.x=i*this.w;
  this.y=j*this.h;
  this.v=2.5;
  this.variante=0;
  this.vieMax=5;
  this.vie=this.vieMax;
  this.vivant=true;
  this.orientation='B';
  this.parle=false;
  this.phrases=new Array();
  this.numeroPhrases=0;
  this.textures = new Object();
  this.delaiAttaque=0;
}

personnage.prototype.calculerVitesse = function(){
  var vX,vY,ijApresDeplacement,ijPerso;

  vX=0;
  vY=0;
  if (touches.bas && !touches.haut){
    vY = this.v;
  }
  if (touches.haut && !touches.bas){
    vY = -this.v;
  }
  if (touches.droite && !touches.gauche){
    vX = this.v;
  }
  if (touches.gauche && !touches.droite){
    vX = -this.v;
  }

  if ((vX!=0) && (vY!=0)) { //si on avance en horizontal et en vertical, on diminue la vitesse pour parraitre aller toujours aller à la meme.
    vX*=0.71;
    vY*=0.71;
  }
  return [vX,vY];
}

personnage.prototype.deplacer = function(){
  var v,ijApresDeplacement,ijPerso;

  v = this.calculerVitesse();

  ijPerso = xyVersIj(this.x, this.y);
  ijApresDeplacement = xyVersIj((this.x + v[0]),(this.y + v[1]));
  //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
  if (decor[ijApresDeplacement[0]][ijPerso[1]].franchissable){
    this.x += v[0];
  }
  if (decor[ijPerso[0]][ijApresDeplacement[1]].franchissable){
    this.y += v[1];
  }
}

personnage.prototype.orienter= function(){
  if (touches.droite && !touches.gauche){
    this.orientation='D';
  }
  if (touches.gauche && !touches.droite){
    this.orientation='G';
  }
  if (touches.bas && !touches.haut){
    this.orientation='B';
  }
  if (touches.haut && !touches.bas){
    this.orientation='H';
  }
}

personnage.prototype.afficher= function(){
  var img = new Image();
  img = texturesSources[this.name]['images'][this.variante][this.orientation];
  canvas.drawImage(img, 300, 200);

  //dessin des coeurs de vie
  img = texturesSources.coeur.images[0].vide;
  for (var i = 0; i < this.vieMax; i++) {
    canvas.drawImage(img, i*15, 0, 15, 15);
  }

  var nbCoeursComplets = Math.floor(this.vie);
  img = texturesSources.coeur.images[0].plein;
  for (var i = 0; i < nbCoeursComplets; i++) {
    canvas.drawImage(img, i*15, 0, 15, 15);
  }

  if (nbCoeursComplets<this.vie) {
    img = texturesSources.coeur.images[0].demi;
    canvas.drawImage(img, nbCoeursComplets*15, 0, 15, 15);
  }

  //si le perso parle il affiche le texte
  if (this.parle) {
    this.afficherTexte();
  }
}

personnage.prototype.recevoirCoup = function (ptAttaques) {
  this.vie -= ptAttaques;
  if (this.vie<0) {
    this.vie=0;
  }
  if (this.vie==0) {
    this.vivant=false;
  }
};

personnage.prototype.parler = function(phrases){
  this.phrases=phrases;
  this.parle=!this.parle;
}

personnage.prototype.afficherTexte = function (){
  canvas.fillStyle= "black";
  canvas.font = "25px Arial";
  canvas.fillText(this.phrases[this.numeroPhrases],0,350);
}

personnage.prototype.changerPhrases = function(){
  this.numeroPhrases++;
  if (this.phrases[this.numeroPhrases]=="") {
    this.parler([""]);
    this.numeroPhrases = 0;
  }
}

personnage.prototype.ijInteraction = function(){
  var ijInteraction = xyVersIj(this.x,this.y);
  switch (this.orientation) {
    case 'B':
      ijInteraction[1]++;
      break;
    case 'H':
      ijInteraction[1]--;
      break;
    case 'G':
      ijInteraction[0]--;
      break;
    case 'D':
      ijInteraction[0]++;
      break;
  }
  return ijInteraction;
}

personnage.prototype.interagir = function(){
  var ijInteraction = this.ijInteraction();
  decor[ ijInteraction[0] ][ ijInteraction[1] ].interagir();
}

personnage.prototype.compteurAnimation = function () {
  if (this.delaiAttaque > 0) {
    this.delaiAttaque--;
  }
};

personnage.prototype.attaquer = function (ptAttaques,monstre){
  if ((distance(this.x,this.y,monstre.x,monstre.y)<(this.w+monstre.w)) && (this.delaiAttaque == 0)) {
    ajouterBoulet(this,monstre);
    monstre.recevoirCoup(ptAttaques);
    this.delaiAttaque=100;
  }
};


function boulet (xDepart,yDepart,xArrivee,yArrivee,i){
    this.v = 3;
    this.i = i;
    this.x = xDepart;
    this.y = yDepart;
    this.xDirection = xArrivee;
    this.yDirection = yArrivee;
}

boulet.prototype.deplacer =function (){
    var dist = distance(this.x,this.y,this.xDirection,this.yDirection);

    if (dist!=0) {
      var vX=(this.xDirection-this.x)*this.v/dist;
      var vY=(this.yDirection-this.y)*this.v/dist;
    }
    if (dist>=this.v){
      this.x +=vX;
      this.y +=vY;
    }
    else {
      supprimerBoulet(this.i);
    }
}

boulet.prototype.afficher = function () {
  var img = new Image();
  img = texturesSources['personnage']['images'][0]['B'];
  canvas.drawImage(img, this.x - perso.x + 300, this.y - perso.y + 200);
};
