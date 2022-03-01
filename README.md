# CrowdWork инструкция по запуску
## Переменные окружения для docker
+ MYSQL_ROOT_PASSWORD - Пароль от mysql для пользователя root
+ NODE_ENV - Тип сборки (development/production)
+ PORT - Порт на котором будет работать приложение внутри докер контейнера

## Переменные окружения для проекта
Файлы с переменными окружения для проекта должны быть расположенны по следующему адресу: ./env/(development/production).env

+ NODE_ENV - Тип сборки
+ PORT - Порт на котором должно работать приложение внутри контейнера

+ TWILIO_ACCOUNT_SID - ID аккаунта twilio
+ TWILIO_AUTH_TOKE - Токен для авторизации в twilio
+ TWILIO_PHONE_FROM - Номер twilio с которого будут отправляться СМС

+ JWT_PRIVATE_KEY - Приватный ключ для подписи JWT
+ JWT_EXPIRES_IN - Срок действия JWT

+ CODE_TTL - Время хранения кода в кеше
+ SMS_TTL - Промежуток времени раз в который пользователь может получать СМС

+ DOC_PASSWORD - Пароль от Swagger (Логин - admin)

## Сборка
docker-compose build

## Запуск
docker-compose up