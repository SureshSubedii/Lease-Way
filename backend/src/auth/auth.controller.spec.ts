import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConflictException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CustomRequest } from 'src/types/types';

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;
  let mockRes: Partial<Response>;
  let mockReq: Partial<CustomRequest>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    mockRes = {
      redirect: jest.fn(),
      cookie: jest.fn(),
    };

    mockReq = {
      user: {
        email: 'test@example.com',
        fullName: 'Test User',
      },
    };

    jest.clearAllTimers();
    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should set a cookie and redirect to the frontend with the correct query parameters', async () => {
    await authController.googleAuthRedirect(mockReq, mockRes);

    expect(mockRes.redirect).toHaveBeenCalledWith(
      'http://localhost:5173/?error=false&email=test@example.com&username=Test User',
    );
    expect(mockRes.cookie).toHaveBeenCalledWith('jwt', 'mockJwtToken', {
      httpOnly: true,
      secure: false,
      path: '/',
      expires: expect.any(Date),
    });
  });

  it('should handle errors and redirect with error=true and not set the cookie', async () => {
    jest
      .spyOn(authService, 'googleSignup')
      .mockRejectedValueOnce(
        new ConflictException({ message: 'User Already exists' }),
      );

    await authController.googleAuthRedirect(mockReq, mockRes);

    expect(mockRes.redirect).toHaveBeenCalledWith(
      'http://localhost:5173/?error=true&email=test@example.com&username=Test User',
    );
    expect(mockRes.cookie).not.toHaveBeenCalled();
  });
});
