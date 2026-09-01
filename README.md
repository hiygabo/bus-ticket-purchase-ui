# Bus Ticket Purchase UI

## Objective

This project was developed to digitize and streamline the bus ticket purchasing process. Traditionally, bus terminals force passengers to buy tickets on-site, this system enables users to complete their purchases entirely online, offering features like route visualization, estimated departure and arrivale times, and automated PDF ticket generation.

## Technologies

The system is built using the following tools and technologies:

- ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) Framework
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) Language
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) Build tool
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) Routing
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) Styling
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) HTTP client
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) Containerization
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) Runtime

## Demonstration
<img width="692" height="388" alt="Image" src="https://github.com/user-attachments/assets/09c3bd2b-b6de-4b86-acc4-2063980be489" />
## How to run locally

### Using Docker

#### Prerequisites

- Docker Desktop installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/hiygabo/bus-ticket-purchase-ui.git
```

2. Navigate to the project directory:

```bash
cd bus-ticket-purchase-ui
```

3. Build the Docker image:

```bash
docker compose up --build
```

4. Access the application in your web browser at `http://localhost:5173`.

5. Go to clone the backend repository: `https://github.com/hiygabo/bus-ticket-purchase-api-nestJS`

### Using localhost

#### Prerequisites

- Node.js and npm installed on your machine.
- To install npm execute:

```bash
npm install -g npm
```

1. Clone the repository:

```bash
git clone https://github.com/hiygabo/bus-ticket-purchase-ui.git
```

2. Navigate to the project directory:

```bash
cd bus-ticket-purchase-ui
```

3. install dependencies and run the application:

```bash
npm install
npm run dev
```

### Architecture

The project follows a modular frontend structure, separating presentation, pages, and API communication responsibilities.

```text
src/
├── assets/
│   └── images/
│       └── logos/
├── components/
│   ├── Footer.css
│   ├── Footer.tsx
│   ├── Navbar.css
│   └── Navbar.tsx
├── pages/
│   ├── admin/
│   │   ├── AdminPanel.css
│   │   ├── AdminPanel.tsx
│   │   ├── Bus/
│   │   │   ├── BusList.css
│   │   │   ├── BusList.tsx
│   │   │   ├── EditBus.css
│   │   │   └── EditBus.tsx
│   │   └── Travel/
│   │       ├── EditTravel.tsx
│   │       └── TravelsList.tsx
│   ├── auth/
│   │   ├── Login.css
│   │   └── Login.tsx
│   └── user/
│       ├── AboutUs.css
│       ├── AboutUs.tsx
│       ├── WelcomePage.css
│       ├── WelcomePage.tsx
│       └── Booking/
│           ├── BuyTicket.css
│           ├── BuyTicket.tsx
│           ├── ReservationForm.css
│           ├── ReservationForm.tsx
│           ├── TravelSearchForm.css
│           └── TravelSearchForm.tsx
├── services/
│   ├── api.ts
│   ├── AuthService.ts
│   ├── BusService.ts
│   ├── CategoryService.ts
│   ├── PassengerService.ts
│   ├── ScheduleService.ts
│   ├── StopService.ts
│   ├── TravelDetailService.ts
│   └── TravelService.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```
