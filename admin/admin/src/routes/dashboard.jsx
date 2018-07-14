// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";

// core components/views
import DashboardPage from "views/Dashboard.jsx";

import CategoryList from "views/Categories/CategoryList.jsx";
import NewCategory from "views/Categories/NewCategory.jsx";
import EditCategory from "views/Categories/EditCategory.jsx";

import CTList from "views/Categories/Translations/CTList.jsx";
import NewCT from "views/Categories/Translations/NewCT.jsx";
import EditCT from "views/Categories/Translations/EditCT.jsx";

import ATList from "views/Artifacts/Translations/ATList.jsx";
import NewAT from "views/Artifacts/Translations/NewAT.jsx";
import EditAT from "views/Artifacts/Translations/EditAT.jsx";

import LanguageList from "views/Languages/LanguageList.jsx";
import NewLanguage from "views/Languages/NewLanguage.jsx";
import EditLanguage from "views/Languages/EditLanguage.jsx";

import ArtifactList from "views/Artifacts/ArtifactList.jsx";
import NewArtifact from "views/Artifacts/NewArtifact.jsx";
import EditArtifact from "views/Artifacts/EditArtifact.jsx";
import AddMedia from "views/Artifacts/AddMedia.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Panel",
    navbarName: "Panel",
    icon: DashboardIcon,
    component: DashboardPage
  },
  {
    path: "/categories",
    sidebarName: "Kategoriler",
    navbarName: "Kategoriler",
    icon: DashboardIcon,
    component: CategoryList
  },
  {
    path: "/newcategory",
    sidebarName: "Kategori Ekle",
    navbarName: "Kategori Ekle",
    icon: DashboardIcon,
    component: NewCategory,
    invisible: true
  },
  {
    path: "/editcategory/:id",
    sidebarName: "Kategori Düzenle",
    navbarName: "Kategori Düzenle",
    icon: DashboardIcon,
    component: EditCategory,
    invisible: true
  },
  {
    path: "/artifacts",
    sidebarName: "Eserler",
    navbarName: "Eserler",
    icon: DashboardIcon,
    component: ArtifactList
  },
  {
    path: "/newartifact",
    sidebarName: "Eser Ekle",
    navbarName: "Eser Ekle",
    icon: DashboardIcon,
    component: NewArtifact,
    invisible: true
  },
  {
    path: "/editartifact/:id",
    sidebarName: "Eser Düzenle",
    navbarName: "Eser Düzenle",
    icon: DashboardIcon,
    component: EditArtifact,
    invisible: true
  },
  {
    path: "/artifactmedia/:id",
    sidebarName: "Eser Medya Düzenle",
    navbarName: "Eser Medya Düzenle",
    icon: DashboardIcon,
    component: AddMedia,
    invisible: true
  },
  {
    path: "/languages",
    sidebarName: "Diller",
    navbarName: "Diller",
    icon: DashboardIcon,
    component: LanguageList
  },
  {
    path: "/newlanguage",
    sidebarName: "Dil Ekle",
    navbarName: "Dil Ekle",
    icon: DashboardIcon,
    component: NewLanguage,
    invisible: true
  },
  {
    path: "/editlanguage/:id",
    sidebarName: "Dil Düzenle",
    navbarName: "Dil Düzenle",
    icon: DashboardIcon,
    component: EditLanguage,
    invisible: true
  },
  {
    path: "/categorytranslations/:id",
    sidebarName: "Kategori Çevirileri",
    navbarName: "Kategori Çevirileri",
    icon: DashboardIcon,
    component: CTList,
    invisible: true
  },
  {
    path: "/newcategorytranslation/:id", // buradaki id : kategori id'si
    sidebarName: "Kategori Çevirisi Ekle",
    navbarName: "Kategori Çevirisi Ekle",
    icon: DashboardIcon,
    component: NewCT,
    invisible: true
  },
  {
    path: "/editcategorytranslation/:id", // buradaki id : ceviri id'si
    sidebarName: "Kategori Çevirisi Düzenle",
    navbarName: "Kategori Çevirisi Düzenle",
    icon: DashboardIcon,
    component: EditCT,
    invisible: true
  },
  {
    path: "/artifacttranslations/:id",
    sidebarName: "Eser Çevirileri",
    navbarName: "Eser Çevirileri",
    icon: DashboardIcon,
    component: ATList,
    invisible: true
  },
  {
    path: "/newartifacttranslation/:id", // buradaki id : kategori id'si
    sidebarName: "Eser Çevirisi Ekle",
    navbarName: "Eser Çevirisi Ekle",
    icon: DashboardIcon,
    component: NewAT,
    invisible: true
  },
  {
    path: "/editartifacttranslation/:id", // buradaki id : ceviri id'si
    sidebarName: "Eser Çevirisi Düzenle",
    navbarName: "Eser Çevirisi Düzenle",
    icon: DashboardIcon,
    component: EditAT,
    invisible: true
  },


  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
