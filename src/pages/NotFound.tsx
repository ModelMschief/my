import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8E7C9] text-[#064E3B] px-4">
      <div className="text-center p-8 rounded-2xl bg-[#FFFDF8] border border-[#DFCCA8] shadow-sm max-w-md">
        <h1 className="mb-2 text-5xl font-extrabold font-display text-[#064E3B]">404</h1>
        <p className="mb-6 text-lg text-[#26473D] font-medium">Page not found</p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-mono-code text-xs font-semibold bg-[#064E3B] text-[#F8E7C9] hover:bg-[#043D2E] transition-all"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
