import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSession,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function safeAdminNextPath(candidate: string): string {
  const q = candidate.indexOf("?");
  const pathOnly = q === -1 ? candidate : candidate.slice(0, q);
  const suffix = q === -1 ? "" : candidate.slice(q);

  if (pathOnly === "/admin" || pathOnly.startsWith("/admin/")) {
    return `${pathOnly}${suffix}`;
  }
  return "/admin";
}

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = token ? await verifyAdminSession(token) : null;

  if (!session || session.role !== "admin") {
    const hdrs = await headers();
    const requested =
      hdrs.get("x-admin-pathname") ?? hdrs.get("x-invoke-path") ?? "/admin";
    const nextPath = safeAdminNextPath(requested || "/admin");
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }

  return children;
}
