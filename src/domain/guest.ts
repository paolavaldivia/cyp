export interface Guest {
  name: string;
  lastName: string;
  email?: string;
  phone: string;
  attend: boolean;
  plusOne: boolean;
  plusOneName?: string;
  plusOneLastName?: string;
  kids: number;
  comments?: string;
}

export interface GuestWithId extends Guest {
  id: string;
}
