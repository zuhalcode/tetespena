"use client";

import Loading from "@/components/loading";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchArticlesUserByStatus } from "@/hooks/useArticles";
import { useAuth } from "@clerk/nextjs";

export default function Page() {
  const { userId } = useAuth();

  const { data, isLoading } = useFetchArticlesUserByStatus(userId, "TRASHED");

  return (
    <div className="space-y-8 pb-16 pt-5 text-white xl:px-16 xl:pt-10">
      <div className="space-y-3 px-8">
        <p className="text-xl font-semibold">Trashed Articles</p>
        <p className="text-sm text-slate-400">
          Here you can review articles that have been moved to the trash. You
          can restore or permanently delete them from this list.
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="pl-5 pr-3">
          <Table>
            {data?.length === 0 && (
              <TableCaption>No trashed article found</TableCaption>
            )}

            <TableHeader>
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((article: any) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium capitalize text-slate-200">
                    {article.title}
                  </TableCell>

                  <TableCell className="font-medium text-slate-200">
                    {article.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
