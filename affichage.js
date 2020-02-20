function chargerImages(texturesSources) {

  for (const nomTexture in texturesSources) {
     texturesSources[nomTexture]['images']=[];
    for (var i = 0; i < texturesSources[nomTexture]['orientationsImage'].length; i++) {
      texturesSources[nomTexture]['images'][i]=new Object();
      for (var orientation in texturesSources[nomTexture]['orientationsImage'][i]) {
        if (texturesSources[nomTexture]['orientationsImage'][i][orientation]) {
          texturesSources[nomTexture]['images'][i][orientation]=new Image();
          texturesSources[nomTexture]['images'][i][orientation].src='assets/'+texturesSources[nomTexture]['type']+'/'+nomTexture+'/'+i+'/'+orientation+'.png';
        }
      }
    }
  }
}

function afficher(){
  //on efface l'écran précédent
  canvas.beginPath();
  canvas.rect(0,0,1000,1000);
  canvas.fillStyle="white";
  canvas.fill();

  if (mapChargee) {
    var ijPerso = xyVersIj(perso.x,perso.y);
    for (var i = ijPerso[0]-10; i < ijPerso[0]+10; i++) {//pour toutes les cases qui cadrient notre map, on affiche l'objet qu'elle contient
      for (var j =  ijPerso[1]-10; j < ijPerso[1]+10; j++) {
            decor[i][j].afficher();
      }
    }

    // for (var i = 0; i < monstres.length; i++) {
    //   monstres[i].afficher();
    // }

    perso.afficher();
  }
}
