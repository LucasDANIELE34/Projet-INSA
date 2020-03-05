function boss(i,j){
  this.name='boss';
  this.i=i;
  this.j=j;
  this.vieMax=12;
  this.nbVie=3;
  this.vie=this.vieMax;
  this.ptAttaques=0.5;
  this.delaiAttaque=0;

  this.rayonMaxVagueFeu=150;
  this.rayonVagueFeu=0;
  this.vitesseVagueFeu=2;
  this.vagueFeuAugmente=false;
}

boss.prototype.afficher = function () {
  var img = new Image();
  img = texturesSources[this.name]['images'][0]['N'];
  canvas.drawImage(img, this.x - perso.x + 300, this.y - perso.y + 200);
};

boss.prototype.vagueFeu = function () {
  if (this.vagueFeuAugmente) {
    this.rayonVagueFeu+=this.vitesseVagueFeu;

    if (this.rayonVagueFeu>=this.rayonMaxVagueFeu) {
      this.vagueFeuAugmente=false;
    }
  }
  else if (this.rayonVagueFeu>0) {
      this.rayonVagueFeu-=this.vitesseVagueFeu;
  }
};
