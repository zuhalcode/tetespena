import { ArticleStatus } from "@prisma/client";
import { JSONContent } from "@tiptap/react";

export type Article = {
  id: string;
  title: string;
  slug: string;
  content?: string;
  cover_img?: string;
};

export type CreateArticle = {
  content: JSONContent;
  title: string;
  userId: string;
  status: ArticleStatus;
};

export type UpdateDraftArticle = {
  articleId: string | string[];
  content: JSONContent;
  title: string;
  slug: string;
  userId: string;
};
