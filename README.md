# TelegramBotsConstructorSource

## ⚠️ Статус проекта: Исходный код (Как есть)
> **Важно:** Данный проект **не вошел в продакшн**. Код является «сырым», местами корявым, экспериментальным и на текущий момент представляет собой исключительно архив исходников (Source Code) без финальной полировки. 

Репозиторий создан для сохранения наработок. Pull Request'ы и исправления приветствуются, но проект поставляется *as is* (без гарантий стабильной работы).

---

## 🚀 Описание проекта
**TelegramBotsConstructor** — это исходный код конструктора Telegram-ботов. Идея проекта заключалась в создании инструмента, который позволяет пользователям собирать, настраивать и запускать собственных ботов через визуальный интерфейс или конфигурационные файлы без глубоких знаний программирования.

### Что внутри (Стек технологий):
* **Frontend:** Vue.js / vue-flow (для интерфейса управления и создания структуры ботов)
* **Контейнеризация:** Docker / Dockerfile (для быстрой развертки)

---

## 🛠️ Развертывание в Docker (Локально)

Для сборки и запуска frontend-части в изолированном контейнере выполните следующие команды:

1. **Сборка production-образа (Multi-stage build):**
   ```bash
   docker build -t telegram-bots-constructor .
   ```

2. **Запуск контейнера (на порту 8080):**
   ```bash
   docker run -it -p 8080:80 --rm --name bots-constructor-app telegram-bots-constructor
   ```

---


```
./
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── public
│   └── favicon.ico
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   │   └── exit.png
│   ├── components
│   │   ├── CustomNode.vue
│   │   ├── JustMessage.vue
│   │   ├── MyIcon.vue
│   │   ├── SideBar.vue
│   │   ├── TheAdd.vue
│   │   ├── TheAnswer.vue
│   │   ├── TheApplication.vue
│   │   ├── TheButtons.vue
│   │   ├── TheChain.vue
│   │   ├── TheCondition.vue
│   │   ├── TheContacts.vue
│   │   ├── TheCreate.vue
│   │   ├── TheEmailSend.vue
│   │   ├── TheEmail.vue
│   │   ├── TheFast.vue
│   │   ├── TheInputs.vue
│   │   ├── TheMenu.vue
│   │   ├── TheModal.vue
│   │   ├── TheName.vue
│   │   ├── TheNot.vue
│   │   ├── TheNumber.vue
│   │   ├── ThePay.vue
│   │   ├── TheSend.vue
│   │   ├── TheStart.vue
│   │   ├── TheText.vue
│   │   ├── TheToggle2.vue
│   │   ├── TheToggle.vue
│   │   └── TheVal.vue
│   ├── initial-elements.js
│   ├── main.css
│   ├── main.js
│   └── stores
│       └── Mystore.js
└── vite.config.js
```

## 📂 Как запустить в режиме разработки (Dev)

Если вам нужно поковыряться в коде и запустить проект локально с hot-reload:

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Запустите локальный сервер:
   ```bash
   npm run serve
   ```
   *или*
   ```bash
   npm run dev
   ``` (в зависимости от версии Vue/Vite)

---

## 🛑 Известные проблемы и TODO
* Код требует масштабного рефакторинга (много "костылей" и временных решений).
* Отсутствует финальная интеграция некоторых модулей.
* Настройки Nginx в Dockerfile требуют адаптации при использовании Vue Router в режиме `history`.
```

### Как быстро применить это у себя в терминале:
1. Открой файл через консоль: `nano README.md`
2. Вставь этот текст.
3. Сохрани (`Ctrl + O`, затем `Enter`) и выйди (`Ctrl + X`).
4. Отправь изменения на GitHub:
   ```bash
   git add README.md
   git commit -m "docs: add realistic README"
   git push origin main
   ```

