function chargerImages(){
  //arbre
  I_arbre=new Image();
  I_arbre.src="assets/decors/A.png";
  I_arbre.addEventListener('load',function(){compteImgChargees++}, false);
  //pelouse
  I_pelouse=new Image();
  I_pelouse.src="assets/decors/P.png";
  I_pelouse.addEventListener('load',function(){compteImgChargees++}, false);
  //eau
  I_eauHG=new Image();
  I_eauHG.src="assets/decors/E_HG.png";
  I_eauHG.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauH=new Image();
  I_eauH.src="assets/decors/E_H.png";
  I_eauH.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauHD=new Image();
  I_eauHD.src="assets/decors/E_HD.png";
  I_eauHD.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauG=new Image();
  I_eauG.src="assets/decors/E_G.png";
  I_eauG.addEventListener('load',function(){compteImgChargees++}, false);

  I_eau=new Image();
  I_eau.src="assets/decors/E.png";
  I_eau.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauD=new Image();
  I_eauD.src="assets/decors/E_D.png";
  I_eauD.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauBG=new Image();
  I_eauBG.src="assets/decors/E_BG.png";
  I_eauBG.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauB=new Image();
  I_eauB.src="assets/decors/E_B.png";
  I_eauB.addEventListener('load',function(){compteImgChargees++}, false);

  I_eauBD=new Image();
  I_eauBD.src="assets/decors/E_BD.png";
  I_eauBD.addEventListener('load',function(){compteImgChargees++}, false);
  //personnage
  I_personnageB=new Image();
  I_personnageB.src="assets/personnages/P_B.png";
  I_personnageB.addEventListener('load',function(){compteImgChargees++}, false);

  I_personnageD=new Image();
  I_personnageD.src="assets/personnages/P_D.png";
  I_personnageD.addEventListener('load',function(){compteImgChargees++}, false);

  I_personnageG=new Image();
  I_personnageG.src="assets/personnages/P_G.png";
  I_personnageG.addEventListener('load',function(){compteImgChargees++}, false);

  I_personnageH=new Image();
  I_personnageH.src="assets/personnages/P_H.png";
  I_personnageH.addEventListener('load',function(){compteImgChargees++}, false);

}



chargerImages();
mapInit();
setTimeout(200);
boucle();
