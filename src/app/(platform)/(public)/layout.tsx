import Navbar from "@/components/navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default PublicLayout;
