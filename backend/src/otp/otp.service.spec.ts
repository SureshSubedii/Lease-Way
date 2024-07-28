import { Test, TestingModule } from '@nestjs/testing';
import { OtpService } from './otp.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Otp } from './otp.entity';
import { User } from '../user/user.entity';
import { totp, authenticator } from 'otplib';

jest.mock('otplib', () => ({
  totp: {
    generate: jest.fn(),
    check: jest.fn(),
    options: {},
  },
  authenticator: {
    generateSecret: jest.fn(),
  },
}));

describe('OtpService', () => {
  let service: OtpService;
  let mockOtpRepository;

  beforeEach(async () => {
    mockOtpRepository = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    jest.clearAllMocks();
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpService,
        {
          provide: getRepositoryToken(Otp),
          useValue: mockOtpRepository,
        },
      ],
    }).compile();

    service = module.get<OtpService>(OtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateOtp', () => {
    it('should generate and save a new OTP', async () => {
      const user = new User();
      user.id = 1;

      const secret = 'SECRET';
      const otp = '123456';

      (authenticator.generateSecret as jest.Mock).mockReturnValue(secret);
      (totp.generate as jest.Mock).mockReturnValue(otp);
      mockOtpRepository.findOneBy.mockResolvedValue(null);
      mockOtpRepository.create.mockReturnValue({
        user_id: user,
        otp_secret: secret,
      });
      mockOtpRepository.save.mockResolvedValue({
        id: 1,
        user_id: user,
        otp_secret: secret,
      });

      const result = await service.generateOtp(user);

      expect(authenticator.generateSecret).toHaveBeenCalled();
      expect(totp.generate).toHaveBeenCalledWith(secret);
      expect(mockOtpRepository.findOneBy).toHaveBeenCalledWith({
        user_id: { id: user.id },
      });
      expect(mockOtpRepository.create).toHaveBeenCalled();
      expect(mockOtpRepository.save).toHaveBeenCalledWith({
        user_id: user,
        otp_secret: secret,
      });
      expect(result).toEqual(otp);
    });

    it('should update an existing OTP', async () => {
      const user = new User();
      user.id = 1;

      const secret = 'SECRET';
      const otp = '123456';

      const existingOtp = { id: 1, user_id: user, otp_secret: 'OLD_SECRET' };

      (authenticator.generateSecret as jest.Mock).mockReturnValue(secret);
      (totp.generate as jest.Mock).mockReturnValue(otp);
      mockOtpRepository.findOneBy.mockResolvedValue(existingOtp);
      mockOtpRepository.save.mockResolvedValue({
        id: 1,
        user_id: user,
        otp_secret: secret,
      });

      const result = await service.generateOtp(user);

      expect(authenticator.generateSecret).toHaveBeenCalled();
      expect(totp.generate).toHaveBeenCalledWith(secret);
      expect(mockOtpRepository.findOneBy).toHaveBeenCalledWith({
        user_id: { id: user.id },
      });
      expect(mockOtpRepository.create).not.toHaveBeenCalled();
      expect(mockOtpRepository.save).toHaveBeenCalledWith({
        ...existingOtp,
        user_id: user,
        otp_secret: secret,
      });
      expect(result).toEqual(otp);
    });
  });

  describe('verifyOtp', () => {
    it('should verify the OTP correctly', async () => {
      const user = new User();
      user.id = 1;

      const token = '123456';
      const secret = 'SECRET';

      mockOtpRepository.findOneBy.mockResolvedValue({
        user_id: user,
        otp_secret: secret,
      });
      (totp.check as jest.Mock).mockReturnValue(true);

      const result = await service.verifyOtp(token, user.id);

      expect(mockOtpRepository.findOneBy).toHaveBeenCalledWith({
        user_id: user,
      });
      expect(totp.check).toHaveBeenCalledWith(token, secret);
      expect(result).toBe(true);
    });

    it('should return false if OTP is incorrect', async () => {
      const user = new User();
      user.id = 1;

      const token = '123456';
      const secret = 'SECRET';

      mockOtpRepository.findOneBy.mockResolvedValue({
        user_id: user,
        otp_secret: secret,
      });
      (totp.check as jest.Mock).mockReturnValue(false);

      const result = await service.verifyOtp(token, user.id);

      expect(mockOtpRepository.findOneBy).toHaveBeenCalledWith({
        user_id: { id: user.id },
      });
      expect(totp.check).toHaveBeenCalledWith(token, secret);
      expect(result).toBe(false);
    });

    it('should be false if OTP not found', async () => {
      const user = new User();
      user.id = 1;

      const token = '123456';

      mockOtpRepository.findOneBy.mockResolvedValue(null);

      const result = await service.verifyOtp(token, user.id);

      expect(result).toBe(false);
      expect(mockOtpRepository.findOneBy).toHaveBeenCalledWith({
        user_id: { id: user.id },
      });
      expect(totp.check).not.toHaveBeenCalled();
    });
  });
});
