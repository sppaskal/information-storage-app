-- Granting permissions to sppaskal user to manage test databases.
-- This is required when running automated tests in docker container.

-- Make sure this file is loaded after the authentication database
-- as the user it references will not exist otherwise.

GRANT ALL PRIVILEGES ON `test_%`.* TO 'sppaskal'@'%';
FLUSH PRIVILEGES;
