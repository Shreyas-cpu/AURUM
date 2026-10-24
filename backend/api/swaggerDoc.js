// OpenAPI 3.0 Specification & Swagger UI Handler for AURUM
export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "AURUM — Emergency Response Orchestration API",
    version: "1.0.0",
    description: "Adaptive Unified Routing for Urgent Medicine (AURUM). Synchronizes emergency pipelines across hospital ERCs, ambulance transit, and telemetry monitors.",
    contact: {
      name: "AURUM Engineering Team",
      url: "https://github.com/Shreyas-cpu/AURUM"
    }
  },
  servers: [
    {
      url: "/",
      description: "Current API Server"
    }
  ],
  tags: [
    { name: "Simulation", description: "Real-time emergency pipeline chain-reaction simulation (Sim_01)" },
    { name: "Hospitals", description: "Hospital resource telemetry, Cath Lab & ICU capacity" },
    { name: "Ambulances", description: "Emergency fleet location tracking and transit status" },
    { name: "Patients & Vitals", description: "Triage intake and streaming telemetry vitals" },
    { name: "System", description: "Uptime monitoring and system health checks" }
  ],
  paths: {
    "/": {
      get: {
        tags: ["System"],
        summary: "Root API Status",
        description: "Returns general service status and database connectivity indicator.",
        responses: {
          "200": {
            description: "Service is online"
          }
        }
      }
    },
    "/health": {
      get: {
        tags: ["System"],
        summary: "Health Check",
        description: "Lightweight endpoint for uptime monitors (Render & cron-job.org).",
        responses: {
          "200": {
            description: "Service is healthy"
          }
        }
      }
    },
    "/api/sim/01/start": {
      post: {
        tags: ["Simulation"],
        summary: "Start Sim_01 (Severe Heart Attack)",
        description: "Initiates end-to-end chain reaction: assigns ambulance, animates route, streams vitals deterioration, triggers dynamic reroute to Cath Lab, and confirms hospital arrival.",
        responses: {
          "200": {
            description: "Simulation successfully started"
          }
        }
      }
    },
    "/api/sim/01/stop": {
      post: {
        tags: ["Simulation"],
        summary: "Stop Simulation",
        description: "Halts any running simulation and clears active interval timers.",
        responses: {
          "200": {
            description: "Simulation stopped"
          }
        }
      }
    },
    "/api/hospitals": {
      get: {
        tags: ["Hospitals"],
        summary: "List Hospitals",
        description: "Retrieves list of active hospitals, ICU capacity, and specialized facility statuses.",
        responses: {
          "200": {
            description: "List of hospitals"
          }
        }
      }
    },
    "/api/hospitals/{id}": {
      get: {
        tags: ["Hospitals"],
        summary: "Get Hospital by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, example: "H-01" }
        ],
        responses: {
          "200": { description: "Hospital details" },
          "404": { description: "Hospital not found" }
        }
      }
    },
    "/api/hospitals/{id}/resources": {
      put: {
        tags: ["Hospitals"],
        summary: "Update Hospital Resources",
        description: "Updates available ICU beds, general beds, and ventilators in real-time.",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, example: "H-01" }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  avail_icu_beds: { type: "integer", example: 4 },
                  avail_gen_beds: { type: "integer", example: 12 },
                  avail_ventilators: { type: "integer", example: 2 },
                  current_load_pct: { type: "number", example: 78.5 }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Resources updated" }
        }
      }
    },
    "/api/ambulances": {
      get: {
        tags: ["Ambulances"],
        summary: "List Ambulances",
        description: "Returns active ambulance units, status, and fleet telemetry.",
        responses: {
          "200": { description: "List of ambulances" }
        }
      }
    },
    "/api/ambulances/{id}/location": {
      put: {
        tags: ["Ambulances"],
        summary: "Update Ambulance Location",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, example: "AMB-002" }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  lat: { type: "number", example: 18.5204 },
                  lng: { type: "number", example: 73.8567 }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Ambulance location broadcasted" }
        }
      }
    },
    "/api/patients": {
      post: {
        tags: ["Patients & Vitals"],
        summary: "Register Incoming Patient",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  ambulance_id: { type: "string", example: "AMB-002" },
                  age: { type: "integer", example: 58 },
                  sex: { type: "string", example: "Male" },
                  chief_complaint: { type: "string", example: "Severe Chest Pain" },
                  mechanism_of_injury: { type: "string", example: "Medical (Suspected MI)" }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "Patient registered" }
        }
      }
    },
    "/api/patients/{id}/vitals": {
      post: {
        tags: ["Patients & Vitals"],
        summary: "Stream Telemetry Vitals",
        description: "Streams live vital metrics from ambulance monitor device directly into hospital ERC.",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, example: "P-SIM-01" }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  heart_rate: { type: "integer", example: 118 },
                  systolic_bp: { type: "integer", example: 145 },
                  diastolic_bp: { type: "integer", example: 92 },
                  spo2: { type: "number", example: 89.5 },
                  respiratory_rate: { type: "integer", example: 24 },
                  temperature: { type: "number", example: 37.1 },
                  gcs_score: { type: "integer", example: 14 },
                  source: { type: "string", example: "MONITOR_DEVICE" }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "Vitals broadcasted" }
        }
      }
    }
  }
};

const swaggerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AURUM — API Documentation (Swagger)</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <link rel="icon" type="image/png" href="https://unpkg.com/swagger-ui-dist@5.11.0/favicon-32x32.png" />
  <style>
    body { margin: 0; background: #fafafa; font-family: sans-serif; }
    .topbar { display: none !important; }
    .swagger-ui .info { margin: 30px 0; }
    .swagger-ui .info .title { font-size: 32px; color: #1e293b; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" charset="UTF-8"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/openapi.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout"
      });
    };
  </script>
</body>
</html>`;

export function setupSwagger(app) {
  app.get('/openapi.json', (req, res) => {
    res.json(openApiSpec);
  });
  app.get('/docs', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(swaggerHtml);
  });
  app.get('/swagger', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(swaggerHtml);
  });
}
