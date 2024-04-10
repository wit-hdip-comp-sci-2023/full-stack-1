export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  candidates: {
    _model: "Candidate",
    lisa: {
      firstName: "Lisa",
      lastName: "Simpson",
      office: "President",
    },
    maggie: {
      firstName: "Maggie",
      lastName: "Simpson",
      office: "President",
    },
    ned: {
      firstName: "Ned",
      lastName: "Flanders",
      office: "President",
    },
  },
  donations: {
    _model: "Donation",
    one: {
      amount: 40,
      method: "paypal",
      donor: "->users.bart",
      candidate: "->candidates.lisa",
      lat: "52.161290",
      lng: "-7.51540",
    },
    two: {
      amount: 90,
      method: "direct",
      donor: "->users.marge",
      candidate: "->candidates.lisa",
      lat: "52.261290",
      lng: "-7.231540",
    },
    three: {
      amount: 430,
      method: "paypal",
      donor: "->users.homer",
      candidate: "->candidates.ned",
      lat: "52.361290",
      lng: "-7.241540",
    },
  },
};
