function afficher(){
  var img = new Image()
  //on efface l'écran précédent
  canvas.beginPath();
  canvas.rect(0,0,1000,1000);
  canvas.fillStyle="white";
  canvas.fill();

  for (var i = 0; i < 20; i++) {//pour toutes les cases qui cadrient notre map, on affiche l'objet qu'elle contient
    for (var j = 0; j < 20; j++) {
      img = texturesSources[decor[i][j].nom]['images'][decor[i][j].variante][decor[i][j].orientation];
      canvas.drawImage(img, decor[i][j].x, decor[i][j].y);
    }
  }
}
