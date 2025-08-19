# Vercel Deployment Fixes

## Issues Fixed

### 1. Database Connection Management

- **Problem**: Creating new Sequelize connections on each request and closing them
- **Solution**: Implemented singleton pattern with connection pooling for serverless functions

### 2. Model Import Path Issues

- **Problem**: API files trying to import from `../../models` which doesn't work in Vercel serverless structure
- **Solution**: Created shared database utility in `/api/utils/database.js` with all model definitions

### 3. Vercel Configuration

- **Problem**: Incorrect routing configuration in `vercel.json`
- **Solution**: Updated routing to work properly with Vercel serverless functions

### 4. Environment Variables

- **Problem**: Missing error handling for undefined DATABASE_URL
- **Solution**: Added proper error handling and environment variable validation

### 5. Email Service Configuration

- **Problem**: Nodemailer import path issues
- **Solution**: Created email utility in `/api/utils/email.js` with environment variable support

## Files Modified

### API Files Updated:

- `/api/products/index.js` - Products listing endpoint
- `/api/products/create.js` - Product creation endpoint
- `/api/products/[id].js` - Single product endpoint
- `/api/auth/login.js` - User login endpoint
- `/api/auth/register.js` - User registration endpoint
- `/api/orders/index.js` - Orders endpoint

### Configuration Files:

- `/vercel.json` - Updated routing configuration

### New Utility Files:

- `/api/utils/database.js` - Shared database connection and models
- `/api/utils/email.js` - Email service configuration

## Required Environment Variables

You need to set these environment variables in your Vercel deployment:

1. **DATABASE_URL** - Your MySQL database connection string
2. **SUPER_SECRET** - JWT secret key for authentication
3. **EMAIL_USER** - Gmail user for sending emails (optional, defaults to isadora.caputo@gmail.com)
4. **EMAIL_PASS** - Gmail app password for sending emails (optional, has default)
5. **NODE_ENV** - Set to "production" for production deployment

## Deployment Steps

1. **Set Environment Variables in Vercel Dashboard:**

   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add all the required variables listed above

2. **Deploy to Vercel:**

   ```bash
   # From the server directory
   vercel --prod
   ```

3. **Test Your Endpoints:**
   - GET `/api/products` - Should return list of products
   - POST `/api/products/create` - Create new product
   - GET `/api/products/[id]` - Get single product
   - POST `/api/auth/login` - User login
   - POST `/api/auth/register` - User registration
   - GET/POST `/api/orders` - Orders management

## Database Schema Notes

The models have been updated to match your migration files:

- Orders table uses: `client_name`, `client_email`, `client_phone`, `client_address`, `total_amount`
- Auth table uses: `username`, `password`
- Products table uses the existing schema from your migrations

## Common Issues to Check

1. **Database Connection**: Ensure your DATABASE_URL is correct and accessible from Vercel
2. **Environment Variables**: Make sure all required env vars are set in Vercel dashboard
3. **Database Tables**: Ensure your database has the proper tables created via migrations
4. **CORS**: The endpoints now include proper CORS headers for frontend integration

## Testing

You can test your deployed API by visiting:

- `https://your-vercel-url/api/products`
- Use tools like Postman or curl to test POST endpoints

The 500 error should now be resolved with proper error messages and stack traces in development mode.
