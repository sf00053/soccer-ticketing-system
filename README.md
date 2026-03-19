# WVU Tech Soccer Ticketing System – Backend (Spring Boot)

This repository contains the **backend implementation** for the WVU Tech Soccer Ticketing System.  
It is built using **Java** and **Spring Boot** and is designed to work with a separate frontend (HTML/CSS/JS).
The main goal of this project was to design and implement a system that simulates the process of selling tickets for soccer games. We wanted the application to reflect a realistic user experience, including account access, game browsing, seat selection, purchase confirmation, and reservation management.

This project was also an opportunity to apply core software engineering concepts in a practical way, especially in backend development and system structure.

A **full setup guide** is provided in the included PDF file:
**`Soccer_Ticketing_System_Setup_Guide.pdf`**  
This document explains step-by-step how to run both the backend and frontend.  


---

## 📘 About This Document

The PDF includes details on:

- Required installations (Java 17, Eclipse, Python)  
- How to import and run the backend in Eclipse  
- How to start a lightweight frontend server using Python  
- Default test user accounts  
- Shutdown instructions  

The PDF is the **official setup documentation** for this system.

---
## Features

- User login
- Browse available games
- Select seats for a game
- Confirm ticket purchase
- View reservations in user profile
- Update reservation details, such as ticket name
- Cancel reservations
- Simulated user roles, permissions, and discounts

---

## 🧩 Backend Features

### ✔ REST API Endpoints
- `/api/login` – login user  
- `/api/register` – register a new user  
- `/api/games` – list all games  
- `/api/games/{id}` – retrieve game details  
- `/api/games/{id}/seats` – list available seats  
- `/api/bookings` – create a new booking  
- `/api/users/{userId}/bookings` – view user bookings  
- `/api/bookings/{bookingId}/cancel` – cancel booking  
- `/api/payments` – process payments  

---

## 🛠️ Technology Stack

- **Java 17+**
- **Spring Boot (Web)**
- **Maven**
- **In-memory data services** (no database required)
- **RESTful API design**

---

## 🚀 Running the Backend (Summary)

For full instructions, refer to the PDF guide.  
Below is a quick summary:

### 1. Requirements  
- Java 17+
- Eclipse IDE
- Python 3 (for running the frontend)

### 2. Import Backend into Eclipse  


## Tech Stack

### Backend
- **Java**
- **Spring Boot**

### Frontend
- **HTML**
- **CSS**
- **JavaScript**

### Other Tools
- API development with Spring Boot
- Simulated backend data structures in place of a full database

---

## My Contribution

This project was completed as a team of three, and I contributed to nearly all parts of the project except testing.

My work included:
- backend development
- API creation with Spring Boot
- frontend and backend integration
- application logic
- user workflow implementation
- overall project development

This project was especially important to me because it was the first time I worked deeply with **Spring Boot**, and it helped me better understand how a backend system is structured and connected to a user-facing application.

---

## System Workflow

The application follows this user flow:

1. User logs into the system
2. User browses available soccer games
3. User selects a game
4. User chooses a seat
5. User confirms the purchase
6. User can later view the reservation in their profile
7. User can update the reservation name or cancel the reservation

This workflow was designed to simulate a realistic ticket-purchasing experience for team games.

---

## Backend Design

One of the most important parts of this project was the backend.

Originally, the plan was to use **MySQL** for data storage. However, due to project constraints, we had to change the design and simulate a small internal database directly in the backend. This allowed us to represent:
- pre-existing users
- different user permissions
- discount rules
- reservation data

Although we did not use MySQL in the final version, this design decision helped us complete a working system and adapt to technical limitations during development.

---

## Challenges

The hardest part of the project was the **backend development**, but it was also the most satisfying part to complete.

Some of the main challenges included:
- having to give up the original MySQL database plan
- restructuring the project to simulate data inside the backend
- learning how to use Spring Boot effectively while building the system
- connecting the application flow so the frontend could interact with the backend logic

These challenges taught me how important adaptability is in software development and pushed me to become more comfortable with backend problem-solving.

---

## What I Learned

This project taught me a lot about **Spring Boot** and gave me practical experience in:

- backend development
- API design
- application structure
- user workflow logic
- adapting project design when technical plans change
- building a more complete software system as part of a team

It was one of the projects that helped me move from writing code for assignments to thinking more like a software engineer building a real application.

---

## Project Status

This repository contains the **final version submitted for the course**.

It represents a completed class project and an important step in my growth as a software engineering student.

---

## Future Improvements

If I continued developing this project, I would like to:

- add a real **MySQL database**
- improve authentication and user management
- strengthen reservation persistence
- improve the UI/UX of the frontend
- expand admin functionality for game and ticket management
- deploy the application online

---

## Why This Project Matters

This project reflects my growing interest in **software engineering** and backend development. It shows my ability to work on a team project, adapt when technical plans change, and build a functional system that simulates a real-world use case.

For me, it was especially valuable because it gave me a strong introduction to **Spring Boot** and helped me build confidence in working on larger technical projects.

---

## Author

**Sofia Filgueira**  
Computer Science and Mathematics Student  
Interested in Software Engineering, Machine Learning, and AI-driven applications
