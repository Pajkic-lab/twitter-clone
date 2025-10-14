import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from 'apps/server/src/app.module';
import { seed as userSeed } from '../../../../server/src/modules/prisma/seeds/user.seed';

describe('UtileController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await userSeed();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/utile/li (GET)', () => {
    return request(app.getHttpServer())
      .get('/utile/li')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
        const firstObject = res.body[0];
        expect(firstObject).toMatchObject({
          avatar: expect.any(String),
          bio: expect.any(String),
          cover: expect.any(String),
          createdAt: expect.any(String),
          email: expect.any(String),
          id: expect.any(String),
          location: expect.any(String),
          name: expect.any(String),
          password: expect.any(String),
          uniqueName: expect.any(String),
          updatedAt: expect.any(String),
          website: expect.any(String),
        });
      });
  });

  it('should have exactly 20 users in the response', () => {
    return request(app.getHttpServer())
      .get('/utile/li')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(20);
      });
  });
});
