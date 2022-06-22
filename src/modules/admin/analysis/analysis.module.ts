import { Module } from '@nestjs/common';
import { LoginModule } from '../login/login.module';
import { SystemModule } from '../system/system.module';
import { AnalysisController } from './analysis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import StatisticEntity from '@/entities/flomo/Statistic';
import TagEntity from '@/entities/flomo/Tag';
import ArticleEntity from '@/entities/flomo/Article';
import { AnalysisService } from './analysis.service';
import UserEntity from '@/entities/flomo/User';
@Module({
  imports: [
    SystemModule,
    LoginModule,
    TypeOrmModule.forFeature([StatisticEntity, ArticleEntity, TagEntity, UserEntity]),
  ],
  providers: [AnalysisService],
  controllers: [AnalysisController],
})
export class AnalysisModule {}
