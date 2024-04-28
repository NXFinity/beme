import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base/base.entity';
import { Social } from './social.entity';

@Entity()
export class Posts extends BaseEntity {
  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true })
  content: string;
  @Column({ nullable: true })
  isPublished: boolean;

  @ManyToOne(() => Social, (social) => social.posts)
  social: Social;
}
