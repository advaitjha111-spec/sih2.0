# Bhumiraksha (SIH 2.0)

Bhumiraksha is an intelligent, real-time landslide risk assessment and early-warning evacuation platform designed for vulnerable terrains (specifically deployed for Dima Hasao, Assam). It features a modern Command Center dashboard, dynamic AI risk pipelines, and autonomous evacuation agents.

## ?? Key Features

*   **Interactive Command Center Dashboard:** Real-time metrics, risk trend area charts, and dynamic target selection.
*   **AI Risk Assessment Engine:** Processes synthetic IoT sensor telemetry to calculate multi-factor threat scores.
*   **Autonomous Guardrail Agent:** A 'Skeptic Agent' evaluating critical risks. If the risk score hits critical thresholds (>= 90), it autonomously bypasses human intervention to trigger immediate evacuation.
*   **Automated Evacuation Protocols:** Integrates with Twilio to broadcast critical alerts via SMS, WhatsApp, and Voice Calls to affected populations.
*   **Real-time Cartography:** Integration with Mapbox for live geographic threat visualization.

## ??? Technology Stack

*   **Frontend:** Next.js 13+ (App Router), React, TailwindCSS, Framer Motion, Recharts.
*   **Backend:** Python, FastAPI, Uvicorn, SQLite (Alembic for migrations).
*   **Simulation:** Custom Python telemetry generators for simulating terrain slope, rainfall, and ground saturation.
*   **Communications:** Twilio API.

## ?? Getting Started

### Prerequisites
*   Node.js & Yarn
*   Python 3.9+
*   Twilio Account (for evacuation alerts)

### Local Development

1.  **Start the Backend:**
    `ash
    cd backend
    python -m venv venv
    .\venv\Scripts\activate
    pip install -r requirements.txt
    python -m uvicorn main:app --reload
    `

2.  **Start the Telemetry Simulation:**
    `ash
    cd backend
    .\venv\Scripts\activate
    python simulation.py
    `

3.  **Start the Frontend:**
    `ash
    cd frontend
    yarn install
    yarn dev
    `
    Navigate to http://localhost:3000 to view the application.
