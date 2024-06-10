import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/ui/main-nav";
import Switcher from "./ui/store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="bo border-b">
      <div className="flex h-16 items-center px-4  ">
        <Switcher items={stores} />
        <div>
          <MainNav className="mx-6" />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
