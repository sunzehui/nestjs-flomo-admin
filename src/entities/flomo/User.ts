import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Tag from './Tag';
import Article from './Article';
import Statistic from './Statistic';

@Index('IDX_78a916df40e02a9deb1c4b75ed', ['username'], { unique: true })
@Entity('user', { schema: 'flomo' })
export default class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'username', unique: true, length: 255 })
  username: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('int', { name: 'memo_count' })
  memoCount: number;

  @Column('int', { name: 'day_count' })
  dayCount: number;

  @Column('int', { name: 'tag_count' })
  tagCount: number;

  @Column('int', { name: 'month_sign_id' })
  monthSignId: number;

  @Column('varchar', { name: 'last_login', length: 255 })
  lastLogin: string;

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Statistic, (statistic) => statistic.user)
  statistics: Statistic[];
}
