import AdminLoginForm from "@/app/admin/login/AdminLoginForm";

type SearchParams = Record<string, string | string[] | undefined>;

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const nextValue = searchParams?.next;
  const nextPath = Array.isArray(nextValue) ? nextValue[0] : nextValue;

  return <AdminLoginForm nextPath={nextPath || "/admin"} />;
}
