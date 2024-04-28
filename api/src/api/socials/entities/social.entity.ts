import { BaseEntity } from '../../../database/base/base.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Posts } from './post.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Social extends BaseEntity {
  @OneToOne(() => User, (user) => user.social)
  @JoinColumn()
  user: User;

  @OneToMany(() => Posts, (posts) => posts.social)
  posts: Posts[];
}
