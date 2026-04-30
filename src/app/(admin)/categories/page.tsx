import { getAuthContext } from "@/lib/auth";
import { listCategories } from "@/lib/api/categories";
import Link from "next/link";
import { CreateCategoryForm } from "./create-form";

export default async function CategoriesPage() {
  const ctx = await getAuthContext();
  let categories: Awaited<ReturnType<typeof listCategories>> = [];
  let error: string | null = null;
  try {
    categories = await listCategories(ctx);
  } catch (e) {
    error = e instanceof Error ? e.message : "Ошибка загрузки";
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Категории</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {error ? (
            <p className="text-destructive">{error}</p>
          ) : categories.length === 0 ? (
            <p className="text-muted-foreground">Категорий нет.</p>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Название</th>
                    <th className="text-left px-4 py-3 font-medium">Код</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/categories/${c.id}`} className="font-medium hover:underline">
                          {c.label}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{c.code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <CreateCategoryForm />
      </div>
    </div>
  );
}
