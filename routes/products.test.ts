import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Product } from '../models/product.js';
import { startMongoMemory, stopMongoMemoryServer } from '../configs/index.js';
import { Product as IProduct } from '../@types/common/product.js';
import app from '../app.js';
import { User } from '../models/user.js';

describe('GET /', () => {
  beforeAll(async () => {
    const products: IProduct[] = [
      {
        name: 'Macbook',
        quantityOnStock: 1,
        createdAt: new Date(),
        price: 100,
        titleImage: 'default',
        updatedAt: new Date(),
      },
      {
        name: 'iPhone',
        quantityOnStock: 15,
        createdAt: new Date(),
        price: 200,
        titleImage: 'default',
        updatedAt: new Date(),
      },
      {
        name: 'iPad',
        quantityOnStock: 10,
        createdAt: new Date(),
        price: 400,
        titleImage: 'default',
        updatedAt: new Date(),
      },
    ];
    await startMongoMemory();
    products.forEach(async (product) => {
      const result = new Product(product);
      await result.save();
    });
  });

  it('/products', async () => {
    const response = await request(app).get('/products');
    expect(response.body.success).toBeTruthy();
  });

  it('/products/:id', async () => {
    const product = await Product.findOne({}).exec();
    const response = await request(app).get(`/products/${product?._id}`);
    expect(response.body.success).toBeTruthy();
    expect(response.body.product._id).toBe(product?._id.toString());
  });

  afterAll(async () => {
    await stopMongoMemoryServer();
  });
});

describe('POST', () => {
  let user;
  let admin;

  beforeAll(async () => {
    await startMongoMemory();
    admin = new User({
      username: 'example1',
      email: 'example1@example.com',
      isAdmin: true,
      password: '123',
    });
    await admin.save();
    user = new User({
      username: 'example2',
      email: 'example2@example.com',
      isAdmin: true,
      password: '123',
    });
    await user.save();
  });

  it('/products', async () => {
    const response = await (
      await request(app).post('/products').set('Authorization', token)
    ).body({
      name: 'Watch',
      quantityOnStock: 1,
      price: 300,
      titleImage: 'default',
    });
    expect(response.body.success).toBeTruthy();
  });
});
