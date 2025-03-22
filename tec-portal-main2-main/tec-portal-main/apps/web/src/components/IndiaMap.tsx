import React, { useState } from 'react';
import { MapContainer, TileLayer, Popup, GeoJSON, Tooltip, Pane } from 'react-leaflet';
import DatePicker from 'react-datepicker';
import 'leaflet/dist/leaflet.css';
import 'react-datepicker/dist/react-datepicker.css';
import './IndiaMap.css';

interface GridCell {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][]; // Coordinates in GeoJSON format
  };
  properties: {
    label: string;
    tec: number | null; // TEC value or null if unavailable
  };
}

const IndiaMap: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [clickedCell, setClickedCell] = useState<GridCell | null>(null);

  const position: [number, number] = [20.5937, 78.9629]; // Center of India

  const indiaBounds: [[number, number], [number, number]] = [
    [6.5546, 68.1114], // Southwest
    [35.6745, 97.3954], // Northeast
  ];

  // Generate grid data with TEC values
  const generateGridData = (): GridCell[] => {
    const grids: GridCell[] = [];
    const latStep = 5;
    const lonStep = 5;

    for (let lat = indiaBounds[0][0]; lat < indiaBounds[1][0]; lat += latStep) {
      for (let lon = indiaBounds[0][1]; lon < indiaBounds[1][1]; lon += lonStep) {
        grids.push({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [lon, lat],
                [lon, lat + latStep],
                [lon + lonStep, lat + latStep],
                [lon + lonStep, lat],
                [lon, lat],
              ],
            ],
          },
          properties: {
            label: `(${lat.toFixed(1)}, ${lon.toFixed(1)})`,
            tec: Math.random() > 0.2 ? parseFloat((Math.random() * 100).toFixed(2)) : null, // Random TEC or null
          },
        });
      }
    }
    return grids;
  };

  const gridData = generateGridData();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const adjustDate = (adjustment: 'day' | 'hour' | 'current' | 'next-day' | 'next-hour') => {
    if (!selectedDate) return;

    const newDate = new Date(selectedDate);

    switch (adjustment) {
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'hour':
        newDate.setHours(newDate.getHours() - 1);
        break;
      case 'current':
        setSelectedDate(new Date());
        return;
      case 'next-day':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'next-hour':
        newDate.setHours(newDate.getHours() + 1);
        break;
      default:
        break;
    }

    setSelectedDate(newDate);
  };

  const isFutureDate = (date: Date) => date > new Date();
  const isPastDate = (date: Date) => date < new Date();

  return (
    <div className="map-wrapper">
      <h2>
        {selectedDate
          ? `Selected Date: ${selectedDate.toLocaleDateString()} ${selectedDate.toLocaleTimeString()}`
          : 'Select a Date'}
      </h2>

      <MapContainer
        center={position}
        zoom={5}
        minZoom={5}
        maxZoom={10}
        maxBounds={indiaBounds}
        maxBoundsViscosity={1.0}
        className="leaflet-container"
      >
        <Pane name="grid-pane" style={{ zIndex: 200 }} />
        <Pane name="tooltip-pane" style={{ zIndex: 600 }} />

        {gridData.map((grid, index) => (
          <GeoJSON
            key={index}
            data={grid}
            style={{
              color: '#000000',
              weight: 1,
              fillOpacity: 0,
            }}
            pane="grid-pane"
            onClick={() => setClickedCell(grid)}
          >
            <Tooltip pane="tooltip-pane">
              {isFutureDate(selectedDate!) ? (
                'Data not available'
              ) : grid.properties.tec !== null ? (
                `TEC: ${grid.properties.tec.toFixed(2)}`
              ) : (
                'No data available for this cell'
              )}
            </Tooltip>
          </GeoJSON>
        ))}

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://carto.com/attributions">CARTO</a>'
        />

        {clickedCell && (
          <Popup position={clickedCell.geometry.coordinates[0][0]}>
            <div>
              <p>Grid Label: {clickedCell.properties.label}</p>
              {isFutureDate(selectedDate!) ? (
                <p>Data not available for future dates</p>
              ) : clickedCell.properties.tec !== null ? (
                <p>TEC Value: {clickedCell.properties.tec.toFixed(2)}</p>
              ) : (
                <p>No data available for this cell</p>
              )}
            </div>
          </Popup>
        )}
      </MapContainer>

      <div className="button-wrapper">
        <button onClick={() => adjustDate('day')}>&lt;&lt;</button>
        <button onClick={() => adjustDate('hour')}>&lt;</button>
        <button onClick={() => adjustDate('current')}>CURRENT</button>
        <button onClick={() => adjustDate('next-hour')}>&gt;</button>
        <button onClick={() => adjustDate('next-day')}>&gt;&gt;</button>
      </div>

      <div className="date-picker-wrapper">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText="Select a date"
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          timeIntervals={60}
        />
      </div>
    </div>
  );
};

export default IndiaMap;
