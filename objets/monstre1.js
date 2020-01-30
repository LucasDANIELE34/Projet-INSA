function monstre1(i,j){
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.v=0.7;
  this.directionX=this.x;
  this.directionY=this.y;
  this.ptAttaques=0.5;
  this.delaiAttaque=0;
  this.orientation='B';
  this.textures = new Object();
}

monstre1.prototype.chargerImages= function(){
  this.textures.B=new Image();
  this.textures.B.src="assets/monstres/1/M_B.png";
  this.textures.B.addEventListener('load',function(){}, false);

  this.textures.D=new Image();
  this.textures.D.src="assets/monstres/1/M_D.png";
  this.textures.D.addEventListener('load',function(){}, false);

  this.textures.G=new Image();
  this.textures.G.src="assets/monstres/1/M_G.png";
  this.textures.G.addEventListener('load',function(){}, false);

  this.textures.H=new Image();
  this.textures.H.src="assets/monstres/1/M_H.png";
  this.textures.H.addEventListener('load',function(){}, false);
}

monstre1.prototype.orienter= function(){
  if (Math.abs(this.directionX-this.x)>Math.abs(this.directionY-this.y)) {//si la composante horizontale est plus grande que celle verticale
    if (this.directionX-this.x<0){//si on va vers la gauche
      this.orientation='G';
    }
    else {
      this.orientation='D';//sinon vers la droite
    }
  }
  else {
    if (this.directionY-this.y<0){//si on va vers le haut
      this.orientation='H';
    }
    else {
      this.orientation='B';//sinon vers le bas
    }
  }
}

monstre1.prototype.afficher= function(){
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
  canvas.drawImage(this.image, this.x - perso.x + 300, this.y - perso.y + 200);
}

monstre1.prototype.choisirDirection= function () {
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
  this.directionX= this.x+ distance*this.w*Math.cos(angle);
  this.directionY= this.y+ distance*this.h*Math.sin(angle);
}

monstre1.prototype.deplacer = function () {
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
  var iApresDeplacement = Math.round(posApresDeplacementX/this.w);
  var jApresDeplacement = Math.round(posApresDeplacementY/this.h);

  if (decor[iApresDeplacement][jApresDeplacement].franchissable){
    this.x += vX;
    this.y += vY;
  }

  //si le monstre atteind son point d'objectif il en prend un nouveau
  if ( (d<1) || (decor[iApresDeplacement][jApresDeplacement].franchissable==false) ) {
    this.choisirDirection();
  }
};

monstre1.prototype.attaquer = function (){
  if (this.delaiAttaque > 0) {
    this.delaiAttaque--;
  }

  var a=perso.x-this.x;
  var b=perso.y-this.y;
  var d=Math.sqrt(a*a+b*b);

  if (d<5*this.w) {
    if ((d<(this.w+perso.w)/2) && (this.delaiAttaque == 0)) {
      perso.recevoirCoup(this.ptAttaques);
      this.delaiAttaque=100;
    }
    this.directionX=perso.x;
    this.directionY=perso.y;
  }
};
