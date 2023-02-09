import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { startMongoMemory } from '../configs/mongo-memory.js';
import { Product } from '../@types/common/index.js';

const products: Product[] = [
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
    user = await request(app).post('/auth/register').send({
      username: 'user',
      email: 'user@example.com',
      password: '123',
    });

    it('POST authorized', async () => {
      const response = await request(app)
        .post('/products/:id/add')
        .set('Authorization', user.body.token);
    });
  });
});
