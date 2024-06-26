import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//get the Sizes
export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }

    const sizes = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    console.log("SIZE_GET]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

//Update Sizes
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse(" UnAuthenticate", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("value  is required", { status: 400 });
    }
    if (!params.sizeId) {
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
    const sizes = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    console.log(["SIZE_PATCH", error]);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

//delete the Sizes
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticate", { status: 401 });
    }
    if (!params.sizeId) {
      return new NextResponse("size Id is required", { status: 400 });
    }
    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(" Unauthorized", { status: 403 });
    }
    const sizes = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
