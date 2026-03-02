import { NextRequest, NextResponse } from "next/server";
import { getPaginatedPosts } from "@/lib/services/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");
  const q = searchParams.get("q") || "";

  const data = await getPaginatedPosts({ page, limit, query: q });
  return NextResponse.json(data);
}