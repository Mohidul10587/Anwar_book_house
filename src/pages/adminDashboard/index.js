import RootLayout from "@/components/layouts/RootLayout";
import AdminDashboardLayout from "../../components/layouts/adminDashboardLayout";
import { useRouter } from "next/router";

const Page = ({ admin }) => {
  const router = useRouter();
  if (!admin) {
    return router.push("/adminLogin");
  }
  return (
    <div className="md:mt-24">
      <p>{admin.email}</p>
      <h1 className="text-xl">This is Admin Dashboard</h1>

      <p className="text-xl"> We are working . Please wait......</p>
    </div>
  );
};

export default Page;
Page.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <AdminDashboardLayout>{page}</AdminDashboardLayout>
    </RootLayout>
  );
};
