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

function chargerMap(map){
  for (var i = map.monstres.length - 1; i >= 0; i--) {
    switch (map.monstres[i]) {
      case 'squelette':
        mesMonstres[i]= new squelette(0,i);
        break;
      case 'blop':
        mesMonstres[i]= new blop(0,i);
        break;
    }
  }


  for (var i = 0; i < map.decor.length; i++) {
    decor[map.decor[i].i][map.decor[i].j] = new texture(map.decor[i].name,map.decor[i].i,map.decor[i].j,map.decor[i].orientation,map.decor[i].variante,map.decor[i].texte,map.decor[i].map);
    if (map.decor[i].name == 'maisonPorte') {
      decor[map.decor[i].i][map.decor[i].j].iSortie = map.decor[i].iSortie;
      decor[map.decor[i].i][map.decor[i].j].jSortie = map.decor[i].jSortie;
    }

    if (map.decor[i].texte!=null) {
      decor[map.decor[i].i][map.decor[i].j].phrases = decouperTexte(map.decor[i].texte);
    }
    if (map.decor[i].map!=null) {
      decor[map.decor[i].i][map.decor[i].j].map = map.decor[i].map;
      decor[map.decor[i].i][map.decor[i].j].iSortie = map.decor[i].iSortie;
      decor[map.decor[i].i][map.decor[i].j].jSortie = map.decor[i].jSortie;
    }
  }

  chargerImages(texturesSources);
  mapChargee = true;
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

function chargerPerso(p) {
  persoCharge = true;
  perso.name = p.name;
  perso.x=p.x;
  perso.y=p.y;
  perso.vie=p.vie;
  perso.vivant=p.vivant;
  perso.ptAttaques=p.ptAttaques;
}