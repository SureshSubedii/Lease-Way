import {
  ConflictException,
  ExecutionContext,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../src/auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const newUser = {
      email: 'test@example.com',
      fullName: 'Test User',
    };
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
          req.user = newUser;
          return true;
        }),
      })
      .compile();

    app = moduleRef.createNestApplication();
    authService = moduleRef.get<AuthService>(AuthService);
    await app.init();
  });

  it('should set a cookie and redirect to the URl  with the correct query parameters', () => {
    return request(app.getHttpServer())
      .get('/auth/google/callback')
      .expect(302)
      .expect(
        'Location',
        'http://localhost:5173/?error=false&email=test@example.com&username=Test%20User',
      )
      .expect(({ headers }) => {
        expect(headers['set-cookie'][0]).toContain('jwt=mockJwtToken');
      });
  });
  it('should not set  cookie and redirect to the url with error = true', () => {
    jest
      .spyOn(authService, 'googleSignup')
      .mockRejectedValue(
        new ConflictException({ message: 'User Already Exists' }),
      );

    return request(app.getHttpServer())
      .get('/auth/google/callback')
      .expect(302)
      .expect(
        'Location',
        'http://localhost:5173/?error=true&email=test@example.com&username=Test%20User',
      )
      .expect(({ headers }) => {
        expect(headers['set-cookie']).toBeUndefined();
      });
  });
});
