import { createSlice } from "@reduxjs/toolkit";
import { JSONContent } from "@tiptap/react";

type ArticleState = {
  articleDraft: { title?: string; content?: JSONContent };
  editingDraft: { title?: string; content?: JSONContent; id?: string };
};

const initialState: ArticleState = {
  articleDraft: { title: "", content: {} },
  editingDraft: { title: "", content: {}, id: "" },
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticleDraftTitle: (state, action) => {
      state.articleDraft.title = action.payload;
    },
    setArticleDraftContent: (state, action) => {
      state.articleDraft.content = action.payload;
    },
    clearArticleDraft: (state) => {
      state.articleDraft = { title: "", content: {} };
    },

    setEditingDraftTitle: (state, action) => {
      state.editingDraft.title = action.payload;
    },
    setEditingDraftContent: (state, action) => {
      state.editingDraft.content = action.payload;
    },
    setEditingDraftId: (state, action) => {
      state.editingDraft.id = action.payload;
    },
    clearEditingDraft: (state) => {
      state.editingDraft = { title: "", content: {} };
    },
  },
});

// Export actions
export const {
  setArticleDraftContent,
  setArticleDraftTitle,
  clearArticleDraft,

  setEditingDraftTitle,
  setEditingDraftContent,
  setEditingDraftId,
  clearEditingDraft,
} = articleSlice.actions;

// Export reducer
export const articleReducer = articleSlice.reducer;
