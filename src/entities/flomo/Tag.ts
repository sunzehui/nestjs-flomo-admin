import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import Article from './Article';

@Index('IDX_07771366a3cc57085e9055a15b', ['content'], { unique: true })
@Entity('tag', { schema: 'flomo' })
export default class Tag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'content', unique: true, length: 255 })
  content: string;

  @Column('tinyint', { name: 'is_topics', default: () => "'0'" })
  isTopics: number;

  @Column('datetime', { name: 'deleteTime', nullable: true })
  deleteTime: Date | null;

  @ManyToOne(() => User, (user) => user.tags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
