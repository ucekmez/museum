import axios from 'axios';

export const APIURL               = "http://localhost:8000";//"http://51.15.130.186:7778";

export const CATEGORIESPAGE       = "/categories";
export const ARTIFACTSPAGE        = "/artifacts";
export const NEWCATEGORYPAGE      = "/newcategory";
export const NEWARTIFACTPAGE      = "/newartifact";
export const EDITCATEGORYPAGE     = "/editcategory";
export const EDITARTIFACTPAGE     = "/editartifact";
export const EDITMEDIAPAGE        = "/artifactmedia";

export const LANGS = [
  {"code": "tr", "lang": "Türkçe"},
  {"code": "en", "lang": "İngilizce"},
  {"code": "de", "lang": "Almanca"}
];


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


////////////////////////////// artifacts

export const APInewartifact = (inp) => {
  let tags = [];
  if (inp.state.tags.length > 0) {
    tags = inp.state.tags.split(" ");
  }
  APIcreate('/artifacts/create',
            {'title': inp.state.title,
             'category': inp.state.category,
             'description': inp.state.description,
             'qr_id': inp.state.qr_id,
             'ibeacon_id': inp.state.ibeacon_id,
             'extra': "",
             'tags': tags,
             'faved': [],
            },
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
             'description': inp.state.description},
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
