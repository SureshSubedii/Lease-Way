import { ExecutionContext, INestApplication } from '@nestjs/common';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as request from 'supertest';
import { OtpService } from '../otp/otp.service';
import { MailService } from '../mail/mail.service';
import { User } from './user.entity';
import { SentMessageInfo } from 'nodemailer';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';

describe('UserController', () => {
  let app: INestApplication;
  let userService: UserService;
  let userController: UserController;
  let otpService: Partial<jest.Mocked<OtpService>>;
  let mailService: Partial<jest.Mocked<MailService>>;
  let userRepo: {
    findOne: jest.Mock<Promise<User | null>, [object]>;
    create: jest.Mock<User, [Partial<User>]>;
    save: jest.Mock<Promise<User>, [Partial<User>]>;
    findOneBy: jest.Mock<Promise<User | null>, [object]>;
  };

  beforeAll(async () => {
    userRepo = {
      findOne: jest.fn() as jest.Mock<Promise<User | null>, [object]>,
      create: jest.fn() as jest.Mock<User, [User]>,
      save: jest.fn() as jest.Mock<Promise<User>, [User]>,
      findOneBy: jest.fn() as jest.Mock<Promise<User | null>, [object]>,
    };
    jest.clearAllMocks();

    mailService = {
      sendMail: jest.fn().mockResolvedValue({} as SentMessageInfo),
    };
    otpService = {
      generateOtp: jest.fn() as jest.Mock<Promise<string>, [User]>,
      verifyOtp: jest.fn() as jest.Mock<Promise<boolean>, [string, number]>,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepo,
        },
        {
          provide: MailService,
          useValue: mailService,
        },
        {
          provide: OtpService,
          useValue: otpService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn((context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            userId: 1,
            username: 'testuser',
            email: 'testuser@example.com',
          };
          return true;
        }),
      })
      .compile();
    app = module.createNestApplication();
    await app.init();
    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });
  afterAll(async () => {
    await app.close();
  });
  it('should define user controller and service', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });
  it('Should register user', async () => {
    const signupPayload: UserDto = {
      fullName: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };
    const newUser = {
      id: 1,
      email: 'testuser@example.com',
      password: expect.any(String),
      full_name: 'testuser',
    } as User;

    userRepo.create.mockReturnValue(new User());
    userRepo.save.mockResolvedValue(newUser);
    const response = await request(app.getHttpServer())
      .post('/user/signup')
      .send(signupPayload)
      .expect(201);
    expect(response.body).toHaveProperty(
      'message',
      'OTP sent to the mail address. Enter OTP to verify User',
    );
    expect(response.body).toHaveProperty('uid', newUser.id);
  });

  it('Should Auto login', async () => {
    await request(app.getHttpServer()).post('/user/auto-login').expect(201);
  });
});
