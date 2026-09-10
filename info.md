# Bhūmi Raksha — Complete Technical Architecture & System Info
### Real-Time Landslide Early Warning & Emergency Response Platform

> **Purpose of this document:** Answer every question a SIH judge, tech evaluator, or business stakeholder could ask — what tech is used, what language, which APIs, how every feature works in production (not demo), how the AI is kept from hallucinating, and the full data flow from sensor to citizen alert.

---

## 1. What Is Bhūmi Raksha?

Bhūmi Raksha is a **real-time landslide early warning system** built for Northeast India. It ingests data from IoT ground sensors, satellite radar, weather APIs, drone/CCTV feeds, and citizen reports — runs it through an AI risk engine — and dispatches multi-channel evacuation alerts (SMS, WhatsApp, Voice Call, Email) to affected populations in 6+ regional languages.

The system is designed for **state disaster management authorities (SDMAs)**, district collectors, and NDRF teams to monitor, predict, and respond to landslide events.

---

## 2. Full Technology Stack

### 2.1 Frontend

| Technology | Version | What It Does |
|---|---|---|
| **Next.js** | 16.3.4 | React meta-framework — handles SSR, routing, API routes, builds |
| **React** | 19.2.8 | Component-based UI library |
| **TypeScript** | 5.x | Type-safe JavaScript — catches bugs at compile time |
| **Tailwind CSS** | v4 | Utility-first CSS framework for rapid UI styling |
| **Mapbox GL JS** | 3.30.0 | Interactive geospatial map — renders risk zones, sensor locations, satellite overlays |
| **MapLibre GL** | 6.8.0 | Open-source map renderer — fallback if Mapbox quota is hit |
| **Recharts** | 3.10.1 | Charting library — renders risk trend area charts, bar graphs, time series |
| **Framer Motion** | 13.2.0 | Animation library — page transitions, card entrances, micro-interactions |
| **GSAP** | 3.15.0 | Advanced animation — scroll-driven effects, timeline sequences |
| **Lucide React** | 1.43.0 | Icon library — consistent SVG icons across the UI |
| **COBE** | 2.0.1 | WebGL 3D globe on the landing page |
| **clsx + tailwind-merge** | Latest | Conditional class merging utility |

**Language:** TypeScript (compiled to JavaScript)
**Package Manager:** Yarn 1.22.22
**Build Tool:** Next.js built-in (SWC compiler)

---

### 2.2 Backend

| Technology | Version | What It Does |
|---|---|---|
| **Python** | 3.11+ | Backend language for API, ML, and data processing |
| **FastAPI** | Latest | High-performance async REST API framework |
| **Uvicorn** | Latest | ASGI server that runs the FastAPI app |
| **SQLAlchemy** | 2.x | ORM — maps Python classes to database tables |
| **Pydantic** | v2 | Data validation for all request/response schemas |
| **Alembic** | Latest | Database migration tool — version-controls schema changes |
| **pydantic-settings** | Latest | Loads config from `.env` files into typed Python settings |

**Language:** Python 3.11+
**API Type:** RESTful JSON over HTTP
**Server:** Uvicorn (dev) → Gunicorn + Uvicorn workers (production)

---

### 2.3 Database

| Component | Technology | Purpose |
|---|---|---|
| **Dev Database** | SQLite (`bhumiraksha.db`) | Local file-based DB for development/demo |
| **Production Database** | PostgreSQL via **Supabase** | Cloud-hosted relational DB with realtime subscriptions |
| **Realtime Push** | Supabase Realtime | WebSocket channel — pushes live updates to dashboard without polling |
| **Authentication** | Supabase Auth | JWT-based login for operators, role-based access control |
| **Row-Level Security** | Supabase RLS policies | Operators see only their state/district data |
| **File Storage** | Supabase Storage | Stores community report photos, satellite images, drone footage |
| **Migrations** | Alembic | Python-based schema migrations, version-controlled |

**Database URL pattern:** `postgresql://user:pass@host:5432/dbname` (Supabase provides this)
**Current `.env` already has:** `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`

---

### 2.4 AI / Machine Learning

| Component | Technology | Purpose |
|---|---|---|
| **Risk Prediction Model** | **XGBoost** | Gradient-boosted decision tree — predicts landslide probability 0–100 per zone |
| **Explainability** | **SHAP** | Shows WHICH input factors drove the prediction (e.g. "72% driven by rainfall") |
| **Image Classification** | **ResNet / MobileNet** (fine-tuned) | Auto-classifies citizen-uploaded photos (crack, erosion, seepage, rockfall) |
| **Training Data** | GSI Landslide Inventory, ISRO slope data, IMD rainfall records | Historical landslide events with conditions that caused them |
| **Inference** | In-process (FastAPI) | XGBoost is lightweight — sub-100ms prediction per zone |

**Language:** Python (scikit-learn ecosystem)

---

### 2.5 Alert Dispatch (Notification Channels)

| Channel | Provider | SDK/Library | What It Sends |
|---|---|---|---|
| **SMS** | **Twilio** | `twilio` npm v6.1.0 | Plain text evacuation alert to phone numbers |
| **WhatsApp** | **Twilio WhatsApp API** | Same SDK | Rich message with map, severity, multilingual instructions |
| **Voice Call** | **Twilio Programmable Voice** | Same SDK, TwiML | Auto-call with text-to-speech in 6 languages |
| **Email** | **Resend** | `resend` npm v6.26.0 | HTML email to district authorities with full incident details |

**Languages in alerts:** English, Hindi, Assamese, Manipuri, Khasi, Mizo

**Dispatch is triggered from:** Next.js API Route (`/api/evacuation`) — runs server-side, calls Twilio + Resend APIs in parallel.

---

### 2.6 External Data APIs

| Data Source | API / Service | URL / Endpoint | What We Get | Frequency |
|---|---|---|---|---|
| **Weather (Current + Forecast)** | Open-Meteo | `api.open-meteo.com/v1` | Rainfall (1h, 24h, forecast), temperature, humidity, wind | Every 15 min |
| **Official Weather Warnings** | IMD (India Meteorological Department) | IMD RSS/API | Heavy rainfall warnings, cyclone alerts, nowcasts | 3-hourly |
| **Geocoding** | OpenStreetMap Nominatim | `nominatim.openstreetmap.org` | Reverse geocoding — lat/lon → place name | On demand |
| **Maps & Tiles** | Mapbox | Mapbox API | Satellite imagery, terrain DEM, 3D building layers | Real-time |
| **Satellite SAR** | ISRO Bhuvan / Copernicus Sentinel-1 | Copernicus Open Access Hub | Radar backscatter for ground displacement detection (InSAR) | Daily / 6-day revisit |
| **Vegetation Index** | Sentinel-2 / MODIS | Copernicus / NASA Earthdata | NDVI change — deforestation = higher landslide risk | Weekly |
| **Elevation Data** | SRTM / ALOS PALSAR | NASA / JAXA | Digital Elevation Model — slope angle, aspect, drainage | Static (30m resolution) |
| **Seismic Activity** | USGS Earthquake API / IMD | earthquake.usgs.gov | Nearby earthquake events that could trigger landslides | Real-time |

---

## 3. Database Schema (All Tables)

```
┌─────────────────────────────────────────────────────────────────┐
│  events              │  Landslide events (past + ongoing)       │
│─────────────────────────────────────────────────────────────────│
│  id                  │  Primary key                             │
│  title               │  "Mangan Landslide"                      │
│  state, district     │  "Sikkim", "Mangan"                      │
│  latitude, longitude │  GPS coordinates                         │
│  event_type          │  "Landslide", "Debris Flow", etc.        │
│  severity            │  GREEN / YELLOW / ORANGE / RED            │
│  event_date          │  When it happened                        │
│  short_summary       │  One-line description                    │
│  source_name/url     │  Where the info came from                │
│  affected_roads      │  Roads impacted                          │
│  affected_homes      │  Number of homes affected                │
│  casualties          │  Number of casualties                    │
│  status              │  "Monitoring" / "Response Active" / etc. │
│  created_at/updated  │  Timestamps                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  risk_zones          │  Monitored geographic areas               │
│─────────────────────────────────────────────────────────────────│
│  id                  │  Primary key                             │
│  name                │  "Mangan District Zone"                  │
│  state, district     │  Administrative location                 │
│  latitude, longitude │  Center point                            │
│  base_susceptibility │  Static geological risk (0-100)          │
│  current_risk_score  │  Live AI-computed score (0-100)          │
│  current_alert_level │  GREEN / YELLOW / ORANGE / RED            │
│  last_updated        │  When risk was last recalculated         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  sensor_readings     │  Time-series IoT data                    │
│─────────────────────────────────────────────────────────────────│
│  id                  │  Primary key                             │
│  sensor_id           │  "sensor_1_alpha"                        │
│  zone_id             │  FK → risk_zones                         │
│  timestamp           │  Reading time                            │
│  latitude, longitude │  Sensor position                         │
│  soil_moisture       │  Volumetric water content (%)            │
│  rainfall_1h         │  Last hour rainfall (mm)                 │
│  rainfall_24h        │  Last 24h rainfall (mm)                  │
│  temperature         │  Celsius                                 │
│  source              │  "device" / "simulator" / "API"          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  alerts              │  System-generated warnings               │
│─────────────────────────────────────────────────────────────────│
│  id                  │  Primary key                             │
│  zone_id             │  FK → risk_zones                         │
│  level               │  GREEN / YELLOW / ORANGE / RED            │
│  reason              │  Why the alert was triggered             │
│  acknowledged        │  Has operator seen it?                   │
│  timestamp           │  When generated                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  community_reports   │  Citizen-submitted observations          │
│─────────────────────────────────────────────────────────────────│
│  id                  │  Primary key                             │
│  report_type         │  "crack", "erosion", "seepage", etc.     │
│  latitude, longitude │  Where the observation was made          │
│  description         │  Free-text from citizen                  │
│  ai_classification   │  AI-assigned category                    │
│  status              │  "pending" / "verified" / "dismissed"    │
│  timestamp           │  When submitted                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  infrastructure      │  Roads, bridges, hospitals, shelters     │
│─────────────────────────────────────────────────────────────────│
│  id                  │  Primary key                             │
│  name                │  "NH-37 Bridge", "Mangan Hospital"       │
│  type                │  "road" / "hospital" / "shelter" / etc.  │
│  latitude, longitude │  GPS location                            │
│  status              │  OPEN / AT_RISK / BLOCKED / RESTORED      │
│  impact_explanation  │  Why it's affected                       │
│  affected_area       │  Which zone impacts it                   │
│  last_updated        │  When status was last changed            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. API Endpoints (Complete List)

| Method | Endpoint | What It Does |
|---|---|---|
| `GET` | `/` | Root — returns welcome message |
| `GET` | `/api/health` | Health check — confirms API is running |
| `GET` | `/api/risk/zones` | Returns all monitored risk zones with live scores |
| `GET` | `/api/risk/{zone_id}` | Returns detail for a specific zone |
| `GET` | `/api/predictions/latest` | Returns latest ML predictions per zone |
| `GET` | `/api/alerts/active` | Returns unacknowledged alerts |
| `POST` | `/api/alerts/{id}/acknowledge` | Marks an alert as acknowledged |
| `GET` | `/api/reports` | Returns community reports |
| `POST` | `/api/reports` | Submits a new community report |
| `GET` | `/api/infrastructure` | Returns infrastructure status |
| `GET` | `/api/weather/current` | Returns current weather data |
| `GET` | `/api/events/latest` | Returns 10 most recent landslide events |
| `POST` | `/api/sensors/ingest` | Receives sensor data from IoT devices |
| `POST` | `/api/evacuation` | **Dispatches evacuation alert** (SMS + WhatsApp + Voice + Email) |
| `GET` | `/api/skeptic/audit` | Returns Skeptic Agent decision log |
| `POST` | `/api/skeptic/override` | Admin overrides a blocked alert |

---

## 5. How The Risk Scoring AI Works (Production)

### Input Features (What Goes Into The Model)

The XGBoost model receives these features **per zone, per time-step**:

| # | Feature | Source | Unit |
|---|---|---|---|
| 1 | `soil_moisture` | IoT soil moisture probe | % (0-100) |
| 2 | `rainfall_1h` | Rain gauge / Open-Meteo | mm |
| 3 | `rainfall_6h` | Accumulated from readings | mm |
| 4 | `rainfall_24h` | Accumulated | mm |
| 5 | `rainfall_72h` | Accumulated | mm |
| 6 | `antecedent_rainfall_30d` | 30-day cumulative (KEY trigger) | mm |
| 7 | `slope_angle` | DEM (SRTM) | degrees |
| 8 | `slope_aspect` | DEM | N/S/E/W encoded |
| 9 | `land_cover_type` | Satellite classification | categorical |
| 10 | `ndvi_change` | Sentinel-2 NDVI delta | -1 to +1 |
| 11 | `pore_pressure` | Piezometer | kPa |
| 12 | `ground_displacement_rate` | InSAR processing | mm/day |
| 13 | `seismic_pga` | USGS/IMD earthquake feed | g (acceleration) |
| 14 | `soil_type` | Geological survey data | categorical |
| 15 | `drainage_density` | Hydrological model | km/km² |
| 16 | `community_report_density` | Citizen reports in zone | count/week |

### Output

- **Risk Score:** 0 to 100 (probability of landslide in next 24-72 hours)
- **Alert Level Mapping:**
  - 0–30 → **GREEN** (Low risk — routine monitoring)
  - 31–55 → **YELLOW** (Moderate — increased monitoring)
  - 56–75 → **ORANGE** (High — prepare evacuation routes)
  - 76–100 → **RED** (Critical — triggers Skeptic Agent → evacuation review)

### SHAP Explainability

Every prediction comes with a **SHAP waterfall chart** showing operators exactly WHY the score is what it is:

```
Example SHAP Output for Mangan Zone (Score: 84):
──────────────────────────────────────────────────
  rainfall_24h = 210mm        → +22 contribution
  soil_moisture = 88.5%       → +18 contribution
  antecedent_rainfall_30d     → +12 contribution
  ground_displacement = 12mm/d → +9 contribution
  slope_angle = 35°           → +8 contribution
  ndvi_change = -0.3          → +6 contribution
  base_susceptibility         → +9 contribution
  ──────────────────────────────────────
  Total Risk Score             = 84 (RED)
```

This means the operator can see: "84% risk is real because rainfall is 1.4x above threshold AND soil is saturated AND ground is moving."

---

## 6. 🛡️ SKEPTIC AGENT — AI Guardrail (Anti-Hallucination System)

### Why It Exists

An AI model can output a false RED alert due to:
- Sensor malfunction (spike in one reading)
- Model overfitting to noise
- Stale or missing data being interpreted as anomaly
- Edge cases not in training data

A false evacuation alert to real people causes **panic, traffic jams, economic loss, and permanent erosion of public trust**. The Skeptic Agent prevents this.

### How It Works — 6-Gate Validation Pipeline

When the AI model outputs a risk score **≥ 76** (RED threshold), the alert is NOT sent immediately. Instead, it passes through **6 independent validation gates**. The alert is approved only if **at least 4 out of 6 gates pass**.

```
AI Model says: "Risk = 84 (RED) for Mangan Zone"
                     │
                     ▼
    ┌────────────────────────────────────┐
    │       SKEPTIC AGENT                │
    │                                    │
    │  Gate 1: Weather Cross-Check   ✅  │
    │  Gate 2: Sensor Consistency    ✅  │
    │  Gate 3: Satellite Verify      ✅  │
    │  Gate 4: Historical Match      ✅  │
    │  Gate 5: Neighbor Zone Check   ❌  │
    │  Gate 6: Rate Limiter          ✅  │
    │                                    │
    │  Result: 5/6 PASS → APPROVED ✅   │
    └────────────────────────────────────┘
                     │
                     ▼
         Sent to Operator Console
         for human confirmation
```

### Gate Details

#### Gate 1 — Weather Cross-Check
- **What it does:** Independently fetches weather from Open-Meteo AND IMD for the zone's coordinates
- **Checks:** Is there actually heavy rainfall happening or forecast?
- **BLOCKS if:** AI claims "critical rainfall" but both weather APIs show dry conditions (<5mm in 24h, no rain in 48h forecast)
- **Why it matters:** Catches cases where sensor rain gauge is malfunctioning

#### Gate 2 — Sensor Consistency Check
- **What it does:** Looks at the last N sensor readings from ALL sensors in the zone
- **Checks:** Is there a consistent upward trend, or was it a single spike?
- **BLOCKS if:** Only 1 sensor out of 4 shows anomaly (others are normal) — likely sensor fault
- **BLOCKS if:** Single spike followed by normal readings — likely noise
- **Why it matters:** Catches sensor malfunctions and data noise

#### Gate 3 — Satellite Verification
- **What it does:** Queries latest SAR/InSAR data for the zone
- **Checks:** Does satellite show ground displacement consistent with a RED alert?
- **BLOCKS if:** AI says "imminent landslide" but satellite shows zero ground movement over 30 days
- **Why it matters:** Ground-truth check from an independent data source

#### Gate 4 — Historical Pattern Match
- **What it does:** Compares current conditions (rainfall, moisture, slope) against database of past landslide events
- **Checks:** Have conditions like these actually caused landslides in this geological setting before?
- **BLOCKS if:** Current conditions are well within historically safe ranges for this zone type
- **Why it matters:** Catches model overfitting — if similar conditions existed 100 times before with zero events, the alert is likely false

#### Gate 5 — Neighboring Zone Check
- **What it does:** Checks risk scores of adjacent zones (within 50km radius)
- **Checks:** If this zone is RED, are nearby zones at least YELLOW or ORANGE?
- **BLOCKS if:** Zone shows RED but ALL surrounding zones are GREEN — suggests localized data anomaly, not regional weather event
- **Why it matters:** Real heavy rainfall / seismic events affect a region, not a single point

#### Gate 6 — Rate Limiter & Cooldown
- **What it does:** Checks alert dispatch history
- **BLOCKS if:** An alert was already sent for this zone within the cooldown period (configurable, default: 4 hours)
- **BLOCKS if:** Total daily alert count exceeds the budget (prevents alert fatigue)
- **Why it matters:** Prevents the system from spamming alerts during sustained high-risk conditions (one alert is enough, follow-ups go to operator console only)

### Gate Verdicts

| Verdict | Meaning | Quorum Treatment |
|---|---|---|
| **PASS** | Evidence supports the alert | Counts as YES |
| **FAIL** | Evidence contradicts the alert | Counts as NO |
| **INSUFFICIENT** | Not enough data to judge | Counts as YES (fail-safe — we don't block alerts due to missing data) |

### What Happens When Alert Is Blocked

1. Blocked alert is logged in `skeptic_audit_log` table with:
   - Original AI risk score + SHAP values
   - Each gate's verdict and reasoning text
   - Timestamp, zone ID, model version
2. Operator console shows a **"Blocked Alert"** card:
   > "AI proposed RED for Mangan District. **Skeptic Agent blocked.** Reason: Gate 1 FAILED (IMD reports 2mm rainfall, not 200mm), Gate 2 FAILED (single spike from sensor_04, other 3 sensors normal). 2/6 gates passed, needed 4."
3. An **admin can override** the block with a written justification — which is logged for audit
4. System tracks override patterns — if operators consistently override certain blocks, the gate thresholds are reviewed by the team

### What Happens When Alert Is Approved

1. Alert enters the **Operator Approval Queue** on the console
2. Operator sees:
   - Risk score + SHAP waterfall (which factors drove it)
   - Skeptic Agent verdict (which gates passed/failed)
   - Map view of the zone
   - Live sensor readings + weather data
3. Operator **confirms** → triggers dispatch to all 4 channels
4. Or operator **dismisses** → logged as false positive for model retraining

---

## 7. Alert Dispatch Flow (End to End)

```
Sensor Reading Arrives
        │
        ▼
FastAPI /api/sensors/ingest
        │
        ▼
Store in PostgreSQL
        │
        ▼
Trigger Risk Recalculation (XGBoost)
        │
        ▼
Risk Score = 84 (RED)
        │
        ▼
Skeptic Agent validates (6 gates)
        │
   ┌────┴────┐
   │         │
APPROVED   BLOCKED
   │         │
   ▼         ▼
Operator    Log + Show
Queue       on Console
   │
   ▼
Operator clicks "CONFIRM DISPATCH"
   │
   ▼
POST /api/evacuation fires:
   ├── Twilio SMS    → Citizen phone numbers
   ├── Twilio WhatsApp → Citizen WhatsApp
   ├── Twilio Voice   → Auto-call with TTS
   └── Resend Email   → District authorities
   │
   ▼
All delivery statuses logged
```

---

## 8. IoT Sensor Data Pipeline (Production)

```
Physical Sensor (field)
    │
    │  LoRaWAN radio
    ▼
LoRa Gateway (site)
    │
    │  MQTT publish
    ▼
MQTT Broker (cloud)
    │
    │  Kafka Connect / Bridge
    ▼
Apache Kafka (event stream)
    │
    │  Consumer pulls batch
    ▼
FastAPI /api/sensors/ingest
    │
    ▼
PostgreSQL (store) + XGBoost (score)
```

**Sensor Hardware (typical deployment per zone):**
- 2x Rain gauges (tipping bucket)
- 2x Soil moisture probes (capacitive)
- 1x Inclinometer array (measures slope tilt)
- 1x Piezometer (measures underground water pressure)
- 1x Extensometer (measures ground stretch/compression)
- 1x Seismometer (detects vibrations)
- Solar-powered with cellular/LoRa backhaul

---

## 9. Frontend Pages & What They Do

| Page Route | Component | What It Shows |
|---|---|---|
| `/` | Landing Page | Animated hero, 3D globe, feature cards, team info |
| `/dashboard` | Live Map + Risk Panel | Mapbox map with zone overlays + risk trend chart + drivers |
| `/dashboard/alerts` | Alert Overlay | Active alerts list overlaid on the map |
| `/dashboard/events` | Events List | Recent landslide events with severity, location, status |
| `/dashboard/events/[id]` | Event Detail | Full detail page for a specific event |
| `/dashboard/predictions` | Predictions View | ML model predictions per zone |
| `/dashboard/weather` | Weather Panel | Current + forecast weather for monitored zones |
| `/dashboard/infrastructure` | Infrastructure Map | Roads, hospitals, shelters — status overlay |
| `/dashboard/reports` | Community Reports | Citizen-submitted observations |
| `/dashboard/settings` | System Settings | Configuration panel |
| `/console` | Operator Console | Full command center — radial risk gauge, analysis pipeline, sensor status, live feed, evacuation button |

---

## 10. Current Demo vs Production Reality

| Feature | Demo (Now) | Production (Real) |
|---|---|---|
| Risk Zones | 2 hardcoded (Mangan, Guwahati) | Hundreds registered from GSI hazard maps |
| Sensor Data | `simulation.py` generates random data every 5s | Real IoT sensors via MQTT → Kafka → API |
| Risk Algorithm | `base + moisture×0.3 + rain×0.5` | Trained XGBoost with 16 features |
| Weather | Returns `{"status": "ok"}` | Open-Meteo + IMD real data every 15 min |
| Alerts | Returns empty `[]` | AI-generated, Skeptic-validated alerts |
| Events | 2 hardcoded fallback events | Real events from news APIs + govt feeds |
| Infrastructure | Returns empty `[]` | Real registry with live status |
| Community Reports | Accepts JSON, returns "created" | Photo upload + AI classification + storage |
| Predictions | 1 hardcoded prediction | ML time-series forecast |
| Drone Feed | Tenor GIF of a landslide | Real RTSP/WebRTC video stream |
| Database | SQLite file | Supabase PostgreSQL |
| Authentication | None | Supabase Auth + JWT + RLS |
| Skeptic Agent | Does not exist | 6-gate validation pipeline |
| Evacuation Alerts | Works (all 4 channels fire) | Skeptic → Operator approval → then dispatch |
| Console Metrics | Hardcoded numbers (84, 88.5%, 142kPa) | Live from sensors + ML model |

---

## 11. Deployment Architecture

| Component | Where It Runs | Why |
|---|---|---|
| Frontend (Next.js) | **Vercel** | Native Next.js hosting, global CDN, auto-deploys on git push |
| Backend (FastAPI) | **Railway** or **Render** or **AWS ECS** | Python containers, auto-scaling, env var management |
| Database | **Supabase** (managed PostgreSQL) | Realtime, Auth, RLS, Storage — all built-in |
| ML Model | Same backend container | XGBoost is lightweight (~50MB), <100ms inference |
| Kafka | **Confluent Cloud** or **Amazon MSK** | Managed event streaming for sensor ingestion |
| Skeptic Agent | Same backend (or separate microservice) | Stateless validation — can scale independently |

---

## 12. Security Model

| Layer | How It's Secured |
|---|---|
| API calls | Supabase JWT tokens — every request authenticated |
| User roles | `admin`, `operator`, `viewer` — role-based access |
| Data isolation | Row-Level Security — operators see only their state/district |
| Alert dispatch | Only `operator` + `admin` roles can confirm evacuations |
| Skeptic override | Only `admin` can override a blocked alert |
| Audit trail | Every dispatch, block, and override logged with user ID + timestamp |
| Sensor ingestion | API key auth on `/api/sensors/ingest` — prevents spoofing |
| Transport | HTTPS/TLS everywhere (Vercel + Railway auto-provision certs) |
| Secrets | `.env` files — never committed to git (in `.gitignore`) |

---

## 13. Key Environment Variables

| Variable | Service | Purpose |
|---|---|---|
| `SUPABASE_URL` | Supabase | Database + Auth base URL |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase | Client-side auth key |
| `SUPABASE_SECRET_KEY` | Supabase | Server-side admin key |
| `DATABASE_URL` | SQLAlchemy | PostgreSQL connection string |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox | Map rendering |
| `OPENMETEO_BASE` | Open-Meteo | Weather API base URL |
| `OSM_NOMINATIM_URL` | OpenStreetMap | Geocoding API |
| `TWILIO_ACCOUNT_SID` | Twilio | SMS/WhatsApp/Voice auth |
| `TWILIO_AUTH_TOKEN` | Twilio | API secret |
| `TWILIO_PHONE_NUMBER` | Twilio | Sender number for SMS/Voice |
| `TWILIO_WHATSAPP_NUMBER` | Twilio | Sender number for WhatsApp |
| `RESEND_API_KEY` | Resend | Email dispatch API key |
| `SECRET_KEY` | Backend | JWT signing / session encryption |

---

## 14. Running The System

### Development (Local)

```powershell
# One command starts everything:
.\run_demo.ps1

# This launches:
# 1. Backend API     → http://localhost:8000  (FastAPI + Uvicorn)
# 2. Sensor Simulator → Pushes fake data every 5 seconds
# 3. Frontend        → http://localhost:3000  (Next.js dev server)
```

### Production

```
1. Push code to GitHub
2. Vercel auto-deploys frontend from `frontend/` directory
3. Railway auto-deploys backend from `backend/` directory
4. Supabase database is always-on cloud service
5. Set all env vars in Vercel + Railway dashboards
6. Alembic migrations run on deploy: `alembic upgrade head`
```

---

## 15. Cost Estimate (Monthly)

| Service | Cost | Notes |
|---|---|---|
| Vercel (Frontend) | Free – ₹1,700/mo | Free tier covers most usage |
| Railway (Backend) | ₹400 – ₹1,700/mo | Depends on compute usage |
| Supabase (Database) | Free – ₹2,100/mo | Free tier: 500MB, 2 projects |
| Twilio SMS | ~₹0.85/SMS | Per-message pricing |
| Twilio WhatsApp | ~₹0.42/msg | Template messages are cheaper |
| Twilio Voice | ~₹1.10/min | Auto-calls are typically 15-30 seconds |
| Resend Email | Free – ₹1,700/mo | 3,000 emails/mo free |
| Mapbox | Free – ₹21,000/mo | 50K map loads free per month |
| Open-Meteo | Free | Open-source, no cost |
| Confluent Kafka | ₹0 – ₹8,500/mo | Basic cluster |
| **Total** | **₹2,000 – ₹25,000/mo** | At moderate scale (50-100 zones) |

---

## 16. File Structure Overview

```
SIH2.0/
├── .env                          # Root environment variables
├── run_demo.ps1                  # One-click launcher for all services
├── info.md                       # THIS FILE — full architecture doc
│
├── backend/                      # Python FastAPI backend
│   ├── main.py                   # API endpoints (FastAPI app)
│   ├── models.py                 # SQLAlchemy ORM models (6 tables)
│   ├── schemas.py                # Pydantic request/response schemas
│   ├── database.py               # DB engine + session factory
│   ├── simulation.py             # Sensor data simulator (demo only)
│   ├── alembic.ini               # Alembic migration config
│   ├── alembic/                  # Migration scripts
│   └── venv/                     # Python virtual environment
│
├── frontend/                     # Next.js TypeScript frontend
│   ├── .env.local                # Frontend environment variables
│   ├── package.json              # Dependencies (React, Mapbox, Twilio, etc.)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Landing page (globe, hero, features)
│   │   │   ├── layout.tsx        # Root layout
│   │   │   ├── globals.css       # Global styles
│   │   │   ├── api/
│   │   │   │   └── evacuation/
│   │   │   │       └── route.ts  # POST handler: SMS + WhatsApp + Voice + Email
│   │   │   ├── console/
│   │   │   │   └── page.tsx      # Operator command center
│   │   │   └── (dashboard)/
│   │   │       ├── layout.tsx    # Dashboard shell with sidebar nav
│   │   │       ├── dashboard/    # Live map + risk panel
│   │   │       ├── alerts/       # Active alerts overlay
│   │   │       ├── events/       # Event list + detail
│   │   │       ├── predictions/  # ML predictions view
│   │   │       ├── weather/      # Weather data panel
│   │   │       ├── infrastructure/ # Infrastructure status
│   │   │       ├── reports/      # Community reports
│   │   │       └── settings/     # System settings
│   │   ├── components/
│   │   │   ├── MapComponent.tsx  # Mapbox GL interactive map
│   │   │   ├── Globe.tsx         # 3D COBE globe
│   │   │   ├── SolarSystem.tsx   # Solar system animation
│   │   │   ├── SplashCursor.tsx  # Custom cursor effect
│   │   │   └── ...              # Other UI components
│   │   └── lib/
│   │       ├── api/
│   │       │   ├── client.ts     # Base fetch wrapper
│   │       │   ├── alerts.ts     # Alert API client
│   │       │   ├── events.ts     # Events API client
│   │       │   ├── risk.ts       # Risk zones API client
│   │       │   ├── predictions.ts # Predictions API client
│   │       │   ├── weather.ts    # Weather API client
│   │       │   ├── reports.ts    # Reports API client
│   │       │   ├── infrastructure.ts # Infrastructure API client
│   │       │   └── sensors.ts    # Sensor ingestion client
│   │       └── utils.ts          # Utility functions
│   └── public/                   # Static assets
│
└── ECC/                          # Engineering Command Center (external tool)
```

---

## 17. Differentiators / Why This Wins

1. **Skeptic Agent** — No other landslide system has a 6-gate independent AI validation layer. This is the key innovation.
2. **Multi-channel alerts in 6+ NE languages** — SMS, WhatsApp, Voice, Email — not just a dashboard notification.
3. **SHAP explainability** — Operators don't just see "Risk: 84". They see WHY, broken down by factor.
4. **Operator-in-the-loop** — AI proposes, human confirms. No fully autonomous alert dispatch.
5. **Real data pipeline architecture** — IoT → Kafka → ML → Skeptic → Operator → Dispatch. Not a monolith.
6. **Community reports feed the model** — Citizens are sensors too. Their reports improve predictions.
7. **Built for NE India specifically** — Geological profiles, local languages, district-level administration.

---

*Last updated: September 2026*
*Team: Bhūmi Raksha — Smart India Hackathon 2.0*
