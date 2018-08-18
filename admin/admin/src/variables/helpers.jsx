import axios from 'axios';

export const APIURL               = "http://localhost:7778";
//export const APIURL               = "http://51.15.130.186:7778";

export const CATEGORIESPAGE       = "/categories";
export const ARTIFACTSPAGE        = "/artifacts";
export const PAGESPAGE            = "/pages";


export const NEWCATEGORYPAGE      = "/newcategory";
export const NEWARTIFACTPAGE      = "/newartifact";
export const NEWPAGEPAGE          = "/newpage";

export const EDITCATEGORYPAGE     = "/editcategory";
export const EDITARTIFACTPAGE     = "/editartifact";
export const EDITPAGEPAGE         = "/editpage";
export const EDITMEDIAPAGE        = "/artifactmedia";

export const LANGUAGESPAGE        = "/languages";
export const NEWLANGUAGEPAGE      = "/newlanguage";
export const EDITLANGUAGEPAGE     = "/editlanguage";

export const CTSPAGE              = "/categorytranslations"
export const NEWCTPAGE            = "/newcategorytranslation";
export const EDITCTPAGE           = "/editcategorytranslation";

export const PTSPAGE              = "/pagetranslations"
export const NEWPTPAGE            = "/newpagetranslation";
export const EDITPTPAGE           = "/editpagetranslation";

export const ATSPAGE              = "/artifacttranslations"
export const NEWATPAGE            = "/newartifacttranslation";
export const EDITATPAGE           = "/editartifacttranslation";



export const APIfetch = (url, returncallback, errorcallback) => {
  axios.get(APIURL+url)
    .then(function (response) {
      returncallback(response);
    })
    .catch(function (error) {
      errorcallback(error);
    });
}

export const APIcreate = (url, data, returncallback, errorcallback) => {
  axios.post(APIURL+url, data)
    .then(function (response) {
      returncallback(response);
    })
    .catch(function (error) {
      errorcallback(error);
    });
}



///////////////////////////////


export const APInewcategory = (inp) => {
  APIcreate('/categories/create',
            {'title': inp.state.title, 'description': inp.state.description},
    (r) => {
      console.log("Kategori eklendi");
      inp.props.history.push(CATEGORIESPAGE)
    },
    (r) => {console.log(r)})
}

export const APIeditcategory = (inp) => {
  APIcreate('/categories/edit',
            {'id': inp.state.id, 'title': inp.state.title, 'description': inp.state.description},
    (r) => {
      console.log("Kategori düzenlendi");
      inp.props.history.push(CATEGORIESPAGE)
    },
    (r) => {console.log(r)})
}


export const APIremovecategory = (inp, id) => {
  APIcreate('/categories/remove', {'id': id, },
    (r) => {
      console.log("Kategori silindi");
      //window.location.reload()
      inp.props.history.push(CATEGORIESPAGE)
    },
    (r) => {console.log(r)})
}


/////////////////////////////// pages


export const APInewpage = (inp) => {
  APIcreate('/pages/create',
            {'title': inp.state.title, 'content': inp.state.content},
    (r) => {
      console.log("Sayfa eklendi");
      inp.props.history.push(PAGESPAGE)
    },
    (r) => {console.log(r)})
}

export const APIeditpage = (inp) => {
  APIcreate('/pages/edit',
            {'id': inp.state.id, 'title': inp.state.title, 'content': inp.state.content},
    (r) => {
      console.log("Sayfa düzenlendi");
      inp.props.history.push(PAGESPAGE)
    },
    (r) => {console.log(r)})
}


export const APIremovepage = (inp, id) => {
  APIcreate('/pages/remove', {'id': id, },
    (r) => {
      console.log("Sayfa silindi");
      //window.location.reload()
      inp.props.history.push(PAGESPAGE)
    },
    (r) => {console.log(r)})
}

////////////////////////////// languages



export const APInewlanguage = (inp) => {
  APIcreate('/languages/create',
            {'title': inp.state.title, 'code': inp.state.code},
    (r) => {
      console.log("Dil eklendi");
      inp.props.history.push(LANGUAGESPAGE)
    },
    (r) => {console.log(r)})
}

export const APIeditlanguage = (inp) => {
  APIcreate('/languages/edit',
            {'id': inp.state.id, 'title': inp.state.title, 'code': inp.state.code},
    (r) => {
      console.log("Dil düzenlendi");
      inp.props.history.push(LANGUAGESPAGE)
    },
    (r) => {console.log(r)})
}


export const APIremovelanguage = (inp, id) => {
  APIcreate('/languages/remove', {'id': id, },
    (r) => {
      console.log("Dil silindi");
      //window.location.reload()
      inp.props.history.push(LANGUAGESPAGE)
    },
    (r) => {console.log(r)})
}

///////// catgory translations

export const APInewct = (inp) => {
  APIcreate('/categorytranslations/create/'+inp.state.category,
            {'language': inp.state.language,
             'title': inp.state.title,
             'description': inp.state.description},
    (r) => {
      console.log("Çeviri eklendi");
      inp.props.history.push(CTSPAGE + "/" + inp.state.category)
    },
    (r) => {console.log(r)})
}

export const APIeditct = (inp) => {
  APIcreate('/categorytranslations/edit',
            {'id': inp.state.id, 'title': inp.state.title, 'description': inp.state.description, 'language': inp.state.language},
    (r) => {
      console.log("Çeviri düzenlendi");
      inp.props.history.push(CTSPAGE + "/" + inp.state.category)
    },
    (r) => {console.log(r)})
}


export const APIremovect = (inp, id, idc) => {
  APIcreate('/categorytranslations/remove', {'id': id, },
    (r) => {
      console.log("Çeviri silindi");
      //window.location.reload()
      inp.props.history.push(CTSPAGE + "/" + idc)
    },
    (r) => {console.log(r)})
}

///////// page translations

export const APInewpt = (inp) => {
  APIcreate('/pagetranslations/create/'+inp.state.page,
            {'language': inp.state.language,
             'title': inp.state.title,
             'content': inp.state.content},
    (r) => {
      console.log("Çeviri eklendi");
      inp.props.history.push(PTSPAGE + "/" + inp.state.page)
    },
    (r) => {console.log(r)})
}

export const APIeditpt = (inp) => {
  APIcreate('/pagetranslations/edit',
            {'id': inp.state.id, 'title': inp.state.title, 'content': inp.state.content, 'language': inp.state.language},
    (r) => {
      console.log("Çeviri düzenlendi");
      inp.props.history.push(PTSPAGE + "/" + inp.state.page)
    },
    (r) => {console.log(r)})
}


export const APIremovept = (inp, id, idc) => {
  APIcreate('/pagetranslations/remove', {'id': id, },
    (r) => {
      console.log("Çeviri silindi");
      //window.location.reload()
      inp.props.history.push(PTSPAGE + "/" + idc)
    },
    (r) => {console.log(r)})
}

////////////////////////////// artifacts

export const APInewartifact = (inp) => {
  let tags = [];
  if (inp.state.tags.length > 0) {
    tags = inp.state.tags.split(" ");
  }

  const query = {'title': inp.state.title,
     'category': inp.state.category,
     'description': inp.state.description,
     'qr_id': inp.state.qr_id,
     'ibeacon_id': inp.state.ibeacon_id,
     'extra': inp.state.extra,
     'tags': tags,
     'faved': [],
     'isfeatured': inp.state.isfeatured
    }
  APIcreate('/artifacts/create',
            query,
    (r) => {
      console.log("Eser eklendi");
      inp.props.history.push(ARTIFACTSPAGE)
    },
    (r) => {console.log(r)})
}

export const APIeditartifact = (inp) => {
  let tags = [];
  if (inp.state.tags.length > 0) {
    tags = inp.state.tags.split(" ");
  }
  APIcreate('/artifacts/edit',
            {'id': inp.state.id,
             'title': inp.state.title,
             'qr_id': inp.state.qr_id,
             'tags': tags,
             'ibeacon_id': inp.state.ibeacon_id,
             'category': inp.state.category,
             'description': inp.state.description,
             'extra': inp.state.extra,
             'isfeatured': inp.state.isfeatured
           },
    (r) => {
      console.log("Eser düzenlendi");
      inp.props.history.push(ARTIFACTSPAGE)
    },
    (r) => {console.log(r)})
}

export const APIremoveartifact = (inp, id) => {
  APIcreate('/artifacts/remove', {'id': id, },
    (r) => {
      console.log("Eser silindi");
      //window.location.reload()
      inp.props.history.push(ARTIFACTSPAGE)
    },
    (r) => {console.log(r)})
}

export const APIremovemedia = (inp, id) => {
  APIcreate('/media/remove', {'id': id, },
    (r) => {
      console.log("Medya silindi");
      //window.location.reload()
      inp.props.history.push(EDITMEDIAPAGE+'/'+id)
    },
    (r) => {console.log(r)})
}


///////// artifact translations

export const APInewat = (inp) => {
  APIcreate('/artifacttranslations/create/'+inp.state.artifact,
            {'language': inp.state.language,
             'title': inp.state.title,
             'description': inp.state.description,
             'extra': inp.state.extra},
    (r) => {
      console.log("Çeviri eklendi");
      inp.props.history.push(ATSPAGE + "/" + inp.state.artifact)
    },
    (r) => {console.log(r)})
}

export const APIeditat = (inp) => {
  APIcreate('/artifacttranslations/edit',
            {'id': inp.state.id, 'title': inp.state.title,
             'description': inp.state.description,
             'extra': inp.state.extra,
             'language': inp.state.language},
    (r) => {
      console.log("Çeviri düzenlendi");
      inp.props.history.push(ATSPAGE + "/" + inp.state.artifact)
    },
    (r) => {console.log(r)})
}


export const APIremoveat = (inp, id, ida) => {
  APIcreate('/artifacttranslations/remove', {'id': id, },
    (r) => {
      console.log("Çeviri silindi");
      //window.location.reload()
      inp.props.history.push(ATSPAGE + "/" + ida)
    },
    (r) => {console.log(r)})
}



export const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};




// EOF
