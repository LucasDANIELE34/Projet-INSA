function personnage(i,j){
  this.w=30;
  this.h=30;
  this.x=i*this.w;
  this.y=j*this.h;
  this.v=2.5;
  this.orientation='B';
  this.textures = new Object();
}

personnage.prototype.deplacer= function(){

  if (touches.bas && !touches.haut){
    this.i = Math.round(this.x/this.w);
    this.j = Math.round((this.y + this.v)/this.h)
    //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
    if (decor[this.i][this.j].franchissable == true){
      this.y += this.v;
    }
  }

  if (touches.haut && !touches.bas){
    this.i=Math.round(this.x/this.w);
    this.j=Math.round((this.y - this.v)/this.h);
    //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
    if (decor[this.i][this.j].franchissable == true){
      this.y -= this.v;
    }
  }
  if (touches.droite && !touches.gauche){
    this.i=Math.round((this.x+this.v)/this.h);
    this.j=Math.round(this.y/this.h);
    //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
    if (decor[this.i][this.j].franchissable == true){
      this.x += this.v;
    }
  }
  if (touches.gauche && !touches.droite){
    this.i=Math.round((this.x-this.v)/this.h);
    this.j=Math.round(this.y/this.h);
    //si l'élément décor qui est à la position du personnage apres son deplacemnt est franchissable, on se deplace
    if (decor[this.i][this.j].franchissable == true){
      this.x -= this.v;
    }
  }
}

personnage.prototype.orienter= function(){
  if (touches.droite && !touches.gauche){
    this.orientation='D';
  }
  if (touches.gauche && !touches.droite){
    this.orientation='G';
  }
  if (touches.bas && !touches.haut){
    this.orientation='B';
  }

  if (touches.haut && !touches.bas){
    this.orientation='H';
  }
}

personnage.prototype.chargerImages= function(){
  this.textures.B=new Image();
  this.textures.B.src="assets/personnages/P_B.png";
  this.textures.B.addEventListener('load',function(){}, false);

  this.textures.D=new Image();
  this.textures.D.src="assets/personnages/P_D.png";
  this.textures.D.addEventListener('load',function(){}, false);

  this.textures.G=new Image();
  this.textures.G.src="assets/personnages/P_G.png";
  this.textures.G.addEventListener('load',function(){}, false);

  this.textures.H=new Image();
  this.textures.H.src="assets/personnages/P_H.png";
  this.textures.H.addEventListener('load',function(){}, false);
}

personnage.prototype.afficher= function(){
  switch (this.orientation) {
    case 'B':
      this.image= this.textures.B;
      break;
    case 'D':
      this.image= this.textures.D;
      break;
    case 'H':
      this.image= this.textures.H;
      break;
    case 'G':
      this.image= this.textures.G;
      break;
  }
  canvas.drawImage(this.image, 300, 200);
}
