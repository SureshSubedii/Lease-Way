import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';
import { UserDto } from './dto/user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Otp } from 'src/otp/otp.entity';
import { SentMessageInfo } from 'nodemailer';

describe('UserService', () => {
  let userService: UserService;
  let otpService: Partial<jest.Mocked<OtpService>>;
  let mailService: Partial<jest.Mocked<MailService>>;
  let userRepo: {
    findOne: jest.Mock<Promise<User | null>, [object]>;
    create: jest.Mock<User, [Partial<User>]>;
    save: jest.Mock<Promise<User>, [Partial<User>]>;
    findOneBy: jest.Mock<Promise<User | null>, [object]>;
  };

  beforeEach(async () => {
    userRepo = {
      findOne: jest.fn() as jest.Mock<Promise<User | null>, [object]>,
      create: jest.fn() as jest.Mock<User, [User]>,
      save: jest.fn() as jest.Mock<Promise<User>, [User]>,
      findOneBy: jest.fn() as jest.Mock<Promise<User | null>, [object]>,
    };

    const mailService = {
      sendMail: jest.fn().mockResolvedValue({} as SentMessageInfo),
    } as unknown as MailService;

    otpService = {
      generateOtp: jest.fn() as jest.Mock<Promise<string>, [User]>,
      verifyOtp: jest.fn() as jest.Mock<Promise<boolean>, [string, number]>,
    };

    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('signup', () => {
    it('should create a new user and send an OTP', async () => {
      const userDto: UserDto = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      userRepo.findOne.mockResolvedValue(null); // No user found
      const mockUser: Partial<User> = {
        id: 1,
        full_name: userDto.fullName,
        email: userDto.email,
        password: 'hashedPassword',
        contact: '123-456-7890',
        address: '123 Main St',
        is_active: false,
        otps: {} as Otp, // Mock an empty Otp object
        createdAt: new Date(),
        updated_at: new Date(),
      };
      userRepo.findOne.mockResolvedValue(new User());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...user } = mockUser;

      userRepo.save.mockResolvedValue(user as User);

      otpService.generateOtp.mockResolvedValue('123456');
      mailService.sendMail.mockResolvedValue;

      await userService.signup(userDto);

      expect(userRepo.findOne).toHaveBeenCalledWith({
        where: { email: userDto.email },
      });
      expect(userRepo.create).toHaveBeenCalledWith;
      expect(userRepo.save).toHaveBeenCalledWith({
        full_name: userDto.fullName,
        email: userDto.email,
        password: expect.any(String),
      });
      expect(otpService.generateOtp).toHaveBeenCalledWith({
        full_name: userDto.fullName,
        email: userDto.email,
        password: expect.any(String),
      });
      expect(mailService.sendMail).toHaveBeenCalledWith(
        userDto.email,
        '123456',
      );
    });

    it('should handle existing users and update them', async () => {
      const existingUser = {
        id: 1,
        email: 'john.doe@example.com',
        password: 'hashedPassword',
        full_name: 'John Doe ',
      } as User;
      const userDto: UserDto = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      userRepo.findOne.mockResolvedValue(existingUser);
      userRepo.create.mockReturnValue(new User());
      userRepo.save.mockResolvedValue(existingUser);
      otpService.generateOtp.mockResolvedValue('123456');
      mailService.sendMail.mockResolvedValue;

      await userService.signup(userDto);

      expect(userRepo.findOne).toHaveBeenCalledWith({
        where: { email: userDto.email },
      });
      expect(userRepo.create).not.toHaveBeenCalled(); // No creation should happen
      expect(userRepo.save).toHaveBeenCalledWith(existingUser);
      expect(otpService.generateOtp).toHaveBeenCalledWith(existingUser);
      expect(mailService.sendMail).toHaveBeenCalledWith(
        existingUser.email,
        '123456',
      );
    });
  });

  describe('verifyOtp', () => {
    it('should verify OTP and update user', async () => {
      const verifyOtpDto: VerifyOtpDto = {
        otp: '123456',
        uid: 1,
        contact: '123-456-7890',
        address: '123 Main St',
        role: UserRole.TENANT,
      };

      otpService.verifyOtp.mockResolvedValue(true);
      userRepo.findOneBy.mockResolvedValue({
        id: 1,
        is_active: false,
        contact: '',
        address: '',
      } as User);
      userRepo.save.mockResolvedValue({
        id: 1,
        is_active: true,
        contact: verifyOtpDto.contact,
        address: verifyOtpDto.address,
      } as User);

      const result = await userService.verifyOtp(verifyOtpDto);

      expect(otpService.verifyOtp).toHaveBeenCalledWith(
        verifyOtpDto.otp,
        verifyOtpDto.uid,
      );
      expect(userRepo.findOneBy).toHaveBeenCalledWith({ id: verifyOtpDto.uid });
      expect(userRepo.save).toHaveBeenCalledWith({
        id: 1,
        is_active: true,
        contact: verifyOtpDto.contact,
        address: verifyOtpDto.address,
      });
      expect(result).toBe(true);
    });

    it('should return false for invalid OTP', async () => {
      const verifyOtpDto: VerifyOtpDto = {
        otp: '123456',
        uid: 1,
        contact: '123-456-7890',
        address: '123 Main St',
        role: UserRole.TENANT,
      };

      otpService.verifyOtp.mockResolvedValue(false);

      const result = await userService.verifyOtp(verifyOtpDto);

      expect(otpService.verifyOtp).toHaveBeenCalledWith(
        verifyOtpDto.otp,
        verifyOtpDto.uid,
      );
      expect(userRepo.findOneBy).not.toHaveBeenCalled();
      expect(userRepo.save).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
