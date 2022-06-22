import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Article from './Article';

@Entity('statistic', { schema: 'flomo' })
export default class Statistic {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'count' })
  count: number;

  @Column('date', { name: 'date' })
  date: string;

  @ManyToOne(() => User, (user) => user.statistics, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Article, (article) => article.statistics, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'articleId', referencedColumnName: 'id' }])
  article: Article;
}
