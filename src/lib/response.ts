import { WebResponse } from "@/model/web.model";
import { NextResponse } from "next/server";

export function webResponse<T>(
  data: T,
  message: string,
  errors: Record<string, string[]> = {},
  status: number = 200,
): NextResponse {
  const response: WebResponse<T> = {
    message,
    data: data !== null ? data : undefined, // Include data if it's not null
    errors: Object.keys(errors).length > 0 ? errors : undefined, // Include errors only if there are any
  };
  return NextResponse.json(response, { status });
}
