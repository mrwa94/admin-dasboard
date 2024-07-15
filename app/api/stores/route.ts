import { Store } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[POST_STORE]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    const store = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
