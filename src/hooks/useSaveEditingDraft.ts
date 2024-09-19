import { useEffect } from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the import according to your file structure
import {
  setEditingDraftContent,
  setEditingDraftId,
  setEditingDraftTitle,
} from "@/store/slices/articleSlice";

const DEBOUNCE_DELAY = 100; // or your desired debounce delay

const useSaveEditingDraft = () => {
  const dispatch = useDispatch();
  const { title, content, id } = useSelector(
    (state: RootState) => state.article.editingDraft,
  );

  const draftKey = "editingDraft";

  useEffect(() => {
    // Debounced function to save draft
    const debouncedSaveDraft = debounce(() => {
      const draft = { title, content, id };
      localStorage.setItem(draftKey, JSON.stringify(draft));
    }, DEBOUNCE_DELAY);

    // Call debouncedSaveDraft whenever title, content, or id changes
    debouncedSaveDraft();

    // Cleanup function to cancel the debounced function
    return () => debouncedSaveDraft.cancel();
  }, [title, content, id]);

  // load local storage editing draft
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      const { title, content, id } = JSON.parse(savedDraft);
      dispatch(setEditingDraftId(id));
      dispatch(setEditingDraftTitle(title));
      dispatch(setEditingDraftContent(content));
    }
  }, [dispatch]);
};

export default useSaveEditingDraft;
