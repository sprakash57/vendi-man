import axios, { AxiosResponse, AxiosError } from 'axios';

const testUrl = 'http://localhost:4000/api/v1';
const testUsername = 'buyer1';
const testPassword = '123456';
const testProductId = '9481b0c5e62c';
const validAmount = 30;
const invalidAmount = 17;
const totalProduct = 10;

describe('App', () => {
  let authResponse: AxiosResponse;

  beforeAll(async () => {
    authResponse = await axios.post(`${testUrl}/sessions`, {
      username: testUsername,
      password: testPassword,
    });

    expect(authResponse.status).toBe(200);
    expect(authResponse.headers['content-type']).toContain('application/json');
    expect(authResponse.data.data).toHaveProperty('accessToken');
    expect(authResponse.data.data).toHaveProperty('refreshToken');
  });

  it('should reject invalid deposit amount', async () => {
    try {
      axios
        .post(
          `${testUrl}/users/deposit`,
          {
            depositAmount: invalidAmount,
          },
          {
            headers: {
              Authorization: `Bearer ${authResponse.data.data.accessToken}`,
            },
          },
        )
        .catch((err: AxiosError) => {
          expect(err.response?.data).toHaveProperty('errors');
        });
    } catch (e) {}
  });

  it('should accept valid deposit amount', async () => {
    try {
      const response = await axios.post(
        `${testUrl}/users/deposit`,
        {
          depositAmount: validAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${authResponse.data.data.accessToken}`,
          },
        },
      );
      expect(response.status).toEqual(200);
    } catch (e) {}
  });

  it('should able to buy products', async () => {
    try {
      const response = await axios.post(
        `${testUrl}/products/${testProductId}/buy`,
        {
          amountOfProduct: totalProduct,
        },
        {
          headers: {
            Authorization: `Bearer ${authResponse.data.data.accessToken}`,
          },
        },
      );
      expect(response.status).toBe(200);
      expect(response.data?.change).toBeInstanceOf(Array);
    } catch (e) {}
  });

  it('should update the deposit after purchase', async () => {
    try {
      const response = await axios.get(`${testUrl}/users/profile`, {
        headers: {
          Authorization: `Bearer ${authResponse.data.data.accessToken}`,
        },
      });
      expect(response.data?.deposit).toEqual(0);
    } catch (e) {}
  });

  it('should reset deposit amount', async () => {
    try {
      const response = await axios.delete(`${testUrl}/users/deposit`, {
        headers: {
          Authorization: `Bearer ${authResponse.data.data.accessToken}`,
        },
      });
      expect(response.status).toBe(200);
    } catch (e) {}
  });

  it('should reject purchase with deposit amount 0', async () => {
    try {
      axios
        .post(
          `${testUrl}/products/${testProductId}/buy`,
          {
            depositAmount: invalidAmount,
          },
          {
            headers: {
              Authorization: `Bearer ${authResponse.data.data.accessToken}`,
            },
          },
        )
        .catch((err: AxiosError) => {
          expect(err.response?.status).toBe(400);
          expect(err.response?.data).toHaveProperty('error');
        });
    } catch (e) {}
  });

  afterAll(async () => {
    await axios.put(`${testUrl}/sessions/logout/all`, {
      headers: {
        Authorization: `Bearer ${authResponse.data.data.accessToken}`,
      },
    });
  });
});
