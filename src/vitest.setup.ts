import { vi } from "vitest";

export const fetchMock = vi.fn();
globalThis.fetch = fetchMock;
