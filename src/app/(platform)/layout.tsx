import Navbar from "@/components/navbar";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="w-[1300px] mx-auto mt-20">{children}</main>
    </div>
  );
};

export default PlatformLayout;
