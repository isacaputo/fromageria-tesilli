# Fromageria Tesilli - Full Stack Deployment Guide

## Deploying to Vercel (Frontend + Backend)

This setup allows you to deploy both your React frontend and Express.js backend API as serverless functions on Vercel.

### Prerequisites

1. **Database**: You'll need a cloud MySQL database (like PlanetScale, AWS RDS, or Railway)
2. **Vercel Account**: Create an account at [vercel.com](https://vercel.com)

### Environment Variables

Set these environment variables in your Vercel project settings:

```
NODE_ENV=production
DATABASE_URL=mysql://username:password@host:port/database
SUPER_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### API Endpoints

After deployment, your API endpoints will be available at:

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products/create` - Create new product (requires auth)
- `DELETE /api/products/{id}` - Delete product (requires auth)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/orders` - Get all orders (requires auth)
- `POST /api/orders` - Create new order

### Deployment Steps

1. **Push to GitHub**: Make sure your code is in a GitHub repository

2. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the `vercel.json` configuration

3. **Set Environment Variables**:

   - In your Vercel project dashboard
   - Go to Settings → Environment Variables
   - Add all the required environment variables listed above

4. **Deploy**: Vercel will automatically build and deploy your project

### Important Notes

- **Database**: Your local MySQL database won't work in production. You need a cloud database.
- **Authentication**: The current auth middleware needs to be adapted for serverless functions.
- **File Uploads**: If you have file uploads, you'll need to use a service like Cloudinary or AWS S3.

### Frontend API Calls

Update your frontend API calls to use relative URLs:

```javascript
// Instead of: http://localhost:3000/api/products
// Use: /api/products
```

### Troubleshooting

1. **Database Connection Issues**: Make sure your DATABASE_URL is correct and the database is accessible from the internet.
2. **CORS Issues**: The API functions include CORS headers, but you may need to adjust them for your specific domain.
3. **Environment Variables**: Double-check that all required environment variables are set in Vercel.

### Alternative: Frontend-Only Deployment

If you prefer to keep your backend separate, you can:

1. Remove the `api` folder and serverless functions
2. Deploy your backend to a service like Railway, Heroku, or DigitalOcean
3. Update the `vercel.json` to only build the frontend:

```json
{
  "buildCommand": "cd client && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "cd client && npm install"
}
```
