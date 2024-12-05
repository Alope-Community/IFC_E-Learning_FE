export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-blue-100">
      <header className="p-4 bg-blue-600">
        <h1>Ini Navbar</h1>
      </header>
      <main>{children}</main>
      <footer className="p-4 bg-blue-600">
        <p>Section Footer</p>
      </footer>
    </div>
  );
}
