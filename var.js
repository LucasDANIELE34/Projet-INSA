var canvas = document.getElementById('o_canvas');
canvas = canvas.getContext('2d');//notre fenetre

var decor = [];//tableau contenant tous les objets à afficher du décor
for (var i = 0; i < 100; i++) {
  decor[i]=[];
}
var perso=new personnage();
var monstre;
var compteImgChargees=0;

var touches = new Object();
touches.haut=false;
touches.bas=false;
touches.gauche=false;
touches.droite=false;
document.addEventListener("keydown", clavierDown);
document.addEventListener("keyup", clavierUp);

function clavierDown(e){
    switch (e.keyCode ) {
      case 90:
      case 38:
        touches.haut=true;
        break;
      case 83:
      case 40:
        touches.bas=true;
        break;
      case 37:
      case 81:
        touches.gauche=true;
        break;
      case 39:
      case 68:
        touches.droite=true;
        break;
    }
}

function clavierUp(e){
    switch (e.keyCode ) {
      case 90:
      case 38:
        touches.haut=false;
        break;
      case 83:
      case 40:
        touches.bas=false;
        break;
      case 37:
      case 81:
        touches.gauche=false;
        break;
      case 39:
      case 68:
        touches.droite=false;
        break;
    }
}

function boucle(){
  afficher();
  perso.orienter();
  perso.deplacer();
  setTimeout(boucle, 10);
}

function personnage(){
  this.x=1500;
  this.y=1500;
  this.w=30;
  this.h=30;
  this.v=2.5;
  this.orientation='B';
}

personnage.prototype.deplacer= function(){

  if (touches.bas && !touches.haut){
    this.i = Math.round(this.x/this.w);
    this.j = Math.round((this.y + this.v)/this.h)
    //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
    if (decor[this.i][this.j].franchissable == true){
      this.y += this.v;
    }
  }

  if (touches.haut && !touches.bas){
    this.i=Math.round(this.x/this.w);
    this.j=Math.round((this.y - this.v)/this.h);
    //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
    if (decor[this.i][this.j].franchissable == true){
      this.y -= this.v;
    }
  }
  if (touches.droite && !touches.gauche){
    this.i=Math.round((this.x+this.v)/this.h);
    this.j=Math.round(this.y/this.h);
    //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
    if (decor[this.i][this.j].franchissable == true){
      this.x += this.v;
    }
  }
  if (touches.gauche && !touches.droite){
    this.i=Math.round((this.x-this.v)/this.h);
    this.j=Math.round(this.y/this.h);
    //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
    if (decor[this.i][this.j].franchissable == true){
      this.x -= this.v;
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



function eau(i,j,orientation){
  this.name="eau";
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.orientation=orientation;
  this.franchissable=false;
}

function arbre(i,j){
  this.name="arbre";
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.franchissable=false;
}

function pelouse(i,j){
  this.name="pelouse";
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.franchissable=true;
}
