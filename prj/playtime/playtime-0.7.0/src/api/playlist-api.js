import Boom from "@hapi/boom";
import { PlaylistSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const playlistApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlists = await db.playlistStore.getAllPlaylists();
        return playlists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const playlist = await db.playlistStore.getPlaylistById(request.params.id);
        if (!playlist) {
          return Boom.notFound("No Playlist with this id");
        }
        return playlist;
      } catch (err) {
        return Boom.serverUnavailable("No Playlist with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlist = request.payload;
        const newPlaylist = await db.playlistStore.addPlaylist(playlist);
        if (newPlaylist) {
          return h.response(newPlaylist).code(201);
        }
        return Boom.badImplementation("error creating playlist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlist = await db.playlistStore.getPlaylistById(request.params.id);
        if (!playlist) {
          return Boom.notFound("No Playlist with this id");
        }
        await db.playlistStore.deletePlaylistById(playlist._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Playlist with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.playlistStore.deleteAllPlaylists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
