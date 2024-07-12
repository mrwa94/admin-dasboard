import { CreditCard, DollarSign, Package } from "lucide-react";

import { formatter } from "@/lib/utils";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSales } from "@/actions/get-sales-count";
import { getStock } from "@/actions/get-stock-count";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSales(params.storeId);
  const productInStockCount = await getStock(params.storeId);
  const getGraph = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <Heading
          title="Dashboard"
          description="this is overview for your store."
        />
        <Separator />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Revenue Card */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2  ">
              <CardTitle className="flex-sm font-medium ">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          {/* Sales Card */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2  ">
              <CardTitle className="flex-sm font-medium"> Sales</CardTitle>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lime-700">
                {" "}
                +{salesCount}
              </div>
            </CardContent>
          </Card>

          {/* Products in Stock */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2  ">
              <CardTitle className="flex-sm font-medium">
                {" "}
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productInStockCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Graph */}
        <Card className="col-span-4 ">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data = {getGraph}/>
          </CardContent>

        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
