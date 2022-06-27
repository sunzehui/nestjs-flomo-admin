import { Module } from '@nestjs/common';
import { LoginModule } from '../login/login.module';
import { SystemModule } from '../system/system.module';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import StatisticEntity from '@/entities/flomo/Statistic';
import TagEntity from '@/entities/flomo/Tag';
import ArticleEntity from '@/entities/flomo/Article';
import { ArticleService } from './article.service';
import UserEntity from '@/entities/flomo/User';
@Module({
    imports: [
        SystemModule,
        LoginModule,
        TypeOrmModule.forFeature([StatisticEntity, ArticleEntity, TagEntity, UserEntity]),
    ],
    providers: [ArticleService],
    controllers: [ArticleController],
})
export class ArticleModule {}
