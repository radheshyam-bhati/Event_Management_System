# Campus Event Management System (EMS)

A comprehensive, role-based web application for managing campus events, clubs, budgets, permissions, attendance, feedback, certificates, and registrations.

---

## 📁 Project Structure

```text
Event_Management_System/
│
├── index.html
├── login.html
├── register.html
│
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   ├── events/
│   │   ├── posters/
│   │   └── gallery/
│   ├── icons/
│   └── fonts/
│
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── main.css
│   ├── responsive.css
│   │
│   ├── components/
│   │   ├── navbar.css
│   │   ├── sidebar.css
│   │   ├── buttons.css
│   │   ├── forms.css
│   │   ├── cards.css
│   │   ├── tables.css
│   │   ├── modal.css
│   │   ├── toast.css
│   │   ├── badges.css
│   │   ├── notifications.css
│   │   └── qr.css
│   │
│   └── pages/
│       ├── auth.css
│       ├── admin.css
│       ├── president.css
│       ├── student.css
│       ├── events.css
│       ├── budget.css
│       ├── permissions.css
│       ├── registrations.css
│       ├── attendance.css
│       ├── reports.css
│       ├── profile.css
│       ├── certificates.css
│       ├── gallery.css
│       └── audit-log.css
│
├── js/
│   ├── app.js
│   ├── config.js
│   │
│   ├── auth/
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── logout.js
│   │   └── session.js
│   │
│   ├── components/
│   │   ├── navbar.js
│   │   ├── sidebar.js
│   │   ├── dashboard-layout.js
│   │   ├── notifications.js
│   │   ├── profile-menu.js
│   │   ├── modal.js
│   │   ├── toast.js
│   │   ├── loading.js
│   │   ├── empty-state.js
│   │   ├── error-state.js
│   │   ├── qr-code.js
│   │   └── qr-scanner.js
│   │
│   ├── admin/
│   │   ├── dashboard.js
│   │   ├── students.js
│   │   ├── presidents.js
│   │   ├── event-assignment.js
│   │   ├── conflicts.js
│   │   ├── events.js
│   │   ├── reports.js
│   │   └── audit-log.js
│   │
│   ├── president/
│   │   ├── dashboard.js
│   │   ├── create-event.js
│   │   ├── edit-event.js
│   │   ├── poster-upload.js
│   │   ├── budget.js
│   │   ├── permissions.js
│   │   ├── co-organizers.js
│   │   ├── registrations.js
│   │   ├── waitlist.js
│   │   ├── attendance.js
│   │   ├── event-status.js
│   │   ├── expenses.js
│   │   └── statistics.js
│   │
│   ├── student/
│   │   ├── dashboard.js
│   │   ├── events.js
│   │   ├── event-details.js
│   │   ├── registration.js
│   │   ├── waitlist.js
│   │   ├── my-events.js
│   │   ├── attendance-history.js
│   │   ├── feedback.js
│   │   ├── certificates.js
│   │   └── gallery.js
│   │
│   ├── shared/
│   │   ├── profile.js
│   │   ├── settings.js
│   │   └── notifications.js
│   │
│   └── utils/
│       ├── storage.js
│       ├── validation.js
│       ├── formatters.js
│       ├── permissions.js
│       ├── filters.js
│       └── helpers.js
│
├── pages/
│   ├── admin/
│   │   ├── dashboard.html
│   │   ├── students.html
│   │   ├── presidents.html
│   │   ├── event-assignment.html
│   │   ├── conflicts.html
│   │   ├── events.html
│   │   ├── reports.html
│   │   └── audit-log.html
│   │
│   ├── president/
│   │   ├── dashboard.html
│   │   ├── create-event.html
│   │   ├── edit-event.html
│   │   ├── budget.html
│   │   ├── permissions.html
│   │   ├── registrations.html
│   │   ├── waitlist.html
│   │   ├── attendance.html
│   │   ├── expenses.html
│   │   └── statistics.html
│   │
│   ├── student/
│   │   ├── dashboard.html
│   │   ├── events.html
│   │   ├── event-details.html
│   │   ├── my-events.html
│   │   ├── attendance-history.html
│   │   ├── feedback.html
│   │   ├── certificates.html
│   │   └── gallery.html
│   │
│   └── shared/
│       ├── notifications.html
│       ├── profile.html
│       └── settings.html
│
├── data/
│   ├── users.json
│   ├── events.json
│   ├── budgets.json
│   ├── permissions.json
│   ├── registrations.json
│   ├── waitlist.json
│   ├── attendance.json
│   ├── notifications.json
│   ├── certificates.json
│   ├── gallery.json
│   └── audit-log.json
│
└── README.md
```

---

## 🚀 Key Modules & Roles

### 1. **Administrator (Admin)**
- **Dashboard**: High-level platform statistics, active events, registered students, budget allocations.
- **Student & President Management**: View, approve, edit, and deactivate user accounts.
- **Event Approvals & Conflicts**: Resolve scheduling and venue clashes, review permission requests.
- **Reports & Audit Logs**: Detailed platform analytics, exportable reports, and tamper-evident audit logs.

### 2. **Club / Event President**
- **Event Lifecycle**: Create, edit, publish, and track events with poster uploads and custom schedules.
- **Budget & Expenses**: Submit budgets, request approvals, and log real-time event expenses.
- **Permission Requests**: Request venue, audio/visual, and administrative permissions.
- **Registrations & Waitlists**: Manage participant lists, accept/reject entries, handle automated waitlists.
- **Attendance & Statistics**: QR-code check-ins, attendance verification, and analytics.

### 3. **Student / Participant**
- **Discover Events**: Browse upcoming, ongoing, and past events with search and category filters.
- **Registration & Tickets**: One-click RSVP/Registration, QR ticket generation, waitlist management.
- **My Events & Attendance History**: Track registered events and verified check-in history.
- **Feedback & Certificates**: Submit post-event feedback and download verifiable certificates.
- **Gallery**: View and share memories and photos from past events.

---

## 🛠️ Getting Started

1. Open `index.html` in any modern web browser or serve with a local web server:
   ```bash
   # Using Python 3 HTTP server:
   python3 -m http.server 8000
   ```
2. Navigate to `http://localhost:8000/` in your browser.
3. Access login via `login.html` or registration via `register.html`.
