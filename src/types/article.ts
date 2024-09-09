import { ArticleStatus } from "@prisma/client";
import { JSONContent } from "@tiptap/react";

export type Article = {
  id: string;
  title: string;
  slug: string;
  content?: string;
  cover_img?: string;
  status?: ArticleStatus;
};

export type CreateArticle = {
  content: JSONContent | undefined;
  title: string | undefined;
  userId: string;
  status: ArticleStatus;
};

export type UpdateDraftArticle = {
  articleId: string | string[];
  content: JSONContent;
  title: string | undefined;
  slug: string;
  userId: string;
};

export type SoftDeleteArticle = {
  status: ArticleStatus;
  slug: string | undefined;
  userId: string | undefined;
};

export type PublishArticle = {
  status: ArticleStatus;
  slug: string | undefined;
  userId: string | undefined;
};
