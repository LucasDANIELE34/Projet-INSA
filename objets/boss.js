function boss(i,j){
  this.name='boss';
  this.i=i;
  this.j=j;
  this.x=i*taille+taille;
  this.y=j*taille+taille;
  this.vieMax=12;
  this.nbVie=3;
  this.vie=this.vieMax;
  this.ptAttaques=0.5;
  this.delaiAttaque=0;
  this.compteur=0;

  this.rayonMaxVagueFeu=120;
  this.rayonVagueFeu=0;
  this.vitesseVagueFeu=1.5;
  this.vagueFeuAugmente=false;
}

boss.prototype.afficher = function () {
  var img = new Image();
  img = texturesSources[this.name]['images'][0]['N'];
  canvas.drawImage(img, this.x - taille - perso.x + 300, this.y - taille - perso.y + 200);

  if (this.rayonVagueFeu>0) {
    canvas.beginPath();
    canvas.strokeStyle = 'red';
    canvas.arc(this.x- perso.x + 300, this.y- perso.y + 200, this.rayonVagueFeu, 0, 2 * Math.PI);
    canvas.stroke();
  }
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

  if (this.rayonVagueFeu>0) {
    this.attaquerFeu();
  }
};

boss.prototype.attaquerFeu = function () {
  if (this.delaiAttaque > 0) {
    this.delaiAttaque--;
  }

  if ((distance(perso.x,perso.y,this.x,this.y)<this.rayonVagueFeu) && (this.delaiAttaque == 0)) {
    perso.recevoirCoup(this.ptAttaques);
    this.delaiAttaque=20;
  }
};

boss.prototype.attaquerBoulets = function (){
  this.compteur++;
  if (this.compteur % 50 == 0) {
    ajouterBoulet(this,perso,this.ptAttaques);
  }
};

boss.prototype.recevoirCoup = function (ptAttaques) {
  this.vie-=ptAttaques;

  if (this.vie<=0) {
    if (this.nbVie>0) {
      this.nbVie--;
      this.vie = this.vieMax;
      this.vagueFeuAugmente=true;
    }
    else {//quand il est mort on supprime le boss et tous sdes boulets
      this.mourir();
    }
  }
  console.log(this.vie);
};

boss.prototype.mourir = function (){
  for (var i = mesBoulets.length; i >=0; i--) {
    mesBoulets[i].aSupprimer = true;
  }
  monBoss = 'vide';
};