import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const jwt = { signAsync: jest.fn().mockResolvedValue('signed-token') };
  const service = new AuthService(jwt as never);

  it('issues a token for the seeded pilot account', async () => {
    await expect(service.login({ username: 'johndoe', password: 'susiairtest' })).resolves.toEqual({ token: 'signed-token' });
  });

  it('rejects invalid credentials', async () => {
    await expect(service.login({ username: 'johndoe', password: 'wrong' })).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
