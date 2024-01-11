const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      Navigation
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
