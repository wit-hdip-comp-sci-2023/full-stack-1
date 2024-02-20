// eslint-disable-next-line import/no-unresolved
import { JSONFilePreset } from "lowdb/node";

export const db = await JSONFilePreset("src/models/json/db.json", {
  users: [],
  playlists: [],
  tracks: [],
});
