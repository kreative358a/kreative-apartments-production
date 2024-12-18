from os import getenv, path
from dotenv import load_dotenv
from .base import * #noqa
from .base import BASE_DIR
# from django.conf import settings

prod_env_file = path.join(BASE_DIR, ".envs", ".env.production")

if path.isfile(prod_env_file):
    load_dotenv(prod_env_file)

SECRET_KEY = getenv(
    "DJANGO_SECRET_KEY", 
                    )
# SECURITY WARNING: don't run with debug turned on in production!
ADMIN_URL = getenv("DJANGO_ADMIN_URL")

# ALLOWED_HOSTS = []
ALLOWED_HOSTS = [".kreative-apartments.pro"]
# ALLOWED_HOSTS = [".homeidea.pl"]
ADMINS = [
    ("Kreative Bonum", "kreative.apartments.login@gmail.com"),
    ]
SITE_NAME = getenv("SITE_NAME")
EMAIL_BACKEND = "djcelery_email.backends.CeleryEmailBackend"

EMAIL_HOST = getenv("EMAIL_HOST")

EMAIL_PORT = getenv("EMAIL_PORT")

EMAIL_HOST_PASSWORD = getenv("SMTP_PASSWORD")
EMAIL_USE_TLS = True
EMAIL_HOST_USER = getenv("EMAIL_HOST_USER")

DEFAULT_FROM_EMAIL = getenv("DEFAULT_FROM_EMAIL") 
SERVER_EMAIL = getenv("DEFAULT_FROM_EMAIL") 

DOMAIN = getenv("DOMAIN")

EMAIL_USE_SSL = False

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

SECURE_SSL_REDIRECT = getenv("DJANGO_SECURE_SSL_REDIRECT", "True") == "True"

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_HSTS_SECONDS = 300 # 518400 #

SECURE_HSTS_INCLUDE_SUBDOMAINS = (
    getenv("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", "True") == "True"
)

SECURE_HSTS_PRELOAD = getenv("DJANGO_SECURE_HSTS_PRELOAD", "True") == "True"

SECURE_CONTENT_TYPE_NOSNIFF = (
    getenv("DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", "True") == "True"
)

CSRF_TRUSTED_ORIGINS = ["https://kreative-apartments.pro", "https://www.kreative-apartments.pro"]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {"require_debug_false": {"()": "django.utils.log.RequireDebugFalse"}},
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(name)-12s %(asctime)s %(module)s %(process)d %(thread)d %(message)s"
        }
    },
    "handlers": {
        "mail_admins": {
            "level": "ERROR",
            "filters": ["require_debug_false"],
            "class": "django.utils.log.AdminEmailHandler",
        },
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {"level": "INFO", "handlers": ["console"]},
    "loggers": {
        "django.request": {
            "handlers": ["mail_admins"],
            "level": "ERROR",
            "propagate": True,
        },
        "django.security.DisallowedHost": {
            "handlers": ["console", "mail_admins"],
            "level": "ERROR",
            "propagate": True,
        },
    },
}