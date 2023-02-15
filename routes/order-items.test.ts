import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { startMongoMemory } from '../configs/mongo-memory.js';
import { Product, Order } from '../models/index.js';

const products = [
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

describe('/products/:id/add', () => {
  let user: request.Response;

  beforeAll(async () => {
    startMongoMemory();
    products.forEach(async (product) => {
      await new Product(product).save();
    });
    user = await request(app).post('/auth/register').send({
      username: 'user',
      email: 'user@example.com',
      password: '123',
    });
  });

  it('POST authorized', async () => {
    const product = await Product.findOne().exec();
    const response = await request(app)
      .post(`/products/${product?._id.toString()}/add`)
      .set('Authorization', user.body.token);
    expect(response.body.success).toBeTruthy();
    const order = await Order.find({ user: response.body.order.user }).exec();
    expect(order.length).toBe(1);
  });

  it('POST anon', async () => {
    const product = await Product.findOne().lean().exec();
    const response = await request(app).post(
      `/products/${product?._id.toString()}/add`
    );
    expect(response.body.success).toBeTruthy();
    const order = await Order.find({ user: response.body.order.user }).exec();
    expect(order.length).toBe(1);
  });
});
