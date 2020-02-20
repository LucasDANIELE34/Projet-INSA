var canvas = document.getElementById('o_canvas');
canvas = canvas.getContext('2d');//notre fenetre
var urlServeur = "https://tipne.000webhostapp.com/";
var mapChargee = false;
var taille = 30;

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
      case 32://espace
        if (!perso.parle) {
        //   perso.attaquer(2,monstres[indiceMonstreLePlusProche(monstres)]);
        }
        break;
      case 13://entree
        if (!perso.parle) {
          perso.interagir();
        }
        else {
          perso.changerPhrases();
        }
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
  if (mapChargee) {
    afficher();
    if (!perso.parle) {
      perso.orienter();
      perso.deplacer();
      perso.compteurAnimation();
    }

    //monMonstre.orienter();
    //monMonstre.deplacer();
    //monMonstre.attaquer();

  }
  setTimeout(boucle, 10);
}

function xyVersIj(x,y){
  var ij=[];
  ij[0]=Math.round(x/30);
  ij[1]=Math.round(y/30);
  return ij;
}

function enregistrerDsFichier(chemin, objet) {
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      if (objet[i][j].name == 'pelouse') {
        objet[i][j]='';
      }
    }
  }
  var monJSON =  JSON.stringify(objet);
  var xhttp = new XMLHttpRequest();
  var data = "chemin="+chemin+"&data="+monJSON;

  xhttp.open("POST", urlServeur+"enregistrer.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(data);
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

function distance(x1,y1,x2,y2) {
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function indiceMonstreLePlusProche(monstres){
  var distanceMonstrePlusProche=15000;
  var indice;
  for (var i = 0; i < monstres.length; i++) {
    if (distance(perso.x,perso.y,monstres[i].x,monstres[i].y)<distanceMonstrePlusProche) {
      distanceMonstrePlusProche=distance(perso.x,perso.y,monstres[i].x,monstres[i].y);
      indice=i;
    }
  }
  return indice;
}
