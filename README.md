# PlatePilot - Food Ordering System 
**PlatePilot** is a scalable backend service for a food ordering platform, supporting authentication, cart management, payment integration, user ratings, and full CRUD for menu items.


## Architecture
I used the modular MVC-inspired Node.js Architecture for scalability.

- `routes` → define endpoints
- `controllers` → handle logic
- `models` → interact with DB
- `middlewares` → handle auth, validation, etc.
- `utils` → reusable helpers
- `upload` → file handling (e.g., Multer config

## Features

- Allows `RBA` - `Role Based Access` for `admin` and `users`.
- 15+ Different endpoints.
- Authentication with `JWT`.

### Admin
- Add new food items with image upload
- Edit existing items (name, description, price, image)
- Delete food items
- Can see all the payments
- View available food items

### User
- Add, update, and remove items from cart
- Can give ratings to the food item
- Can see rating of food item
- Can make payments
- Can see all his payments

## Tech Stacks:- 
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (NeonDB)
- **ORM/Driver**: pg
- **Authentication**: JWT (JSON Web Token)
- **Image Upload**: Multer
- **Syntax**: ES Modules (ESM)

## API Endpoints
1. Auth
   - `POST api/auth/register` - For Signup
   - `POST /api/auth/login` - For Login

2. Food
   - `GET /api/food/getFoods` - for listing all food items
   - `GET /api/food/getFood/:id` - to get a particular food item
   - `POST /api/food` - admin can add food
   - `PATCH /api/food/:id` - admin can update food
   - `DELETE /api/food/:id` - admin can delete food
  
3. Cart
   - `POST /api/cart/add` - Can add/update item in cart
   - `GET /api/cart/` - Can get all cart items list
   - `DELETE /api/cart/:id` - Can delete a cart item
  
4. Rating
   - `POST /api/ratings/` - to give rating to a food item
   - `GET /api/ratings:foodId` - to get rating of a specific fod item

5. Payment
   -  `POST /api/payments/create` - to create Payments
   -  `GET /api/payments/my` - to get all my payments
   -  `GET /api/payments/` - to get list of all payments

## .env example
```bash
PORT=5000
DATABASE_URL=your_neondb_url
JWT_SECRET=your_secret_key
```
