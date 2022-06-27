import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import StatisticEntity from '@/entities/flomo/Statistic';
import ArticleEntity from '@/entities/flomo/Article';
import TagEntity from '@/entities/flomo/Tag';
import { ArticleDTO } from './article.type';
@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(StatisticEntity)
        private statisticRepository: Repository<StatisticEntity>,
        @InjectRepository(ArticleEntity)
        private articleRepository: Repository<ArticleEntity>,
        @InjectRepository(TagEntity)
        private tagRepository: Repository<TagEntity>,
    ) {}
    async list(_query: Record<string, number | string>, page, pageSize) {
        const queryBuilder = this.articleRepository
            .createQueryBuilder('article')
            .select([
                'article.id as id',
                'article.createTime as create_time',
                'article.content as content',
                'article.is_topic as is_topic',
                'user.username as author',
            ])
            .leftJoin('article.user', 'user')
            .offset((page - 1) * pageSize)
            .limit(pageSize);
        const { author, content, ...query } = _query;
        if (author) {
            queryBuilder.andWhere('user.username = :author', { author });
        }
        if (content) {
            queryBuilder.andWhere('article.content like :content', { content: `%${content}%` });
        }
        queryBuilder.andWhere(query);

        return await queryBuilder.getRawMany();
    }
    async detail(id: string) {
        // const queryBuilder = this.articleRepository
        //     .createQueryBuilder('article')
        //     .select([
        //         'article.id as id',
        //         'article.createTime as create_time',
        //         'article.content as content',
        //         'article.is_topic as is_topic',
        //         'user.username as author',
        //     ])
        //     .where({ id })
        //     .leftJoin('article.user', 'user')
        //     .getRawMany();

        const queryBuilder = this.articleRepository.findOne(id, {
            relations: ['user', 'tags'],
        });
        const articleEntity = await queryBuilder;

        const articleVO = {
            id: articleEntity.id,
            content: articleEntity.content,
            deleteTime: articleEntity.deleteTime,
            createTime: articleEntity.createTime,
            updateTime: articleEntity.updateTime,
            isTopic: articleEntity.isTopic,
            author: articleEntity.user.username,
            tags: articleEntity.tags,
        };

        return articleVO;
    }

    async del(id: string) {
        const queryBuilder = this.articleRepository.softDelete(id);

        return await queryBuilder;
    }

    async update(id: string, articleDto: ArticleDTO) {
        const queryBuilder = this.articleRepository.softDelete(id);
        return await queryBuilder;
    }
}
