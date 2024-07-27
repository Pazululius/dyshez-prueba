import Sidebar from "@/shared/navigation/Sidebar";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-white border-l-2 border-l-gray-sidebar p-5  w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};
export default AuthLayout;
