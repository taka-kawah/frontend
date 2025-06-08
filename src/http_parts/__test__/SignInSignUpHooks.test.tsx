import bcrypt from "bcryptjs";
import { beforeEach, describe, expect, test, vi } from "vitest";
import * as HttpHooks from "../util/fetch_hooks";
import { renderHook } from "@testing-library/react";
import { useSendEmailAndPassword } from "../SignInSignUpHooks";
import { act } from "react";

describe("useSendEmailAndPassword", () => {
  const mockPostTrigger = vi.fn();
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
  const hashSyncSpy = vi.spyOn(bcrypt, "hashSync");

  const mock = {
    domain: "auth.example.com",
    email: "test@test.com",
    password: "password",
    hashedPassword: "hashedPassword",
  };

  beforeEach(() => {
    vi.resetAllMocks();
    hashSyncSpy.mockReturnValue(mock.hashedPassword);
  });

  test("正常系: トークンがローカルストレージにセットされる", async () => {
    const header = new Headers({ Authorization: "Bearer test token" });
    vi.spyOn(HttpHooks, "useHttpPostTrigger").mockReturnValue({
      postTrigger: mockPostTrigger,
      data: null,
      error: null,
      loading: false,
      resHeader: header,
    });

    const { result } = renderHook(() => useSendEmailAndPassword());
    await act(async () => {
      await result.current.sendEmailAndPassword(mock.email, mock.password);
    });

    expect(hashSyncSpy).toHaveBeenCalledWith(mock.password, 10);
    expect(mockPostTrigger).toHaveBeenCalledWith(
      mock.domain,
      "/signin",
      {
        MailAddress: mock.email,
        HashedPassword: mock.hashedPassword,
      },
      expect.anything()
    );
    expect(setItemSpy).toHaveBeenCalledWith("authToken", "Bearer test token");
  });

  test("異常系: postTriggerからエラーが返ってきたときトークンがセットされない(トークンが返って来た時)", async () => {
    const header = new Headers({ Authorization: "Bearer test token" });
    vi.spyOn(HttpHooks, "useHttpPostTrigger").mockReturnValue({
      postTrigger: mockPostTrigger,
      data: null,
      error: new Error("test error"),
      loading: false,
      resHeader: header,
    });

    const { result } = renderHook(() => useSendEmailAndPassword());
    await act(async () => {
      await result.current.sendEmailAndPassword(mock.email, mock.password);
    });

    expect(hashSyncSpy).toHaveBeenCalledWith(mock.password, 10);
    expect(mockPostTrigger).toHaveBeenCalledWith(
      mock.domain,
      "/signin",
      {
        MailAddress: mock.email,
        HashedPassword: mock.hashedPassword,
      },
      expect.anything()
    );
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toBe("test error");
    expect(setItemSpy).not.toHaveBeenCalled();
  });

  test("異常系: postTriggerからエラーが返ってきたときトークンがセットされない(トークンが返って来ない時)", async () => {
    vi.spyOn(HttpHooks, "useHttpPostTrigger").mockReturnValue({
      postTrigger: mockPostTrigger,
      data: null,
      error: new Error("test error"),
      loading: false,
      resHeader: null,
    });

    const { result } = renderHook(() => useSendEmailAndPassword());
    await act(async () => {
      await result.current.sendEmailAndPassword(mock.email, mock.password);
    });

    expect(hashSyncSpy).toHaveBeenCalledWith(mock.password, 10);
    expect(mockPostTrigger).toHaveBeenCalledWith(
      mock.domain,
      "/signin",
      {
        MailAddress: mock.email,
        HashedPassword: mock.hashedPassword,
      },
      expect.anything()
    );
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toBe("test error");
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
