import { useEffect, useState } from "react";
import { ZodSchema } from "zod";
import { set } from "zod/v4";

export function useHttpGet<T>(
  domain: string,
  path: string,
  schema: ZodSchema<T>,
  authToken?: string
) {
  const [ok, setOk] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [resHeader, setResHeader] = useState<Headers | null>(null);

  useEffect(() => {
    if (!domain) return;
    httpGet(domain, path, authToken)
      .then((response) => {
        setOk(response.ok);
        setResHeader(response.headers);
        return response.json();
      })
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
  }, [domain, path]);

  return { ok, data, error, loading, resHeader };
}

export function useHttpPost<T>(
  domain: string,
  path: string,
  payload: any,
  schema: ZodSchema<T>,
  authToken?: string
) {
  const [ok, setOk] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [resHeader, setResHeader] = useState<Headers | null>(null);

  useEffect(() => {
    if (!domain) return;
    httpPost(domain, path, payload, authToken)
      .then((response) => {
        setOk(response.ok);
        setResHeader(response.headers);
        return response.json();
      })
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

  return { ok, data, error, loading, resHeader };
}

export function useHttpGetTrigger<T>() {
  const [ok, setOk] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resHeader, setResHeader] = useState<Headers | null>(null);

  const getTrigger = async (
    domain: string,
    path: string,
    schema: ZodSchema<T>,
    authToken?: string
  ) => {
    try {
      setLoading(true);
      const response = await httpGet(domain, path, authToken);
      setOk(response.ok);
      setResHeader(response.headers);
      const json = await response.json();
      const result = schema.safeParse(json);
      if (!result.success) {
        throw result.error;
      }
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { getTrigger, ok, data, error, loading, resHeader };
}

export function useHttpPostTrigger<T>() {
  const [ok, setOk] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resHeader, setResHeader] = useState<Headers | null>(null);

  const postTrigger = async (
    domain: string,
    path: string,
    payload: any,
    schema: ZodSchema<T>,
    authToken?: string
  ) => {
    try {
      setLoading(true);
      const response = await httpPost(domain, path, payload, authToken);
      setOk(response.ok);
      setResHeader(response.headers);
      const json = await response.json();
      const result = schema.safeParse(json);
      if (!result.success) {
        throw result.error;
      }
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { postTrigger, ok, data, error, loading, resHeader };
}

async function httpGet(
  domain: string,
  path: string,
  authToken?: string
): Promise<Response> {
  console.log(`GET from: https://${domain}${path}`);
  const response = await fetch(`https://${domain}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken ? `Bearer ${authToken}` : "",
    },
  });
  if (!response.ok) {
    console.error("HTTP error response:", response);
    throw new Error(`HTTP error! status: ${response.status} ${response.body}`);
  }
  console.log("HTTP OK response:", response);
  return response;
}

async function httpPost(
  domain: string,
  path: string,
  payload: any,
  authToken?: string
) {
  console.log(`POST to: https://${domain}${path}`);
  const response = await fetch(`https://${domain}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken ? `Bearer ${authToken}` : "",
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
