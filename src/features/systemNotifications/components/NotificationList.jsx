import NotificationCard from "./NotificationCard";

export default function NotificationList({
  notifications,
  onNotificationClick,
}) {
  if (!notifications?.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      {notifications.map(
        (notification) => (
          <NotificationCard
            key={
              notification.uuid ||
              notification.id
            }
            notification={notification}
            onClick={
              onNotificationClick
            }
          />
        )
      )}
    </div>
  );
}