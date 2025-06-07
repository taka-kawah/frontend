import { useEffect, useState } from "react";
import { ZodSchema } from "zod";

async function httpGet(domain: string, path: string): Promise<Response> {
  console.log(`GET from: https://${domain}${path}`);
  const response = await fetch(`https://${domain}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.error("HTTP error response:", response);
    throw new Error(`HTTP error! status: ${response.status} ${response.body}`);
  }
  console.log("HTTP OK response:", response);
  return response;
}

export function useHttpGet<T>(
  domain: string,
  path: string,
  schema: ZodSchema
): { data: T | null; error: Error | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!domain) return;
    httpGet(domain, path)
      .then((response) => response.json())
      .then((json) => {
        console.log("Fetched JSON:", json);
        const result = schema.safeParse(json);
        if (!result.success) {
          throw result.error;
        }
        setData(result.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [domain, path]);

  return { data, error, loading };
}

async function httpPost(domain: string, path: string, payload: any) {
  console.log(`POST to: https://${domain}${path}`);
  const response = await fetch(`https://${domain}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    console.error("HTTP error response:", response);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  console.log("HTTP OK response:", response);
  return response;
}

export function useHttpPost<T>(
  domain: string,
  path: string,
  payload: any,
  schema: ZodSchema<T>
): { data: T | null; error: Error | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!domain) return;
    httpPost(domain, path, payload)
      .then((response) => response.json())
      .then((json) => {
        const result = schema.safeParse(json);
        if (!result.success) {
          throw result.error;
        }
        setData(result.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [domain, path, payload]);

  return { data, error, loading };
}
