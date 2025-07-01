import request from 'supertest';
import app from '../app';

describe('Short Link API', () => {
  let shortUrl = '';
  const originalUrl = 'https://example.com';
  const alias = 'uniquealias123';

  it('should create a short link with a unique alias', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ originalUrl, alias });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('shortUrl', alias);
    shortUrl = alias;
  });

  it('should redirect to the original URL', async () => {
    const res = await request(app)
      .get(`/${shortUrl}`)
      .redirects(0);
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe(originalUrl);
  });
});