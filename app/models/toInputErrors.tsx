import { ZodError } from "zod";

const errorMessages: Record<string, string> = {
  too_small: "Campo requerido",
  invalid_email: "Email inválido",
  invalid_string: "Campo inválido",
  invalid_enum_value: "Selecciona una opción válida",
  nullish: "Campo requerido",
};

const getErrorMessage = (issue: ZodError["issues"][0]) => {
  if (issue.code == "invalid_string" && issue.message.includes("email"))
    return errorMessages["invalid_email"];
  return errorMessages[issue.code];
};

export function toInputErrors(zodError: unknown) {
  if (!(zodError && typeof zodError == "object" && "issues" in zodError)) {
    return {};
  }
  return (zodError.issues as ZodError["issues"]).reduce(
    (acc, issue) => {
      issue.path.forEach((path) => {
        const message = getErrorMessage(issue) || issue.message;
        if (!acc[path]) acc[path] = message;
        else acc[path] += " " + message;
      });
      return acc;
    },
    {} as Record<string, string>,
  );
}
