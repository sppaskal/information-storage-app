README

Running with Docker:

1. Install Docker (I use Docker Desktop)
2. Run Docker
3. Clone Information-Storage-App repo locally
4. Open a terminal in the root dir of the project
5. Execute the command: docker-compose build (Alternatively you can pull the latest Django server and MySQL images from Docker Hub: https://hub.docker.com/r/slavoid/information-storage-app)
6. Execute the command: docker-compose up
7. The server should now be up
8. Open a browser and go to: http://127.0.0.1:8000/user-interface/login/
9. Enter credentials 
      username: Demo-User
      password: demo12345

NOTE: By default the application is configured to run without multi-factor authentication. To test MFA you will need to:
1. Create an account via the sign-up page using a legitimate email you have access to
2. Reconfigure settings.py by setting 'DEMO_MODE' to false
3. The docker django container should automatically see this change
4. Enter your credentials in the login page
5. An email should appear in your inbox with your access code
