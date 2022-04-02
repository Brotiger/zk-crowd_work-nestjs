# CrowdWork инструкция по запуску

## Необходимые программы

- docker
- docker-compose
- nodejs v15.5.1

## Переменные окружения для docker

- MYSQL_ROOT_PASSWORD - Пароль от mysql для пользователя root
- NODE_ENV - Тип сборки (development/production)
- PORT - Порт на котором будет работать приложение внутри докер контейнера

## Переменные окружения для проекта

Файлы с переменными окружения для проекта должны быть расположенны по следующему адресу: ./env/(development/production).env

- NODE_ENV - Тип сборки
- PORT - Порт на котором должно работать приложение внутри контейнера
- TWILIO_ACCOUNT_SID - ID аккаунта twilio
- TWILIO_AUTH_TOKE - Токен для авторизации в twilio
- TWILIO_PHONE_FROM - Номер twilio с которого будут отправляться СМС
- JWT_PRIVATE_KEY - Приватный ключ для подписи JWT
- JWT_EXPIRES_IN - Срок действия JWT
- CODE_TTL - Время хранения кода в кеше
- SMS_TTL - Промежуток времени раз в который пользователь может получать СМС
- DOC_PASSWORD - Пароль от Swagger (Логин - admin)
- PAGINATE_RANGE - Максимальный размер limit
- PHONE_EXAMPLE - Пример номера телефона для Swagger документации
- MAX_FILE_SIZE - Максимальный вес файла в килобайтах
- IMAGE_EXT - Допустимые расширения изображений

## Установка зависимостей

- npm i -g @nestjs/cli
- npm i

## Сборка

- npm run build
- docker-compose build

## Запуск

- docker-compose up -d
