export interface Guest {
  name: string;
  lastName: string;
  email?: string;
  phone: string;
  attend: boolean;
  dish?: string;
  plusOne: boolean;
  plusOneName?: string;
  plusOneLastName?: string;
  plusOneDish?: string;
  kids: number;
  comments?: string;
}
