document.getElementById('o_canvas').addEventListener("click", majPositionSouris);

var canvas = document.getElementById('o_canvas');
canvas = canvas.getContext('2d');//notre fenetre

var decor = [];//tableau contenant tous les objets à afficher du décor
for (var i = 0; i < 100; i++) {
  decor[i]=[];
}
var decorAlegee=[];

var compteImgChargees=0;
var sourisX;
var sourisY;
var XInit=0;
var YInit=0;
var choixTexture = 'pelouse';
var orientation = 'N';
var variante = 0;
var nomMap='';
var texteTexture='';

function texture(name,i,j,orientation,variante){
  this.name=name;
  this.h=30;
  this.w=30;
  this.i=i;
  this.j=j;
  this.x=i*this.h;
  this.y=j*this.w;
  this.orientation=orientation;
  this.variante=variante;
}

function choisirOrientationsAAfficher(choixTexture) {
  afficherOrientations(texturesSources[choixTexture]['orientationsImage'][variante]);
}

function choisirVariantesAAfficher(choixTexture) {
  afficherVariantes(texturesSources[choixTexture]['orientationsImage'].length-1);
}

function choisirNomMapAAfficher(choixTexture) {
  var parametreAffichage;
  if (choixTexture == 'maisonPorte') {
    parametreAffichage='inline-block';
  }
  else {
    parametreAffichage='none';
  }
  document.getElementById('nomMap').style.display = parametreAffichage;
}

function afficherOrientations(orientation) {
  activerOrientation=false;
  var parametreAffichage;

  for (var variable in orientation) {
    if (orientation[variable]) {
      parametreAffichage = 'inline-block';
      activerOrientation=true;
    }
    else {
      parametreAffichage='none';
    }
    document.getElementById(variable).style.display = parametreAffichage;
  }


  if (activerOrientation) {
    parametreAffichage = 'inline-block';
  }
  else {
    parametreAffichage='none';
  }
  document.getElementById('orientation-choix').style.display = parametreAffichage;
}

function afficherVariantes(nbVariante) {
  var activerVariante=false;

  for (var i = 0; i < variante.length; i++) {
    document.getElementById('variante'+i).style.display = 'inline-block';
  }


  if (nbVariante>=1) {
    parametreAffichage = 'inline-block';
  }
  else {
    parametreAffichage='none';
  }
  document.getElementById('variante-choix').style.display = parametreAffichage;
}

function majPosition() {
  XInit=parseInt(document.getElementById('x').value);
  YInit=parseInt(document.getElementById('y').value);
  if (XInit>=80) {
    XInit=79;
  }
  if (YInit>=80) {
    YInit=79;
  }
}

function majTexture() {
  choixTexture=document.getElementById('texture-choix').value;
  choisirOrientationsAAfficher(choixTexture);
  choisirVariantesAAfficher(choixTexture);
  choisirNomMapAAfficher(choixTexture);
}

function majOrientation() {
  if (document.getElementById('orientation-choix').style.display == 'inline-block') {
    orientation=document.getElementById('orientation-choix').value;
  }
  else {
    orientation='N';
  }
}

function majVariante() {
  if (document.getElementById('variante-choix').style.display == 'inline-block') {
    variante=parseInt(document.getElementById('variante-choix').value);
  }
  else {
    variante=0;
  }
}

function majNomMap() {
  if (document.getElementById('nomMap').style.display != 'none') {
    nomMap=document.getElementById('nomMap').value;
  }
  else {
    nomMap='';
  }
}

function majTexteTexture() {
  texteTexture=document.getElementById('texte-texture').value
}

function majPositionSouris(e){
  sourisX=e.x;
  sourisY=e.y;
  maj();
  placerTexture(Math.floor(20*sourisX/600)+XInit,Math.floor(20*sourisY/600)+YInit);
}

function maj(){
  majPosition();
  majTexture();
  majOrientation();
  majVariante();
  majNomMap();
  majTexteTexture();
}

function placerTexture(i,j){
  var erreur;
  if (texturesSources[choixTexture]['orientationsImage'][variante][orientation]) {
    decor[i][j]=new texture(choixTexture,i,j,orientation,variante);

    if (choixTexture == 'maisonPorte') {
      decor[i][j].iSortie= prompt("position i à la sortie", 50);
      decor[i][j].jSortie= prompt("position j à la sortie", 50);
      decor[i][j].map = nomMap;
    }

    if (texteTexture != "") {
      decor[i][j].texte = texteTexture;
    }
    erreur = '';
  }
  else {
    erreur= 'orientation et variante valide?';
  }
  document.getElementById('msg').innerHTML = erreur;
}

function chargerImages(texturesSources) {

  for (const nomTexture in texturesSources) {
     texturesSources[nomTexture]['images']=[];
    for (var i = 0; i < texturesSources[nomTexture]['orientationsImage'].length; i++) {
      texturesSources[nomTexture]['images'][i]=new Object();
      for (var orientation in texturesSources[nomTexture]['orientationsImage'][i]) {
        if (texturesSources[nomTexture]['orientationsImage'][i][orientation]) {
          texturesSources[nomTexture]['images'][i][orientation]=new Image();
          texturesSources[nomTexture]['images'][i][orientation].src='assets/'+texturesSources[nomTexture]['type']+'/'+nomTexture+'/'+i+'/'+orientation+'.png';
        }
      }
    }
  }
}

function boucle(){
  afficher();
  setTimeout(boucle, 10);
}

function init() {
  chargerImages(texturesSources);
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      decor[i][j]=new texture('pelouse',i,j,'N',0,'','');
    }
  }
  boucle();
}

function resultatMap(){
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      if (decor[i][j].name != 'pelouse'){
        decorAlegee[decorAlegee.length] = {
          name:decor[i][j].name,
          i:i,
          j:j,
          orientation:decor[i][j].orientation,
          variante:decor[i][j].variante
        }

        if (decor[i][j].texte!=null) {
          decorAlegee[decorAlegee.length-1].texte = decor[i][j].texte;
        }
        if (decor[i][j].map!=null) {
          decorAlegee[decorAlegee.length-1].map = decor[i][j].map;
          decorAlegee[decorAlegee.length-1].iSortie = decor[i][j].iSortie;
          decorAlegee[decorAlegee.length-1].jSortie = decor[i][j].jSortie;
        }

      }
    }
  }
  document.getElementById('resultatMap').value=JSON.stringify(decorAlegee);
}
