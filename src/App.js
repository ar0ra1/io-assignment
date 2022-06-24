import React, { Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ErrorBoundary } from "./ErrorBoundary";
import { AllUsers } from "./pages/AllUsers";
import { SingleUser } from "./pages/SingleUser";

export const App = () => {
  return (
    <div className="flex flex-col p-5 md:min-h-screen bg-slate-900">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ErrorBoundary>
                <SWRConfig
                  value={{
                    refreshInterval: 1000 * 600,
                    revalidateIfStale: false,
                    revalidateOnFocus: false,
                    revalidateOnReconnect: false,
                    errorRetryCount: 2,
                    errorRetryInterval: 2000,
                    suspense: true,
                  }}
                >
                  <Header />
                  <Suspense
                    fallback={
                      <div
                        data-testid={"suspense-loading"}
                        className="text-2xl text-white"
                      >
                        Loading...
                      </div>
                    }
                  >
                    <Outlet />
                  </Suspense>
                  <Footer />
                </SWRConfig>
              </ErrorBoundary>
            }
          >
            <Route path="/" element={<AllUsers />} exact />
            <Route path="/single" element={<SingleUser />} />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
