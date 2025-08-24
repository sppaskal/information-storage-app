# Information Storage App

This is a demo Django application showcasing a user authentication and data storage system. Follow these steps to run the app locally using Docker.

## Prerequisites
- Docker installed (Docker Desktop for Windows/macOS, or Docker and Docker Compose for Linux).
- Git installed to clone the repository.

## Setup Instructions
1. **Install Docker**:
   - For Windows/macOS: Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
   - For Linux: Install Docker and Docker Compose (e.g., `sudo apt install docker.io docker-compose` on Ubuntu).

2. **Start Docker**:
   - On Windows/macOS: Launch Docker Desktop and ensure it’s running (verify with `docker --version` in a terminal).
   - On Linux: Start the Docker daemon: `sudo systemctl start docker`.

3. **Clone the Repository**:
   ```bash
   git clone https://github.com/slavoid/information-storage-app.git
   ```

4. **Navigate to the Project Directory**:
   ```bash
   cd information-storage-app
   ```

5. **Pull the Django Image (Optional)**:
   The image will be pulled automatically in the next step, but you can pull it manually:
   ```bash
   docker pull slavoid/information-storage-app:latest
   ```

6. **Start the Services**:
   ```bash
   docker-compose up -d
   ```

7. **Verify the Server**:
   Check that all services are running:
   ```bash
   docker-compose ps
   ```
   Ensure `mysql_auth_db`, `mysql_account_information`, and `django` are in the `Up` state.

8. **Access the App**:
   Open a browser and go to: [http://127.0.0.1:8500/user-interface/login/](http://127.0.0.1:8500/user-interface/login/).

9. **Log In**:
   Use the following credentials:
   - **Username**: `Demo-User`
   - **Password**: `demo12345`

## Troubleshooting
- **Port Conflicts**: If ports `8500`, `3307`, or `3308` are in use, stop conflicting services or edit `docker-compose.yml` to use different ports (e.g., `8501:8500`).
- **Database Issues**: If login fails, ensure `db_dumps/auth_db.sql` and `db_dumps/account_information.sql` are in the project root. To reseed the database:
  ```bash
  docker-compose down -v
  docker-compose up -d
  ```
- **Logs**: Check for errors:
  ```bash
  docker-compose logs django
  ```

## Notes
- The app uses a pre-built Docker image (`slavoid/information-storage-app:latest`) from [Docker Hub](https://hub.docker.com/r/slavoid/information-storage-app).
- The `db_dumps` folder in the repo seeds the MySQL databases with initial data, including the demo user.