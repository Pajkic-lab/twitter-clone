import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../server/src/app.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health/check (GET)', () => {
    return request(app.getHttpServer())
      .get('/health/check')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          status: 'ok',
          info: {
            database: {
              status: 'up',
            },
          },
          error: {},
          details: {
            database: {
              status: 'up',
            },
          },
        });
      });
  });
});
