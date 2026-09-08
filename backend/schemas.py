from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class LandslideEventBase(BaseModel):
    title: str
    state: str
    district: str
    latitude: float
    longitude: float
    event_type: str
    severity: str
    event_date: datetime
    short_summary: str
    source_name: str
    source_url: Optional[str] = None
    affected_roads: Optional[str] = None
    affected_homes: Optional[int] = None
    casualties: Optional[int] = None
    status: str

class LandslideEvent(LandslideEventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class SensorIngest(BaseModel):
    sensor_id: str
    zone_id: int
    timestamp: datetime
    latitude: float
    longitude: float
    soil_moisture: float
    rainfall_1h: float
    rainfall_24h: float
    temperature: float
    source: str

class RiskZoneBase(BaseModel):
    name: str
    state: str
    district: str
    latitude: float
    longitude: float
    base_susceptibility: float
    current_risk_score: float
    current_alert_level: str

class RiskZone(RiskZoneBase):
    id: int
    last_updated: datetime

    class Config:
        from_attributes = True

class AlertBase(BaseModel):
    zone_id: int
    level: str
    reason: str

class Alert(AlertBase):
    id: int
    acknowledged: bool
    timestamp: datetime

    class Config:
        from_attributes = True

class ReportBase(BaseModel):
    report_type: str
    latitude: float
    longitude: float
    description: str

class CommunityReport(ReportBase):
    id: int
    ai_classification: Optional[str]
    status: str
    timestamp: datetime

    class Config:
        from_attributes = True

class InfrastructureBase(BaseModel):
    name: str
    type: str
    latitude: float
    longitude: float
    status: str
    impact_explanation: Optional[str] = None
    affected_area: Optional[str] = None

class Infrastructure(InfrastructureBase):
    id: int
    last_updated: datetime

    class Config:
        from_attributes = True
