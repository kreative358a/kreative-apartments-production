import os

from celery import Celery
from django.conf import settings

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")

app = Celery("kreative_apartments")
# namespace  jest używany w celu uniknięcia kolizji pomiędzy konfiguracją Celery a konfiguracją Django
app.config_from_object("django.conf:settings", namespace="CELERY")

# konfiguracja aplikacji oscylacyjnej automatycznie wykrywającej swoje zadania
# Funkcja automatycznego wykrywania zadań służy do automatycznego wykrywania zadań w aplikacjach tego typu we wszystkich zainstalowanych środowiskach Django
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)