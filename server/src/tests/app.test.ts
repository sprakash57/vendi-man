import axios, { AxiosResponse, AxiosError } from 'axios';
import { Messages } from '../constants';

const testUrl = 'http://localhost:4000/api/v1';
const testUsername = 'test_user1';
const testPassword = '123456';
const testProductId = '811d23775aeb'; // Oreo
const depositAmount = 30;
const invalidAmount = 17;
const quantityToBeBought = 2;

describe('Buyer', () => {
  let authResponse: AxiosResponse, headers: { Authorization: string };

  beforeAll(async () => {
    authResponse = await axios.post(`${testUrl}/sessions`, {
      username: testUsername,
      password: testPassword,
    });
    expect(authResponse.status).toBe(201);
    expect(authResponse.headers['content-type']).toContain('application/json');
    expect(authResponse.data.data).toHaveProperty('accessToken');
    expect(authResponse.data.data).toHaveProperty('refreshToken');
    headers = { Authorization: `Bearer ${authResponse.data.data.accessToken}` };
  });

  it('should accept valid deposit amount', async () => {
    const response = await axios.post(`${testUrl}/users/deposit`, { deposit: depositAmount }, { headers });
    expect(response.status).toEqual(201);
  });

  it('should reject invalid deposit amount', async () => {
    try {
      await axios.post(`${testUrl}/users/deposit`, { deposit: invalidAmount }, { headers });
    } catch (e: unknown) {
      const err = e as AxiosError;
      expect(err.response?.data).toHaveProperty('errors');
    }
  });

  it('should able to buy products', async () => {
    const response = await axios.post(`${testUrl}/products/${testProductId}/buy`, { quantityToBeBought }, { headers });
    expect(response.status).toBe(201);
    expect(response.data?.data?.change).toBeInstanceOf(Array);
  });

  it('should reset deposit amount', async () => {
    const response = await axios.delete(`${testUrl}/users/deposit/reset`, { headers });
    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await axios.delete(`${testUrl}/sessions/logout/all`, { headers });
  });
});

describe('Seller', () => {
  let authResponse: AxiosResponse, headers: { Authorization: string }, newProductId: string;

  beforeAll(async () => {
    authResponse = await axios.post(`${testUrl}/sessions`, {
      username: 'seller2',
      password: testPassword,
    });
    expect(authResponse.status).toBe(201);
    expect(authResponse.headers['content-type']).toContain('application/json');
    expect(authResponse.data.data).toHaveProperty('accessToken');
    expect(authResponse.data.data).toHaveProperty('refreshToken');
    headers = { Authorization: `Bearer ${authResponse.data.data.accessToken}` };
  });

  it('should able to create a product', async () => {
    const response = await axios.post(
      `${testUrl}/products`,
      { amountAvailable: 30, productName: 'Lays', cost: 15 },
      { headers },
    );
    newProductId = response.data.data.productId;
    expect(response.status).toBe(201);
  });

  it('should able to update the product', async () => {
    const response = await axios.put(
      `${testUrl}/products/${newProductId}`,
      { amountAvailable: 60, productName: 'Lays', cost: 15 },
      { headers },
    );
    expect(response.status).toBe(201);
  });

  it('should not be able to update the product from another seller', async () => {
    try {
      await axios.put(
        `${testUrl}/products/${testProductId}`,
        { amountAvailable: 60, productName: 'Oreo', cost: 15 },
        { headers },
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      expect(err.response?.status).toBe(404);
      expect(err.response?.data?.message).toBe(Messages.NO_OWNER);
    }
  });

  it('should not be able to buy a product', async () => {
    try {
      await axios.post(`${testUrl}/products/${testProductId}/buy`, { quantityToBeBought }, { headers });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      expect(err.response?.status).toBe(403);
      expect(err.response?.data?.message).toBe(Messages.NO_BUYER);
    }
  });

  it('should able to delete their own product', async () => {
    const response = await axios.delete(`${testUrl}/products/${newProductId}`, { headers });
    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    await axios.delete(`${testUrl}/sessions/logout/all`, { headers });
  });
});
