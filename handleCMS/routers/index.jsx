import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import Login from "../views/Login";
import Home from "../views/Home";
import Detail from "../views/Detail";
import AddUser from "../views/AddUser";
import AddCuisine from "../views/AddCuisine";
import EditCuisine from '../views/EditCuisine'
import PatchImage from "../views/PatchImage"
import ListCategory from "../views/ListCategory"
import BaseLayout from "../views/BaseLayout";
const url = "https://server.nfadhilahe.online";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.token) {
          Toastify({
              text: "You already logged in",
              duration: 2000,
              newWindow: true,
              close: true,
              gravity: "top",
              position: "left",
              stopOnFocus: true,
              style: {
                  background: "#EF4C54",
                  color: "#17202A",
                  boxShadow: "0 5px 10px black",
                  fontWeight: "bold"
              }
          }).showToast();
          return redirect('/')
      }

      return null
  },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.token) {
        Toastify({
          text: "Please log in first",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/categories",
        element: <ListCategory url={url} />,
      },
      {
        path: "/",
        element: <Home url={url} />,
      },
      {
        path: "/addUser",
        element: <AddUser url={url} />,
      },
      {
        path: "/addCuisine",
        element: <AddCuisine url={url} />,
      },
      {
        path: "/editCuisine/:id",
        element: <EditCuisine url={url} />,
      },
      {
        path: "/detail/:id",
        element: <Detail url={url} />,
      },
      {
        path: "/patch/:id",
        element: <PatchImage url={url} />,
      },
    ],
  },
]);
export default router;
