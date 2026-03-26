import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { branch, customerName, items, total } = body;

    if (!branch || !customerName || !items || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate order ID: STB-XXXXX
    const count = await prisma.order.count();
    const orderId = `STB-${String(count + 1).padStart(5, "0")}`;

    const order = await prisma.order.create({
      data: {
        orderId,
        branch,
        customerName,
        items: JSON.stringify(items),
        total,
        status: "Pending",
      },
    });

    return NextResponse.json({
      orderId: order.orderId,
      id: order.id,
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branch = searchParams.get("branch");

    const where = branch && branch !== "all" ? { branch } : {};

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const parsed = orders.map((order: any) => ({
      ...order,
      items: JSON.parse(order.items),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
