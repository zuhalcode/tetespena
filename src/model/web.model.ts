export type WebResponse<T> = {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
};
