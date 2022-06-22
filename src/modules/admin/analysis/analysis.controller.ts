import { AnalysisService } from './analysis.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ADMIN_PREFIX } from '@/modules/admin/admin.constants';
import { IAdminUser } from '../admin.interface';
import { AdminUser } from '../core/decorators/admin-user.decorator';
import { PermissionOptional } from '../core/decorators/permission-optional.decorator';
import { AnalysisData, AnalysisDataList } from './analysis.vo';

@ApiTags('统计分析模块')
@Controller('analysis')
export class AnalysisController {
    constructor(private analysisService: AnalysisService) {}

    @ApiOperation({ summary: '获取统计信息' })
    @ApiOkResponse({ type: AnalysisData })
    @PermissionOptional()
    @Get('state')
    async state(): Promise<AnalysisDataList> {
        return await this.analysisService.getState();
    }

    @ApiOperation({ summary: '获取统计信息' })
    @ApiOkResponse({ type: AnalysisData })
    @PermissionOptional()
    @Get('record')
    async pushRecord() {
        return await this.analysisService.getPushRecord();
    }
}
