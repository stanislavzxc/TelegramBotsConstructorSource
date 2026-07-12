TelegramBotsConstructorSource
⚠️ Project Status: Source Code (As-Is)

    Important: This project did not reach production. The code is "raw," messy in places, experimental, and currently represents solely an archive of source code without final polish.

This repository was created to preserve work-in-progress. Pull Requests and fixes are welcome, but the project is provided as is (without guarantees of stable operation).
🚀 Project Description

TelegramBotsConstructor is the source code for a Telegram bot constructor. The project's idea was to create a tool that allows users to assemble, configure, and launch their own bots through a visual interface or configuration files without deep programming knowledge.
What's Inside (Tech Stack):

    Frontend: Vue.js / vue-flow (for the management interface and bot structure creation)

    Containerization: Docker / Dockerfile (for quick deployment)

🛠️ Docker Deployment (Local)

To build and run the frontend part in an isolated container, execute the following commands:

    Build the production image (Multi-stage build):
    bash

docker build -t telegram-bots-constructor .

Run the container (on port 8080):
bash

docker run -it -p 8080:80 --rm --name bots-constructor-app telegram-bots-constructor

📂 Project Structure
text

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

📂 How to Run in Development Mode (Dev)

If you want to tinker with the code and run the project locally with hot-reload:

    Install dependencies:
    bash

npm install

Start the local server:
bash

npm run serve

or
bash

npm run dev
``` (depending on Vue/Vite version)

🛑 Known Issues and TODO

    The code requires extensive refactoring (lots of "hacks" and temporary solutions).

    Final integration of some modules is missing.

    Nginx configuration in the Dockerfile needs adaptation when using Vue Router in history mode.

