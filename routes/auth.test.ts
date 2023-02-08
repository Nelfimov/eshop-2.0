import app from '../app.js';
import request from 'supertest';
import { User } from '../models/index.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { startMongoMemory } from '../configs/mongo-memory.js';

describe('POST', () => {
  beforeAll(async () => {
    await startMongoMemory();
  });

  it('/auth/register', async () => {
    const responseNoPassword = await request(app).post('/auth/register').send({
      username: 'Example',
      email: 'example@example.com',
    });
    expect(responseNoPassword.body.success).toBeFalsy();

    const responseNoEmail = await request(app).post('/auth/register').send({
      username: 'Example',
      password: '123',
    });
    expect(responseNoEmail.body.success).toBeFalsy();

    const response = await request(app).post('/auth/register').send({
      username: 'Example',
      email: 'example@example.com',
      password: '123',
    });

    expect(response.body.success).toBeTruthy();
    expect(response.body.token).toBeTruthy();

    const users = await User.find({ username: 'Example' }).lean().exec();
    expect(users.length).toBe(1);
  });

  it('/auth/login', async () => {
    const responseNoPassword = await request(app).post('/auth/login').send({
      username: 'Example',
      email: 'example@example.com',
    });
    expect(responseNoPassword.body.success).toBeFalsy();

    const responseWrongUsername = await request(app).post('/auth/login').send({
      username: 'Exxample',
      password: '123',
    });
    expect(responseWrongUsername.body.success).toBeFalsy();

    const response = await request(app).post('/auth/login').send({
      username: 'Example',
      password: '123',
    });
    expect(response.body.success).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });
});
