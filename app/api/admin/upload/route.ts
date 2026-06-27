import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { put } from "@vercel/blob";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import { promises as fs } from "fs";
import path from "path";

async function requireAdmin(req: NextRequest) {
  return getAdminSessionFromRequest(req);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Thiếu file ảnh" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Chỉ chấp nhận file ảnh" },
        { status: 400 },
      );
    }

    const safeName = file.name.replace(/[^\w.-]+/g, "-").toLowerCase();
    const filename = `${Date.now()}-${safeName}`;
    const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

    if (token) {
      const blob = await put(`banners/${filename}`, file, {
        access: "public",
        token,
        addRandomSuffix: false,
      });
      return NextResponse.json({ url: blob.url });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "banners");
    await fs.mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    return NextResponse.json({ url: `/uploads/banners/${filename}` });
  } catch (error) {
    console.error("[admin/upload]", error);
    return NextResponse.json({ error: "Upload thất bại" }, { status: 500 });
  }
}
