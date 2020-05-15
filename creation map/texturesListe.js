var texturesSources = {
  arraignee:{
    type:"monstre",
    orientationsImage:[
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      }
    ]
  },
  blop:{
    type:"monstre",
    orientationsImage:[
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      }
    ]
  },
  boss:{
    type:"monstre",
    orientationsImage:[
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:false,
        BD:false
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:false,
        BD:false
      }
    ]
  },
  boulet:{
    type:"vivants",
    orientationsImage:[
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:false,
        BD:false
      }
    ]
  },
  chauveSouris:{
    type:"monstre",
    orientationsImage:[
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      }
    ]
  },
  coeur:{
    type:"vivants",
    franchissable:true,
    orientationsImage:[
      {
        demi:true,
        plein:true,
        vide:true
      }
    ]
  },
  coffre:{
    type:"decors",
    franchissable:false,
    orientationsImage:[
      {
        HG:false,
        H:true,
        HD:false,
        G:false,
        N:false,
        D:true,
        BG:false,
        B:false,
        BD:false
      }
    ]
  },
  fenetre:{
    type:"decors",
    franchissable:false,
    orientationsImage:[
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:false,
        BD:false
      }
    ]
  },
  maisonMur:{
    type:"decors",
    franchissable:false,
    orientationsImage:[
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:true,
        B:true,
        BD:true
      },
      {
        HG:false,
        H:true,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:true,
        BD:false
      },
      {
        HG:false,
        H:true,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:true,
        BD:false
      }
    ]
  },
  maisonPorte:{
    type:"decors",
    franchissable:false,
    orientationsImage:[
      {
        HG:false,
        H:true,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:false,
        BD:false
      }
    ]
  },
  personnage:{
    type:"personnage",
    franchissable:false,
    orientationsImage:[
      {
        HG:false,
        H:true,
        HD:false,
        G:true,
        N:false,
        D:true,
        BG:false,
        B:true,
        BD:false
      }
    ]
  },
  pilier:{
    type:"decors",
    franchissable:false,
    orientationsImage:[
      {
        HG:true,
        H:true,
        HD:false,
        G:true,
        N:true,
        D:false,
        BG:true,
        B:true,
        BD:false
      },
      {
        HG:false,
        H:true,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:true,
        BD:false
      }
    ]
  },
  pnj:{
    franchissable:false,
    type:"personnage",
    orientationsImage:[
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      }
    ]
  },
  sol:{
    type:"decors",
    franchissable:true,
    orientationsImage:[
      {
        HG:true,
        H:false,
        HD:true,
        G:false,
        N:false,
        D:false,
        BG:true,
        B:false,
        BD:true
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:false,
        BD:false
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:false,
        BD:false
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:true,
        D:false,
        BG:false,
        B:false,
        BD:false
      }
    ]
  },
  squelette:{
    type:"monstre",
    franchissable:true,
    orientationsImage:[
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      },
      {
        HG:false,
        H:false,
        HD:false,
        G:false,
        N:false,
        D:false,
        BG:false,
        B:true,
        BD:false
      }
    ]
  },
};
