import { db } from "../models/db.js";

export const donationsController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const candidates = await db.candidateStore.find();
      return h.view("donate", {
        title: "Make a Donation",
        user: loggedInUser,
        candidates: candidates,
      });
    },
  },
  donate: {
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const donationPayload = request.payload;
        const donation = {
          amount: donationPayload.amount,
          method: donationPayload.method,
          donor: loggedInUser._id,
          candidate: donationPayload.candidate,
          lat: donationPayload.lat,
          lng: donationPayload.lng,
        };
        await db.donationStore.add(donation);

        return h.redirect("/donate");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  report: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const donations = await db.donationStore.find();
      return h.view("report", {
        title: "Report",
        user: loggedInUser,
        donations: donations,
      });
    },
  },
};
