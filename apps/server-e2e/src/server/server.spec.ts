/**
 * run following from CMD npx nx e2e server-e2e
 */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../server/src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    console.log('1111', process.env.NODE_ENV);
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my app!');
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer()).get('/api').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
