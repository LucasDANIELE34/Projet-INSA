function texture(name,i,j,orientation,franchissable,variante){
  this.name=name;
  this.h=30;
  this.w=30;
  this.x=i*this.h;
  this.y=j*this.w;
  this.orientation=orientation;
  this.franchissable=franchissable;
  this.variante=variante;
  this.image;
}

texture.prototype.attribuerImage= function(){
  switch (this.name) {
    case 'arbre':
      this.image= I_arbre;
      break;
    case 'pelouse':
      this.image= I_pelouse;
      break;
    case 'eau':
      switch (this.orientation) {
        case 'HG':
          this.image= I_eauHG;
          break;
        case 'H':
          this.image= I_eauH;
          break;
        case 'HD':
          this.image= I_eauHD;
          break;
        case 'G':
          this.image= I_eauG;
          break;
        case '_':
          this.image= I_eau;
          break;
        case 'D':
          this.image= I_eauD;
          break;
        case 'BG':
          this.image= I_eauBG;
          break;
        case 'B':
          this.image= I_eauB;
          break;
        case 'BD':
          this.image= I_eauBD;
          break;
      }
      break;
    case 'mur':
      switch (this.orientation) {
        case 'G':
          this.image= I_murG;
          break;
        case 'D':
          this.image= I_murD;
          break;
        case 'H':
          this.image= I_murH;
          break;
        case 'B':
          this.image= I_murB;
          break;
      }
      break;
    case 'escalier':
      switch (this.orientation) {
        case 'G':
          this.image= I_escalierG;
          break;
        case 'D':
          this.image= I_escalierD;
          break;
        case 'H':
          this.image= I_escalierH;
          break;
        case 'B':
          this.image= I_escalierB;
          break;
      }
      break;
    case 'maison-porte':
      this.image= I_maisonPorte;
      break;
    case 'maison-toit':
      switch (this.orientation) {
        case '_':
          this.image= I_maisonToit;
          break;
        case 'B':
          this.image= I_maisonToitB;
          break;
        case 'BD':
          this.image= I_maisonToitBD;
          break;
        case 'BG':
          this.image= I_maisonToitBG;
          break;
        case 'D':
          this.image= I_maisonToitD;
          break;
        case 'G':
          this.image= I_maisonToitG;
          break;
        case 'HD':
          this.image= I_maisonToitHD;
          break;
        case 'HG':
          this.image= I_maisonToitHG;
          break;
      }
      break;
    case 'maison-mur':
      switch (this.orientation) {
        case 'B':
          this.image= I_maisonMurB;
          break;
        case 'BD':
          this.image= I_maisonMurBD;
          break;
        case 'BG':
          this.image= I_maisonMurBG;
          break;
      }
      break;
    case 'chemin':
      switch (this.variante) {
        case '1':
          switch (this.orientation) {
            case 'B':
              this.image= I_chemin1B;
              break;
            case 'D':
              this.image= I_chemin1D;
              break;
            case 'G':
              this.image= I_chemin1G;
              break;
            case 'H':
              this.image= I_chemin1H;
              break;
            case 'HD':
              this.image= I_chemin1HD;
              break;
            case 'HG':
              this.image= I_chemin1HG;
              break;
          }
          break;
        case 'normal':
          switch (this.orientation) {
            case '_':
              this.image= I_chemin;
              break;
            case 'B':
              this.image= I_cheminB;
              break;
            case 'BD':
              this.image= I_cheminBD;
              break;
            case 'BG':
              this.image= I_cheminBG;
              break;
            case 'D':
              this.image= I_cheminD;
              break;
            case 'G':
              this.image= I_cheminG;
              break;
            case 'HD':
              this.image= I_cheminHD;
              break;
            case 'HG':
              this.image= I_cheminHG;
              break;
            case 'H':
              this.image= I_cheminH;
              break;
          }
          break;
      }
      break;
    }
}

texture.prototype.afficher= function(){
  canvas.drawImage(this.image, this.x - perso.x + 300, this.y - perso.y + 200);
}
