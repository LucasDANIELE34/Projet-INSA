var canvas = document.getElementById('o_canvas');
canvas = canvas.getContext('2d');//notre fenetre

var decor = [];//tableau contenant tous les objets à afficher du décor
for (var i = 0; i < 100; i++) {
  decor[i]=[];
}
var perso=new personnage(50,49);
var monstre=new monstre1(50,49);

var touches = new Object();
touches.haut=false;
touches.bas=false;
touches.gauche=false;
touches.droite=false;
touches.espace=false;
touches.entree=false;
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
      case 32://espace
        touches.espace=true;
        attaquer();
        break;
      case 13://entree
        touches.entree=true;
        interagir();
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
  monstre.orienter();
  monstre.deplacer();
  perso.deplacer();
  setTimeout(boucle, 10);
}


function pnj(i,j,orientation){
    this.i=i;
    this.j=j;
    this.w=30;
    this.h=30;
    this.x=i*this.w;
    this.y=1500*this.h;
    this.orientation=orientation;
}

function attaquer(){

}

function interagir(){

}
//regarder du coté des api
