import { writable } from "svelte/store";
import type { Donation, Session } from "$lib/types/donation-types";

export const currentSession = writable<Session>();
export const subTitle = writable<string>();
export const latestDonation = writable<Donation>();
