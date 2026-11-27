window.EMS_CONFIG = {
  USE_MOCK: true,
  API_BASE_URL: "/api/v1",
  MOCK_BASE_PATH: "../../data",
  ENDPOINTS: {
    users: "/users",
    events: "/events",
    registrations: "/student/registrations",
    waitlist: "/student/waitlist",
    attendance: "/student/attendance",
    certificates: "/student/certificates",
    gallery: "/gallery",
    notifications: "/notifications"
  },
  MOCK_FILES: {
    users: "users.json",
    events: "events.json",
    registrations: "registrations.json",
    waitlist: "waitlist.json",
    attendance: "attendance.json",
    certificates: "certificates.json",
    gallery: "gallery.json",
    notifications: "notifications.json"
  }
};
