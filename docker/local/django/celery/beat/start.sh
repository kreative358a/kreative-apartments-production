#!/bin/bash

# wyjście z powodu błędu
set -o errexit
# ogłoszenie tego
set -o nounset

# usunięcie celerybeat.pid
rm -f './celerybeat.pid'

# określamy wykonywaniu plików obserwowanych.
exec watchfiles --filter python celery.__main__.main --args '-A config.celery_app beat -l INFO'
