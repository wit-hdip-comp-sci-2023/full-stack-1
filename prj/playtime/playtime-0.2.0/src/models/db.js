import { userMemStore } from "./mem/user-mem-store.js";
import { playlistMemStore } from "./mem/playlist-mem-store.js";
import { trackMemStore } from "./mem/track-mem-store.js";

export const db = {
  userStore: null,
  playlistStore: null,
  trackStore: null,

  init() {
    this.userStore = userMemStore;
    this.playlistStore = playlistMemStore;
    this.trackStore = trackMemStore;
  },
};
