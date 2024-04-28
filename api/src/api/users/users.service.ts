import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { Claims } from './entities/claims.entity';
import { SocialsService } from '../socials/socials.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Claims) public claimsRepository: Repository<Claims>,
    private socialService: SocialsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const profile = this.profileRepository.create(createUserDto.profile);
    const savedProfile = await this.profileRepository.save(profile);

    const claims = this.claimsRepository.create(createUserDto.claims);
    const savedClaims = await this.claimsRepository.save(claims);

    const user = this.userRepository.create(createUserDto);
    user.profile = savedProfile;
    user.claims = savedClaims;

    const savedUser = await this.userRepository.save(user);

    const social = await this.socialService.create(savedUser);

    return savedUser;
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.claims', 'claims')
      .select([
        'user.username',
        'user.email',
        'user.id',
        'profile.bio',
        'profile.avatar',
        'profile.cover',
        'claims.isVerified',
        'claims.isFeatured',
        'claims.isStaff',
      ])
      .getMany();
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      select: ['username', 'email', 'id'], // Add other fields as needed
    });
  }

  async findByEmail(
    email: string,
    relations?: string[],
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email }, relations });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'claims'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.profileRepository.delete(user.profile.id);
    await this.claimsRepository.delete(user.claims.id);

    return this.userRepository.delete(id);
  }

  async getProfile(req) {
    return this.userRepository.findOne({
      where: { id: req.user.id },
      relations: ['profile', 'claims'],
    });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByVerificationToken(token: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { verifyToken: token },
      relations: ['claims'],
    });
  }

  async update(req, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
      relations: ['profile', 'claims'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Update the user's profile and claims if they are provided in updateUserDto
    if (updateUserDto.profile) {
      Object.assign(user.profile, updateUserDto.profile);
      await this.profileRepository.save(user.profile); // Save the Profile entity
    }
    if (updateUserDto.claims) {
      Object.assign(user.claims, updateUserDto.claims);
      await this.claimsRepository.save(user.claims); // Save the Claims entity
    }

    // Update the rest of the user fields
    const updatedUser = { ...user, ...updateUserDto };
    return this.userRepository.save(updatedUser);
  }

  async findOneUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
