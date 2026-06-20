import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import { readCmsStore, updateCmsStore } from "@/lib/cms-store/server";
import { cmsId } from "@/lib/cms-store/id";
import type { Lead } from "@/lib/cms-store/types";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Lead>;
    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 },
      );
    }

    const lead: Lead = {
      id: cmsId("lead"),
      name: body.name.trim(),
      phone: body.phone.trim(),
      address: body.address?.trim() ?? "",
      needType: body.needType?.trim() ?? "Chưa rõ",
      note: body.note?.trim() ?? "",
      sourcePage: body.sourcePage?.trim() ?? "/",
      createdAt: new Date().toISOString(),
      status: "new",
    };

    await updateCmsStore((store) => ({
      ...store,
      leads: [lead, ...store.leads],
    }));

    return NextResponse.json({ ok: true, id: lead.id });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const store = await readCmsStore();
  return NextResponse.json({ leads: store.leads });
}
