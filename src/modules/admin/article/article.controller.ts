import { ArticleService } from './article.service';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionOptional } from '../core/decorators/permission-optional.decorator';
import { ArticleData, ArticleDataList } from './article.type';
import { Authorize } from '../core/decorators/authorize.decorator';

@ApiTags('文章管理')
@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @ApiOperation({ summary: '文章列表查询' })
    @ApiOkResponse({ type: ArticleData })
    @PermissionOptional()
    @Get('list')
    async list(@Query() _query) {
        const { page = 1, pageSize = 10, _t, ...query } = _query;

        return await this.articleService.list(query, page, pageSize);
    }

    @ApiOperation({ summary: '删除文章' })
    @ApiOkResponse({ type: ArticleData })
    @PermissionOptional()
    @Delete(':id')
    async del(@Param('id') id) {
        return await this.articleService.del(id);
    }

    @ApiOperation({ summary: '文章详情' })
    @ApiOkResponse({ type: ArticleData })
    @PermissionOptional()
    @Get(':id')
    async detail(@Param('id') id) {
        return await this.articleService.detail(id);
    }
}
