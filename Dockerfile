# Base Python image (slim variant for smaller footprint)
ARG PYTHON_VERSION=3.8-slim
FROM python:${PYTHON_VERSION} as base

# Prevent Python from writing .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Development secrets (for local use only; avoid committing to Git)
ENV SECRET_KEY="k7vh_p+pe_oe^*&6^er(n0twv8rdx34-%1xqhg&2zs%_g_(owf" \
    CRYPTOGRAPHY_KEY="k1fg_p+pe_oe^*&9^er(n0twv8rdx34-%7xqhg&3pp%_g_(axf" \
    EMAIL_HOST_PASSWORD="fbtw veyw gjfa sdfw" \
    DB_PASSWORD="mysqlpass" \
    AUTH_DB_HOST="mysql_auth_db" \
    ACCOUNT_INFO_DB_HOST="mysql_account_information"

# Set working directory inside container
WORKDIR /app

# Install system dependencies for building Python packages and MariaDB support
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    libmariadb-dev \
    libmariadb-dev-compat \
 && rm -rf /var/lib/apt/lists/*

# Install Python dependencies from requirements.txt
COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt

# Create a non-root user for better security
ARG UID=10001
RUN useradd -m -u ${UID} -s /bin/bash appuser

# Set up logs directory with open permissions for development
RUN mkdir -p /app/logs && \
    touch /app/logs/logs.log && \
    chmod -R 777 /app/logs

# Copy project files into container
COPY . .

# Switch to non-root user
USER appuser

# Expose Django's default port
EXPOSE 8000
