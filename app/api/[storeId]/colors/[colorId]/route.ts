import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//get the colors
export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("color Id is required", { status: 400 });
    }

    const colors = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("COLOR_GET]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

//Update colors
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
    if (!params.colorId) {
      return new NextResponse(" Color ID    is required", { status: 400 });
    }
    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse(" Unauthorized", { status: 403 });
    }
    const colors = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log(["COLORS_PATCH", error]);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

//delete the colors
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticate", { status: 401 });
    }
    if (!params.colorId) {
      return new NextResponse("colors Id is required", { status: 400 });
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
    const colors = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
