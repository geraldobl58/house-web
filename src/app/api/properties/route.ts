import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const {
      categoryId,
      images,
      name,
      address,
      neighborhood,
      price,
      description,
      bathroomId,
      bedroomId,
      garageId,
    } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("CategoryId is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Images is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!address) {
      return new NextResponse("Address is required", { status: 400 });
    }
    if (!neighborhood) {
      return new NextResponse("Neighborhood is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!bathroomId) {
      return new NextResponse("BathroomId is required", { status: 400 });
    }
    if (!bedroomId) {
      return new NextResponse("BedroomId is required", { status: 400 });
    }
    if (!garageId) {
      return new NextResponse("GarageId is required", { status: 400 });
    }

    // TODO: Check for subscription

    const property = await prismadb.property.create({
      data: {
        userId: user.id,
        userName: user.firstName,
        categoryId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        name,
        address,
        neighborhood,
        price,
        description,
        bathroomId,
        bedroomId,
        garageId,
      },
    });
    return NextResponse.json(property);
  } catch (error) {
    console.log("[PROPERTY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  // try {
  //   const { searchParams } = new URL(req.url);
  //   const categoryId = searchParams.get("categoryId") || undefined;
  //   const bathroomId = searchParams.get("bathroomId") || undefined;
  //   const bedroomId = searchParams.get("bedroomId") || undefined;
  //   const garageId = searchParams.get("garageId") || undefined;
  //   const properties = await prismadb.property.findMany({
  //     where: {
  //       categoryId,
  //       bathroomId,
  //       bedroomId,
  //       garageId,
  //     },
  //     include: {
  //       images: true,
  //       category: true,
  //       bathroom: true,
  //       bedroom: true,
  //       garage: true,
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //   });
  //   return NextResponse.json(properties);
  // } catch (error) {
  //   console.log("[PROPERTIES_GET]", error);
  //   return new NextResponse("Internal Server Error", { status: 500 });
  // }
}
