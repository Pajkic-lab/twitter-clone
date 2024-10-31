import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from 'apps/server/src/app.module';

/**
 * There is a problem, the reason why i can not continue writing tests is due to pending issues, error handling should be uniform,
 * this may cause lots of work on the frontend, and there might be some changes in logic regarding authentication.
 */
describe('AuthController (e2e)', () => {
  let app: INestApplication;
  //   let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    // await prisma.user.deleteMany({});
    await app.close();
  });

  it('should sign-up new user successfully (POST) /auth/sign-up', () => {
    // const signUpData = {
    //   username: 'testuser',
    //   email: 'testuser@example.com',
    //   password: 'Test@1234',
    //   confirmPassword: 'Test@1234',
    // };
    // return request(app.getHttpServer())
    //   .post('/auth/sign-up')
    //   .send(signUpData)
    //   .expect(201)
    //   .expect((res) => {
    //     expect(res.body).toMatchObject({
    //       id: expect.any(Number),
    //       username: signUpData.username,
    //       email: signUpData.email,
    //       avatar: expect.any(String),
    //       cover: expect.any(String),
    //       uniqueName: expect.any(String),
    //       bio: expect.any(String),
    //       location: expect.any(String),
    //       website: expect.any(String),
    //       createdAt: expect.any(String),
    //       updatedAt: expect.any(String),
    //     });
    //   });
  });
});
