function texture(name,i,j,orientation,variante){
  this.name=name;
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.orientation=orientation;
  this.franchissable=texturesSources[name]['franchissable'];
  this.variante=variante;
  this.parle=false;
}

texture.prototype.afficher= function(){
  var img = new Image();
  img = texturesSources[this.name]['images'][this.variante][this.orientation];
  canvas.drawImage(img, this.x - Math.floor(perso.x) + 300, this.y - Math.floor(perso.y) + 200);
}

texture.prototype.interagir= function (){
  if (this.phrases!=null) {
    perso.parler(this.phrases);
  }
  if (this.map!=null) {
    perso.x=this.iSortie*this.h;
    perso.y=this.jSortie*this.h;
    telechargerMap('maps/'+this.map);
  }
}
