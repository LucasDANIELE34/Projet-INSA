function afficher(){
  //on efface l'écran précédent
  canvas.beginPath();
  canvas.rect(0,0,1000,1000);
  canvas.fillStyle="white";
  canvas.fill();

  if (compteImgChargees==50) {//si les images ont toutes chargées, on peut commencer
    for (var i = XInit; i < XInit+20; i++) {//pour toutes les cases qui cadrient notre map, on affiche l'objet qu'elle contient
      for (var j = YInit; j < YInit+20; j++) {
        switch (decor[i][j].name) {
          case 'arbre':
            canvas.drawImage(I_arbre, decor[i][j].x-XInit*decor[i][j].w*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
            break;
          case 'pelouse':
            canvas.drawImage(I_pelouse, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
            break;
          case 'eau':
            switch (decor[i][j].orientation) {
              case 'HG':
                canvas.drawImage(I_eauHG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'H':
                canvas.drawImage(I_eauH, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'HD':
                canvas.drawImage(I_eauHD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'G':
                canvas.drawImage(I_eauG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case '_':
                canvas.drawImage(I_eau, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'D':
                canvas.drawImage(I_eauD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'BG':
                canvas.drawImage(I_eauBG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'B':
                canvas.drawImage(I_eauB, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'BD':
                canvas.drawImage(I_eauBD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
            }
            break;
          case 'mur':
            switch (decor[i][j].orientation) {
              case 'G':
                canvas.drawImage(I_murG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'D':
                canvas.drawImage(I_murD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'H':
                canvas.drawImage(I_murH, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'B':
                canvas.drawImage(I_murB, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
            }
            break;
          case 'escalier':
            switch (decor[i][j].orientation) {
              case 'G':
                canvas.drawImage(I_escalierG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'D':
                canvas.drawImage(I_escalierD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'H':
                canvas.drawImage(I_escalierH, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'B':
                canvas.drawImage(I_escalierB, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
            }
            break;
          case 'maison-porte':
            canvas.drawImage(I_maisonPorte, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
            break;
          case 'maison-toit':
            switch (decor[i][j].orientation) {
              case '_':
                canvas.drawImage(I_maisonToit, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'B':
                canvas.drawImage(I_maisonToitB, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'BD':
                canvas.drawImage(I_maisonToitBD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'BG':
                canvas.drawImage(I_maisonToitBG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'D':
                canvas.drawImage(I_maisonToitD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'G':
                canvas.drawImage(I_maisonToitG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'HD':
                canvas.drawImage(I_maisonToitHD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'HG':
                canvas.drawImage(I_maisonToitHG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
            }
            break;
          case 'maison-mur':
            switch (decor[i][j].orientation) {
              case 'B':
                canvas.drawImage(I_maisonMurB, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'BD':
                canvas.drawImage(I_maisonMurBD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
              case 'BG':
                canvas.drawImage(I_maisonMurBG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                break;
            }
            break;
          case 'chemin':
            switch (decor[i][j].variante) {
              case '1':
                switch (decor[i][j].orientation) {
                  case 'B':
                    canvas.drawImage(I_chemin1B, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'D':
                    canvas.drawImage(I_chemin1D, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'G':
                    canvas.drawImage(I_chemin1G, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'H':
                    canvas.drawImage(I_chemin1H, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'HD':
                    canvas.drawImage(I_chemin1HD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'HG':
                    canvas.drawImage(I_chemin1HG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                }
                break;
              case 'normal':
                switch (decor[i][j].orientation) {
                  case '_':
                    canvas.drawImage(I_chemin, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'B':
                    canvas.drawImage(I_cheminB, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'BD':
                    canvas.drawImage(I_cheminBD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'BG':
                    canvas.drawImage(I_cheminBG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'D':
                    canvas.drawImage(I_cheminD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'G':
                    canvas.drawImage(I_cheminG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'HD':
                    canvas.drawImage(I_cheminHD, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'HG':
                    canvas.drawImage(I_cheminHG, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                  case 'H':
                    canvas.drawImage(I_cheminH, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
                    break;
                }
                break;
            }
            break;
        }
      }
    }
  }
}
