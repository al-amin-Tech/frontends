// src/app/routes/admin.routes.jsx

import { Route, Navigate } from "react-router-dom";
import { ADMIN_ROUTES, ROUTES } from "../../shared/constants/routes";

import AdminGuard from "../../shared/components/guards/AdminGuard";
import AdminLayout from "../../shared/components/layout/AdminLayout";
import AuthLayout from "../../shared/components/layout/AuthLayout";

import { AdminDashboardPage } from "../../features/admin/dashboard";
import { UserManagementPage } from "../../features/admin/user-management";

const admindashboardRoutes = (
  <>
    {/* 2. Protected Admin Routes (Wrapped in Guard + AdminLayout) */}
    <Route element={<AdminGuard><AdminLayout /></AdminGuard>}> 
       
      <Route path={ADMIN_ROUTES.DASHBOARD} 
      element={<AdminDashboardPage />} /> 
      
      <Route path={ADMIN_ROUTES.USERS} 
      element={<UserManagementPage />} /> 
      
    </Route>
  </>
);


export default admindashboardRoutes;
/*
import { Route } from "react-router-dom";

const admindashboardRoutes = (
  <Route
    path="/admin/users"
    element={
      <div style={{ padding: "40px", fontSize: "30px", color: "red" }}>
        ADMIN ROUTE IS WORKING!
      </div>
    }
  />
);

export default admindashboardRoutes;
*/
