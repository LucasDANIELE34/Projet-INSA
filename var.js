var canvas = document.getElementById('o_canvas');
canvas = canvas.getContext('2d');//notre fenetre

var decor = [];//tableau contenant tous les objets à afficher du décor
for (var i = 0; i < 20; i++) {
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



function chargerImages(){
  //arbre
  I_arbre=new Image();
  I_arbre.src="assets/decors/A.png";
  I_arbre.addEventListener('load',function(){compteImgChargees++}, false);
  //pelouse
  I_pelouse=new Image();
  I_pelouse.src="assets/decors/P.png";
  I_pelouse.addEventListener('load',function(){compteImgChargees++}, false);
  //eau
  I_eauHG=new Image();
  I_eauHG.src="assets/decors/E_HG.png";
  I_eauHG.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauH=new Image();
  I_eauH.src="assets/decors/E_H.png";
  I_eauH.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauHD=new Image();
  I_eauHD.src="assets/decors/E_HD.png";
  I_eauHD.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauG=new Image();
  I_eauG.src="assets/decors/E_G.png";
  I_eauG.addEventListener('load',function(){compteImgChargees++}, false);

  I_eau=new Image();
  I_eau.src="assets/decors/E.png";
  I_eau.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauD=new Image();
  I_eauD.src="assets/decors/E_D.png";
  I_eauD.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauBG=new Image();
  I_eauBG.src="assets/decors/E_BG.png";
  I_eauBG.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauB=new Image();
  I_eauB.src="assets/decors/E_B.png";
  I_eauB.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauBD=new Image();
  I_eauBD.src="assets/decors/E_BD.png";
  I_eauBD.addEventListener('load',function(){compteImgChargees++}, false);
  //personnage
  I_personnageB=new Image();
  I_personnageB.src="assets/personnages/P_B.png";
  I_personnageB.addEventListener('load',function(){compteImgChargees++}, false);

  I_personnageD=new Image();
  I_personnageD.src="assets/personnages/P_D.png";
  I_personnageD.addEventListener('load',function(){compteImgChargees++}, false);

  I_personnageG=new Image();
  I_personnageG.src="assets/personnages/P_G.png";
  I_personnageG.addEventListener('load',function(){compteImgChargees++}, false);

  I_personnageH=new Image();
  I_personnageH.src="assets/personnages/P_H.png";
  I_personnageH.addEventListener('load',function(){compteImgChargees++}, false);

}

function personnage(){
  this.x=300;
  this.y=200;
  this.w=30;
  this.h=30;
  this.v=3;
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

function mapInit(){
  //pelouse
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 10; j++) {
      decor[i][j]=new pelouse(i,j);
    }
  }

  //contour map
  for (var i = 0; i < 20; i++) {
    decor[i][0]=new arbre(i,0);
  }
  for (var i = 0; i < 20; i++) {
    decor[i][10]=new arbre(i,10);
  }
  for (var i = 0; i < 10; i++) {
    decor[0][i]=new arbre(0,i);
  }
  for (var i = 0; i < 10; i++) {
    decor[19][i]=new arbre(19,i);
  }

  //lac
  decor[3][4]=new eau(3,4,'HG');
  decor[3][5]=new eau(3,5,'G');
  decor[3][6]=new eau(3,6,'BG');
  decor[4][3]=new eau(4,3,'HG');
  decor[4][4]=new eau(4,4,'_');
  decor[4][5]=new eau(4,5,'_');
  decor[4][6]=new eau(4,6,'B');
  decor[5][3]=new eau(5,3,'HD');
  decor[5][4]=new eau(5,4,'_');
  decor[5][5]=new eau(5,5,'_');
  decor[5][6]=new eau(5,6,'B');
  decor[6][4]=new eau(6,4,'HD');
  decor[6][5]=new eau(6,5,'_');
  decor[6][6]=new eau(6,6,'B');
  decor[7][5]=new eau(7,5,'HD');
  decor[7][6]=new eau(7,6,'BD');


}

function afficher(){
  if (compteImgChargees==15) {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 10; j++) {
        switch (decor[i][j].name) {
          case 'arbre':
            canvas.drawImage(I_arbre, decor[i][j].x, decor[i][j].y);
            break;
          case 'pelouse':
            canvas.drawImage(I_pelouse, decor[i][j].x, decor[i][j].y);
            break;
          case 'eau':
            switch (decor[i][j].orientation) {
              case 'HG':
                canvas.drawImage(I_eauHG, decor[i][j].x, decor[i][j].y);
                break;
              case 'H':
                canvas.drawImage(I_eauH, decor[i][j].x, decor[i][j].y);
                break;
              case 'HD':
                canvas.drawImage(I_eauHD, decor[i][j].x, decor[i][j].y);
                break;
              case 'G':
                canvas.drawImage(I_eauG, decor[i][j].x, decor[i][j].y);
                break;
              case '_':
                canvas.drawImage(I_eau, decor[i][j].x, decor[i][j].y);
                break;
              case 'D':
                canvas.drawImage(I_eauD, decor[i][j].x, decor[i][j].y);
                break;
              case 'BG':
                canvas.drawImage(I_eauBG, decor[i][j].x, decor[i][j].y);
                break;
              case 'B':
                canvas.drawImage(I_eauB, decor[i][j].x, decor[i][j].y);
                break;
              case 'BD':
                canvas.drawImage(I_eauBD, decor[i][j].x, decor[i][j].y);
                break;
              default:
                canvas.drawImage(I_arbre, decor[i][j].x, decor[i][j].y);
                break;
            }
            break;
        }
      }
    }

  }

  switch (perso.orientation) {
    case 'B':
      canvas.drawImage(I_personnageB, perso.x, perso.y);
      break;
    case 'D':
      canvas.drawImage(I_personnageD, perso.x, perso.y);
      break;
    case 'H':
      canvas.drawImage(I_personnageH, perso.x, perso.y);
      break;
    case 'G':
      canvas.drawImage(I_personnageG, perso.x, perso.y);
      break;
    default:

  }


}





function boucle(){
  afficher();
  perso.orienter();
  perso.deplacer();
  setTimeout(boucle, 10);
}

chargerImages();
mapInit();
setTimeout(200);
boucle();
