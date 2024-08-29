import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as request from 'supertest';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

describe('AuthController', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            googleSignup: jest.fn().mockResolvedValue('mockJwtToken'),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard('google'))
      .useValue({
        canActivate: jest.fn((context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            email: 'test@example.com',
            fullName: 'Test User',
          };
          return true;
        }),
      })
      .compile();

    app = moduleRef.createNestApplication();
    authService = moduleRef.get<AuthService>(AuthService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should set a cookie and redirect to the frontend with the correct query parameters', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/google/callback')
      .expect(302) // Check for redirection
      .expect(
        'Location',
        'http://localhost:5173/?error=false&email=test@example.com&username=Test%20User',
      );

    const cookies = response.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain('jwt=mockJwtToken');
  });

  it('should handle errors and redirect with error=true', async () => {
    // Simulate an error in the googleSignup method
    jest
      .spyOn(authService, 'googleSignup')
      .mockRejectedValueOnce(new Error('mockError'));

    const response = await request(app.getHttpServer())
      .get('/auth/google/callback')
      .expect(302) // Check for redirection
      .expect(
        'Location',
        'http://localhost:5173/?error=true&email=test@example.com&username=Test%20User',
      );

    // Ensure no cookie is set
    const cookies = response.headers['set-cookie'];
    expect(cookies).toBeUndefined();
  });
});
