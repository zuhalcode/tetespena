import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import debounce from "lodash.debounce";
import { AppDispatch, RootState } from "@/store";
import {
  setArticleDraftContent,
  setArticleDraftTitle,
  setEditingDraftContent,
  setEditingDraftTitle,
} from "@/store/slices/articleSlice";
import { toast } from "sonner";

const DEBOUNCE_DELAY = 5000;
type DraftContext = "create" | "edit";

const usePersistDraft = (context: DraftContext) => {
  const dispatch: AppDispatch = useDispatch();

  const { title, content, id } = useSelector((state: RootState) =>
    context === "create"
      ? state.article.editingDraft
      : state.article.articleDraft,
  );

  const draftKey = context === "create" ? "articleDraft" : "editingDraft";

  // Load draft from localStorage when component mounts
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);

    if (savedDraft) {
      const { title, content } = JSON.parse(savedDraft);
      if (context === "create") {
        dispatch(setArticleDraftTitle(title));
        dispatch(setArticleDraftContent(content));
      } else {
        dispatch(setEditingDraftTitle(title));
        dispatch(setEditingDraftContent(content));
      }
    }
  }, [context, dispatch, draftKey]);

  useEffect(() => {
    // Debounced function to save draft
    const debouncedSaveDraft = debounce(() => {
      const draft = { title, content };
      localStorage.setItem(draftKey, JSON.stringify(draft));

      toast("Draft Saved Locally", {
        description:
          "Press saved draft button to store your progress permanently",
        duration: 3000,
      });
    }, DEBOUNCE_DELAY);

    // Call debouncedSaveDraft whenever title or content changes
    debouncedSaveDraft();

    return () => debouncedSaveDraft.cancel();
  }, [content, draftKey, title]);
};

export default usePersistDraft;
