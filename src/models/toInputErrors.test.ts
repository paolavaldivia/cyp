import { ZodError } from "zod";
import { toInputErrors } from "./toInputErrors";

describe("toInputErrors", () => {
  it("transforms a ZodError into an object with error messages", () => {
    const zodError = new ZodError([
      {
        code: "invalid_string",
        message: "Invalid string",
        path: ["first"],
        validation: "regex",
      },
      {
        code: "invalid_string",
        message: "Invalid email",
        path: ["email"],
        validation: "email",
      },
    ]);

    const expectedErrors = {
      first: "Campo inválido",
      email: "Email inválido",
    };

    expect(toInputErrors(zodError)).toEqual(expectedErrors);
  });

  it("handles too_small error code", () => {
    const zodError = new ZodError([
      {
        code: "too_small",
        message: "Too small",
        path: ["first"],
        minimum: 1,
        inclusive: true,
        type: "string",
      },
    ]);

    const expectedErrors = {
      first: "Campo requerido",
    };

    expect(toInputErrors(zodError)).toEqual(expectedErrors);
  });

  it("handles invalid_enum_value error code", () => {
    const zodError = new ZodError([
      {
        code: "invalid_enum_value",
        message: "Invalid enum value",
        path: ["attend"],
        received: "maybe",
        options: ["yes", "no"],
      },
    ]);

    const expectedErrors = {
      attend: "Selecciona una opción válida",
    };

    expect(toInputErrors(zodError)).toEqual(expectedErrors);
  });

  it("handles unknown error codes", () => {
    const zodError = new ZodError([
      {
        code: "custom",
        message: "Unknown error",
        path: ["first"],
      },
    ]);

    const expectedErrors = {
      first: "Unknown error",
    };

    expect(toInputErrors(zodError)).toEqual(expectedErrors);
  });
});
