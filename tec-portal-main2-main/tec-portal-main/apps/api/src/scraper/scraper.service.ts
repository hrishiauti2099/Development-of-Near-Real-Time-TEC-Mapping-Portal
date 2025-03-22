import { Injectable } from '@nestjs/common';
import { Client } from 'basic-ftp';
import LineBufferWritableStream from '../utils/line-buffer-writable-stream';

@Injectable()
export class ScraperService {
  private readonly nrCanCa = `ftp.seismo.nrcan.gc.ca`;
  private readonly fluxTableNrCanCa = `spaceweather/solar_flux/daily_flux_values/fluxtable.txt`;

  async getF107FluxTableNrCanCa(): Promise<{ datetime: Date; f107: number }[]> {
    const client = new Client();
    await client.access({ host: this.nrCanCa });
    const stream = new LineBufferWritableStream();
    await client.downloadTo(stream, this.fluxTableNrCanCa);
    client.close();

    return stream
      .getLines()
      .slice(2)
      .map((line) => {
        const [fluxDate, fluxTime, , , f107Str] = line.split(/\s+/);
        const datetime = new Date(
          Date.UTC(
            parseInt(fluxDate.substring(0, 4)),
            parseInt(fluxDate.substring(4, 6)) - 1, // Month is 0-indexed
            parseInt(fluxDate.substring(6, 8)),
            parseInt(fluxTime.substring(0, 2)),
            parseInt(fluxTime.substring(2, 4)),
            parseInt(fluxTime.substring(4, 6))
          )
        );
        return { datetime, f107: parseFloat(f107Str) };
      })
      .sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
  }
}
