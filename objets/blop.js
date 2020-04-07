function blop(variante){
  this.name='blop';
  this.x=Math.random()*18*taille+taille;
  this.y=Math.random()*15*taille+2*taille;
  this.v=2;
  this.pointsAttaque=0.5;
  this.delaiAttaque=0;
  this.variante=variante;
  this.vie=5;
  this.aSupprimer = false;
}

blop.prototype.deplacementDiagonal =function(){
  var arreterDeTourner= false;
  var Vx=0;
  var Vy=0;
  var rand=0;
  var IJApresDeplacement=[];

  while (!arreterDeTourner) {
    rand=Math.random();
    if (rand<=0.25){
      Vx=this.v;
      Vy=this.v;
    }
    else if ((rand>0.25) && (rand<=0.5)){
      Vx =this.v;
      Vy =-this.v;
    }
    else if ((rand>0.5) && (rand<=0.75)){
      Vx =-this.v;
      Vy =this.v;
    }
    else if ((rand>0.75) && (rand<=1)){
      Vx =-this.v;
      Vy =-this.v;
    }

    ijApresDeplacement = xyVersIj(this.x+Vx, this.y+Vy);
    if (decor[ijApresDeplacement[0]][ijApresDeplacement[1]].franchissable) {
      this.x +=Vx;
      this.y +=Vy;
      arreterDeTourner= true;
    }
  }
}

blop.prototype.deplacementCardinal =function(){
  var arreterDeTourner= false;
  var Vx=0;
  var Vy=0;
  var rand=0;
  while (!arreterDeTourner) {
      rand=Math.random();
      if (rand<=0.25){
        Vx=this.v; //up
      }
      else if ((rand>0.25) && (rand<=0.5)){
        Vx =-this.v; //down
      }
      else if ((rand>0.5) && (rand<=0.75)){
        Vy =this.v; //droite
      }
      else if ((rand>0.75) && (rand<=1)){
        Vy =-this.v; //gauche
      }
      
      ijApresDeplacement = xyVersIj(this.x+Vx, this.y+Vy);
      if (decor[ijApresDeplacement[0]][ijApresDeplacement[1]].franchissable) {
        this.x +=Vx;
        this.y +=Vy;
        arreterDeTourner= true;
      }
  }
}

blop.prototype.deplacementAleatoire =function(){
  var arreterDeTourner =false;
  var angleAleatoire=0 ;
  var Vx=0;
  var Vy=0;

  while (!arreterDeTourner) {

    angleAleatoire = Math.random()*2*Math.PI;
    Vx=this.v*Math.cos(angleAleatoire);
    Vy=this.v*Math.sin(angleAleatoire);


    ijApresDeplacement = xyVersIj(this.x+Vx, this.y+Vy);
    if (decor[ijApresDeplacement[0]][ijApresDeplacement[1]].franchissable) {
      this.x +=Vx;
      this.y +=Vy;
      arreterDeTourner= true;
    }
  }
}

blop.prototype.deplacementSuivrePoint = function () {
  var a=blopDirectionX-this.x;
  var b=blopDirectionY-this.y;
  var d= distance(this.x,this.y,blopDirectionX,blopDirectionY)
  var vX=0;
  var vY=0;

  if (d!=0) {
    vX=a*this.v/d;
    vY=b*this.v/d;
  }

  this.x += vX;
  this.y += vY;

  if (d<this.v) {
    blopDeplacementEnGroupe=false;
  }
}

blop.prototype.deplacer = function(){
  var rand=0;
  if (blopDeplacementEnGroupe) {
    this.deplacementSuivrePoint();
  }
  else {
    rand=Math.random();
    if (rand<=0.45){
      //this.deplacementDiagonal();
    }
    else if ((rand>0.45) && (rand<=0.75)){
      this.deplacementAleatoire(2);
    }
    else if ((rand>0.75) && (rand<=0.999)){
      this.deplacementCardinal();
    }
    else if ((rand>0.999) && (rand<=1)){
      rassemblerGroupe();
    }
  }
}

blop.prototype.afficher = function(){
  var img = new Image();
  img = texturesSources[this.name]['images'][this.variante]['B'];
  canvas.drawImage(img, this.x - perso.x + 300, this.y - perso.y + 200);
}


blop.prototype.attaquer = function (){
  if ((distance(this.x,this.y,perso.x,perso.y) < taille) && (this.delaiAttaque == 0)) {
    perso.recevoirCoup(this.pointsAttaque);
    this.delaiAttaque=50;
    console.log(this.pointsAttaque);
  }
  
  if (this.delaiAttaque >0) {
    this.delaiAttaque--;
  }
}

blop.prototype.recevoirCoup=function(pointsAttaque){
  this.vie -= pointsAttaque;
  if (this.vie < 0) {
    this.aSupprimer = true;
  }
}