import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "src/auth/useAuth";

interface IProps {
  main: ReactNode;
}

const Layout: FunctionComponent<IProps> = ({ main }) => {
  const { logout, authenticated } = useAuth();

  return (
    <div className="bg-gray-900 max-w-screen-2xl mx-auto text-white">
      <nav className="bg-gray-800" style={{ height: "64px" }}>
        <div className="px-6 flex items-center justify-between h-16">
          <Link href="/">
            <a>
              <img src="/metislogo.jpg" alt="Metis" className="inline w-8" />
            </a>
          </Link>
          {authenticated ? (
            <>
              <Link href="/">
                <a>METIS OS- GLOBAL CONFLICT ANALYSIS AGENT</a>
              </Link>
              <button
                onClick={logout}
                className=" bg-gray-500 px-4 py-2 rounded-lg text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth">
              <a>Login / Signup</a>
            </Link>
          )}
        </div>
      </nav>

      <main style={{ minHeight: "calc(100vh - 64px)" }}>{main}</main>
    </div>
  );
};

export default Layout;
