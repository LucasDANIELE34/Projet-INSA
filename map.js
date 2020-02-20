var decor = [];//tableau contenant tous les objets à afficher du décor
for (var i = 0; i < 100; i++) {
  decor[i]=[];
}

var perso=new personnage(49,49);

//var monstres=[new monstre(53,49,0),new monstre(53,55,0)];


function telechargerMap(cheminMap) {
  mapChargee = false;
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
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      decor[i][j] = new texture('pelouse',i,j,'N',0,'','');
    }
  }

  for (var i = 1; i < map.length; i++) {
    decor[map[i].i][map[i].j] = new texture(map[i].name,map[i].i,map[i].j,map[i].orientation,map[i].variante,map[i].texte,map[i].map);
    if (map[i].name == 'maisonPorte') {
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

  chargerImages(texturesSources);
  mapChargee = true;
}
