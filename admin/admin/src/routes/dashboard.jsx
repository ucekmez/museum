// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";

// core components/views
import DashboardPage from "views/Dashboard.jsx";

import CategoryList from "views/Categories/CategoryList.jsx";
import NewCategory from "views/Categories/NewCategory.jsx";
import EditCategory from "views/Categories/EditCategory.jsx";

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
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
