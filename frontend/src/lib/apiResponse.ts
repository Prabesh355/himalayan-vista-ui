export async function readJsonResponse<T>(response: Response, endpoint: string): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const bodyText = await response.text();

  if (!bodyText) {
    return {} as T;
  }

  if (contentType.includes("application/json")) {
    return JSON.parse(bodyText) as T;
  }

  const preview = bodyText.trim().slice(0, 80);
  throw new Error(
    `API returned ${contentType || "a non-JSON response"} from ${endpoint}. Check VITE_API_BASE_URL and backend deployment. Response started with: ${preview}`,
  );
}
