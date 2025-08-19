# Client Deployment Guide

## Configuration Summary

Your client has been configured to use the external API URL: `https://fromageria-tesilli-server.vercel.app`

## Changes Made

### 1. API Configuration

- Created `/src/config/api.js` with centralized API configuration
- Added environment variable support for different deployment environments
- Configured axios with automatic authentication headers
- Added request/response interceptors for debugging

### 2. Environment Variables

- `.env.production` - Production API URL
- `.env.development` - Development API URL
- `.env.example` - Template for local configuration

### 3. Updated Components

- **ProductList.jsx** - Uses `api.getProducts()`
- **Product.jsx** - Uses `api.getProduct(id)`
- **Login.jsx** - Uses `api.login(credentials)`
- **Checkout.jsx** - Uses `api.createOrder(orderData)`
- **EditProducts.jsx** - Uses `api.getProducts()` and `api.createProduct()`
- **RemoveProduct.jsx** - Uses `api.getProducts()` and `api.deleteProduct()`

### 4. Vercel Configuration

- Added `vercel.json` with Vite framework configuration

## Deployment Steps

### Option 1: Deploy Client to Vercel (Recommended)

1. **Navigate to client directory:**

   ```bash
   cd /Users/isadoracaputo/Development/Personal/fromageria-tesilli/client
   ```

2. **Install Vercel CLI (if not already installed):**

   ```bash
   npm i -g vercel
   ```

3. **Deploy to Vercel:**

   ```bash
   vercel --prod
   ```

4. **Set environment variables in Vercel dashboard:**
   - Go to your Vercel project settings
   - Add environment variable: `VITE_API_BASE_URL=https://fromageria-tesilli-server.vercel.app`

### Option 2: Test Locally First

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create local environment file:**

   ```bash
   cp .env.example .env.local
   ```

3. **Edit `.env.local` if needed (optional - it defaults to your server URL)**

4. **Run development server:**

   ```bash
   npm run dev
   ```

5. **Test that API calls work with your deployed server**

6. **Build for production:**

   ```bash
   npm run build
   ```

7. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

## Environment Variables Reference

- **VITE_API_BASE_URL**: The base URL for your API server
  - Production: `https://fromageria-tesilli-server.vercel.app`
  - Local development: `http://localhost:4000` (if running server locally)

## API Endpoints Used

Your client will now make requests to:

- `https://fromageria-tesilli-server.vercel.app/api/products`
- `https://fromageria-tesilli-server.vercel.app/api/products/{id}`
- `https://fromageria-tesilli-server.vercel.app/api/products/create`
- `https://fromageria-tesilli-server.vercel.app/api/auth/login`
- `https://fromageria-tesilli-server.vercel.app/api/orders`

## Troubleshooting

1. **CORS Issues**: Make sure your server API has proper CORS headers (should already be configured)
2. **Authentication**: JWT tokens are automatically added to requests via axios interceptors
3. **Environment Variables**: Make sure `VITE_API_BASE_URL` is set in Vercel dashboard
4. **Build Issues**: Check that all imports are correct and no console errors during build

## Testing

After deployment, test these key functions:

1. View product list on home page
2. View individual product details
3. Login functionality (if you have admin credentials)
4. Place an order through checkout
5. Admin functions (if logged in)

Your client and server will now be completely separated and can be deployed independently!
