var canvas = document.getElementById('o_canvas');
canvas = canvas.getContext('2d');//notre fenetre
var urlServeur = "https://tipne.000webhostapp.com/";
var mapChargee = false;
var persoCharge=true;
var taille = 30;

var touches = new Object();
touches.haut=false;
touches.bas=false;
touches.gauche=false;
touches.droite=false;
document.addEventListener("keydown", clavierDown);
document.addEventListener("keyup", clavierUp);

blopDirectionX=0;
blopDirectionY=0;
blopDeplacementEnGroupe=false;


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
          if (mesMonstres.length>0) {
            perso.attaquer(mesMonstres[indiceMonstreLePlusProche(mesMonstres)]);
          }
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
  if ((mapChargee) && (!perso.parle)) {
    perso.orienter();
    perso.deplacer();
    perso.compteurAnimation();


    for (var i = mesMonstres.length - 1; i >= 0; i--) {
      if (mesMonstres[i].aSupprimer) {
        supprimerMonstre(i);
        ouvrirPortes();
      }
    }

    for (var i = mesBoulets.length-1; i >= 0; i--) {
      if (mesBoulets[i].aSupprimer) {
        supprimerBoulet(i);
      }
    }


    for (var i = mesMonstres.length-1; i >= 0; i--) {
      mesMonstres[i].deplacer();
      mesMonstres[i].attaquer(); 
    }

    for (var i = mesBoulets.length-1; i > 0; i--) {
      mesBoulets[i].deplacer();
    }

    afficher();
  }

  //si le perso parle il affiche le texte
  if (perso.parle) {
    perso.afficherTexte();
  }

  setTimeout(boucle, 10);
}

//-------------------------GESTION FICHIERS_DEBUT-----------------------------//
function allegerMap(objet){
  var decorAllege = [];

  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      decorAllege[decorAllege.length] = {
        name:objet[i][j].name,
        i:i,
        j:j,
        orientation:objet[i][j].orientation,
        variante:objet[i][j].variante
      }

      if (objet[i][j].texte!=null) {
        decorAllege[decorAllege.length-1].texte = objet[i][j].texte;
      }
      if (objet[i][j].map!=null) {
        decorAllege[decorAllege.length-1].map = objet[i][j].map;
        decorAllege[decorAllege.length-1].iSortie = objet[i][j].iSortie;
        decorAllege[decorAllege.length-1].jSortie = objet[i][j].jSortie;
      }
    }
  }

  return decorAllege;
}

function enregistrerDsFichier(chemin, typeDObjet, objet) {
  //on télécharge la map actuelle
  var arg = "chemin="+chemin;
  var donnees;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", urlServeur+"recuperer.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(arg);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //quand elle est téléchargée, on modifie l'objet que l'on souhaite sauver
      donnees = this.responseText;
      donnees = JSON.parse(donnees);
      if (typeDObjet == 'perso') {
        donnees = objet;
      }
      else{
        donnees[typeDObjet] = objet;
      }
      
      //et on l'envoie au serveur
      var monJSON =  JSON.stringify(donnees);
      arg = "chemin="+chemin+"&data="+monJSON;
      /*xhttp.open("POST", urlServeur+"enregistrer.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(arg);*/
    }
  };  
}


function sauvegarder(){
  var p = new Object();
  p.name = perso.name;
  p.x=10*taille;
  p.y=10*taille;
  p.vie=perso.vie;
  p.vivant=perso.vivant;
  p.ptAttaques=perso.ptAttaques;

  if (perso.clef != "") {
    p.clef=perso.clef;
  }

  enregistrerDsFichier("perso",p);
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
    } while (!((phrases[i].length>45) || (mots.length == 0))) ;
    i++;
    phrases[i]='';
  } while (mots.length != 0);
  return phrases;
}
//-------------------------GESTION FICHIERS_FIN-----------------------------//


//-------------------------GESTION BOULETS_DEBUT-----------------------------//
function supprimerBoulet(i){
  mesBoulets.splice(i,1);
}

function ajouterBoulet(depart,objectif,ptAttaques){
  mesBoulets[mesBoulets.length] = new boulet(depart,objectif,ptAttaques);
}
//-------------------------GESTION BOULETS_FIN-----------------------------//



//-------------------------GESTION MONSTRES_DEBUT-----------------------------//
function indiceMonstreLePlusProche(monstres){
  var distanceMonstrePlusProche=distance(perso.x,perso.y,monstres[0].x,monstres[0].y);
  var indice = 0;
  for (var i = 1; i < monstres.length; i++) {
    if (distance(perso.x,perso.y,monstres[i].x,monstres[i].y)<distanceMonstrePlusProche) {
      distanceMonstrePlusProche=distance(perso.x,perso.y,monstres[i].x,monstres[i].y);
      indice=i;
    }
  }
  return indice;
}

function supprimerMonstre(i){
  mesMonstres.splice(i,1);
}

function rassemblerGroupe (){
  blopDirectionX = perso.x;
  blopDirectionY = perso.y;
  blopDeplacementEnGroupe = true;
}

function seChevauchent(pX,pY,m){
  chevauche=false;
  positionCentreeX=pX+taille/2;
  positionCentreeY=pY+taille/2;

  for (var i = m.length - 1; i >= 0; i--) {
    if (distance(m[i].x,m[i].y,positionCentreeX,positionCentreeY)<taille*0.7) {//taille*1.5 pour mettre une petite marge nécéssaire
      chevauche=true;
    }
  }
  return chevauche;
}
//-------------------------GESTION MONSTRES_FIN-----------------------------//



//-------------------------FONCTIONS OUTILS_DEBUT-----------------------------//
function distance(x1,y1,x2,y2) {
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function xyVersIj(x,y){
  var ij=[];
  ij[0]=Math.round(x/taille);
  ij[1]=Math.round(y/taille);

  for (var i = ij.length - 1; i >= 0; i--) {
    if(ij[i]>19){
      ij[i]=19;
    }
    if(ij[i]<0){
      ij[i]=0;
    }
  }

  return ij;
}
//-------------------------FONCTIONS OUTILS_FIN-----------------------------//

function ouvrirPortes(){
  if (mesMonstres.length==0) {
    for (var i = decor.length - 1; i >= 0; i--) {
      for (var j = decor[i].length - 1; j >= 0; j--) {
        if (decor[i][j].name == 'maisonPorte') {
          decor[i][j].ouvert=true;
        }
      }
    }
    enregistrerDsFichier(cheminMapActuel,'nettoye',true);
    
    if (cheminMapActuel == "maps/D_room1") {
      perso.parler(decouperTexte("Reflexion de Lewis : Ce manoir semble regorger de créatures étranges il va falloir que je reste sur mes gardes..."));
    }
    else if (cheminMapActuel == "maps/D_Boss") {
      perso.parler(decouperTexte("Reflexion de Lewis : Ce n'est pas passé loin! Ce monstre était terrifiant!"));
    }
  }
}

function deverouillagePorte(clePorte, clesPerso){
  deverouillage=false;
  for (var i = clesPerso.length - 1; i >= 0; i--) {
    if(clesPerso[i]==clePorte){
      deverouillage=true;
    }
  }
  return deverouillage;
}

function donnerCle(cle){
  perso.cles[perso.cles.length]=cle;
}