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
      titleImage: '',
      updatedAt: new Date(),
    },
    {
      name: 'Macbook',
      quantityOnStock: 1,
      createdAt: new Date(),
      price: 100,
      titleImage: '',
      updatedAt: new Date(),
    },
    {
      name: 'Macbook',
      quantityOnStock: 1,
      createdAt: new Date(),
      price: 100,
      titleImage: '',
      updatedAt: new Date(),
    },
  ];

  beforeAll(() => {
    startMongoMemory()
      .then(() => {
        products.forEach(async (product) => {
          const result = new Product(product);
          await result.save();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('gets all products', async () => {
    const response = await request(app).get('/products');

    expect(response.body.products.length).toBe(3);
  });

  afterAll(async () => {
    await stopMongoMemoryServer();
  });
});
