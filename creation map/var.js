document.getElementById('o_canvas').addEventListener("click", majPositionSouris);

var canvas = document.getElementById('o_canvas');
canvas = canvas.getContext('2d');//notre fenetre
var urlServeur="https://tipne.000webhostapp.com/";

var decor = [];//tableau contenant tous les objets à afficher du décor
for (var i = 0; i < 20; i++) {
  decor[i]=[];
}
var decorAlegee=[];

var compteImgChargees=0;
var sourisX;
var sourisY;
var choixTexture = 'sol';
var orientation = 'N';
var variante = 1;
var nomMap='';
var texteTexture='';

function texture(nom,i,j,orientation,variante){
  this.nom=nom;
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
  placerTexture(Math.floor(20*sourisX/600),Math.floor(20*sourisY/600));
}

function maj(){
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
      decor[i][j].iSortie= parseInt(prompt("position i à la sortie", 10));
      decor[i][j].jSortie= parseInt(prompt("position j à la sortie", 10));
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
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      decor[i][j]=new texture('sol',i,j,'N',1,'','');
    }
  }
for (var i = 0; i < 20; i++) {
    decor[i][0]=new texture('maisonMur',i,0,'H',1,'','');
}
for (var i = 0; i < 20; i++) {
  decor[i][1]=new texture('maisonMur',i,1,'N',1,'','');
}
for (var i = 0; i < 20; i++) {
  decor[i][2]=new texture('maisonMur',i,2,'B',1,'','');
}
for (var i = 0; i < 20; i++) {
  decor[i][17]=new texture('maisonMur',i,17,'H',1,'','');
}
for (var i = 0; i < 20; i++) {
  decor[i][18]=new texture('maisonMur',i,18,'N',1,'','');
}
for (var i = 0; i < 20; i++) {
  decor[i][19]=new texture('maisonMur',i,19,'B',1,'','');
}
for (var j = 0; j < 20; j++) {
  decor[0][j]=new texture('pilier',0,j,'H',0,'','');
}
for (var j = 0; j < 20; j++) {
  decor[19][j]=new texture('pilier',19,j,'HG',0,'','');
}
  boucle();
}

function resultatMap(){
  decorAlegee.splice(0,decorAlegee);
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      decorAlegee[decorAlegee.length] = {
        nom:decor[i][j].nom,
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
  document.getElementById('resultatMap').value=JSON.stringify(decorAlegee);
}

function telechargerMap(cheminMap) {
  var arguments = "chemin="+cheminMap;
  var donnees;

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", urlServeur+"recuperer.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(arguments);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      donnees = JSON.parse(this.responseText);
      chargerMap(donnees);
    }
  };
}

function chargerMap(map){
  for (var i = 1; i < map.length; i++) {
    decor[map[i].i][map[i].j] = new texture(map[i].nom,map[i].i,map[i].j,map[i].orientation,map[i].variante,map[i].texte,map[i].map);
    if (map[i].nom == 'maisonPorte') {
      decor[map[i].i][map[i].j].iSortie = map[i].iSortie;
      decor[map[i].i][map[i].j].jSortie = map[i].jSortie;
    }

    if (map[i].texte!=null) {
      decor[map[i].i][map[i].j].phrases = decouperTexte(map[i].texte);
    }
    if (map[i].map!=null) {
      decor[map[i].i][map[i].j].map = map[i].map;
      decor[map[i].i][map[i].j].iSortie = map[i].iSortie;
      decor[map[i].i][map[i].j].jSortie = map[i].jSortie;
    }
  }
}

function decouperTexte(texte) {
  var phrases = new Array();
  var mots = texte.split(' ');
  var i=0;
  phrases[0]='';
  do {
    do {
      phrases[i]+=' ' + mots[0];
      mots.splice(0,1);
    } while (!((phrases[i].length>55) || (mots.length == 0))) ;
    i++;
    phrases[i]='';
  } while (mots.length != 0);
  return phrases;
}
