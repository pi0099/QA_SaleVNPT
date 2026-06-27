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
  return NextResponse.json(store, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
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
    const saved = await readCmsStore();
    return NextResponse.json(
      { ok: true, updatedAt: saved.updatedAt, store: saved },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save store";
    console.error("[admin/store PUT]", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
