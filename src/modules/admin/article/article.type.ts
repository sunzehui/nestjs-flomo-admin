import { ApiProperty } from '@nestjs/swagger';

export class ArticleData {
    @ApiProperty({
        type: String,
        description: '作者',
    })
    author: string;

    @ApiProperty()
    id: string;

    @ApiProperty({
        type: String,
        description: '内容',
    })
    content: string;

    @ApiProperty({
        type: String,
        description: '发布时间',
    })
    createTime: string;
}
export type ArticleDataList = ArticleData[];

export interface ArticleDTO {
    content: string;
}
