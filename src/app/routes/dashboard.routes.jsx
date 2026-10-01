// src/app/routes/dashboard.routes.jsx
import { Route, Navigate } from "react-router-dom";
import ROUTES from "../../shared/constants/routes";

import ProtectedRoute from "../../shared/components/guards/ProtectedRoute";
import DashboardLayout from "../../shared/components/layout/DashboardLayout";
import ApiUserRoute from "../../shared/components/guards/ApiUserRoute";
import ComingSoon from "../../shared/components/common/ComingSoon";
import { UpgradeAccountPage } from "../../features/membership";
import { ReferralPage } from "../../features/referral";
import { NotificationSettingsPage } from "../../features/notifications";
import { WalletHistoryPage } from "../../features/wallet";
import { MorePage } from "../../features/more";
import { PricingPage } from "../../features/pricing";
import { ApiKeysPage } from "../../features/apiKeys";
import { DataPage } from "../../features/data";
import { AirtimePage } from "../../features/airtime";
import { ElectricityPage } from "../../features/electricity";
import { CablePage } from "../../features/cable";
import { EducationPage } from "../../features/education";
import { EpinPage } from "../../features/epin";
import { DepositOptionsScreen, EnterAmountScreen } from "../../features/deposits";
import { PurchaseCategoriesPage, PurchaseHistoryPage, PurchaseDetailsPage, } from "../../features/transactions";
import { ThemeSettingsPage, HelpSupportPage, LegalPage, } from "../../features/settings";
import { NotificationsPage } from "../../features/systemNotifications";
import { 
  ProfilePage, 
  PersonalInformationPage, 
  ChangePasswordPage, 
  TransactionPinPage, 
  RequestResetTransactionPinPage,
  ConfirmResetTransactionPinPage,
  } from "../../features/users";
import {
  DashboardPage, 
  WalletPage,
} from "../../features/dashboard";

 const dashboardRoutes = (
  <>
     <Route element={<ProtectedRoute />}>

     <Route element={<DashboardLayout />}> 

       <Route
          path={ROUTES.DASHBOARD}
          element={<DashboardPage />}
        /> 
        
       <Route
          path={ROUTES.NOTIFICATIONS_EVEVT}
          element={<NotificationsPage />}
        /> 

        <Route
          path={ROUTES.WALLET}
          element={<WalletHistoryPage />}
        />

        <Route
          path={ROUTES.PROFILE}
          element={<ProfilePage />}
        />
        <Route
          path={ROUTES.PROFILE_INFORMATION}
          element={<PersonalInformationPage />}
        />
        <Route
          path={ROUTES.TRANSACTION_PIN}
          element={<TransactionPinPage />}
        />
        <Route
          path={ROUTES.REQUEST_RESET_TRANSACTION_PIN}
          element={<RequestResetTransactionPinPage />}
        />
        <Route
          path={ROUTES.CONFIRM_RESET_TRANSACTION_PIN}
          element={<ConfirmResetTransactionPinPage />}
        />
        <Route
          path={ROUTES.CHANGE_PASSWORD}
          element={<ChangePasswordPage />}
        />
        <Route
          path={ROUTES.UPGRADE_ACCOUNT}
          element={<UpgradeAccountPage />}
        />
        <Route
          path={ROUTES.NOTIFICATIONS}
          element={<NotificationSettingsPage />}
        />
        
        <Route
          path={ROUTES.THEME_SETTINGS}
          element={<ThemeSettingsPage />}
        />
        
        <Route
          path={ROUTES.HELP}
          element={<HelpSupportPage />}
        />
        
        <Route
          path={ROUTES.LEGAL}
          element={<LegalPage />}
        />

        {/* Future Features */}


        <Route
          path={ROUTES.REFERRAL}
          element={<ReferralPage />}
         />
         
         <Route
          path={ROUTES.TRANSACTIONS}
          element={<PurchaseCategoriesPage />}
          />
          
         <Route
          path={ROUTES.FUND_WALLET}
          element={<DepositOptionsScreen />}
          />
          
         <Route
          path={ROUTES.DEPOSIT_AMOUNT}
          element={<EnterAmountScreen />}
          />
          
         <Route
          path={ROUTES.PURCHASE_HISTORY}
          element={<PurchaseHistoryPage />}
          />
          
         <Route
           path={ROUTES.PURCHASE_DETAILS}
           element={<PurchaseDetailsPage />}
           />
   
        <Route
          path={ROUTES.AIRTIME}
          element={<AirtimePage />}
        />

        <Route
          path={ROUTES.DATA}
          element={<DataPage />}
        />

        <Route
          path={ROUTES.ELECTRICITY}
          element={<ElectricityPage />}
        />

        <Route
          path={ROUTES.CABLE}
         element={<CablePage />}
        />

        <Route
          path={ROUTES.EDUCATION}
          element={<EducationPage />}
        />

        <Route
          path={ROUTES.RECHARGE_PIN}
          element={<EpinPage />}
        />

        <Route
          path={ROUTES.BULK_SMS}
         element={<ComingSoon title="BULK_SMS" />}
         />

        <Route
          path={ROUTES.MORE}
          element={<MorePage />}
        />
        
        <Route element={<ApiUserRoute />}>
          <Route
            path={ROUTES.PRICING}
            element={<PricingPage />}
             />
             
          <Route
            path={ROUTES.API_KEYS}
            element={<ApiKeysPage />}
             />
         </Route>
         
        <Route
          path={ROUTES.SETTINGS}
          element={<ComingSoon title="SETTINGS" />}
        />

     </Route> 

    </Route> 
  </>
);

export default dashboardRoutes;
