function afficher(){
  //on efface l'écran précédent
  canvas.beginPath();
  canvas.rect(0,0,1000,1000);
  canvas.fillStyle="white";
  canvas.fill();

  if (compteImgChargees==15) {//si les images ont toutes chargées, on peut commencer
    for (var i = Math.floor(perso.x/30)-10; i < Math.floor(perso.x/30)+10; i++) {//pour toutes les cases qui cadrient notre map, on affiche l'objet qu'elle contient
      for (var j =  Math.floor(perso.y/30)-10; j < Math.floor(perso.y/30)+10; j++) {
        switch (decor[i][j].name) {
          case 'arbre':
            canvas.drawImage(I_arbre, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
            break;
          case 'pelouse':
            canvas.drawImage(I_pelouse, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
            break;
          case 'eau':
            switch (decor[i][j].orientation) {
              case 'HG':
                canvas.drawImage(I_eauHG, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
                break;
              case 'H':
                canvas.drawImage(I_eauH, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
                break;
              case 'HD':
                canvas.drawImage(I_eauHD, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
                break;
              case 'G':
                canvas.drawImage(I_eauG, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
                break;
              case '_':
                canvas.drawImage(I_eau, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
                break;
              case 'D':
                canvas.drawImage(I_eauD, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
                break;
              case 'BG':
                canvas.drawImage(I_eauBG, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
                break;
              case 'B':
                canvas.drawImage(I_eauB, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
                break;
              case 'BD':
                canvas.drawImage(I_eauBD, decor[i][j].x - perso.x + 300, decor[i][j].y - perso.y + 200);
                break;
            }
            break;
        }
      }
    }

  }

  switch (perso.orientation) {
    case 'B':
      canvas.drawImage(I_personnageB, 300, 200);
      break;
    case 'D':
      canvas.drawImage(I_personnageD, 300, 200);
      break;
    case 'H':
      canvas.drawImage(I_personnageH, 300, 200);
      break;
    case 'G':
      canvas.drawImage(I_personnageG, 300, 200);
      break;
    default:

  }


}
