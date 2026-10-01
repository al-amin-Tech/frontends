export const notificationKeys = {
  all: ["notifications"],

  lists: () => [
    ...notificationKeys.all,
    "list",
  ],

  list: (page, limit) => [
    ...notificationKeys.lists(),
    {
      page,
      limit,
    },
  ],

  unreadCount: () => [
    ...notificationKeys.all,
    "unread-count",
  ],
};

export default notificationKeys;