import { Injectable } from '@nestjs/common';
import { IriQueryDto, IriValueDto } from './iri.dto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IriService {
  constructor(private readonly httpService: HttpService) {}

  async iri(iriQueryDto: IriQueryDto): Promise<IriValueDto> {
    const datetime = new Date(iriQueryDto.datetime);
    const vtec = await this.scrapeVtecIri2020CcmcInstantRun(
      datetime,
      iriQueryDto.latitude,
      iriQueryDto.longitude,
      iriQueryDto.f107
    );

    return {
      datetime: iriQueryDto.datetime,
      latitude: iriQueryDto.latitude,
      longitude: iriQueryDto.longitude,
      f107: iriQueryDto.f107,
      vtec: vtec != null ? vtec : null,
    };
  }

  private async scrapeVtecIri2020CcmcInstantRun(
    datetime: Date,
    latitude: number,
    longitude: number,
    f107: number
  ): Promise<number> {
    dayjs.extend(utc);
    const url = 'https://kauai.ccmc.gsfc.nasa.gov/instantrun/api/iri/2020/';
    const utcDatetimeString = dayjs(datetime)
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss.000[Z]');
    const data = {
      timeType: 'ut',
      datetime: utcDatetimeString,
      coordinateType: 'geo',
      lat: latitude,
      lon: longitude < 0 ? 360 + longitude : longitude, // Longitude needs to be in between 0 and 360
      height: 300,
      profileType: 1,
      start: 0,
      stop: 1000,
      step: 10,
      tecUpper: 2000,
      tecLower: 50,
      outputType: 0,
      useOptionals: f107 != null,
      layVersion: false,
      NeTopside: 'NeQuick',
      fof2Model: 'URSI-88',
      fof2Storm: true,
      NeTopsideStorm: false,
      hmF2Model: 'AMTB-model',
      bottomsideThicknessB0: 'ABT-2009',
      F1Model: 'Scotto-1997-no-L',
      EPeakAuroralStorm: false,
      D: 'IRI-1990',
      Te: 'TBT-2012_PF107',
      Ti: 'Tru-2021',
      ionCompModel: 'RBV10/TBT15',
      auroralBoundaryModel: false,
      F107D: f107 != null ? f107 : undefined,
    };

    const response = await firstValueFrom(
      this.httpService.post<{ txt: string }>(url, data)
    );
    const outputUrl = response.data.txt;
    const output = await firstValueFrom(this.httpService.get(outputUrl));
    const lines = output.data.split('\n');
    if (lines.length < 67) {
      return null;
    }
    const line67 = lines[66]; // Line 67 (0-based index)
    if (line67.length < 77) {
      return null;
    }
    const value = line67.substring(70, 77).trim();
    try {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
