var canvas = document.getElementById('o_canvas');
canvas = canvas.getContext('2d');//notre fenetre

var decor = [];//tableau contenant tous les objets à afficher du décor
for (var i = 0; i < 100; i++) {
  decor[i]=[];
}

var compteImgChargees=0;

var XInit=0;
var YInit=0;
var texture;
var orientation;
function maj(){
  XInit=parseInt(document.getElementById('x').value);
  YInit=parseInt(document.getElementById('y').value);
  if (XInit>=80) {
    XInit=79;
  }
  if (YInit>=80) {
    YInit=79;
  }

  texture=document.getElementById('texture-choix').value;
  orientation=document.getElementById('orientation-choix').value;
}




var sourisX;
var sourisY;
document.getElementById('o_canvas').addEventListener("click", souris);
function souris(e){
  sourisX=e.x;
  sourisY=e.y;
  placerTexture(Math.floor(20*sourisX/600)+XInit,Math.floor(20*sourisY/600)+YInit);
}
function placerTexture(i,j){
  maj();
  switch (texture) {
    case 'eau':
      decor[i][j]=new eau(i,j,orientation);
      break;
    case 'arbre':
      decor[i][j]=new arbre(i,j);
      break;
    case 'pelouse':
      decor[i][j]=new pelouse(i,j);
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
}

function eau(i,j,orientation){
  this.name="eau";
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.i=i;
  this.j=j;
  this.orientation=orientation;
  this.franchissable=false;
}

function arbre(i,j,orientation){
  this.name="arbre";
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.i=i;
  this.j=j;
  this.orientation=orientation;
  this.franchissable=false;
}

function pelouse(i,j,orientation){
  this.name="pelouse";
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.i=i;
  this.j=j;
  this.orientation=orientation;
  this.franchissable=true;
}




function boucle(){
  afficher();
  setTimeout(boucle, 1000);
}

function resultatMap(){
  var resultat="";
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      resultat+="decor["+i+"]["+j+"]=new "+decor[i][j].name+"("+decor[i][j].i+","+decor[i][j].j+",'"+decor[i][j].orientation+"');";
    }
  }
  document.getElementById('resultatMap').value=resultat;
}


chargerImages();
setTimeout(10);

for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {
    decor[i][j]=new pelouse(i,j,'_');
  }
}

for (var i = 0; i < 100; i++) {
    decor[i][0]=new arbre(i,0,'_');
    decor[i][99]=new arbre(i,99,'_');
    decor[0][i]=new arbre(0,i,'_');
    decor[99][i]=new arbre(99,i,'_');
}

boucle();
