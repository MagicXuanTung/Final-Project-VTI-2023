import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";

import Sidenav from "../widgets/layout/sidenav";
import DashboardNavbar from "../widgets/layout/dashboard-navbar";
import Configurator from "../widgets/layout/configurator";


import routes from "../routes";

import { useMaterialTailwindController, setOpenConfigurator } from "../context";


export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-green-500 hover:to-blue-500">
      <Sidenav
        routes={routes}
      />
      <div className=" xl:ml-80 wrapper" >
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-10 w-10" />
        </IconButton>
        <div className="container" style={{ overflowY: "auto", height: 900, width: 2000, marginLeft: 30 }} >
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }) => (
                  <Route exact path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
