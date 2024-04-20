
export const rsvp = async (updates: any) => {
    console.log(updates);
    // add artificial delay
    await new Promise(resolve => setTimeout(resolve, 6000));
    return {
        id: 1,
    };
}

export const getGuest = async (id: string) => {
    return {
        id,
        name: "Céline",
    };
}