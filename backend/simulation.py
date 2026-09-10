import time
import random
import math
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import SensorReading, RiskZone, Base

def initialize_zones(db: Session):
    # Ensure our demo zones exist
    mangan = db.query(RiskZone).filter(RiskZone.name == "Mangan District Zone").first()
    if not mangan:
        mangan = RiskZone(
            name="Mangan District Zone",
            state="Sikkim",
            district="Mangan",
            latitude=27.53,
            longitude=88.51,
            base_susceptibility=60.0,
            current_risk_score=60.0,
            current_alert_level="YELLOW"
        )
        db.add(mangan)

    guwahati = db.query(RiskZone).filter(RiskZone.name == "Guwahati Hills").first()
    if not guwahati:
        guwahati = RiskZone(
            name="Guwahati Hills",
            state="Assam",
            district="Kamrup Metropolitan",
            latitude=26.20,
            longitude=91.60,
            base_susceptibility=45.0,
            current_risk_score=45.0,
            current_alert_level="GREEN"
        )
        db.add(guwahati)
    
    db.commit()
    return mangan, guwahati

def run_simulation():
    db = SessionLocal()
    try:
        zones = initialize_zones(db)
        print("Zones initialized. Starting simulation loop...")
        
        step = 0
        while True:
            step += 1
            for zone in zones:
                # Simulate weather patterns: Mangan gets heavy rain, Guwahati gets light rain
                if zone.name == "Mangan District Zone":
                    rain_1h = 15.0 + random.uniform(0, 10)  # Heavy rain
                    moisture = min(100.0, 50.0 + (step * 2.5) + random.uniform(-2, 2))
                else:
                    rain_1h = random.uniform(0, 2)
                    moisture = min(100.0, 30.0 + random.uniform(-1, 1))

                reading = SensorReading(
                    sensor_id=f"sensor_{zone.id}_alpha",
                    zone_id=zone.id,
                    timestamp=datetime.now(timezone.utc),
                    latitude=zone.latitude,
                    longitude=zone.longitude,
                    soil_moisture=moisture,
                    rainfall_1h=rain_1h,
                    rainfall_24h=rain_1h * 12, # mock value
                    temperature=22.0 + random.uniform(-2, 2),
                    source="simulator"
                )
                db.add(reading)

                # Update risk score based on moisture and rain
                # Simple mock algorithm
                new_score = zone.base_susceptibility + (moisture * 0.3) + (rain_1h * 0.5)
                zone.current_risk_score = min(100.0, new_score)
                zone.last_updated = datetime.now(timezone.utc)

                if zone.current_risk_score > 80:
                    zone.current_alert_level = "RED"
                elif zone.current_risk_score > 60:
                    zone.current_alert_level = "ORANGE"
                elif zone.current_risk_score > 40:
                    zone.current_alert_level = "YELLOW"
                else:
                    zone.current_alert_level = "GREEN"

            db.commit()
            print(f"Step {step}: Pushed sensor data. Mangan Risk: {zones[0].current_risk_score:.1f} ({zones[0].current_alert_level})")
            
            # Run every 5 seconds for demo purposes
            time.sleep(5)
    except KeyboardInterrupt:
        print("Simulation stopped.")
    finally:
        db.close()

if __name__ == "__main__":
    run_simulation()
