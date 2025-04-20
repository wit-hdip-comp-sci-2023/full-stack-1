export interface Donation {
  _id: string;
  amount: number;
  method: string;
  candidate: string;
  donor: string;
  lat: number;
  lng: number;
  date: Date;
}

export interface Candidate {
  _id: string;
  firstName: string;
  lastName: string;
  office: string;
}
