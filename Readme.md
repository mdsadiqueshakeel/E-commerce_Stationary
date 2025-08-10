# Stationery Shop E-commerce Website

This repository contains a modern full-stack e-commerce website for a stationery shop with an elegant, responsive design.

## Project Structure
```
├── backend/
│   ├── .env
│   ├── .gitignore 
│   └── src/
│       ├── index.js
│       ├── controllers/
│       └── routes/
│
├── stationery-store/
│   ├── public/
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── map-placeholder.jpg
│   │   ├── map1-placeholder.png
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── about-us/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   ├── my-orders/
│   │   │   ├── order-confirmation/
│   │   │   ├── product/
│   │   │   ├── profile/
│   │   │   ├── signup/
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   │
│   │   ├── components/
│   │   │   ├── AboutUs/
│   │   │   ├── Auth/
│   │   │   ├── Cart/
│   │   │   ├── Checkout/
│   │   │   ├── Home/
│   │   │   ├── MyOrders/
│   │   │   ├── OrderConfirmation/
│   │   │   ├── ProductDetail/
│   │   │   ├── Products/
│   │   │   ├── Profile/
│   │   │   ├── CartButton.js
│   │   │   ├── Footer.js
│   │   │   ├── Navbar.js
│   │   │   └── ProfileButton.js
│   │   │
│   │   ├── Styles/
│   │   │   ├── globals.css
│   │   │   └── tailwind.css
│   │   │
│   │   └── utils/
│   │       ├── authUtils.js
│   │       ├── cartUtils.js
│   │       ├── feature.json
│   │       ├── mockAuthHelper.js
│   │       └── products.json
│   │
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.mjs
│   └── tailwind.config.js
```

## About

A modern e-commerce platform for stationery products built with Next.js and Express, featuring a beautiful gradient design and responsive UI components.

### Backend Architecture

- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **API Documentation**: Swagger/OpenAPI
- **Entry Point**: `backend/src/index.js`

### Frontend Architecture 

- **Framework**: Next.js 13+ with React
- **Styling**: Tailwind CSS with custom gradients
- **State Management**: React Context API
- **Component Structure**: Feature-based organization
- **UI Features**: 
  - Gradient backgrounds
  - Smooth hover animations
  - Responsive grid layouts
  - Custom color scheme
- **Entry Point**: `stationery-store/src/app/page.js`

## Key Features

- 🎨 Modern gradient-based UI design
- 🛍️ Product showcase with hover effects
- 🛒 Interactive shopping cart
- 👤 User authentication & profiles
- 💳 Secure checkout process
- 📱 Fully responsive design
- 🔍 Product search & filtering
- 📦 Order management system

## Components

### Home Page
- ProductShowCase component with:
  - Gradient backgrounds
  - Image hover effects
  - Responsive grid layout
  - Custom button styling
  - Product cards with shadow effects

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB URI and JWT secret

4. Start development server:
   ```bash
   npm run dev
   ```
   Server runs on [http://localhost:5000](http://localhost:5000)

### Frontend Setup

1. Navigate to frontend:
   ```bash
   cd stationery-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Access at [http://localhost:3000](http://localhost:3000)

## API Documentation

REST API endpoints available at `/api/docs` when running the backend server.

## Testing

Run backend tests:
```bash
cd backend
npm test
```

Run frontend tests:
```bash
cd stationery-store
npm test
```

## Deployment

### Backend
- Deploy to Node.js hosting (Heroku, DigitalOcean)
- Set up MongoDB Atlas cluster
- Configure environment variables

### Frontend
- Build production: `npm run build`
- Deploy to Vercel/Netlify
- Configure environment variables

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License. See `LICENSE` for details.

## Contact

Project Link: [https://github.com/yourusername/stationery-shop](https://github.com/yourusername/stationery-shop)

---

*Last updated: August 2023*