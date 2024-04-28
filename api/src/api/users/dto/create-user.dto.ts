import { CreateProfileDto } from './create-profile.dto';
import { CreateClaimsDto } from './create-claims.dto';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  profile: CreateProfileDto;
  claims: CreateClaimsDto;
}
