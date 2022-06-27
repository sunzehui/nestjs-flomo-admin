import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import Statistic from './Statistic';
import Tag from './Tag';

@Entity('article', { schema: 'flomo' })
export default class Article {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'content', length: 255 })
    content: string;

    @DeleteDateColumn()
    deleteTime: Date | null;

    @Column('datetime', { name: 'createTime' })
    createTime: Date;

    @Column('datetime', { name: 'updateTime' })
    updateTime: Date;

    @Column('tinyint', { name: 'is_topic', default: () => "'0'" })
    isTopic: number;

    @ManyToOne(() => User, (user) => user.articles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;

    @OneToMany(() => Statistic, (statistic) => statistic.article)
    statistics: Statistic[];

    @ManyToMany(() => Tag, (tag) => tag.articles)
    @JoinTable({
        name: 'article_tag',
        joinColumns: [{ name: 'article', referencedColumnName: 'id' }],
        inverseJoinColumns: [{ name: 'tag', referencedColumnName: 'id' }],
        schema: 'flomo',
    })
    tags: Tag[];
}
