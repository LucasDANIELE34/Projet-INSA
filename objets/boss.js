function boss(){
  this.nom='boss';
  this.x=9*taille+taille;
  this.y=9*taille+taille;
  this.vieMax=12;
  this.nbVieMax=2;
  this.nbVie=this.nbVieMax;
  this.vie=this.vieMax;
  this.ptAttaques=1;
  this.delaiAttaque=0;
  this.compteur=0;

  this.variante=0;
  this.delaiDouleur=30;
  this.compteurDouleur=0;

  this.rayonMaxVagueFeu=120;
  this.rayonVagueFeu=0;
  this.vitesseVagueFeu=1.5;
  this.vagueFeuAugmente=false;

  this.aSupprimer=false;
}

boss.prototype.afficher = function () {
  //image monstre
  var img = new Image();
  img = texturesSources[this.nom]['images'][this.variante]['N'];
  canvas.drawImage(img, this.x - taille - perso.x + 300, this.y - taille - perso.y + 200);

  //vague de feu
  if (this.rayonVagueFeu>0) {
    canvas.beginPath();
    canvas.strokeStyle = 'red';
    canvas.arc(this.x- perso.x + 300, this.y- perso.y + 200, this.rayonVagueFeu, 0, 2 * Math.PI);
    canvas.stroke();
  }

  //barre de vie
  var tailleJaugeDeVie=300;
  var nbVie=this.nbVie*this.vieMax+this.vie;
  var nbVieMax=(1+this.nbVieMax)*this.vieMax;
  var tailleBarreDeVie=nbVie/nbVieMax*tailleJaugeDeVie;
    //partie pleine
  canvas.beginPath();
  canvas.strokeStyle="red";
  canvas.rect(150,30,tailleBarreDeVie,2);
  canvas.fillStyle="red";
  canvas.fill();
  canvas.stroke();
    //partie vide
  canvas.beginPath();
  canvas.strokeStyle="gray";
  canvas.rect(150+tailleBarreDeVie,30,300-tailleBarreDeVie,2);
  canvas.fillStyle="gray";
  canvas.fill();
  canvas.stroke();

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
  this.variante=1;
  this.compteurDouleur=compteur;

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
};

boss.prototype.mourir = function (){
  this.aSupprimer = true;
  for (var i = mesBoulets.length - 1; i >= 0; i--) {
    mesBoulets[i].aSupprimer = true;
  }
  bossEffet.pause();
  bossEffet.ended=false;
  bossEffet.currentTime=0;
};

boss.prototype.attaquer = function(){
  this.vagueFeu();
  this.attaquerBoulets();
}

boss.prototype.animation = function(){
  if (this.variante == 1) {
    if (compteur>this.compteurDouleur + this.delaiDouleur) {
      this.variante = 0;
    }
  }
  
}

boss.prototype.boucle = function(){
  this.animation();
  this.afficher();
  this.attaquer();
}