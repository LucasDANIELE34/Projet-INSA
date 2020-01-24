var canvas = document.getElementById('o_canvas');
canvas = canvas.getContext('2d');//notre fenetre

var decor = [];//tableau contenant tous les objets à afficher du décor
for (var i = 0; i < 100; i++) {
  decor[i]=[];
}

var compteImgChargees=0;

var XInit=0;
var YInit=0;
var choixTexture;
var orientation;
var variante;
function maj(){
  XInit=parseInt(document.getElementById('x').value);
  YInit=parseInt(document.getElementById('y').value);
  if (XInit>=80) {
    XInit=79;
  }
  if (YInit>=80) {
    YInit=79;
  }

  choixTexture=document.getElementById('texture-choix').value;
  orientation=document.getElementById('orientation-choix').value;
  variante=document.getElementById('variante-choix').value;
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
  switch (choixTexture) {
    case 'eau':
      decor[i][j]=new texture('eau',i,j,orientation,false,'normal');
      break;
    case 'arbre':
      decor[i][j]=new texture('arbre',i,j,orientation,false,'normal');
      break;
    case 'pelouse':
      decor[i][j]=new texture('pelouse',i,j,orientation,true,'normal');
      break;
    case 'chemin':
      switch (variante) {
        case '1':
          decor[i][j]=new texture('chemin',i,j,orientation,true,'1');
          break;
        case 'normal':
          decor[i][j]=new texture('chemin',i,j,orientation,true,'normal');

          break;
      }
      break;
    case 'mur':
      decor[i][j]=new texture('mur',i,j,orientation,false,'normal');
      break;
    case 'escalier':
      decor[i][j]=new texture('escalier',i,j,orientation,true,'normal');
      break;
    case 'maison-mur':
      decor[i][j]=new texture('maison-mur',i,j,orientation,false,'normal');
      break;
    case 'maison-toit':
      decor[i][j]=new texture('maison-toit',i,j,orientation,false,'normal');
      break;
    case 'maison-porte':
      decor[i][j]=new texture('maison-porte',i,j,orientation,false,'normal');
      break;
    case 'chemin':
      decor[i][j]=new texture('maison-porte',i,j,orientation,false,'normal');
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
  //chemin-variante1
  I_chemin1B=new Image();
  I_chemin1B.src="assets/decors/chemin/1/C_B.png";
  I_chemin1B.addEventListener('load',function(){compteImgChargees++}, false);

  I_chemin1D=new Image();
  I_chemin1D.src="assets/decors/chemin/1/C_D.png";
  I_chemin1D.addEventListener('load',function(){compteImgChargees++}, false);

  I_chemin1G=new Image();
  I_chemin1G.src="assets/decors/chemin/1/C_G.png";
  I_chemin1G.addEventListener('load',function(){compteImgChargees++}, false);

  I_chemin1H=new Image();
  I_chemin1H.src="assets/decors/chemin/1/C_H.png";
  I_chemin1H.addEventListener('load',function(){compteImgChargees++}, false);

  I_chemin1HD=new Image();
  I_chemin1HD.src="assets/decors/chemin/1/C_HD.png";
  I_chemin1HD.addEventListener('load',function(){compteImgChargees++}, false);

  I_chemin1HG=new Image();
  I_chemin1HG.src="assets/decors/chemin/1/C_HG.png";
  I_chemin1HG.addEventListener('load',function(){compteImgChargees++}, false);
  //chemin-normal
  I_chemin=new Image();
  I_chemin.src="assets/decors/chemin/normal/C.png";
  I_chemin.addEventListener('load',function(){compteImgChargees++}, false);

  I_cheminB=new Image();
  I_cheminB.src="assets/decors/chemin/normal/C_B.png";
  I_cheminB.addEventListener('load',function(){compteImgChargees++}, false);

  I_cheminBD=new Image();
  I_cheminBD.src="assets/decors/chemin/normal/C_BD.png";
  I_cheminBD.addEventListener('load',function(){compteImgChargees++}, false);

  I_cheminBG=new Image();
  I_cheminBG.src="assets/decors/chemin/normal/C_BG.png";
  I_cheminBG.addEventListener('load',function(){compteImgChargees++}, false);

  I_cheminD=new Image();
  I_cheminD.src="assets/decors/chemin/normal/C_D.png";
  I_cheminD.addEventListener('load',function(){compteImgChargees++}, false);

  I_cheminG=new Image();
  I_cheminG.src="assets/decors/chemin/normal/C_G.png";
  I_cheminG.addEventListener('load',function(){compteImgChargees++}, false);

  I_cheminHD=new Image();
  I_cheminHD.src="assets/decors/chemin/normal/C_HD.png";
  I_cheminHD.addEventListener('load',function(){compteImgChargees++}, false);

  I_cheminHG=new Image();
  I_cheminHG.src="assets/decors/chemin/normal/C_HG.png";
  I_cheminHG.addEventListener('load',function(){compteImgChargees++}, false);

  I_cheminH=new Image();
  I_cheminH.src="assets/decors/chemin/normal/C_H.png";
  I_cheminH.addEventListener('load',function(){compteImgChargees++}, false);

  //eau
  I_eauHG=new Image();
  I_eauHG.src="assets/decors/eau/E_HG.png";
  I_eauHG.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauH=new Image();
  I_eauH.src="assets/decors/eau/E_H.png";
  I_eauH.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauHD=new Image();
  I_eauHD.src="assets/decors/eau/E_HD.png";
  I_eauHD.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauG=new Image();
  I_eauG.src="assets/decors/eau/E_G.png";
  I_eauG.addEventListener('load',function(){compteImgChargees++}, false);

  I_eau=new Image();
  I_eau.src="assets/decors/eau/E.png";
  I_eau.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauD=new Image();
  I_eauD.src="assets/decors/eau/E_D.png";
  I_eauD.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauBG=new Image();
  I_eauBG.src="assets/decors/eau/E_BG.png";
  I_eauBG.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauB=new Image();
  I_eauB.src="assets/decors/eau/E_B.png";
  I_eauB.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauBD=new Image();
  I_eauBD.src="assets/decors/eau/E_BD.png";
  I_eauBD.addEventListener('load',function(){compteImgChargees++}, false);
  //murs
  I_murG=new Image();
  I_murG.src="assets/decors/murs/M_G.png";
  I_murG.addEventListener('load',function(){compteImgChargees++}, false);

  I_murD=new Image();
  I_murD.src="assets/decors/murs/M_D.png";
  I_murD.addEventListener('load',function(){compteImgChargees++}, false);

  I_murH=new Image();
  I_murH.src="assets/decors/murs/M_H.png";
  I_murH.addEventListener('load',function(){compteImgChargees++}, false);

  I_murB=new Image();
  I_murB.src="assets/decors/murs/M_B.png";
  I_murB.addEventListener('load',function(){compteImgChargees++}, false);
  //escaliers
  I_escalierG=new Image();
  I_escalierG.src="assets/decors/escaliers/E_G.png";
  I_escalierG.addEventListener('load',function(){compteImgChargees++}, false);

  I_escalierD=new Image();
  I_escalierD.src="assets/decors/escaliers/E_D.png";
  I_escalierD.addEventListener('load',function(){compteImgChargees++}, false);

  I_escalierH=new Image();
  I_escalierH.src="assets/decors/escaliers/E_H.png";
  I_escalierH.addEventListener('load',function(){compteImgChargees++}, false);

  I_escalierB=new Image();
  I_escalierB.src="assets/decors/escaliers/E_B.png";
  I_escalierB.addEventListener('load',function(){compteImgChargees++}, false);
  //maison-murs
  I_maisonMurBD=new Image();
  I_maisonMurBD.src="assets/decors/maison/M_BD.png";
  I_maisonMurBD.addEventListener('load',function(){compteImgChargees++}, false);

  I_maisonMurBG=new Image();
  I_maisonMurBG.src="assets/decors/maison/M_BG.png";
  I_maisonMurBG.addEventListener('load',function(){compteImgChargees++}, false);

  I_maisonMurB=new Image();
  I_maisonMurB.src="assets/decors/maison/M_B.png";
  I_maisonMurB.addEventListener('load',function(){compteImgChargees++}, false);
  //maison-toits
  I_maisonToit=new Image();
  I_maisonToit.src="assets/decors/maison/T.png";
  I_maisonToit.addEventListener('load',function(){compteImgChargees++}, false);

  I_maisonToitB=new Image();
  I_maisonToitB.src="assets/decors/maison/T_B.png";
  I_maisonToitB.addEventListener('load',function(){compteImgChargees++}, false);

  I_maisonToitBD=new Image();
  I_maisonToitBD.src="assets/decors/maison/T_BD.png";
  I_maisonToitBD.addEventListener('load',function(){compteImgChargees++}, false);

  I_maisonToitBG=new Image();
  I_maisonToitBG.src="assets/decors/maison/T_BG.png";
  I_maisonToitBG.addEventListener('load',function(){compteImgChargees++}, false);

  I_maisonToitD=new Image();
  I_maisonToitD.src="assets/decors/maison/T_D.png";
  I_maisonToitD.addEventListener('load',function(){compteImgChargees++}, false);

  I_maisonToitG=new Image();
  I_maisonToitG.src="assets/decors/maison/T_G.png";
  I_maisonToitG.addEventListener('load',function(){compteImgChargees++}, false);

  I_maisonToitHD=new Image();
  I_maisonToitHD.src="assets/decors/maison/T_HD.png";
  I_maisonToitHD.addEventListener('load',function(){compteImgChargees++}, false);

  I_maisonToitHG=new Image();
  I_maisonToitHG.src="assets/decors/maison/T_HG.png";
  I_maisonToitHG.addEventListener('load',function(){compteImgChargees++}, false);
  //maison-port
  I_maisonPorte=new Image();
  I_maisonPorte.src="assets/decors/maison/porte.png";
  I_maisonPorte.addEventListener('load',function(){compteImgChargees++}, false);
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

function texture(name,i,j,orientation,franchissable,variante){
  this.name=name;
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.orientation=orientation;
  this.franchissable=franchissable;
  this.variante=variante;
}


function boucle(){
  afficher();
  setTimeout(boucle, 1000);
}

function resultatMap(){
  var resultat="";
  for (var i = 1; i < 99; i++) {
    for (var j = 1; j < 99; j++) {
      if (decor[i][j].name != 'pelouse'){
        resultat+="decor["+i+"]["+j+"]=new texture('"+decor[i][j].name+"',"+i+","+j+",'"+decor[i][j].orientation+"',"+decor[i][j].franchissable+",'"+decor[i][j].variante+"');";
      }
    }
  }
  document.getElementById('resultatMap').value=resultat;
}


chargerImages();
setTimeout(10);

for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {
    decor[i][j]=new texture('pelouse',i,j,'_');
  }
}

for (var i = 0; i < 100; i++) {
    decor[i][0]=new texture('arbre',i,0,'_');
    decor[i][99]=new texture('arbre',i,99,'_');
    decor[0][i]=new texture('arbre',0,i,'_');
    decor[99][i]=new texture('arbre',99,i,'_');
}

boucle();
