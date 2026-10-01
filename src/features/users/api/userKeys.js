// src/features/users/api/userKeys.js

export const userKeys = {
  all: ["users"],

  profile: () => [...userKeys.all, "profile"],

  profileDetails: () => [
    ...userKeys.profile(),
    "details",
  ],
};

export default userKeys;