# określamy że obrazem bazowym będzie nginx
FROM nginx:1.25.3-alpine

# usuwamy domyślną konfigurację nginx
RUN rm /etc/nginx/conf.d/default.conf

# kopiujemy plik konfiguracyjny nginx z bieżącego katalogu, za pomocą skrótu etc i następnie zapisujemy ten plik
COPY ./nginx.conf /etc/nginx/conf.d/default.conf