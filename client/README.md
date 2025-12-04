# HMS React Frontend - Quick Start Guide

## 🚀 Quick Start (3 Steps)

### 1. Start Backend
```bash
cd d:/hms/HMS-DEV/Server
npm start
```
Backend runs at: `http://localhost:3000`

### 2. Start Frontend
```bash
cd d:/hms/HMS-DEV/client
npm run dev
```
Frontend runs at: `http://localhost:5173`

### 3. Login
- URL: `http://localhost:5173/login`
- **Admin**: `admin@karurgastro.com` / `Admin@123`
- **Doctor**: `doctor@karurgastro.com` / `Doctor@123`

---

## 📁 Project Structure

```
HMS-DEV/
├── Server/                  # Node.js Backend
│   ├── routes/             # API routes
│   ├── models/             # MongoDB models
│   └── Server.js           # Entry point
│
└── client/                  # React Frontend
    ├── src/
    │   ├── pages/          # All page components
    │   │   ├── auth/       # Login page
    │   │   ├── admin/      # Admin module
    │   │   ├── doctor/     # Doctor module
    │   │   ├── pharmacist/ # Pharmacist module
    │   │   └── pathologist/# Pathologist module
    │   ├── components/     # Reusable components
    │   │   ├── Layout/     # Sidebar, Header, Layout
    │   │   └── ui/         # Button, Input, Table, etc.
    │   ├── services/       # API services
    │   ├── hooks/          # Custom hooks
    │   ├── contexts/       # React contexts
    │   ├── config/         # Configuration
    │   └── types/          # TypeScript types
    └── public/             # Static assets
```

---

## 🔑 Key Features

✅ **Login Page** - Pixel-perfect match to screenshot  
✅ **Role-Based Access** - Admin, Doctor, Pharmacist, Pathologist  
✅ **Backend Integration** - Real API calls with axios  
✅ **Authentication** - JWT token-based auth  
✅ **Data Fetching** - Custom hooks with loading/error states  
✅ **TypeScript** - Full type safety  
✅ **Responsive** - Mobile, tablet, desktop  

---

## 📚 Documentation

- **Full Integration Guide**: `integration_guide.md`  
- **Feature Walkthrough**: `walkthrough.md`  
- **Task Completion**: `task.md`  

---

## 🧪 Quick Test

After login, verify:
- Dashboard shows real data (patients count, appointments)
- Sidebar shows role-based menu
- Navigate to Patients page
- Data loads from backend
- Search works correctly

---

## 🛠️ Troubleshooting

**Can't login?**
- Check backend is running (`http://localhost:3000`)
- Verify credentials are correct
- Check CAPTCHA is entered correctly

**Dashboard shows 0?**
- Ensure MongoDB has data
- Check Network tab for API responses
- Verify token in localStorage

**API errors?**
- Check `BASE_URL` in `client/src/config/api.ts`
- Should be `http://localhost:3000`
- Verify backend routes are correct

---

## 📞 Need Help?

See **integration_guide.md** for:
- Detailed setup instructions
- API endpoint reference
- Complete testing procedures
- Troubleshooting guide
