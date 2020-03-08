function boulet (xDepart,yDepart,xArrivee,yArrivee,gentil,ptAttaques){
  this.v = 3;
  this.x = xDepart;
  this.y = yDepart;
  this.xDirection = xArrivee;
  this.yDirection = yArrivee;
  this.gentil=gentil;
  this.ptAttaques = ptAttaques;
  this.aSupprimer=false;
}

boulet.prototype.deplacer =function (){
    var dist = distance(this.x,this.y,this.xDirection,this.yDirection);

    if (dist!=0) {
      var vX=(this.xDirection-this.x)*this.v/dist;
      var vY=(this.yDirection-this.y)*this.v/dist;
    }
    if (dist>=this.v){
      this.x +=vX;
      this.y +=vY;
    }
    else {
      this.aSupprimer=true;
    }

    if ((!this.gentil) && (distance(this.x,this.y,perso.x,perso.y)<this.v)) {
      perso.recevoirCoup(this.ptAttaques);
    }
}

boulet.prototype.afficher = function () {
  var img = new Image();
  img = texturesSources['boulet']['images'][0]['N'];
  canvas.drawImage(img, this.x - perso.x + 300, this.y - perso.y + 200);
};
