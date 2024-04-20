export interface Guest {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    attend: boolean;
}

export const GuestFromFormData = (data: {[p: string]: FormDataEntryValue}) : Guest => {
    return {
        name: data["first"] as string,
        lastName: data["last"] as string,
        email: data["email"] as string,
        phone: data["rsvp"] as string,
        attend: data["attend"] === "yes",
    }
}

