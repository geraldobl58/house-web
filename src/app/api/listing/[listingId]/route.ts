import { NextResponse } from "next/server";

import { auth, currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { listingId: string } }
) {
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
      grill,
      pool,
      businessId,
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
    if (!businessId) {
      return new NextResponse("Property ID is required", { status: 400 });
    }
    if (!params.listingId) {
      return new NextResponse("Property ID is required", { status: 400 });
    }

    // TODO: Check for subscription

    const listing = await prismadb.property.update({
      where: {
        id: params.listingId,
      },
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
        grill,
        pool,
        businessId,
      },
    });
    return NextResponse.json(listing);
  } catch (error) {
    console.log("[PROPERTY_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const listing = await prismadb.property.delete({
      where: {
        userId,
        id: params.listingId,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.log("[PROPERTY_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
