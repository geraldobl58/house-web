import NavbarDashboard from "./(dashboard)/listing/components/navbar-dashboard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <NavbarDashboard />
      <main className="mx-auto max-w-[1600px] mt-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
