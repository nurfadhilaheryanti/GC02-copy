
import { createBrowserRouter } from "react-router-dom";
import Home from '../views/Home'
import Detail from '../views/Detail'
import BaseLayout from "../views/BaseLayout";
const url = 'https://server.nfadhilahe.online'

const router = createBrowserRouter([

  {
    element: <BaseLayout/>,
    children: [
      {
        path: "/",
        element: <Home url={url} />,
    },
    {
        path: "/detail/:id",
        element: <Detail url={url} />,
    }
    ]
  },
]);

export default router


