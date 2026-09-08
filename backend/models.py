from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base

class LandslideEvent(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    state = Column(String, index=True)
    district = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    event_type = Column(String)
    severity = Column(String) # GREEN, YELLOW, ORANGE, RED
    event_date = Column(DateTime)
    short_summary = Column(String)
    source_name = Column(String)
    source_url = Column(String, nullable=True)
    affected_roads = Column(String, nullable=True)
    affected_homes = Column(Integer, nullable=True)
    casualties = Column(Integer, nullable=True)
    status = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(String, index=True)
    zone_id = Column(Integer, index=True)
    timestamp = Column(DateTime, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    soil_moisture = Column(Float)
    rainfall_1h = Column(Float)
    rainfall_24h = Column(Float)
    temperature = Column(Float)
    source = Column(String) # simulator, device, API

class RiskZone(Base):
    __tablename__ = "risk_zones"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    state = Column(String)
    district = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    base_susceptibility = Column(Float)
    current_risk_score = Column(Float)
    current_alert_level = Column(String) # GREEN, YELLOW, ORANGE, RED
    last_updated = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("risk_zones.id"))
    level = Column(String)
    reason = Column(String)
    acknowledged = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class CommunityReport(Base):
    __tablename__ = "community_reports"

    id = Column(Integer, primary_key=True, index=True)
    report_type = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    description = Column(String)
    ai_classification = Column(String, nullable=True)
    status = Column(String, default="pending")
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Infrastructure(Base):
    __tablename__ = "infrastructure"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    type = Column(String) # road, hospital, etc.
    latitude = Column(Float)
    longitude = Column(Float)
    status = Column(String) # OPEN, AT_RISK, PARTIALLY_BLOCKED, BLOCKED, RESTORED
    impact_explanation = Column(String, nullable=True)
    affected_area = Column(String, nullable=True)
    last_updated = Column(DateTime, default=lambda: datetime.now(timezone.utc))
