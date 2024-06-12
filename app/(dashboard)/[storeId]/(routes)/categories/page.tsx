import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoriesClient } from "./components/client";
import { CategoriesColumns } from "./components/columns";
import { Billboard } from "@prisma/client";

const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      billboard: true,
    },
  });

  const formattedCategories: CategoriesColumns[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do , yyyy"),
    billboardLabel: item.billboard.label,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
