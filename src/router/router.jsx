import { createBrowserRouter } from "react-router-dom";
import Docone from "../Doctor/DoctorNew/Docone";
import Search from "../Patient/Search";
import SelLoc from "../Patient/SelLoc";
import Stockmanagen from "../Pharmacy/Stockmanagen";
import BillSystem from "../Pharmacy/bill";
import DashBoard from "../Pharmacy/dashboard";
import Dapplication from "../dulnara/applicaton/Dapplication";
import NextP from "../dulnara/applicaton/NextPage";
import Papplication from "../dulnara/applicaton/Papplication";
import Phapplication from "../dulnara/applicaton/Phapplication";
import Resetpass from "../dulnara/applicaton/Resetpass";
import { DoctorLayout } from "../layout/DoctorLayout";
import { PatientLayout } from "../layout/PatientLayout";
import { PharmacistLayout } from "../layout/PharmacistLayout";
import ResetPasswordPage from "../sudew/ResetPasswordPage";
import Veridoc from "../sudew/Veridoc";
import Verip from "../sudew/Verip";
import Veriph from "../sudew/Veriph";
import Doctorotp from "../sunera/Doctorotp";
import Login from "../sunera/Login";
import Patientotp from "../sunera/Patientotp";
import Photp from "../sunera/Photp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DoctorLayout />,
    children: [
      {
        path: "/",
        element: <Docone />,
      },
    ],
  },
  {
    path: "/",
    element: <PatientLayout />,
    children: [
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/selLoc",
        element: <SelLoc />,
      },
    ],
  },
  {
    path: "/",
    element: <PharmacistLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/billsystem",
        element: <BillSystem />,
      },
      {
        path: "/stockmanage",
        element: <Stockmanagen />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/r",
    element: <Resetpass />,
  },
  {
    path: "/photp",
    element: <Photp />,
  },
  {
    path: "/papplication",
    element: <Papplication />,
  },
  {
    path: "/phapplication",
    element: <Phapplication />,
  },
  {
    path: "/dapplication",
    element: <Dapplication />,
  },
  {
    path: "/patientotp",
    element: <Patientotp />,
  },
  {
    path: "/dotp",
    element: <Doctorotp />,
  },
  {
    path: "/veridoc",
    element: <Veridoc />,
  },
  {
    path: "/veriph",
    element: <Veriph />,
  },
  {
    path: "/verip",
    element: <Verip />,
  },
  
  {
    path: "/n",
    element: <NextP />,
  },
  {
    path: "/resetpage",
    element: <ResetPasswordPage />,
  },
]);

export default router;
