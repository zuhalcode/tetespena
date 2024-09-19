import { useEffect } from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the import according to your file structure
import {
  setArticleDraftContent,
  setArticleDraftTitle,
} from "@/store/slices/articleSlice";
import { toast } from "sonner";

const DEBOUNCE_DELAY = 10000; // or your desired debounce delay

const useSaveArticleDraft = () => {
  const dispatch = useDispatch();
  const { title, content } = useSelector(
    (state: RootState) => state.article.articleDraft,
  );

  const draftKey = "articleDraft";

  useEffect(() => {
    // Debounced function to save draft
    const debouncedSaveDraft = debounce(() => {
      const draft = { title, content };
      localStorage.setItem(draftKey, JSON.stringify(draft));
    }, DEBOUNCE_DELAY);

    // Call debouncedSaveDraft whenever title or content changes
    debouncedSaveDraft();

    // Cleanup function to cancel the debounced function
    return () => debouncedSaveDraft.cancel();
  }, [title, content]);

  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      const { title, content } = JSON.parse(savedDraft);
      dispatch(setArticleDraftTitle(title));
      dispatch(setArticleDraftContent(content));
    }
  }, [dispatch]);
};

export default useSaveArticleDraft;
