import {FormPayload} from "~/routes/rsvp";

export interface Guest {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    attend: boolean;
}

export const GuestFromFormData = (data: FormPayload) : Guest => {
    return {
        name: data.first,
        lastName: data.last,
        email: data.email,
        phone: data.phone,
        attend: data.attend === "yes",
    }
}

