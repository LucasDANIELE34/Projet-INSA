var decor = [];//tableau contenant tous les objets à afficher du décor
for (var i = 0; i < 20; i++) {
  decor[i]=[];
}

var perso=new personnage(10,10);
//var monBoss=new boss(10,10);
var monBoss = 'vide';
var mesMonstres=[];
var mesBoulets=[];
var cheminMapActuel='';

function telechargerMap(cheminMap) {
  cheminMapActuel=cheminMap;
  mapChargee = false;
  var arguments = "chemin="+cheminMap;
  var donnees = new Object();

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

function telechargerPerso(cheminPerso) {
  persoCharge = false;
  var arguments = "chemin="+cheminPerso;
  var donnees;

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", urlServeur+"recuperer.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(arguments);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      donnees = JSON.parse(this.responseText);
      chargerPerso(donnees);
    }
  };
}

function chargerMonstres(monstres){
  mesMonstres.splice(0,mesMonstres.length);

  for (var i = monstres.length - 1; i >= 0; i--) {
    switch (monstres[i]) {
      case 'squelette':
        mesMonstres[i]= new squelette(0);
        break;
      case 'blop':
        mesMonstres[i]= new blop(0);
        break;
      case 'arraignee':
        mesMonstres[i]= new arraignee(0);
        break;
    }
  }
}

function chargerDecor(textures, portesOuvertes){
  for (var i = 0; i < textures.length; i++) {
    decor[textures[i].i][textures[i].j] = new texture(textures[i].name,textures[i].i,textures[i].j,textures[i].orientation,textures[i].variante,textures[i].texte,textures[i].map);
    if (textures[i].name == 'maisonPorte') {
      decor[textures[i].i][textures[i].j].iSortie = textures[i].iSortie;
      decor[textures[i].i][textures[i].j].jSortie = textures[i].jSortie;
      decor[textures[i].i][textures[i].j].ouvert = portesOuvertes;    
    }

    if (textures[i].texte!=null) {
      decor[textures[i].i][textures[i].j].phrases = decouperTexte(textures[i].texte);
    }
    if (textures[i].map!=null) {
      decor[textures[i].i][textures[i].j].map = textures[i].map;
      decor[textures[i].i][textures[i].j].iSortie = textures[i].iSortie;
      decor[textures[i].i][textures[i].j].jSortie = textures[i].jSortie;
      decor[textures[i].i][textures[i].j].cle = textures[i].cle;
    }
    if (textures[i].cleADonner!=null) {
      decor[textures[i].i][textures[i].j].cleADonner = textures[i].cleADonner;
    }
    if (textures[i].ajoutPtsVie!=null) {
      decor[textures[i].i][textures[i].j].ajoutPtsVie = textures[i].ajoutPtsVie;
    }
    if (textures[i].ajoutPtsAttaque!=null) {
      decor[textures[i].i][textures[i].j].ajoutPtsAttaque = textures[i].ajoutPtsAttaque;
    }
  }
}

function chargerPerso(p) {
  persoCharge = true;
  perso.name = p.name;
  perso.x=p.x;
  perso.y=p.y;
  perso.vie=p.vie;
  perso.vivant=p.vivant;
  perso.ptAttaques=p.ptAttaques;
}

function chargerMap(map){
  chargerMonstres(map.monstres);  
  if ((map.nettoye) || (mesMonstres.length==0)) {
    portesOuvertes = true;
  }
  else{
    portesOuvertes = false;
  }

  chargerDecor(map.decor,portesOuvertes);
  chargerImages(texturesSources);
  mapChargee = true;
}