import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserRole } from '../user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Otp } from 'src/otp/otp.entity';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

describe('AuthModule', () => {
  let authService: AuthService;
  let authController: AuthController;
  let userRepo: {
    create: jest.Mock<User, [Partial<User>]>;
    save: jest.Mock<Promise<User>, [Partial<User>]>;
    findOneBy: jest.Mock<Promise<User | null>, [object]>;
  };

  beforeEach(async () => {
    userRepo = {
      create: jest.fn() as jest.Mock<User, [User]>,
      save: jest.fn() as jest.Mock<Promise<User>, [User]>,
      findOneBy: jest.fn() as jest.Mock<Promise<User | null>, [object]>,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepo,
        },
      ],
      controllers: [AuthController],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(authController).toBeDefined();
  });

  describe('googleSignup', () => {
    it('Should return jwt', async () => {
      const user = {
        email: 'hello@gmail.com',
        fullName: ' Hello Man',
      };
      const mockUser: User = {
        id: 1,
        full_name: user.fullName,
        email: user.email,
        password: 'hashedPassword',
        contact: '123-456-7890',
        address: '123 Main St',
        is_active: true,
        google: true,
        otps: {} as Otp,
        createdAt: new Date(),
        updated_at: new Date(),
        role: UserRole.TENANT,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...details } = mockUser;
      console.log(process.env.JWT_SECRET);
      const token = jwt.sign(details, process.env.JWT_SECRET);
      userRepo.findOneBy.mockResolvedValue(mockUser);
      userRepo.save.mockResolvedValue(mockUser);
      const result = await authService.googleSignup(user);
      expect(userRepo.findOneBy).toHaveBeenCalledWith({ email: user.email });
      expect(userRepo.create).not.toHaveBeenCalled();

      expect(result).toBe(token);
    });
  });
});
