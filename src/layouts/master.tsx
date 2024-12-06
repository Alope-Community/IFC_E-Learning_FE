import FooterComponent from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";

export default function MasterLayout({
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
