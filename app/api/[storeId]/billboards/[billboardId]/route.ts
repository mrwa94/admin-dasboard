import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//get the billboards
export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse(" UnAuthenticate", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("image URL is required", { status: 400 });
    }
    if (!params.billboardId) {
      return new NextResponse(" Billboard ID    is required", { status: 400 });
    }

    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.billboardId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(" Unauthorized", { status: 403 });
    }

    const store = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log(["BILLBOARDS_PATCH", error]);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

//delete the billboard
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticate", { status: 401 });
    }
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.billboardId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(" Unauthorized", { status: 403 });
    }
    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
