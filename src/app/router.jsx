// src/app/router.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authRoutes, dashboardRoutes, adminauthRoutes, admindashboardRoutes } from "./routes"; 
import NotFound from "../shared/components/feedback/NotFound"; 
import AppLayout from "../shared/components/layout/AppLayout"; 



function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==========================================
            USER-FACING ROUTES
            Wrapped in the standard AppLayout
           ========================================== */}
        <Route element={<AppLayout />}>
          {authRoutes}
          {dashboardRoutes}
        </Route>

        {/* ==========================================
            ADMIN-FACING ROUTES
            Wrapped in the standard AppLayout
           ========================================== */}
         <Route element={<AppLayout />}>
          {adminauthRoutes}
          {admindashboardRoutes}
        </Route>
   
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;



/*



// src/app/router.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  authRoutes,
  dashboardRoutes,
} from "./routes";
import NotFound from "../shared/components/feedback/NotFound";
import AppLayout from "../shared/components/feedback/AppLayout";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<AppLayout />}>
          {authRoutes}
          {dashboardRoutes}

          {/* Catch-all route *}
          <Route path="*" element={<NotFound />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

*/