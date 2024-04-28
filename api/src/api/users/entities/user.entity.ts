import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base/base.entity';
import { Profile } from './profile.entity';
import { Claims } from './claims.entity';
import { Role } from '../../../security/permit/roles/roles.enum';
import { Blog } from '../../blogs/entities/blog.entity';
import { Social } from '../../socials/entities/social.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false })
  username: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.Member] })
  roles: Role[];

  @Column({ nullable: true })
  verifyToken: string;

  @Column({ nullable: true })
  loginKey: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToOne(() => Claims, (claims) => claims.user)
  claims: Claims;

  @OneToOne(() => Blog, (blog) => blog.user)
  blog: Blog;

  @OneToOne(() => Social, (social) => social.user)
  social: Social;
}
