# syntax=docker/dockerfile:1

# Use the official Python slim image as a base
ARG PYTHON_VERSION=3.8.2
FROM python:${PYTHON_VERSION}-slim as base

# Prevent Python from writing pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set environment variables
ENV SECRET_KEY="k7vh_p+pe_oe^*&6^er(n0twv8rdx34-%1xqhg&2zs%_g_(owf"
ENV CRYPTOGRAPHY_KEY="k1fg_p+pe_oe^*&9^er(n0twv8rdx34-%7xqhg&3pp%_g_(axf"
ENV EMAIL_HOST_PASSWORD="fbtw veyw gjfa sdfw"
ENV DB_PASSWORD="mysqlpass"
ENV AUTH_DB_HOST="mysql_auth_db"
ENV ACCOUNT_INFO_DB_HOST="mysql_account_information"

# Set the working directory
WORKDIR /app

# Create a non-privileged user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Create the logs directory with appropriate permissions
RUN mkdir -p /app/logs && chown -R appuser:appuser /app/logs && chmod -R 777 /app/logs

# Create an empty log file with appropriate permissions
RUN touch /app/logs/logs.log && chown appuser:appuser /app/logs/logs.log && chmod 666 /app/logs/logs.log

# Install system dependencies for building Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    libmariadbclient-dev \
 && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    pip install -r requirements.txt

# Switch to the non-privileged user
USER appuser

# Copy the source code into the container
COPY . .

# Expose the port that the application listens on
EXPOSE 8000