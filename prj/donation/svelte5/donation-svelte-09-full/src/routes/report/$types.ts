import type { Donation } from "$lib/services/donation-types";
import type { Candidate } from "$lib/services/donation-types";

export interface PageData {
  donations: Donation[];
  candidates: Candidate[];
}
