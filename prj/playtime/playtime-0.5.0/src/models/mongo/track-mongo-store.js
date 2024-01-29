import { Track } from "./track.js";

export const trackMongoStore = {
  async getTracksByPlaylistId(id) {
    const tracks = await Track.find({ playlistid: id }).lean();
    return tracks;
  },
};
