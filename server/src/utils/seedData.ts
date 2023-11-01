import mongoose from 'mongoose';
import Category from '../models/CategoryModel';
import dotenv from 'dotenv';
import User from '../models/UserModel';
import Product from '../models/ProductModel';
import Cart from '../models/CartModel';
import Order from '../models/OrderModel';
dotenv.config();

const seedData = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI as string, {
      serverSelectionTimeoutMS: 10000,
    });

    await User.deleteMany();

    const admin = await User.create({
      username: 'Admin',
      password: 'password123',
      email: 'mhw9163@gmail.com',
      isAdmin: true,
    });

    const user = await User.create({
      username: 'User',
      password: 'password123',
      email: 'test@test.com',
    });

    console.log('User seeded');

    await Category.deleteMany();

    const categories = await Category.insertMany([
      { name: 'Candle' },
      { name: 'Shoes' },
      { name: 'Electronics' },
    ]);

    console.log('Category seeded');

    await Product.deleteMany();

    const products = await Product.insertMany([
      {
        name: 'Zig Candle',
        desc: 'Zig Zag Candle',
        image: 'zig_candle.jpg',
        price: 13.99,
        quantity: 10,
        category: categories[0].id,
        size: ['small', 'medium', 'large'],
        color: ['White', 'Purple', 'Ivory'],
      },
      {
        name: 'Figure Candle',
        desc: 'Mixed Figure Candle',
        image: 'figure_candle.jpg',
        price: 19.99,
        quantity: 10,
        category: categories[0].id,
        size: ['medium', 'large'],
        color: ['White', 'Purple', 'Ivory', 'Yellow', 'Cheese'],
      },
      {
        name: 'Venus Candle',
        desc: 'Venus face candle',
        image: 'venus_candle.jpg',
        price: 24.99,
        quantity: 2,
        category: categories[0].id,
        size: [],
        color: [],
      },
      {
        name: 'Canvas Shoes',
        desc: 'Comfortable Canvas Shoes',
        image: 'canvas_shoes.jpg',
        price: 39.99,
        quantity: 80,
        category: categories[1].id,
        size: ['8', '8.5', '9', '9.5', '10'],
        color: ['Black', 'White', 'Red', 'Blue'],
      },
      {
        name: 'Nike Shoes',
        desc: 'Sporty Nike Shoes',
        image: 'nike_shoes.jpg',
        price: 79.99,
        quantity: 50,
        category: categories[1].id,
        size: ['6.5', '7', '8', '9', '9.5', '10'],
        color: ['Black', 'White'],
      },
      {
        name: 'Mac Book Pro',
        desc: 'Mac Book Pro with M2 Chip!',
        image: 'macbook_pro.jpg',
        price: 1499.99,
        quantity: 5,
        category: categories[2].id,
        size: [],
        color: ['Gray', 'Silver'],
      },
      {
        name: 'Galaxy Z Flip 5',
        desc: 'Folderble Samsung Galaxy Z Flip 5',
        image: 'zflip_5.jpg',
        price: 899.99,
        quantity: 4,
        category: categories[2].id,
        size: ['128GB', '256GB'],
        color: ['Purple', 'Black', 'Gray', 'Yellow'],
      },
      {
        name: 'DJI Mini 3',
        desc: 'Latest version DJI Mini 3 Drone ',
        image: 'dji_drone.jpg',
        price: 599.99,
        quantity: 5,
        category: categories[2].id,
        size: [],
        color: [],
      },
    ]);

    console.log('Product seeded');

    await Cart.deleteMany();

    const cart = await Cart.insertMany([
      {
        user: user.id,
        products: [
          {
            product: products[0].id,
            color: products[0].color[0],
            size: products[0].size[1],
            quantity: 2,
          },
          {
            product: products[3].id,
            color: products[3].color[1],
            size: products[3].size[0],
            quantity: 1,
          },
        ],
      },
      {
        user: admin.id,
      },
    ]);

    console.log('Cart seeded');

    db.disconnect();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();
