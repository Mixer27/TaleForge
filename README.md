# How to setup:
## install all packages via npm

```bash
# run this line in:
# root dir
# ./server
# ./client
npm i 
```

## environment variables
1. create .env file in root dir

    ```bash
    # root_dir/.env
    PORT= # port_num
    SSL_KEY= # ssl_priv_key_path
    SSL_CERT= # ssl_cert_full_path
    ```

1. copy .env to ./server

# Package Scripts

```bash
npm run build # build server and client app

npm run build-client # build client app

npm run build-server # build server app

npm run dev-client # run client app in watch mode locally

npm run dev-server # run server app in watch mode

npm run start # run compiled javascript server app 
```

# Plan pracy

1. Teoria
    1. MVC
    1. REST API
    1. Ewentualnie wzorce projektowe, których użyję
1. Projekt aplikacji
    1. Opis aplikacji i Przypadki użycia
    1. Baza Danych
        1. Użyte technologie - opis i dlaczego
        2. Schemat Bazy danych
    1. Klient
        1. Użyte technologie - opis i dlaczego
        2. Projekt GUI
    1. Serwer
        1. Użyte technologie - opis i dlaczego
        2. Endpointy API
1. Implementacja
    1. Opis funkcjonalności + listingi
    1. ...