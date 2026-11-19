/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Storefront } from './components/store/Storefront';
import { KitchenKDS } from './components/kitchen/KitchenKDS';
import { DeliverySpace } from './components/delivery/DeliverySpace';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CartDrawer } from './components/store/CartDrawer';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeSpace, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FD] text-[#200E2E]">
      {/* Top Bar with Space Switcher */}
      <Navbar />

      {/* Main View Area according to active space */}
      <main className="flex-1">
        {activeSpace === 'store' && <Storefront />}
        {activeSpace === 'kitchen' && <KitchenKDS />}
        {activeSpace === 'delivery' && <DeliverySpace />}
        {activeSpace === 'admin' && <AdminDashboard />}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <Footer />

      {/* Elegant Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#1E0B2B] text-[#FAF8FD] rounded-xl shadow-xl border border-[#3A1853] text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#A78BFA] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
