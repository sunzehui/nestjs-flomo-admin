import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import StatisticEntity from '@/entities/flomo/Statistic';
import { AnalysisDataList, PushRecordDataList } from './analysis.vo';
import ArticleEntity from '@/entities/flomo/Article';
import TagEntity from '@/entities/flomo/Tag';

@Injectable()
export class AnalysisService {
    constructor(
        @InjectRepository(StatisticEntity)
        private statisticRepository: Repository<StatisticEntity>,
        @InjectRepository(ArticleEntity)
        private articleRepository: Repository<ArticleEntity>,
        @InjectRepository(TagEntity)
        private tagRepository: Repository<TagEntity>,
    ) {}

    async getState(): Promise<AnalysisDataList> {
        const totalPush = {
            title: '总文章数量',
            value: await this.articleRepository.count(),
            icon: 'write|svg',
        };
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const todayOnline = {
            title: '今日活跃',
            value: await this.statisticRepository.count({
                date: today,
            }),
            icon: 'number|svg',
        };

        const totalTag = {
            title: '总标签数量',
            value: await this.tagRepository.count(),
            icon: 'tag|svg',
        };
        const totalView = {
            title: '总访问量',
            value: 888,
            icon: 'visit-count|svg',
        };
        return [totalPush, todayOnline, totalTag, totalView];
    }

    // : Promise<PushRecordDataList>
    async getPushRecord() {
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const record = await this.statisticRepository
            .createQueryBuilder()
            .groupBy('date')
            .getMany();
        return record;
    }
}
