import { useRoutes } from "react-router-dom";
import Inventory from "./pages/Inventory";
function Routes() {
  let element = useRoutes([
    {
      path: "/inventory",
      children: [
        {
          path: "",
          element: <Inventory />,
        },
      ],
    },
  ]);

  return element;
}
export default Routes;
