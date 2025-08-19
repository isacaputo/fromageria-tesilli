# 🧀 Fromageria Tesilli - Artisanal Cheese E-commerce Platform

A modern full-stack e-commerce solution designed for artisanal cheese producers, delivering a digital shopping experience from product discovery to order fulfillment.

**Fromageria Tesilli** is an artisan cheese factory located in Belo Horizonte, Brazil. The Fromageria produces cured artisanal cheeses carefully crafted, combining delicious ingredients with creativity.

![Fromageria Tesilli Webpage](home_screenshot.png)

## ✨ Features

### Customer Experience

- **Product Catalog**: Browse curated artisanal cheese selections with detailed descriptions
- **Shopping Cart**: Add products with customizable sizes and quantities
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Secure Checkout**: Complete order process with customer information collection

### Administrative Features

- **Product Management**: Create, edit, and delete products
- **Order Management**: View and track customer orders
- **User Authentication**: Secure admin login with JWT tokens
- **Email Notifications**: Automated order confirmation emails

### Technical Features

- **RESTful API**: Clean, documented endpoints for all operations
- **Database Management**: Robust data modeling with relationships
- **Image Optimization**: Efficient cheese photography display
- **Error Handling**: Comprehensive error management and logging

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern JavaScript library for building user interfaces
- **Material-UI (MUI)** - React component library for consistent design
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for single-page application
- **React Context** - State management for sharing data across components
- **Axios** - HTTP client for API communication

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Sequelize ORM** - Database object-relational mapping
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing for security
- **Nodemailer** - Email sending functionality

### Database & Deployment

- **MySQL** - Relational database management system
- **Railway** - Database hosting platform
- **Vercel** - Serverless deployment platform
- **Git** - Version control system

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- MySQL database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/isacaputo/fromageria-tesilli.git
   cd fromageria-tesilli
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Configuration

#### Server Environment Variables

Create a `.env` file in the server directory:

```env
DATABASE_URL=mysql://username:password@host:port/database_name
SUPER_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### Client Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_BASE_URL=http://localhost:4000
```

### Database Setup

1. **Run migrations**

   ```bash
   cd server
   npx sequelize-cli db:migrate
   ```

2. **Seed the database**
   ```bash
   npx sequelize-cli db:seed:all
   ```

### Running the Application

#### Development Mode

1. **Start the server**

   ```bash
   cd server
   npm run dev
   ```

2. **Start the client**
   ```bash
   cd client
   npm run dev
   ```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

#### Production Build

1. **Build the client**

   ```bash
   cd client
   npm run build
   ```

2. **Start production server**
   ```bash
   cd server
   npm start
   ```

## 📚 API Documentation

### Products

- `GET /api/products` - Get all products
- `GET /api/products?id={id}` - Get product by ID
- `POST /api/products/create` - Create new product (admin only)
- `DELETE /api/products?id={id}` - Delete product (admin only)

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin only)

## 🗄️ Database Schema

The project features a well-organized and centralized database with **20 products portfolio** and manages relationships between customers, orders, and products.

![Fromageria DB Design](database_visualization.png)

### Main Tables

- **Products** - Cheese product information with descriptions, prices, and categories
- **Orders** - Customer order records with contact and delivery information
- **Auth** - User authentication data for admin access
- **OrderHasProduct** - Many-to-many relationship table linking orders and products

## 🚀 Deployment

### Live Application

- **Client**: [https://fromageria-tesilli-client.vercel.app](https://fromageria-tesilli-client.vercel.app)
- **Server API**: [https://fromageria-tesilli-server.vercel.app](https://fromageria-tesilli-server.vercel.app)

### Vercel Deployment

1. **Deploy Server**

   ```bash
   cd server
   vercel --prod
   ```

2. **Deploy Client**
   ```bash
   cd client
   vercel --prod
   ```

### Environment Variables Setup

Configure the following in your Vercel dashboard:

**Server:**

- `DATABASE_URL`
- `SUPER_SECRET`

**Client:**

- `VITE_API_BASE_URL`

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔗 Connect with Fromageria Tesilli

[Follow the Fromageria on Instagram](https://www.instagram.com/fromageria.tesilli/)

## Acknowledgments

- Fromageria Tesilli for the inspiration and product data
- Material-UI team for the excellent component library
- Vercel team for the seamless deployment experience
- The open-source community for the amazing tools and libraries

---

_Developed with ❤️ by Isadora Caputo_
