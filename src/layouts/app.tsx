import FooterComponent from "@/components/Footer";
import LoaderComponent from "@/components/Loader";
import NavbarComponent from "@/components/Navbar";
import { useAuth } from "@/hooks/_middlewareAuth";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="bg-blue-100">
      <NavbarComponent />
      <main>{children}</main>
      <FooterComponent />
    </div>
  );
}
