import Navbar from "@/components/navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="mx-auto max-w-[1600px] mt-4">{children}</main>
    </div>
  );
};

export default PublicLayout;
