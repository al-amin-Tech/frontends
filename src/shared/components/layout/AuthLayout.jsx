
import { Outlet } from "react-router-dom";
import Card from "../ui/Card";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[400px_1fr]">
        {/* Left Branding Panel */}
        <div className="hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div>
            <h1 className="text-4xl font-bold text-white">
              VTU Platform
            </h1>

            <p className="mt-4 text-blue-100">
              Secure VTU management platform for Data, Airtime,
              Cable TV, Electricity, Wallet, API Services,
              Memberships and Provider Management.
            </p>
          </div>

          <div className="space-y-4 text-sm text-blue-100">
            <div>✓ Secure Authentication</div>
            <div>✓ JWT Session Management</div>
            <div>✓ Email OTP Verification</div>
            <div>✓ Password Recovery</div>
            <div>✓ Enterprise API Access</div>
          </div>
        </div>

        {/* Form Area */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-3xl">
            <Card className="w-full shadow-xl">
              <Outlet />
            </Card>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} VTU Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}




