import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// UI Components
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Pages & Components
import Index from "./pages/Index";                  // Halaman Beranda (protected)
import NotFound from "./pages/NotFound";            // Halaman 404
import QRCameraPage from "./pages/QRCameraPage";    // Contoh halaman protected lain
import AuthScreen from "./components/AuthScreen";   // Halaman Login / Auth
import RegisterScreen from "./components/RegisterScreen"; // Halaman Registrasi
import OnboardingScreen from "./components/OnboardingScreen"; // Halaman Onboarding
import ProtectedRoute from "./components/ProtectedRoute";   // Komponen pembungkus route yang perlu login

// Supabase client
import { supabase } from "@/integrations/supabase/client";

// React Query Client untuk data fetching & caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Wrapper Onboarding agar bisa pakai `useNavigate` (hook React Router) untuk navigasi setelah selesai onboarding
const OnboardingWrapper = () => {
  const navigate = useNavigate();

  return (
    <OnboardingScreen
      onComplete={() => {
        // Setelah selesai onboarding, arahkan ke halaman beranda "/"
        navigate("/");
      }}
    />
  );
};

const App = () => {
  useEffect(() => {
    // Debug: fetch semua user dari Supabase, untuk memastikan koneksi sudah jalan
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("❌ Supabase error:", error.message);
      } else {
        console.log("✅ Supabase users:", data);
      }
    };
    fetchUsers();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Halaman Beranda, hanya bisa diakses kalau sudah login */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />

            {/* Contoh halaman lain yang juga protected */}
            <Route
              path="/qr-camera"
              element={
                <ProtectedRoute>
                  <QRCameraPage />
                </ProtectedRoute>
              }
            />

            {/* Halaman Login */}
            <Route path="/auth" element={<AuthScreen />} />

            {/* Halaman Registrasi */}
            <Route
              path="/register"
              element={
                <RegisterScreen
                  onRegisterSuccess={() => {
                    // Setelah registrasi sukses, langsung redirect ke halaman login
                    window.location.href = "/auth";
                  }}
                  onSwitchToLogin={() => {
                    // Tombol switch ke login dari register
                    window.location.href = "/auth";
                  }}
                />
              }
            />

            {/* Halaman Onboarding (setelah login sukses diarahkan ke sini) */}
            <Route path="/onboarding" element={<OnboardingWrapper />} />

            {/* Kalau url tidak ditemukan, tampilkan halaman NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Toaster Notifications (ShadCN UI + Sonner) */}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
