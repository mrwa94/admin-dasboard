import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//create new categories
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("billboardId is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("store ID is required", { status: 400 });
    }

    const storeUserByID = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    

    if (!storeUserByID) {
      return new NextResponse("unauthorized", { status: 403 });
    }

    const categories = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
//get all categories
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("store ID is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
