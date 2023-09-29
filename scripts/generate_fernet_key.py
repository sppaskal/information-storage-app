from cryptography.fernet import Fernet

key = Fernet.generate_key()
key_str = key.decode()
print(key_str)