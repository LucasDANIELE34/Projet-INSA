function personnage(i,j){
  this.w=30;
  this.h=30;
  this.x=i*this.w;
  this.y=j*this.h;
  this.v=2.5;
  this.vieMax=5;
  this.vie=this.vieMax;
  this.vivant=true;
  this.orientation='B';
  this.textures = new Object();
}

personnage.prototype.deplacer= function(){
  var vX,vY,iApresDeplacement,jApresDeplacement;

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

  iApresDeplacement = Math.round((this.x + vX)/this.w);
  jApresDeplacement = Math.round((this.y + vY)/this.h)
  //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
  if (decor[iApresDeplacement][jApresDeplacement].franchissable == true){
    this.x += vX;
    this.y += vY;
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

personnage.prototype.chargerImages= function(){
  this.textures.B=new Image();
  this.textures.B.src="assets/personnages/P_B.png";

  this.textures.D=new Image();
  this.textures.D.src="assets/personnages/P_D.png";

  this.textures.G=new Image();
  this.textures.G.src="assets/personnages/P_G.png";

  this.textures.H=new Image();
  this.textures.H.src="assets/personnages/P_H.png";

  this.textures.coeurPlein=new Image();
  this.textures.coeurPlein.src="assets/personnages/C_plein.png";

  this.textures.coeurDemi=new Image();
  this.textures.coeurDemi.src="assets/personnages/C_demi.png";

  this.textures.coeurVide=new Image();
  this.textures.coeurVide.src="assets/personnages/C_vide.png";
}

personnage.prototype.afficher= function(){
  //dessin du perso
  switch (this.orientation) {
    case 'B':
      this.image= this.textures.B;
      break;
    case 'D':
      this.image= this.textures.D;
      break;
    case 'H':
      this.image= this.textures.H;
      break;
    case 'G':
      this.image= this.textures.G;
      break;
  }
  canvas.drawImage(this.image, 300, 200);

  //dessin des coeurs de vie
  for (var i = 0; i < this.vieMax; i++) {
    canvas.drawImage(this.textures.coeurVide, i*15, 0, 15, 15);
  }

  var nbCoeursComplets = Math.floor(this.vie);
  for (var i = 0; i < nbCoeursComplets; i++) {
    canvas.drawImage(this.textures.coeurPlein, i*15, 0, 15, 15);
  }
  if (nbCoeursComplets<this.vie) {
    canvas.drawImage(this.textures.coeurDemi, nbCoeursComplets*15, 0, 15, 15);
  }

}

personnage.prototype.recevoirCoup = function (ptAttaques) {
  this.vie -= ptAttaques;
  if (this.vie<0) {
    this.vie=0;
  }
  if (this.vie==0) {
    this.vivant=false;
    alert("mort");
  }
};
