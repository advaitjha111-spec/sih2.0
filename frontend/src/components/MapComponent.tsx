"use client";

import { useState } from "react";
import Map, { Source, Layer, NavigationControl, Marker } from "react-map-gl/mapbox";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Activity, Map as MapIcon, Layers, Camera, Route } from "lucide-react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// 1. Critical Risk Zone (Dima Hasao)
const DEMO_ZONES = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Polygon", coordinates: [[[92.9, 25.1], [93.1, 25.1], [93.1, 25.3], [92.9, 25.3], [92.9, 25.1]]] },
      properties: { id: 1, name: "Dima Hasao District Zone", risk: "Critical", score: 85 }
    }
  ]
};

// 2. Escape Route
const ESCAPE_ROUTE = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [93.018, 25.176], // Dima Hasao Center
          [93.05, 25.15],
          [93.10, 25.10], // Safe Zone
        ]
      },
      properties: { name: "Primary Evacuation Route" }
    }
  ]
};

const riskLayerStyle = {
  id: "risk-zones",
  type: "fill",
  paint: {
    "fill-color": ["match", ["get", "risk"], "Critical", "#ef4444", "High", "#f97316", "Medium", "#eab308", "#22c55e"],
    "fill-opacity": 0.4
  }
};

const riskOutlineStyle = {
  id: "risk-zones-outline",
  type: "line",
  paint: {
    "line-color": ["match", ["get", "risk"], "Critical", "#ef4444", "High", "#f97316", "Medium", "#eab308", "#22c55e"],
    "line-width": 2
  }
};

const escapeRouteStyle = {
  id: "escape-route-line",
  type: "line",
  paint: {
    "line-color": "#3b82f6", // Blue for escape route
    "line-width": 4,
    "line-dasharray": [2, 2]
  }
};

export default function DashboardMap() {
  const [viewState, setViewState] = useState({
    longitude: 93.018,
    latitude: 25.176,
    zoom: 9,
    pitch: 65,
    bearing: -20
  });

  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const [is3D, setIs3D] = useState(true);
  const [showUploadMsg, setShowUploadMsg] = useState(false);

  const onHover = (event: any) => {
    const { features, point } = event;
    const hoveredFeature = features && features[0];
    if (hoveredFeature) {
      setHoverInfo({ feature: hoveredFeature, x: point.x, y: point.y });
    } else {
      setHoverInfo(null);
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-900">
      
      {/* Map Controls */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-auto">
        <div className="flex bg-[#111827]/80 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-2xl">
          <button 
            onClick={() => {
              setIs3D(false);
              setViewState(v => ({ ...v, pitch: 0, bearing: 0 }));
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${!is3D ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <MapIcon className="w-4 h-4" /> 2D Map
          </button>
          <button 
            onClick={() => {
              setIs3D(true);
              setViewState(v => ({ ...v, pitch: 65 }));
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${is3D ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Layers className="w-4 h-4" /> 3D Digital Twin
          </button>
        </div>
        
        <button 
          onClick={() => {
            setShowUploadMsg(true);
            setTimeout(() => setShowUploadMsg(false), 3000);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg font-bold text-sm transition-all border border-emerald-400"
        >
          <Camera className="w-4 h-4" /> Add Geotagged Photo
        </button>
      </div>

      {showUploadMsg && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-emerald-900 text-white px-6 py-3 rounded-xl shadow-2xl border border-emerald-500 animate-pulse font-bold">
          Camera interface opened (Simulated)
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-10 left-6 z-20 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl pointer-events-none">
        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Map Legend</h4>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 bg-red-500/40 border-2 border-red-500 rounded"></div>
          <span className="text-slate-300 text-xs font-medium">Critical Risk Zone</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-0 border-b-2 border-dashed border-blue-500"></div>
          <span className="text-slate-300 text-xs font-medium">Evacuation Route</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <Activity className="w-2 h-2 text-white" />
          </div>
          <span className="text-slate-300 text-xs font-medium">Active Sensor</span>
        </div>
      </div>

      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['risk-zones', 'escape-route-line']}
        onMouseMove={onHover}
        terrain={{source: 'mapbox-dem', exaggeration: is3D ? 1.5 : 0}}
      >
        <NavigationControl position="bottom-right" />
        
        <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />

        <Source id="risk-data" type="geojson" data={DEMO_ZONES as any}>
          <Layer {...(riskLayerStyle as any)} />
          <Layer {...(riskOutlineStyle as any)} />
        </Source>

        <Source id="escape-route" type="geojson" data={ESCAPE_ROUTE as any}>
          <Layer {...(escapeRouteStyle as any)} />
        </Source>

        <Marker longitude={93.018} latitude={25.176} anchor="center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-10 h-10 bg-red-500/40 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-slate-900 border-2 border-red-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,1)] cursor-pointer hover:scale-110 transition-transform">
                <Activity className="w-3 h-3 text-red-400" />
              </div>
            </div>
          </div>
        </Marker>

        <Marker longitude={93.10} latitude={25.10} anchor="center">
          <div className="bg-blue-600 p-1.5 rounded-full border border-white shadow-lg cursor-pointer">
            <Route className="w-4 h-4 text-white" />
          </div>
        </Marker>

        {hoverInfo && (
          <div 
            className="absolute z-10 bg-slate-950/90 border border-slate-800 text-slate-200 p-3 rounded shadow-xl backdrop-blur-sm pointer-events-none"
            style={{ left: hoverInfo.x + 15, top: hoverInfo.y + 15 }}
          >
            <div className="font-bold text-sm mb-1">{hoverInfo.feature.properties.name}</div>
            {hoverInfo.feature.properties.risk && (
              <div className="text-xs text-slate-400">
                Risk Level: <span className={`font-semibold ${hoverInfo.feature.properties.risk === 'Critical' ? 'text-red-400' : 'text-orange-400'}`}>{hoverInfo.feature.properties.risk}</span>
              </div>
            )}
            {hoverInfo.feature.properties.score && (
              <div className="text-xs text-slate-400">Score: {hoverInfo.feature.properties.score}/100</div>
            )}
          </div>
        )}
      </Map>
    </div>
  );
}



