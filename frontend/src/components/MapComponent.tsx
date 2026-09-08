"use client";

import { useState, useMemo, useEffect } from "react";
import Map, { Source, Layer, NavigationControl, Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertTriangle, Activity, MapPin } from "lucide-react";

// You should put your token in .env.local as NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Demo data for North Eastern Region
const DEMO_ZONES = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [88.4, 27.4], [88.6, 27.4], [88.6, 27.6], [88.4, 27.6], [88.4, 27.4]
          ]
        ]
      },
      properties: { id: 1, name: "Mangan District Zone", risk: "Critical", score: 85 }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [91.6, 26.0], [91.8, 26.0], [91.8, 26.2], [91.6, 26.2], [91.6, 26.0]
          ]
        ]
      },
      properties: { id: 2, name: "Guwahati Hills", risk: "High", score: 72 }
    }
  ]
};

const riskLayerStyle = {
  id: "risk-zones",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", "risk"],
      "Critical", "#ef4444",
      "High", "#f97316",
      "Medium", "#eab308",
      "#22c55e"
    ],
    "fill-opacity": 0.4
  }
};

const riskOutlineStyle = {
  id: "risk-zones-outline",
  type: "line",
  paint: {
    "line-color": [
      "match",
      ["get", "risk"],
      "Critical", "#ef4444",
      "High", "#f97316",
      "Medium", "#eab308",
      "#22c55e"
    ],
    "line-width": 2
  }
};

export default function DashboardMap() {
  const [viewState, setViewState] = useState({
    longitude: 92.93, // Centered roughly on NER India
    latitude: 26.20,
    zoom: 6,
    pitch: 45,
    bearing: 0
  });

  const [hoverInfo, setHoverInfo] = useState<any>(null);

  const onHover = (event: any) => {
    const { features, point } = event;
    const hoveredFeature = features && features[0];
    
    if (hoveredFeature) {
      setHoverInfo({
        feature: hoveredFeature,
        x: point.x,
        y: point.y
      });
    } else {
      setHoverInfo(null);
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-900">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['risk-zones']}
        onMouseMove={onHover}
      >
        <NavigationControl position="bottom-right" />
        
        <Source id="risk-data" type="geojson" data={DEMO_ZONES as any}>
          <Layer {...(riskLayerStyle as any)} />
          <Layer {...(riskOutlineStyle as any)} />
        </Source>

        {/* Example Sensor Marker */}
        <Marker longitude={88.51} latitude={27.53} anchor="bottom">
          <div className="w-8 h-8 bg-slate-900 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(8,145,178,0.8)] cursor-pointer group hover:scale-110 transition-transform">
            <Activity className="w-4 h-4 text-cyan-400 group-hover:animate-pulse" />
          </div>
        </Marker>

        {hoverInfo && (
          <div 
            className="absolute z-10 bg-slate-950/90 border border-slate-800 text-slate-200 p-3 rounded shadow-xl backdrop-blur-sm pointer-events-none"
            style={{ left: hoverInfo.x + 15, top: hoverInfo.y + 15 }}
          >
            <div className="font-bold text-sm mb-1">{hoverInfo.feature.properties.name}</div>
            <div className="text-xs text-slate-400">
              Risk Level: <span className={`font-semibold ${
                hoverInfo.feature.properties.risk === 'Critical' ? 'text-red-400' : 'text-orange-400'
              }`}>{hoverInfo.feature.properties.risk}</span>
            </div>
            <div className="text-xs text-slate-400">Score: {hoverInfo.feature.properties.score}/100</div>
          </div>
        )}
      </Map>
    </div>
  );
}
