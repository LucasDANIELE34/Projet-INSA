function afficher(){
  //on efface l'écran précédent
  canvas.beginPath();
  canvas.rect(0,0,1000,1000);
  canvas.fillStyle="white";
  canvas.fill();

  if (compteImgChargees==11) {//si les images ont toutes chargées, on peut commencer
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
        }
      }
    }
  }
}
