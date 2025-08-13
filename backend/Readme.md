# Stationery Shop Backend API

A robust RESTful API built with Node.js, Express, and Prisma for the Stationery Shop e-commerce platform.

## Project Structure

```
backend/
├── prisma/                 # Database schema and migrations
├── src/
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Custom middleware
│   ├── route/            # API routes
│   └── utils/            # Helper functions
├── .env                   # Environment variables
└── package.json          # Project dependencies
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Testing**: Jest

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products (User)
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?query=` - Search products

### Products (Admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/products/stats` - Get product statistics

## Database Schema

```prisma
// Key models from prisma/schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  profile   Profile?
}

model Product {
  id          String   @id @default(uuid())
  name        String
  price       Float
  category    String
  stock       Int
  createdAt   DateTime @default(now())
}
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/stationery"
JWT_SECRET="your-secret-key"
PORT=5000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with initial data

## API Documentation

Full API documentation is available at `/api-docs` when running the server.

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Error Responses

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Testing

Run the test suite:
```bash
npm run test
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. Set production environment variables
3. Run database migrations:
```bash
npx prisma migrate deploy
```

4. Start the server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

*Last updated: August 12, 2025*