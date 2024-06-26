import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//create new products


export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    if (
      !name ||
      !price ||
      !categoryId ||
      !colorId ||
      !sizeId ||
      !params.storeId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("store ID is required", { status: 400 });
    }
    if (!images || !Array.isArray(images) || images.length === 0) {
      return new NextResponse("Images are required", { status: 400 });
    }

      // // Upload images to Cloudinary
      // const uploadedImages = await Promise.all(
      //   images.map(async (image: string) => {
      //     const result = await cloudinary.uploader.upload(image, {
      //       folder: 'products',
      //     });
      //     return { url: result.secure_url };
      //   })
      // );

    const storeUserByID = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeUserByID) {
      return new NextResponse("unauthorized", { status: 403 });
    }

    const products = await prismadb.product.create({
      data: {
        name,
        price,
        storeId: params.storeId,
        colorId,
        sizeId,
        // images: {
        //   createMany: {
        //     data: images.map((image: { url: string }) => ({
        //       url: image.url,
        //     })),
        //   },
        // },
        
        categoryId,
        isArchived,
        isFeatured,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
//get all products
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("store ID is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
