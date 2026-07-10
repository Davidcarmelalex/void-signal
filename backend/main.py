#!/usr/bin/env python3
"""VOID//SIGNAL — Entry point."""

import uvicorn
from void_signal.config import settings
from void_signal.api import app

if __name__ == "__main__":
    uvicorn.run("void_signal.api:app", host="0.0.0.0", port=8000, reload=settings.DEBUG, log_level="info")
