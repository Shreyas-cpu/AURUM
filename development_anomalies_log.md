# Development Anomalies Log

This log tracks architectural or implementation discrepancies found between the current state of the codebase and the **AURUM Master Build Prompt (HC03)**.

### Identified Issues (as of Stage 1 Analysis)

1. **Incorrect Backend Folder Structure:**
   - *Master Prompt:* Specifies that the backend API should be structured under a `backend/api/` directory to separate routes and core logic.
   - *Current State:* The backend is entirely centralized in a single `backend/main.py` file with no structural separation.

2. **Missing Database & Spatial Dependencies:**
   - *Master Prompt:* Requires PostgreSQL with the `PostGIS` extension for geospatial capabilities, `SQLAlchemy` (or direct connection), and a python postgres adapter.
   - *Current State:* The `backend/requirements.txt` currently lacks `psycopg2`, `asyncpg`, `sqlalchemy`, or `psycopg[binary]`.

3. **Missing Docker/Infrastructure Orchestration:**
   - *Master Prompt:* Specifies `Docker + Docker Compose` for one-command setup.
   - *Current State:* No `docker-compose.yml` to spin up the required PostgreSQL + PostGIS database. This prevents local development from easily setting up the required schemas.

4. **Empty Initial Prompt File:**
   - *Issue:* The file `Resources/AURUM_Master_Build_Prompt (1).docx.md` was found to be completely empty. The actual text had to be manually extracted from the accompanying PDF file into `AURUM_Master_Build_Prompt_Extracted.txt`.