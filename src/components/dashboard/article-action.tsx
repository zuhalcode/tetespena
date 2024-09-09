import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, Ellipsis, FileInput, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePublishArticle, useSoftDeleteArticle } from "@/hooks/useArticles";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  id?: string;
  slug?: string | undefined;
};

const ArticleAction = ({ id, slug }: Props) => {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();

  const { mutate: mutateSoftDelete } = useSoftDeleteArticle({
    onSuccess: () => {
      toast("Draft moved to trash", {
        description: "Restore it or delete it permanently from the trash",
        duration: 3000,
      });
      queryClient.invalidateQueries();
    },

    onError: () => {
      toast("An Error Occured", {
        description: "An error occurred while trying to trash the article.",
        duration: 3000,
      });
    },
  });

  const { mutate: mutatePublish } = usePublishArticle({
    onSuccess: () => {
      toast("Draft published", {
        description:
          "The article has been published. You can view it on the site",
        duration: 3000,
      });
      queryClient.invalidateQueries();
    },

    onError: () => {
      toast("An Error Occured", {
        description: "An error occurred while trying to trash the article.",
        duration: 3000,
      });
    },
  });

  const handleTrashButton = (slug: string | undefined) => {
    mutateSoftDelete({ slug, status: "TRASHED", userId });
  };

  const handlePublishButton = (slug: string | undefined) => {
    mutatePublish({ slug, status: "PUBLISHED", userId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl hover:bg-slate-700"
      >
        <div>
          <Ellipsis className="h-5 w-5 text-slate-400" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-56 rounded-2xl border border-slate-500 bg-[#111827]">
        <DropdownMenuGroup className="space-y-2 p-1">
          <DropdownMenuItem
            className="rounded-lg bg-transparent py-2 text-slate-300 focus:bg-slate-800 focus:text-white"
            onClick={() => handlePublishButton(slug)}
          >
            <FileInput className="mr-2 h-5 w-5" />
            <span className="text-base">Publish Article</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg bg-transparent py-2 text-slate-300 focus:bg-slate-800 focus:text-white">
            <Link
              href={`/submission/${id}`}
              target="_blank"
              className="flex items-center"
            >
              <Edit className="mr-2 h-5 w-5" />
              <span className="text-base">Edit Article</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-lg bg-transparent py-2 text-slate-300 focus:bg-slate-800 focus:text-white"
            onClick={() => handleTrashButton(slug)}
          >
            <Trash2 className="mr-2 h-5 w-5" />
            <span className="text-base">Move to Trash</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ArticleAction;
