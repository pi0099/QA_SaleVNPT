import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import { readCmsStore, writeCmsStore } from "@/lib/cms-store/server";
import type { CmsStore } from "@/lib/cms-store/types";

async function requireAdmin(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) return null;
  return session;
}

export async function GET(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const store = await readCmsStore();
  return NextResponse.json(store);
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as CmsStore;
    if (!body || body.version !== 1) {
      return NextResponse.json({ error: "Invalid store payload" }, { status: 400 });
    }
    await writeCmsStore(body);
    return NextResponse.json({ ok: true, updatedAt: body.updatedAt });
  } catch {
    return NextResponse.json({ error: "Failed to save store" }, { status: 500 });
  }
}
