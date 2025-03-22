import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const stations = [
  {
    code: 'bhpl',
    igsCode: 'BHPL00IND',
    latitude: 23.289,
    longitude: 77.467,
    elevation: 445.8,
    city: 'Bhopal',
    country: 'India',
    agency: 'ISRO',
  },
  {
    code: 'drdn',
    igsCode: 'DRDN00IND',
    latitude: 30.34,
    longitude: 78.041,
    elevation: 670.5,
    city: 'Dehradun',
    country: 'India',
    agency: 'ISRO',
  },
  {
    code: 'hyde',
    igsCode: 'HYDE00IND',
    latitude: 17.417,
    longitude: 78.551,
    elevation: 441.68,
    city: 'Hyderabad',
    country: 'India',
    agency: 'NGRI',
  },
  {
    code: 'iisc',
    igsCode: 'IISC00IND',
    latitude: 13.021,
    longitude: 77.57,
    elevation: 843.7145,
    city: 'Bangalore',
    country: 'India',
    agency: 'JPL',
  },
  {
    code: 'iitk',
    igsCode: 'IITK00IND',
    latitude: 26.521,
    longitude: 80.232,
    elevation: 71.7,
    city: 'Kanpur',
    country: 'India',
    agency: 'IITK',
  },
  {
    code: 'jdpr',
    igsCode: 'JDPR00IND',
    latitude: 26.207,
    longitude: 73.024,
    elevation: 168.2,
    city: 'Jodhpur',
    country: 'India',
    agency: 'ISRO',
  },
  {
    code: 'lck3',
    igsCode: 'LCK300IND',
    latitude: 26.912,
    longitude: 80.956,
    elevation: 64.2,
    city: 'Lucknow',
    country: 'India',
    agency: 'ISRO',
  },
  {
    code: 'lck4',
    igsCode: 'LCK400IND',
    latitude: 26.912,
    longitude: 80.956,
    elevation: 64.2,
    city: 'Lucknow',
    country: 'India',
    agency: 'ISRO',
  },
  {
    code: 'lhaz',
    igsCode: 'LHAZ00CHN',
    latitude: 29.6573,
    longitude: 91.104,
    elevation: 3622,
    city: 'Lhasa',
    country: 'China',
    agency: 'BKG',
  },
  {
    code: 'pbri',
    igsCode: 'PBRI00IND',
    latitude: 11.638,
    longitude: 92.712,
    elevation: -22.6,
    city: 'Port Blair',
    country: 'India',
    agency: 'ISRO',
  },
  {
    code: 'pbr4',
    igsCode: 'PBR400IND',
    latitude: 11.638,
    longitude: 92.712,
    elevation: -14.6,
    city: 'Port Blair',
    country: 'India',
    agency: 'ISRO',
  },
  {
    code: 'sgoc',
    igsCode: 'SGOC00LKA',
    latitude: 6.892,
    longitude: 79.874,
    elevation: -78.5,
    city: 'Colombo',
    country: 'Sri Lanka',
    agency: 'GFZ',
  },
  {
    code: 'shlg',
    igsCode: 'SHLG00IND',
    latitude: 25.674,
    longitude: 91.913,
    elevation: 1007.2,
    city: 'Shillong',
    country: 'India',
    agency: 'ISRO',
  },
  {
    code: 'cmum',
    igsCode: 'CMUM00THA',
    latitude: 18.761,
    longitude: 98.932,
    elevation: 308.962,
    city: 'Chiang Mai',
    country: 'Thailand',
    agency: 'JAXA',
  },
  {
    code: 'cpnm',
    igsCode: 'CPNM00THA',
    latitude: 10.725,
    longitude: 99.374,
    elevation: 9.143,
    city: 'Chumphon',
    country: 'Thailand',
    agency: 'JAXA',
  },
  {
    code: 'cusv',
    igsCode: 'CUSV00THA',
    latitude: 13.736,
    longitude: 100.534,
    elevation: 76.06,
    city: 'Patumwan',
    country: 'Thailand',
    agency: 'JPL',
  },
  {
    code: 'cuut',
    igsCode: 'CUUT00THA',
    latitude: 13.736,
    longitude: 100.534,
    elevation: 74.296,
    city: 'Chulalongkorn University',
    country: 'Thailand',
    agency: 'CU',
  },
  {
    code: 'anmg',
    igsCode: 'ANMG00MYS',
    latitude: 2.785,
    longitude: 101.507,
    elevation: 15.002,
    city: 'Putrajaya',
    country: 'Malaysia',
    agency: 'JAXA',
  },
  {
    code: 'brun',
    igsCode: 'BRUN00BRN',
    latitude: 4.971,
    longitude: 114.952,
    elevation: 90.669,
    city: 'Gadong',
    country: 'Brunei Darussalam',
    agency: 'JAXA',
  },
  {
    code: 'sin1',
    igsCode: 'SIN100SGP',
    latitude: 1.343,
    longitude: 103.679,
    elevation: 92.54,
    city: 'Singapore',
    country: 'Singapore',
    agency: 'DLR/GSOC',
  },
];

const regions = [{ name: 'India' }, { name: 'Malaysia' }, { name: 'Thailand' }];

const stationsRegions = [
  { stationCode: 'bhpl', regionName: 'India' },
  { stationCode: 'drdn', regionName: 'India' },
  { stationCode: 'hyde', regionName: 'India' },
  { stationCode: 'iisc', regionName: 'India' },
  { stationCode: 'iitk', regionName: 'India' },
  { stationCode: 'jdpr', regionName: 'India' },
  { stationCode: 'lck3', regionName: 'India' },
  { stationCode: 'lck4', regionName: 'India' },
  { stationCode: 'pbri', regionName: 'India' },
  { stationCode: 'pbr4', regionName: 'India' },
  { stationCode: 'shlg', regionName: 'India' },
  { stationCode: 'lhaz', regionName: 'India' },
  { stationCode: 'sgoc', regionName: 'India' },
  { stationCode: 'anmg', regionName: 'Malaysia' },
  { stationCode: 'brun', regionName: 'Malaysia' },
  { stationCode: 'sin1', regionName: 'Malaysia' },
  { stationCode: 'cmum', regionName: 'Thailand' },
  { stationCode: 'cpnm', regionName: 'Thailand' },
  { stationCode: 'cusv', regionName: 'Thailand' },
  { stationCode: 'cuut', regionName: 'Thailand' },
];

async function main() {
  for (const station of stations) {
    await prisma.station.upsert({
      where: { code: station.code },
      update: station,
      create: station,
    });
  }

  for (const region of regions) {
    await prisma.region.upsert({
      where: { name: region.name },
      update: region,
      create: region,
    });
  }

  const existingStationsRegions = await prisma.stationRegion.findMany({
    select: {
      station: {
        select: {
          id: true,
          code: true,
        },
      },
      region: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  for (const existingStationRegion of existingStationsRegions) {
    if (
      !stationsRegions.some(
        (stationRegion) =>
          stationRegion.stationCode === existingStationRegion.station.code &&
          stationRegion.regionName === existingStationRegion.region.name
      )
    ) {
      await prisma.stationRegion.delete({
        where: {
          stationId_regionId: {
            stationId: existingStationRegion.station.id,
            regionId: existingStationRegion.station.id,
          },
        },
      });
    }
  }

  for (const stationRegion of stationsRegions) {
    const station = await prisma.station.findUnique({
      where: { code: stationRegion.stationCode },
      select: { id: true },
    });
    const region = await prisma.region.findUnique({
      where: { name: stationRegion.regionName },
      select: { id: true },
    });
    if (!station || !region) {
      continue;
    }
    await prisma.stationRegion.upsert({
      where: {
        stationId_regionId: {
          stationId: station.id,
          regionId: region.id,
        },
      },
      update: {},
      create: {
        stationId: station.id,
        regionId: region.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
