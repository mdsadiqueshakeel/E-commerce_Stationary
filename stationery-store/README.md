# Stationery Store Frontend

A modern e-commerce frontend built with Next.js for selling stationery products.

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── app/        # Next.js app router pages
│   ├── components/ # Reusable React components
│   ├── styles/     # Global styles and Tailwind config
│   └── utils/      # Helper functions and data
```

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart functionality
- 👤 User authentication (login/signup)
- 💳 Checkout process
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 13+
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: JWT
- **Data Fetching**: REST API

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Run development server:
```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Project Components

- **Layout**: Base layout with navigation and footer
- **Auth**: Login, signup, and password reset
- **Products**: Product listing and detail views
- **Cart**: Shopping cart management
- **Checkout**: Order processing
- **Profile**: User account management

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit a pull request

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Deployment

Deploy using [Vercel](https://vercel.com):

```bash
npm run build
vercel deploy
```

---

*Last updated:
