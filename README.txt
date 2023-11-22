README

Run server with http:
1. python manage.py runserver

Run server with https:
1. openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
2. python manage.py runserver_plus --cert-file cert.pem --key-file key.pem
