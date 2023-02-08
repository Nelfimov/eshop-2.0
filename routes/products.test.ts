import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Product } from '../models/product.js';
import { startMongoMemory, stopMongoMemoryServer } from '../configs/index.js';
import { Product as IProduct } from '../@types/common/product.js';
import app from '../app.js';

describe('GET /', () => {
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

  beforeAll(async () => {
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
  let user: request.Response;
  let admin: request.Response;

  beforeAll(async () => {
    await startMongoMemory();
    admin = await request(app).post('/auth/register').send({
      username: 'example1',
      email: 'example1@example.com',
      password: '123',
      secret: process.env.ADMIN_SECRET,
    });
    user = await request(app).post('/auth/register').send({
      username: 'example2',
      email: 'example2@example.com',
      password: '123',
    });
  });

  it('/products', async () => {
    const userResponse = await request(app)
      .post('/products')
      .set('Authorization', user.body.token)
      .send({
        name: 'Watch',
        quantityOnStock: 1,
        price: 300,
        titleImage: 'default',
      });
    expect(userResponse.body.success).toBeFalsy();

    const adminResponse = await request(app)
      .post('/products')
      .set('Authorization', admin.body.token)
      .send({
        name: 'Watch',
        quantityOnStock: 1,
        price: 300,
        titleImage: 'default',
      });
    expect(adminResponse.body.success).toBeTruthy();
    const products = await Product.find({}).lean().exec();
    expect(products.length).toBe(1);
  });
});
