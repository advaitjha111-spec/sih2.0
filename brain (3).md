# BHŪMI RAKSHA — Full-Stack Project Brain

## 0. Purpose

This document is the single source of truth for the **Bhūmi Raksha** internal-hackathon application.

It defines:
- the existing FastAPI backend contract;
- the frontend information architecture and UI behavior;
- the landing page;
- the dashboard and operational views;
- the software sensor simulator strategy for the internal hackathon;
- live/latest landslide-event presentation;
- API integration rules;
- demo-safe fallback behavior;
- validation, accessibility, responsiveness, and production-quality expectations.

**Core rule:** do not build disconnected mock screens. Every operational dashboard value, alert, report, prediction, weather value, risk zone and infrastructure state must come from the backend or a clearly labeled demo/fallback source.

---

# 1. Product Definition

## 1.1 What Bhūmi Raksha is

Bhūmi Raksha is an AI-enabled landslide early-warning and monitoring platform focused on the North Eastern Region (NER) of India.

The platform combines:
- rainfall and weather data;
- soil-moisture/environment telemetry;
- terrain and slope characteristics;
- vegetation indicators;
- historical susceptibility information;
- predicted landslide risk;
- field/community observations;
- road and infrastructure impact;
- alerts and response prioritization;
- geospatial visualization.

The internal hackathon version is **software-first**. No physical sensor installation is required for the demo.

## 1.2 Software sensor strategy

Use a standardized sensor-ingestion contract so the same backend can later accept real IoT devices.

Demo flow:

```text
Software Sensor Simulator
        ↓
Sensor Ingestion API
        ↓
Validation + Storage
        ↓
Risk / Prediction Engine
        ↓
Dashboard + GIS + Alerts
```

The simulator should generate realistic time-series telemetry such as:
- soil moisture;
- rainfall accumulation;
- temperature;
- optional pore-pressure proxy;
- optional slope movement proxy.

The UI must label simulated telemetry as **Demo Sensor** or **Simulated** rather than implying physical deployment.

---

# 2. Existing Backend Contract

The backend remains the authoritative source of operational data.

## 2.1 Stack

- FastAPI
- Uvicorn
- PostgreSQL / Supabase
- SQLAlchemy
- Alembic
- PostGIS-compatible geospatial data
- Shapely / GeoPandas
- NumPy / pandas / scikit-learn / XGBoost / scipy
- joblib / ONNX Runtime
- httpx / aiohttp
- JWT / bcrypt / python-jose
- WebSockets where useful
- Pillow
- pytest

## 2.2 Existing route groups

```text
GET/POST /api/risk/*
GET/POST /api/predictions/*
GET/POST /api/reports/*
GET/POST /api/alerts/*
GET/POST /api/infrastructure/*
GET/POST /api/weather/*
GET      /api/health
```

The original backend specification already defines risk zones, predictions, community reports, alerts, weather fetching and infrastructure models/services. Preserve those contracts unless a change is required to complete a missing product capability.

## 2.3 Existing risk model inputs

The operational risk model uses:
- rainfall over 24h;
- soil moisture;
- vegetation/NDVI loss;
- slope angle;
- base susceptibility.

Alert levels:

```text
GREEN  = low
YELLOW = moderate
ORANGE = high
RED    = critical
```

Do not duplicate risk calculation logic in React/Next.js. The frontend displays backend results.

---

# 3. Backend Extensions Required for the Full Product

The original backend specification does not fully cover every requirement of the problem statement. Add the following focused extensions.

## 3.1 Latest Landslide Events

Create a backend event model and API for recent verified or sourced incidents.

Suggested model:

```text
LandslideEvent
- id
- title
- state
- district
- latitude
- longitude
- event_type
- severity
- event_date
- short_summary
- source_name
- source_url
- affected_roads
- affected_homes
- casualties
- status
- created_at
- updated_at
```

Route:

```text
GET /api/events/latest?region=NER&limit=6
GET /api/events/{event_id}
```

The landing page must call this route rather than hard-coding event cards.

### Source policy

Prefer authoritative sources first (government disaster-management/administration releases, Geological Survey of India landslide resources, official district/state releases). News sources can supplement incident discovery, but should not be presented as official government confirmation unless the source itself is authoritative.

### Current seed examples for the demo data layer

The current September 2026 situation includes recent NER-relevant incidents that can be used as seed records after verification:

- **Mangan, Sikkim — 5/6 September 2026:** a landslide above the Chyakoong River near the Teesta confluence temporarily obstructed river flow; the Mangan district administration reported continued monitoring and later reduced immediate risk. Source: Government of Sikkim / District Administration, Mangan.
- **Guwahati, Assam — early September 2026:** heavy rainfall triggered a landslide that resulted in three deaths and one injury according to contemporary reporting.
- **Barapathing, Sikkim — September 2026:** official district reporting documented landslide-related concerns including muck dumping, road connectivity, drainage and blocked natural channels.

The UI must include event date and source so users can distinguish current incidents from historical examples.

## 3.2 Sensor Ingestion

Create a generic ingestion endpoint that can later receive physical-device data.

Suggested routes:

```text
POST /api/sensors/ingest
GET  /api/sensors
GET  /api/sensors/{sensor_id}/latest
GET  /api/sensors/{sensor_id}/history
```

Suggested payload:

```json
{
  "sensor_id": "SIM-SIKKIM-001",
  "zone_id": 12,
  "timestamp": "2026-09-08T12:10:00+05:30",
  "latitude": 27.50,
  "longitude": 88.50,
  "soil_moisture": 78.4,
  "rainfall_1h": 18.2,
  "rainfall_24h": 142.7,
  "temperature": 21.1,
  "source": "simulator"
}
```

Validation rules:
- reject malformed coordinates;
- reject impossible sensor ranges;
- preserve timestamps;
- identify source as simulator/device/API;
- never silently overwrite historical readings.

## 3.3 Sensor Simulator

Add a small server-side or standalone script that can:
- create NER demo sensors;
- emit telemetry every configurable interval;
- simulate gradual rainfall escalation;
- simulate soil-moisture saturation;
- simulate sudden threshold crossings;
- trigger corresponding prediction/risk changes.

Required demo controls:

```text
Normal Conditions
Heavy Rain
Saturation Event
Critical Event
Reset
```

## 3.4 Response Prioritization

Add a deterministic response-priority service using:
- risk level;
- population/exposure where available;
- road connectivity impact;
- infrastructure criticality;
- nearby active field reports;
- forecast/weather severity.

Return a priority score and explanation. Do not make the frontend invent priority.

## 3.5 Road / Infrastructure State

Extend infrastructure data so the dashboard can show:
- OPEN;
- AT_RISK;
- PARTIALLY_BLOCKED;
- BLOCKED;
- RESTORED.

Include impact explanation and affected area.

## 3.6 Multilingual Notification Metadata

Alerts should support:

```text
language: en | hi | bn | as | ...
channel: in_app | sms | email | webhook
```

The internal-hackathon demo can simulate dispatch while still showing the intended message/channel clearly.

## 3.7 Offline Field Reporting

The frontend must support resilient report submission:
- queue failed submissions locally;
- retry when connectivity returns;
- visibly show pending/synced/failed state;
- preserve geotag and attached media metadata.

This can be implemented with IndexedDB/local persistence for the hackathon frontend.

---

# 4. Frontend Architecture

## 4.1 Recommended stack

- Next.js
- React
- TypeScript
- Tailwind CSS or the existing project styling system
- accessible component primitives
- map/GIS component compatible with the existing backend geometry
- Cobe/WebGL only where already integrated and stable

Use the existing project structure instead of replacing the application wholesale.

## 4.2 Frontend principle

The frontend is an operational product, not a static marketing mockup.

Every primary CTA must lead somewhere useful.

```text
Landing Page
   ↓
Get Started
   ↓
Dashboard
   ↓
Risk Map / Predictions / Alerts / Reports / Infrastructure / Weather
```

---

# 5. LANDING PAGE — REQUIRED

The application must have one polished, responsive landing page at `/`.

## 5.1 Landing page goals

The landing page has four jobs:

1. Explain the problem quickly.
2. Show that Bhūmi Raksha provides a better operational workflow.
3. Surface the latest landslide events.
4. Send the user directly into the working dashboard.

## 5.2 Header

Header contains:
- Bhūmi Raksha logo/wordmark;
- Home;
- Latest Events;
- How It Works;
- Dashboard;
- language control if already supported;
- prominent **Get Started** button.

Keep the header clean and professional. Avoid excessive navigation.

## 5.3 Hero section

Primary headline:

**See the risk before the slope moves.**

Supporting statement:

Bhūmi Raksha combines rainfall, soil conditions, terrain, field reports and AI-driven risk prediction to help NER authorities identify vulnerable zones earlier and respond faster.

Primary CTA:

**Get Started → Dashboard**

Secondary CTA:

**Explore Latest Events**

Hero visual:
- NER-centric risk visualization, or
- existing Cobe globe implementation if stable in the repository.

Do not let a decorative globe block the main CTA or make the landing page slow.

## 5.4 Trust / capability strip

Show compact capability indicators such as:

```text
AI Risk Prediction
Live Risk Mapping
Weather-linked Analysis
Field Reports
Infrastructure Impact
Early Alerts
```

These are capability statements, not claims of government certification or guaranteed prediction accuracy.

## 5.5 Why Bhūmi Raksha / How the website is better

Create a comparison-style section focused on workflow improvements.

### Before

```text
Scattered data
Manual checking
Delayed field reports
No unified risk picture
Hard-to-prioritize incidents
```

### With Bhūmi Raksha

```text
Unified geospatial view
Continuous telemetry ingestion
AI-assisted risk scoring
Citizen / field evidence
Road & infrastructure impact
Centralized alerts and response priority
```

Do not claim that the platform guarantees landslide prediction. Phrase it as **risk assessment / early warning / decision support**.

## 5.6 How it works

Use a five-step visual flow:

```text
1. Collect
Weather + terrain + sensors + reports

2. Analyze
Risk model + ML inference

3. Map
Hotspots + infrastructure + roads

4. Alert
Zone-specific warnings

5. Respond
Prioritized field action
```

## 5.7 Latest Landslide Events

This is a required section directly below the core hero/capability content.

Heading:

**Latest Landslide Activity**

Subtitle:

Recent incidents and conditions relevant to the region.

Each event card should show:
- date;
- district/state;
- severity;
- one-line summary;
- affected infrastructure if known;
- source;
- View Event action.

Interaction:
- cards are clickable;
- View Event opens a detail drawer/modal or `/events/{id}`;
- if the API fails, show cached demo events with a clear **Demo data** label.

Do not silently fabricate latest events.

## 5.8 Operational value section

Show why a response team would use the system:

```text
Know where risk is rising
See what is affected
Understand why the zone is risky
Verify field evidence
Act on highest-priority locations
```

Use UI screenshots or product-preview panels only if real screens exist in the project. Do not fake nonexistent functionality with static charts that are not connected to backend data.

## 5.9 Footer

Footer must contain:
- Bhūmi Raksha name and short description;
- project/internal-hackathon statement;
- copyright text;
- data/source disclaimer;
- links to Terms/Privacy only if those pages actually exist;
- backend/API status link only if functional.

Required copyright line:

**© 2026 Bhūmi Raksha. Built for disaster-risk awareness and decision support.**

Avoid claiming ownership of external map tiles, satellite data, government datasets, open-source libraries or third-party content. Where required, preserve their licenses/attribution.

---

# 6. DASHBOARD — `/dashboard`

The Get Started button must land here.

The dashboard must be functional, data-driven and immediately useful.

## 6.1 Top bar

Show:
- Bhūmi Raksha;
- current region selection;
- last data refresh;
- backend/system health;
- alert status;
- profile/menu if authentication is implemented.

## 6.2 KPI row

Recommended live cards:

```text
Active Alerts
High-Risk Zones
Blocked / At-Risk Roads
Open Field Reports
```

Optional:

```text
Average Risk
Rainfall 24h
Sensor Health
```

KPI values must be derived from API data.

## 6.3 Main GIS panel

The map is the primary dashboard element.

Layers:
- risk heatmap;
- risk zone polygons;
- active alerts;
- sensors;
- field reports;
- roads/infrastructure;
- optional latest landslide event markers.

Map interactions:
- zoom;
- pan;
- layer toggle;
- zone selection;
- report selection;
- event selection.

## 6.4 Risk panel

Show:
- current risk score;
- alert level;
- confidence;
- top contributing factors;
- rainfall;
- soil moisture;
- vegetation condition;
- slope angle.

SHAP/explanation values should be visualized as contributing factors, not over-interpreted as causal proof.

## 6.5 Forecast / Weather panel

One combined module named:

**Weather & Forecast**

Show:
- rainfall history;
- recent/forecast precipitation;
- selected zone;
- API status/source;
- fallback indicator where applicable.

Do not duplicate weather into separate redundant cards.

## 6.6 Alerts panel

Show:
- active alert level;
- zone;
- timestamp;
- reason;
- acknowledgement state;
- action.

Actions:
- acknowledge;
- open zone;
- inspect reason.

## 6.7 Infrastructure panel

Show the most affected roads/infrastructure first.

Include status:
- OPEN;
- AT_RISK;
- PARTIALLY_BLOCKED;
- BLOCKED;
- RESTORED.

## 6.8 Community / Field Reports panel

Show:
- report type;
- map location;
- submitted time;
- AI classification;
- verification state.

Actions:
- inspect;
- verify;
- mark false positive where authorized.

The existing image classifier is a hackathon mock; the UI must not describe its output as a certified computer-vision diagnosis.

---

# 7. FRONTEND ROUTES

Required routes:

```text
/                    Landing page
/dashboard            Operational dashboard
/events               Latest landslide events
/events/[id]          Event details
/reports              Community / field reports
/alerts               Alert center
/predictions          Prediction explorer
/infrastructure       Road and infrastructure impact
/weather              Weather & forecast explorer
/settings              Settings / language / demo controls if implemented
```

A route may be merged when the interaction is cleaner, but the capabilities must remain accessible.

---

# 8. API CLIENT RULES

Create a typed API client layer.

Do not scatter raw `fetch()` calls throughout components.

Recommended structure:

```text
lib/api/
  client.ts
  risk.ts
  predictions.ts
  events.ts
  reports.ts
  alerts.ts
  infrastructure.ts
  weather.ts
  sensors.ts
```

Requirements:
- typed responses;
- request cancellation where useful;
- centralized base URL;
- clear error states;
- timeout handling;
- retry only where safe;
- loading states;
- empty states;
- fallback/demo states.

---

# 9. REAL-TIME / REFRESH BEHAVIOR

The dashboard should feel live without causing unnecessary network load.

Preferred order:

1. WebSocket/event stream if already available and stable.
2. Short polling for volatile metrics.
3. Manual refresh for expensive views.

Never refresh the entire dashboard just because one card changed.

Do not use React state updates every animation frame for decorative WebGL effects.

---

# 10. ERROR AND FALLBACK EXPERIENCE

Every major screen must handle:

```text
Loading
Loaded
Empty
API error
Offline
Fallback/demo data
```

When a fallback is used, show a non-intrusive but explicit label such as:

**Using cached/demo data**

Never make demo data look like verified real-time telemetry.

---

# 11. VISUAL DESIGN DIRECTION

The visual language must communicate:

**geospatial intelligence + disaster readiness + trust**

Preferred style:
- dark or deep-neutral operational canvas;
- restrained blue for intelligence/data;
- orange for active caution/high risk;
- red reserved for critical alerts;
- green reserved for safe/normal state;
- white/light neutral for primary text;
- strong spacing and hierarchy;
- clean cards with minimal decorative noise;
- map-first information architecture.

Do not turn every element into a glowing neon card.

Risk colors must remain semantically consistent across map, legend, chips, alerts and charts.

---

# 12. RESPONSIVENESS

Desktop is the primary hackathon presentation view, but the system must remain usable on:
- 1440px+
- 1024px
- tablet widths
- mobile widths

On mobile:
- stack KPI cards;
- keep the map interactive;
- move secondary panels into collapsible sections;
- keep **Get Started**, active-alert access and report submission easy to reach.

---

# 13. ACCESSIBILITY

Required:
- keyboard navigation;
- visible focus states;
- semantic buttons/links;
- accessible chart/map controls;
- adequate text contrast;
- non-color indicators for alert states;
- descriptive loading and error messaging;
- reduced-motion support where practical.

---

# 14. SECURITY AND DATA INTEGRITY

Frontend must never expose:
- database credentials;
- service-role keys;
- private secrets;
- server-side environment variables.

Use public browser-safe configuration only.

Validate uploaded media and respect backend size/type restrictions.

Sanitize user-generated descriptions before rendering into HTML.

---

# 15. DEMO MODE — INTERNAL HACKATHON

The product is allowed to use controlled simulation where the backend currently uses mock implementations.

However, the UI must distinguish:

```text
LIVE
CACHED
SIMULATED
MOCK
```

Examples:
- simulated sensor telemetry → **SIMULATED**;
- cached weather fallback → **CACHED**;
- mocked alert dispatch → **SIMULATED DISPATCH**;
- mocked image classifier → **AI DEMO CLASSIFICATION**.

This makes the demo credible without falsely claiming operational deployment.

---

# 16. GET STARTED FLOW

The landing-page button must not lead to an unfinished route.

Flow:

```text
Click Get Started
      ↓
/dashboard
      ↓
Fetch /api/health
      ↓
Fetch risk + predictions + weather + alerts + reports + infrastructure
      ↓
Render operational state
```

If backend is unavailable:
- show a clear service status banner;
- keep the page usable for cached/demo visualization where supported;
- provide retry.

---

# 17. LATEST EVENTS DATA UX

Landing page latest events should be intentionally concise.

Recommended card hierarchy:

```text
[SEVERITY]       [DATE]
Mangan, Sikkim
Short incident summary...
Affected: river flow / road / homes / etc.
Source: Government of Sikkim
[View Event →]
```

Do not place huge paragraphs in event cards.

Use a horizontal carousel on desktop only if it remains keyboard accessible; a responsive grid is preferable when there are few records.

---

# 18. CONTENT RULES

Do not use exaggerated claims such as:
- “100% accurate”;
- “guaranteed prediction”;
- “prevents landslides”;
- “government certified”;
- “detects every landslide”.

Preferred wording:
- “risk prediction”;
- “early warning”;
- “decision support”;
- “AI-assisted assessment”;
- “near-real-time monitoring” where supported;
- “field-verified information” only after verification.

---

# 19. LANDING PAGE CONTENT COPY

## Hero

**See the risk before the slope moves.**

**Bhūmi Raksha brings weather, terrain, sensor signals, field reports and AI-driven risk assessment into one operational view for the North Eastern Region.**

CTA: **Get Started**

Secondary: **View Latest Events**

## Value statement

**From fragmented signals to one clear picture.**

Bhūmi Raksha helps response teams identify where risk is rising, understand the factors behind it, see what infrastructure may be affected and act on the highest-priority locations.

## Closing CTA

**Turn early signals into faster decisions.**

Button: **Open Risk Dashboard →**

---

# 20. COPYRIGHT / ATTRIBUTION

The product footer should use:

```text
© 2026 Bhūmi Raksha. Built for disaster-risk awareness and decision support.
```

Add attribution for third-party assets/libraries where their licenses require it. Do not place a blanket copyright statement over external datasets, maps, satellite imagery, open-source packages or government content that is separately licensed.

---

# 21. IMPLEMENTATION PRIORITY

## P0 — Must work for demo

1. Landing page `/`.
2. Get Started → `/dashboard`.
3. Dashboard API wiring.
4. Risk map.
5. Risk/prediction cards.
6. Weather & Forecast.
7. Active alerts.
8. Community/field reports.
9. Infrastructure impact.
10. `/api/health` status.
11. Latest event API + landing-page cards.
12. Clear demo/fallback labeling.

## P1 — Strong hackathon differentiators

1. Sensor simulator + ingestion.
2. Live-ish telemetry refresh.
3. Event detail view.
4. Response prioritization.
5. Offline report queue.
6. Multilingual UI/alerts.
7. Prediction explanation view.

## P2 — Polish

1. Smooth transitions.
2. Cobe/WebGL landing visual if stable.
3. Advanced map layer controls.
4. richer event history/timeline.
5. export/share views.

---

# 22. FINAL VERIFICATION CHECKLIST

Before calling the frontend complete:

### Landing

- [ ] `/` loads without console errors.
- [ ] hero renders correctly.
- [ ] Get Started opens the dashboard.
- [ ] latest events are fetched from backend.
- [ ] event source/date are visible.
- [ ] fallback state is explicit.
- [ ] footer copyright/attribution is present.

### Dashboard

- [ ] health status works.
- [ ] risk zones load.
- [ ] predictions load.
- [ ] weather loads.
- [ ] alerts load.
- [ ] reports load.
- [ ] infrastructure loads.
- [ ] map markers/polygons are aligned.
- [ ] no fake KPI numbers are hard-coded as if live.
- [ ] loading/empty/error states exist.

### Sensor demo

- [ ] simulator can emit readings.
- [ ] readings reach ingestion API.
- [ ] readings appear in the UI.
- [ ] simulation status is clearly labeled.
- [ ] threshold changes can visibly affect risk.

### UX

- [ ] responsive at desktop/tablet/mobile.
- [ ] keyboard navigation works on major controls.
- [ ] risk colors are semantically consistent.
- [ ] no excessive animation.
- [ ] no major layout shift.
- [ ] no duplicate weather cards.
- [ ] no broken buttons/placeholder routes.

### Backend safety

- [ ] secrets remain server-side.
- [ ] CORS is configured.
- [ ] backend error responses are handled gracefully.
- [ ] external API fallbacks are visible to the user.
- [ ] mocked services are not represented as production-certified capabilities.

---

# 23. SOURCE / VERIFICATION NOTE FOR CURRENT EVENT SEEDS

The current event examples in this brain are intended only as verified/attributed seed data for the demo layer and should be refreshed before a public deployment.

Reference sources consulted during this specification update:
- Government of Sikkim — District Administration, Mangan, press release dated 06-Sep-2026.
- Government of Sikkim — Barapathing landslide / water-channel and road-connectivity assessment, 03-Sep-2026.
- Geological Survey of India Bhusanket — recent landslide reporting and inventory resources.
- Contemporary reporting for the early-September 2026 Assam landslide incident.

---

# 24. NON-NEGOTIABLE PRODUCT RULE

**Bhūmi Raksha must look like one coherent operational system.**

The landing page introduces the product.
The latest-event layer proves current relevance.
The Get Started button opens the real dashboard.
The dashboard exposes the backend's live/fallback data.
The sensor simulator demonstrates future hardware compatibility.
The map, risk engine, weather, reports, alerts and infrastructure views all tell the same operational story.

Do not create a beautiful landing page and a disconnected dashboard.
Do not create a dashboard full of hard-coded numbers.
Do not hide mock/fallback behavior from evaluators.
Do not claim capabilities that are not implemented.
