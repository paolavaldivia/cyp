import { formSchema } from "./formSchema";

describe("formSchema", () => {
  it("validates a valid form payload", () => {
    const validPayload = {
      first: "John",
      last: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      attend: "yes",
      plusOne: true,
      plusOneName: "Jane",
      plusOneLastName: "Doe",
      kids: 2,
      comments: "No allergies",
    };
    expect(() => formSchema.parse(validPayload)).not.toThrow();
  });

  it("rejects an invalid form payload", () => {
    const invalidPayload = {
      first: "John",
      last: "Doe",
      email: "invalid email",
      phone: "1234567890",
      attend: "yes",
      plusOne: true,
      plusOneName: "Jane",
      plusOneLastName: "Doe",
      kids: 2,
      comments: "No allergies",
    };

    expect(() => formSchema.parse(invalidPayload)).toThrow();
  });
});
