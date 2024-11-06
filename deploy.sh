#!/usr/bin/env sh

# Прекратить выполнение скрипта при ошибках
set -e

# Сборка проекта
npm run build

# Переход в папку сборки
cd dist

# Инициализация git-репозитория и добавление файлов
git init
git add -A
git commit -m 'deploy'

# Пуш на GitHub в ветку gh-pages
git push -f git@github.com:PrometheusOn/PAYMO.git main:gh-pages

# Возвращение в корневую папку проекта
cd -
