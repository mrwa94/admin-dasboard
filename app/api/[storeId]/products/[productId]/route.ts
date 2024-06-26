import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//get the product
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("product Id is required", { status: 400 });
    }

    const products = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("PRODUCT_GET]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

//Update products
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      images,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
     isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("colorId is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("sizeId is required", { status: 400 });
    }


    if (!params.storeId) {
      return new NextResponse("store ID is required", { status: 400 });
    }
    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse(" Unauthorized", { status: 403 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        storeId: params.storeId,
        colorId,
        sizeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ],
          },
        },
        categoryId,
        isArchived,
        isFeatured,
      },
    });

    const products = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(["Product_PATCH", error]);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

//delete the product
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticate", { status: 401 });
    }
    if (!params.productId) {
      return new NextResponse("products Id is required", { status: 400 });
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
    const products = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
