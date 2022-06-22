import { ApiProperty } from '@nestjs/swagger';

export class AnalysisData {
    @ApiProperty()
    title: string;
    @ApiProperty()
    value: number;
}
export type AnalysisDataList = AnalysisData[];

export class PushRecordData {
    @ApiProperty()
    time: Date;

    @ApiProperty()
    value: Number;
}
export type PushRecordDataList = PushRecordData[];
