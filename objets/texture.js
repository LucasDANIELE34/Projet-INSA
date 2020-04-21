function texture(nom,i,j,orientation,variante){
  this.nom=nom;
  this.x=i*taille;
  this.y=j*taille;
  this.i=i;
  this.j=j;
  this.orientation=orientation;
  this.franchissable=texturesSources[nom]['franchissable'];
  this.variante=variante;
}

texture.prototype.afficher= function(){
  var img = new Image();
  img = texturesSources[this.nom]['images'][this.variante][this.orientation];
  canvas.drawImage(img, this.x - Math.floor(perso.x) + 300, this.y - Math.floor(perso.y) + 200);
}

texture.prototype.interagir= function (){
  if (this.phrases!=null) {
    perso.parler(this.phrases);
    if (this.nom=='pnj') {//si c'est le majordome qui parle, il disparrait après avoir parlé.
      this.copierCaseDessus();
    }
  }

  if (this.cleADonner!=null) {
    if (this.cleADonner.length>0) {
      donnerCle(this.cleADonner);
      this.cleADonner='';
      enregistrerDsFichier(cheminMapActuel, 'decor', allegerMap(decor));
      sauvegarder();
    }
  }

  if (this.ajoutPtsVie!=null) {
    perso.ajouterPtsVie(this.ajoutPtsVie);
    sauvegarder();
  }

  if (this.ajoutPtsAttaque!=null) {
    perso.ajouterPtsAttaque(this.ajoutPtsAttaque);
    sauvegarder();
  }


  if (this.map != null) {
    if ((this.map.length==0) || (!this.ouvert)) {
      perso.parler(decouperTexte("Il semblerait que cette porte soit fermée..."));
    }
    else{
      if ((this.cle=="") || deverouillagePorte(this.cle, perso.cles)) {
        perso.x=this.iSortie*taille;
        perso.y=this.jSortie*taille;
        porte.play();
        telechargerMap('maps/'+this.map);
      }
      else{
        perso.parler(decouperTexte("Il semblerait que cette porte soit verouillée à clé..."));
      }
    }
  }



}

texture.prototype.copierCaseDessus = function () {
  //on copie la case qui est au dessus
  this.nom = decor[this.i][this.j-1].nom;
  this.orientation = decor[this.i][this.j-1].orientation;
  this.franchissable = decor[this.i][this.j-1].franchissable;
  this.variante = decor[this.i][this.j-1].variante;

  //on modifie la map dans le serveur
  enregistrerDsFichier(cheminMapActuel,'decor',allegerMap(decor));
  sauvegarder();
}
