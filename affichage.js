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


  var ijPerso = xyVersIj(perso.x,perso.y);
  if (ijPerso[1]<=8) {
    ijPerso[1]=8
  }
  if (ijPerso[1]>=12) {
    ijPerso[1]=12
  }
  for (var i = 0; i < 20; i++) {//pour toutes les cases qui cadrient notre map, on affiche l'objet qu'elle contient
    for (var j =  ijPerso[1]-8; j < ijPerso[1]+8; j++) {
      decor[i][j].afficher();
    }
  }

  for (var i = 0; i < mesMonstres.length; i++) {
    mesMonstres[i].afficher();
  }
  for (var i = 0; i < mesBoulets.length; i++) {
    mesBoulets[i].afficher();
  }
  if (monBoss!='vide') {
    monBoss.afficher();
  }

  perso.afficher();
}
