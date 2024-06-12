import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//get the Categories
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    const categories = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("CATEGORIES_GET]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

//Update category 
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse(" UnAuthenticate", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if(!billboardId){
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse(" Category ID    is required", { status: 400 });
    }
    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.storeId,
   
      },
    });
    if (!storeByUserId) {
      return new NextResponse(" Unauthorized", { status: 403 });
    }
    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId
        ,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(["CATEGORY_PATCH", error]);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

//delete the categories
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticate", { status: 401 });
    }
    if (!params.categoryId) {
      return new NextResponse("category Id is required", { status: 400 });
    }
    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.categoryId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(" Unauthorized", { status: 403 });
    }
    const categories = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId ,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
