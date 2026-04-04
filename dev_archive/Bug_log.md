# AURUM Bug Log

| Bug ID | Description | Status | Fix Description |
|---|---|---|---|
| BUG-001 | Node.js Backend Server (`server.js`) throws EADDRINUSE on port 3001 | ✅ Resolved | Killed zombie Node processes holding port 3001. |
| BUG-002 | Missing cross-platform backend startup script | ✅ Resolved | Created `run_aurum.bat` to launch all core services (PostgreSQL, Node API, ML Engine, React Frontend) in one click. |
| BUG-003 | Docker `docker-compose up` fails when Docker Desktop is closed. | ✅ Resolved | Noted requirement to start Docker before launching script; Batch file alerts user. |
| BUG-004 | Pylance errors in `main.py` regarding possible `None` types for ML models. | ✅ Resolved | Replaced simple truthiness check with explicit `is None` checks for all model variables to satisfy type narrowing. |
| BUG-005 | Pylance attribute error for `req.age` in `nexus.py` router logic. | ✅ Resolved | Added missing `age: Optional[int] = None` property to `RouteRequest` Pydantic model. |
