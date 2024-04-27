import { FormPayload } from "../models/formSchema";
import { Guest } from "../domain/guest";
import { AppLoadContext } from "@remix-run/cloudflare";

export interface IGuestRepository {
  rsvp(updates: FormPayload, context: AppLoadContext): Promise<{ id: string }>;

  rsvpUpdate(
    id: string,
    updates: FormPayload,
    context: AppLoadContext,
  ): Promise<{ id: string }>;

  getGuest(id: string, context: AppLoadContext): Promise<Guest | null>;
}
