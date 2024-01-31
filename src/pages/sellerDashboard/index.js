import RootLayout from "@/components/layouts/RootLayout";

import SellerDashboard from "@/components/layouts/sellerDashboardLayout";
import { useRouter } from "next/router";

const Page = ({ seller }) => {
  const router = useRouter();
  if (!seller) {
    return router.push("/sellerLogin");
  }
  return (
    <div className="md:mt-0 -mt-24">
      <p>{seller.email}</p>
      <p>{seller.income}</p>

      <h1 className="text-xl">This is Seller Dashboard</h1>

      <p className="text-xl"> We are working . Please wait......</p>
    </div>
  );
};

export default Page;
Page.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SellerDashboard>{page}</SellerDashboard>
    </RootLayout>
  );
};
