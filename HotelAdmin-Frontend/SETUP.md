# Hotel Admin Frontend - Setup Guide

## Quick Start

### Installation

```bash
cd HotelAdmin-Frontend
npm install
```

### Environment Setup

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

### Development

```bash
npm run dev
```

The app will run on `http://localhost:5174` (or next available port)

### Build

```bash
npm run build
```

## Features

### 1. Dashboard
Quick overview of:
- Total bookings
- Total earnings
- Total rooms
- Occupancy rate
- Active employees
- Pending reviews
- Recent bookings
- Quick statistics

### 2. Hotel Data
Edit your hotel's:
- Name
- Description
- Address (Address, City, Country)
- Contact Info (Phone, Email, Website)
- Rating

### 3. Rooms
- View all rooms in the hotel
- Add new rooms
- Edit room details
- Track room status (Available, Booked, Maintenance)
- Set room pricing

### 4. Employees
- Add new employees
- Manage hotel staff
- Assign departments
- Track employee status
- View employee contact info

### 5. Bookings
- View all hotel bookings
- Sort by status (Pending, Confirmed, Completed)
- See guest information
- Track check-in/check-out dates
- Monitor booking prices

### 6. Earnings
- Track total earnings
- View pending and completed payments
- Detailed earnings breakdown
- See earnings by booking
- Export reports

### 7. Reviews
- View all guest reviews
- See rating distribution
- Read guest comments
- Track average rating
- Respond to reviews

### 8. Chat
- Communicate with guests
- View conversation list
- Real-time messaging
- Track message read status

## Architecture

### Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   └── TopBar.tsx          # Header with search
│   └── ui/
│       ├── Button.tsx          # Reusable button
│       ├── Card.tsx            # Card container
│       ├── Input.tsx           # Text input
│       ├── Select.tsx          # Dropdown
│       ├── Modal.tsx           # Dialog
│       └── Badge.tsx           # Status badge
├── pages/
│   ├── LoginPage.tsx           # Login screen
│   ├── DashboardPage.tsx       # Dashboard
│   ├── HotelPage.tsx           # Hotel info
│   ├── RoomsPage.tsx           # Room management
│   ├── EmployeesPage.tsx       # Staff management
│   ├── BookingsPage.tsx        # Booking view
│   ├── EarningsPage.tsx        # Financial
│   ├── ReviewsPage.tsx         # Reviews
│   └── ChatPage.tsx            # Messaging
├── hooks/
│   └── useAuth.ts              # Auth hook
├── contexts/
│   └── AuthContext.tsx         # Auth context
├── services/
│   └── api.ts                  # API client
├── types/
│   └── index.ts                # TypeScript types
├── routes/
│   └── AppRoutes.tsx           # Route config
└── utils/
    └── (future utilities)
```

### State Management

- Uses React Context API for authentication
- Local state with useState for page-level data
- localStorage for token persistence

### Styling

- Tailwind CSS for all styling
- Dark theme optimized for ease of use
- Responsive design (mobile, tablet, desktop)
- Custom color scheme for brand consistency

## Authentication Flow

1. User navigates to `http://localhost:5174`
2. Presented with login form
3. Enters email and password
4. API validates credentials
5. If hotelAdmin role: Redirected to dashboard
6. Token stored in localStorage
7. All API calls include auth token
8. On logout: Clear token and redirect to login

## API Integration

### Base URL
`http://localhost:3000/api/v1` (configurable in .env)

### Request Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Example Endpoints

```typescript
// Login
POST /users/login
Body: { email, password }
Response: { data: { token, user, role }, success: true }

// Get Hotel Data
GET /hotels/my-hotel
Headers: { Authorization: Bearer {token} }

// Get Bookings
GET /hotels/{hotelId}/bookings
Headers: { Authorization: Bearer {token} }

// Create Employee
POST /hotels/{hotelId}/employees
Body: { name, email, position, department }
```

## Protected Routes

All routes are protected with token verification:

```typescript
// Login page (public)
GET /

// Protected pages (require valid token)
GET /dashboard
GET /hotel
GET /rooms
GET /employees
GET /bookings
GET /earnings
GET /reviews
GET /chat
```

## Dark Mode Details

### Color Palette

**Backgrounds:**
- Primary: `#0f172a` (Slate 900)
- Secondary: `#1f2937` (Slate 800)
- Tertiary: `#111827` (Slate 900)

**Text:**
- Primary: White (`#ffffff`)
- Secondary: `#e2e8f0` (Slate 100)
- Tertiary: `#9ca3af` (Slate 400)

**Accents:**
- Primary Action: `#4f46e5` (Indigo)
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)
- Warning: `#f59e0b` (Amber)

### Tailwind Extensions

Custom colors defined in `tailwind.config.js`:
- Extended dark color palette
- Indigo primary color
- Green/Red/Yellow status colors

## Component Usage

### Button
```tsx
<Button 
  variant="primary" 
  size="md" 
  onClick={handleClick}
>
  Click Me
</Button>
```

### Input
```tsx
<Input 
  label="Email"
  type="email"
  placeholder="admin@hotel.com"
  value={value}
  onChange={handleChange}
/>
```

### Card
```tsx
<Card hover>
  <p>Card content</p>
</Card>
```

### Modal
```tsx
<Modal
  isOpen={isOpen}
  title="Confirm"
  onClose={handleClose}
  onConfirm={handleConfirm}
>
  Confirm message
</Modal>
```

## Performance Optimization

- Code splitting by route
- Lazy loading components
- Memoized components
- Optimized re-renders
- Compressed assets

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Tools

- VS Code recommended
- ESLint for code quality
- TypeScript for type safety
- Tailwind CSS IntelliSense extension

## Deployment

### Build Optimization
```bash
npm run build
```

Creates optimized production build in `dist/`

### Docker Deploy
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 5174
CMD ["npm", "run", "preview"]
```

### Environment Variables

**Development:**
```env
VITE_API_URL=http://localhost:3000/api/v1
```

**Production:**
```env
VITE_API_URL=https://api.ghumgham.com/v1
```

## Common Issues & Solutions

### Issue: "Access denied: You do not have admin privileges"
- You're trying to login as a regular user
- Contact super admin to upgrade account

### Issue: "Token expired"
- Session has timed out
- Login again

### Issue: CORS errors
- Backend CORS not configured
- Check backend allowed origins

### Issue: Blank page after login
- Check browser console for errors
- Verify API_URL environment variable
- Check network tab for failed requests

## Documentation

- [Role-Based Auth Setup](../ROLE_BASED_AUTH_SETUP.md)
- [Backend API Documentation](../Travallee-Backend/README.md)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)

## Support

For issues or questions:
1. Check the documentation
2. Review GitHub issues
3. Contact development team

## License

MIT License - See LICENSE file for details
