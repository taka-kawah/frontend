import { beforeEach, describe, expect, test } from "vitest";
import { z } from "zod";
import { renderHook, waitFor } from "@testing-library/react";
import { fetchMock } from "../../vitest.setup";

describe("useHttpGet", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  test("正常系: fetch成功、データ型一致", async () => {
    beforeEach(() => {
      fetchMock.mockReset();
    });

    const schema = z.object({ id: z.number(), name: z.string() }).strict();
    type User = z.infer<typeof schema>;
    const data: User = { id: 1, name: "taro" };

    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => data });
    const { useHttpGet } = await import("./fetch_hooks");
    const { result } = renderHook(() =>
      useHttpGet("example.com", "/user", schema)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(data);
    expect(result.current.error).toBeNull();
  });

  test("異常系: fetch成功、データ型不一致", async () => {
    const schema = z.object({ id: z.number(), name: z.string() }).strict();
    const data = { id: 1, name: "taro", age: "5" };

    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => data });
    const { useHttpGet } = await import("./fetch_hooks");
    const { result } = renderHook(() =>
      useHttpGet("example.com", "/user", schema)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).not.toBeNull();
    expect(result.current.error!.name).toBe("ZodError");
  });

  test("異常系: fetch失敗", async () => {
    const schema = z.object({}).strict();
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "internal server error" }),
    });

    const { useHttpGet } = await import("./fetch_hooks");
    const { result } = renderHook(() =>
      useHttpGet("example.com", "/user", schema)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).not.toBeNull();
    expect(result.current.error!.message).toContain("HTTP error! status: 500");
  });
});

describe("useHttpPost", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });
  const payload = {};

  test("正常系: fetch成功、データ型一致", async () => {
    const schema = z.object({ id: z.number(), name: z.string() }).strict();
    type User = z.infer<typeof schema>;
    const data: User = { id: 1, name: "taro" };

    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => data });
    const { useHttpPost } = await import("./fetch_hooks");
    const { result } = renderHook(() =>
      useHttpPost("example.com", "/user", payload, schema)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(data);
    expect(result.current.error).toBeNull();
  });

  test("正常系: fetch成功、レスポンスにAuthorizationヘッダあり", async () => {
    const schema = z.object({ id: z.number(), name: z.string() }).strict();
    type User = z.infer<typeof schema>;
    const data: User = { id: 1, name: "taro" };

    const header = new Headers({ Authorization: "Bearer test-token" });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
      headers: header,
    });

    const { useHttpPost } = await import("./fetch_hooks");
    const { result } = renderHook(() =>
      useHttpPost("example.com", "/user", payload, schema)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(data);
    expect(result.current.error).toBeNull();
    expect(result.current.resHeader).not.toBeNull();
    expect(result.current.resHeader?.get("Authorization")).toBe(
      "Bearer test-token"
    );
  });

  test("異常系: fetch成功、データ型不一致", async () => {
    const schema = z.object({ id: z.number(), name: z.string() }).strict();
    const data = { id: 1, name: "taro", age: "5" };

    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => data });
    const { useHttpPost } = await import("./fetch_hooks");
    const { result } = renderHook(() =>
      useHttpPost("example.com", "/user", payload, schema)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).not.toBeNull();
    expect(result.current.error!.name).toBe("ZodError");
  });

  test("異常系: fetch失敗", async () => {
    const schema = z.object({}).strict();
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "internal server error" }),
    });

    const { useHttpPost } = await import("./fetch_hooks");
    const { result } = renderHook(() =>
      useHttpPost("example.com", "/user", payload, schema)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).not.toBeNull();
    expect(result.current.error!.message).toContain("HTTP error! status: 500");
  });
});
