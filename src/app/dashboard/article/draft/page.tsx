"use client";

import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useFetchArticles,
  useFetchArticlesByUserId,
} from "@/hooks/useArticles";
import useTitle from "@/hooks/useTitle";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  useTitle("Draft Articles");

  const { userId } = useAuth();

  const { data, isLoading } = useFetchArticlesByUserId(userId);

  return (
    <div className="space-y-8 px-16 pb-16 pt-10 text-white">
      <div className="space-y-3">
        <p className="text-xl font-semibold">Draft Articles</p>
        <p className="text-sm text-slate-400">
          A list of your article. Review some before publish.
        </p>
      </div>
      <div className="w-2/12 border-b border-slate-600" />

      {isLoading ? (
        <Loading />
      ) : (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Article</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((article: any) => (
              <TableRow key={article.id}>
                <TableCell className="capitalize">{article.title}</TableCell>
                <TableCell>{article.status}</TableCell>
                <TableCell className="flex justify-center gap-3">
                  <Badge>Publish</Badge>
                  <Link href={`/submission/${article.slug}`}>
                    <Badge variant="secondary">Edit</Badge>
                  </Link>
                  <Badge variant="destructive">Delete</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
