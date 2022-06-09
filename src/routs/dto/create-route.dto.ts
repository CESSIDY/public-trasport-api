import {ApiProperty} from "@nestjs/swagger";

class LocationDto {
    @ApiProperty({example: 'Ee%332-Qe...-#@!dw2', description: 'Location ID'})
    readonly location_id: string;
    @ApiProperty({example: '1', description: 'Location order number'})
    readonly location_order: number;    
}

export class CreateRouteDto {
    @ApiProperty({example: "12345", description: 'Any number, to indicate route'})
    readonly route_number: string;
    @ApiProperty({example: [{"location_id": "Ee%332-Qe...-#@!dw2", "location_order": 1}, {"location_id": "2e1312-qe...-Q3!4w%", "location_order": 2}], description: "Locations list"})
    readonly locations: LocationDto[];
}
