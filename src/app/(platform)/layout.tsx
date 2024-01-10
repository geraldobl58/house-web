import Navbar from "@/components/navbar";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* <Navbar /> */}
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default PlatformLayout;
