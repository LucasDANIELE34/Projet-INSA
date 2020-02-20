function afficher(){
  var img = new Image()
  //on efface l'écran précédent
  canvas.beginPath();
  canvas.rect(0,0,1000,1000);
  canvas.fillStyle="white";
  canvas.fill();

  for (var i = XInit; i < XInit+20; i++) {//pour toutes les cases qui cadrient notre map, on affiche l'objet qu'elle contient
    for (var j = YInit; j < YInit+20; j++) {
      img = texturesSources[decor[i][j].name]['images'][decor[i][j].variante][decor[i][j].orientation];
      canvas.drawImage(img, decor[i][j].x-XInit*decor[i][j].w, decor[i][j].y-YInit*decor[i][j].h);
    }
  }
}
