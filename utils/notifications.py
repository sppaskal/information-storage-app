from django.core.mail import send_mail
from django.conf import settings


class Email():

    @staticmethod
    def send_email(title, message, recipients):
        try:
            send_mail(
                title,
                message,
                settings.EMAIL_HOST_USER,
                recipients,
                fail_silently=False
            )
            return {
                "sent": True,
                "message": "Email sent successfully",
                "error": ""
            }
        except Exception as e:
            return {
                "sent": False,
                "message": "Email failed to send",
                "error": str(e)
            }
