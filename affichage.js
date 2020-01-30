function chargerImages(){
  //arbre
  I_arbre=new Image();
  I_arbre.src="assets/decors/A.png";
  //pelouse
  I_pelouse=new Image();
  I_pelouse.src="assets/decors/P.png";
  //chemin-variante1
  I_chemin1B=new Image();
  I_chemin1B.src="assets/decors/chemin/1/C_B.png";

  I_chemin1D=new Image();
  I_chemin1D.src="assets/decors/chemin/1/C_D.png";

  I_chemin1G=new Image();
  I_chemin1G.src="assets/decors/chemin/1/C_G.png";

  I_chemin1H=new Image();
  I_chemin1H.src="assets/decors/chemin/1/C_H.png";

  I_chemin1HD=new Image();
  I_chemin1HD.src="assets/decors/chemin/1/C_HD.png";

  I_chemin1HG=new Image();
  I_chemin1HG.src="assets/decors/chemin/1/C_HG.png";
  //chemin-normal
  I_chemin=new Image();
  I_chemin.src="assets/decors/chemin/normal/C.png";

  I_cheminB=new Image();
  I_cheminB.src="assets/decors/chemin/normal/C_B.png";

  I_cheminBD=new Image();
  I_cheminBD.src="assets/decors/chemin/normal/C_BD.png";

  I_cheminBG=new Image();
  I_cheminBG.src="assets/decors/chemin/normal/C_BG.png";

  I_cheminD=new Image();
  I_cheminD.src="assets/decors/chemin/normal/C_D.png";

  I_cheminG=new Image();
  I_cheminG.src="assets/decors/chemin/normal/C_G.png";

  I_cheminHD=new Image();
  I_cheminHD.src="assets/decors/chemin/normal/C_HD.png";

  I_cheminHG=new Image();
  I_cheminHG.src="assets/decors/chemin/normal/C_HG.png";

  I_cheminH=new Image();
  I_cheminH.src="assets/decors/chemin/normal/C_H.png";
  //eau
  I_eauHG=new Image();
  I_eauHG.src="assets/decors/eau/E_HG.png";

  I_eauH=new Image();
  I_eauH.src="assets/decors/eau/E_H.png";

  I_eauHD=new Image();
  I_eauHD.src="assets/decors/eau/E_HD.png";

  I_eauG=new Image();
  I_eauG.src="assets/decors/eau/E_G.png";

  I_eau=new Image();
  I_eau.src="assets/decors/eau/E.png";

  I_eauD=new Image();
  I_eauD.src="assets/decors/eau/E_D.png";

  I_eauBG=new Image();
  I_eauBG.src="assets/decors/eau/E_BG.png";
  I_eauB=new Image();
  I_eauB.src="assets/decors/eau/E_B.png";

  I_eauBD=new Image();
  I_eauBD.src="assets/decors/eau/E_BD.png";
  //murs
  I_murG=new Image();
  I_murG.src="assets/decors/murs/M_G.png";

  I_murD=new Image();
  I_murD.src="assets/decors/murs/M_D.png";

  I_murH=new Image();
  I_murH.src="assets/decors/murs/M_H.png";

  I_murB=new Image();
  I_murB.src="assets/decors/murs/M_B.png";
  //escaliers
  I_escalierG=new Image();
  I_escalierG.src="assets/decors/escaliers/E_G.png";

  I_escalierD=new Image();
  I_escalierD.src="assets/decors/escaliers/E_D.png";

  I_escalierH=new Image();
  I_escalierH.src="assets/decors/escaliers/E_H.png";

  I_escalierB=new Image();
  I_escalierB.src="assets/decors/escaliers/E_B.png";
  //maison-murs
  I_maisonMurBD=new Image();
  I_maisonMurBD.src="assets/decors/maison/M_BD.png";

  I_maisonMurBG=new Image();
  I_maisonMurBG.src="assets/decors/maison/M_BG.png";

  I_maisonMurB=new Image();
  I_maisonMurB.src="assets/decors/maison/M_B.png";
  //maison-toits
  I_maisonToit=new Image();
  I_maisonToit.src="assets/decors/maison/T.png";

  I_maisonToitB=new Image();
  I_maisonToitB.src="assets/decors/maison/T_B.png";

  I_maisonToitBD=new Image();
  I_maisonToitBD.src="assets/decors/maison/T_BD.png";

  I_maisonToitBG=new Image();
  I_maisonToitBG.src="assets/decors/maison/T_BG.png";

  I_maisonToitD=new Image();
  I_maisonToitD.src="assets/decors/maison/T_D.png";

  I_maisonToitG=new Image();
  I_maisonToitG.src="assets/decors/maison/T_G.png";

  I_maisonToitHD=new Image();
  I_maisonToitHD.src="assets/decors/maison/T_HD.png";

  I_maisonToitHG=new Image();
  I_maisonToitHG.src="assets/decors/maison/T_HG.png";
  //maison-porte
  I_maisonPorte=new Image();
  I_maisonPorte.src="assets/decors/maison/porte.png";


  perso.chargerImages();
  monstre.chargerImages();
  for (var i = 0; i < 99; i++) {
    for (var j = 0; j < 99; j++) {
      decor[i][j].attribuerImage();
    }
  }
}

function afficher(){
  //on efface l'écran précédent
  canvas.beginPath();
  canvas.rect(0,0,1000,1000);
  canvas.fillStyle="white";
  canvas.fill();

  for (var i = Math.floor(perso.x/30)-10; i < Math.floor(perso.x/30)+10; i++) {//pour toutes les cases qui cadrient notre map, on affiche l'objet qu'elle contient
    for (var j =  Math.floor(perso.y/30)-10; j < Math.floor(perso.y/30)+10; j++) {
          decor[i][j].afficher();
    }
  }

  perso.afficher();
  monstre.afficher();
}
