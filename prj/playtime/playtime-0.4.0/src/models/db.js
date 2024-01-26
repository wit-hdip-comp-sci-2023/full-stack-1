// import { userMemStore } from "./mem/user-mem-store.ts";
// import { playlistMemStore } from "./mem/playlist-mem-store.ts";
// import { trackMemStore } from "./mem/track-mem-store.ts";

import { userJsonStore } from "./json/user-json-store.js";
import { playlistJsonStore } from "./json/playlist-json-store.js";
import { trackJsonStore } from "./json/track-json-store.js";

export const db = {
  userStore: null,
  playlistStore: null,
  trackStore: null,

  init() {
    this.userStore = userJsonStore;
    this.playlistStore = playlistJsonStore;
    this.trackStore = trackJsonStore;
  },
};
