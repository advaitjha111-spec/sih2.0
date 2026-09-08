from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Bhūmi Raksha API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Bhūmi Raksha API"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "bhumiraksha-api"}

# Risk Endpoints
@app.get("/api/risk/zones")
async def get_risk_zones():
    return {"zones": []}

@app.get("/api/risk/{zone_id}")
async def get_risk_zone_details(zone_id: int):
    return {"zone_id": zone_id, "risk_level": "GREEN", "score": 10.0}

# Prediction Endpoints
@app.get("/api/predictions/latest")
async def get_latest_predictions():
    return {"predictions": []}

# Alert Endpoints
@app.get("/api/alerts/active")
async def get_active_alerts():
    return {"alerts": []}

@app.post("/api/alerts/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: int):
    return {"status": "acknowledged", "alert_id": alert_id}

# Community Report Endpoints
@app.get("/api/reports")
async def get_reports():
    return {"reports": []}

@app.post("/api/reports")
async def create_report(report: dict):
    return {"status": "created", "report": report}

# Infrastructure Endpoints
@app.get("/api/infrastructure")
async def get_infrastructure():
    return {"infrastructure": []}

# Weather Endpoints
@app.get("/api/weather/current")
async def get_weather():
    return {"status": "ok"}

# Latest Events
@app.get("/api/events/latest")
async def get_latest_events():
    return {
        "events": [
            {
                "id": "1",
                "title": "Mangan Landslide",
                "state": "Sikkim",
                "district": "Mangan",
                "latitude": 27.5,
                "longitude": 88.5,
                "event_type": "Landslide",
                "severity": "High",
                "event_date": "2026-09-05T12:00:00Z",
                "short_summary": "Landslide above Chyakoong River obstructed river flow.",
                "source_name": "Government of Sikkim / District Administration, Mangan",
                "status": "Monitoring"
            },
            {
                "id": "2",
                "title": "Guwahati Rainfall Landslide",
                "state": "Assam",
                "district": "Kamrup Metropolitan",
                "latitude": 26.1,
                "longitude": 91.7,
                "event_type": "Landslide",
                "severity": "Critical",
                "event_date": "2026-09-02T08:00:00Z",
                "short_summary": "Heavy rainfall triggered a landslide with casualties.",
                "source_name": "Official News Source",
                "status": "Response Active"
            }
        ]
    }

# Sensor Ingestion
@app.post("/api/sensors/ingest")
async def ingest_sensor_data(data: dict):
    return {"status": "received", "data": data}
