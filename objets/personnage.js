function personnage(){
  this.nom = 'personnage';
  this.x=0;
  this.y=0;
  this.v=2.5;
  this.variante=0;
  this.vieMax=5;
  this.vie=this.vieMax;
  this.vivant=true;
  this.orientation='B';
  this.parle=false;
  this.phrases=new Array();
  this.numeroPhrases=0;
  this.delaiAttaque=0;
  this.ptAttaques=2;
  this.cles=[];
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
  if ((decor[ijApresDeplacement[0]][ijPerso[1]].franchissable)){
    if (!seChevauchent(perso.x +v[0],perso.y, mesMonstres)) {
      this.x += v[0];
    }
  }

  if (decor[ijPerso[0]][ijApresDeplacement[1]].franchissable){
    if (!seChevauchent(perso.x, perso.y + v[1], mesMonstres)) {
      this.y += v[1];
    }
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
  img = texturesSources[this.nom]['images'][this.variante][this.orientation];
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
  canvas.beginPath();
  canvas.rect(0,325,600,75);
  canvas.fillStyle="gray";
  canvas.fill();

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

personnage.prototype.attaquer = function (monstre){
  if ((distance(this.x,this.y,monstre.x,monstre.y)<(2*taille)) && (this.delaiAttaque == 0)) {
    monstre.recevoirCoup(this.ptAttaques);
    this.delaiAttaque=50;
  }
};

personnage.prototype.ajouterPtsVie = function(ptsVie){
  this.vieMax += ptsVie;
  this.vie = this.vieMax;
}

personnage.prototype.ajouterPtsAttaque = function(ptsAttaque){
  this.ptAttaques += ptsAttaque;
}
