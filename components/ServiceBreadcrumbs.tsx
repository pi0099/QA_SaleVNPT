import Link from "next/link";

export type BreadcrumbItem = {
  name: string;
  path?: string;
};

export default function ServiceBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <span aria-hidden className="text-slate-300">
                  /
                </span>
              ) : null}
              {isLast || !item.path ? (
                <span className="font-medium text-slate-700">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-[#2563eb] hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
