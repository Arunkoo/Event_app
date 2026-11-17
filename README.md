# CampusFete

An event booking app I built for college fests. Students can browse events, add them to a cart, pay online and get a QR code ticket. Organizers get a separate admin panel to add and remove events and see orders.

## Why

At our college, fest registrations were all over the place. Google Forms, WhatsApp groups, payment screenshots. Nobody had a clear list of events and checking payments was a manual job. I wanted one place to do all of it.

## Features

- Browse events, filter by category or free/paid
- Sign up with email or log in with Google
- Cart is saved to your account, so it stays when you switch devices
- Pay with Stripe
- QR code ticket after payment, shown in My Orders
- Small chatbot (Gemini) for common questions like refunds or where to find tickets
- Admin panel to add events with images, delete them and view orders

## Tech

- **Frontend:** React, Vite, Tailwind, Material UI
- **Admin:** React, Vite, Tailwind
- **Backend:** Node, Express, MongoDB (Mongoose)
- **Other:** Stripe, Google OAuth (Passport), JWT, Multer, Gemini API

## Folder structure

```
Backend/    Express API
Frontend/   app for users
admin/      admin panel
```

## Running it locally

You need Node and a MongoDB database (local or Atlas).

**1. Backend**

```
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```
PORT=4000
MONGO_URI=
JWT_SECRET=
CLIENT_ID=
CLIENT_SECRET=
GOOGLE_CLIENT_ID=
CLIENT_URL=http://localhost:5173
Stripe_Secret_Key=
GEMINI_API_KEY=
```

Then start it:

```
npm run server
```

**2. Frontend**

```
cd Frontend
npm install
npm run dev
```

Opens on http://localhost:5173

**3. Admin**

```
cd admin
npm install
npm run dev
```

Opens on http://localhost:5174

## Things I still want to fix

- Check payments with a Stripe webhook instead of the redirect
- Add login for the admin panel
- Move uploaded images to cloud storage
- Finish the daily streak feature
