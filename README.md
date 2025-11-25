# ⚽ WVU Tech Soccer Ticketing System – Backend (Spring Boot)

This repository contains the **backend implementation** for the WVU Tech Soccer Ticketing System.  
It is built using **Java** and **Spring Boot** and is designed to work with a separate frontend (HTML/CSS/JS).

This backend provides API endpoints for:

- User login & role handling  
- Loading soccer game data  
- Listing available seats  
- Creating bookings  
- Processing payments  
- Cancelling bookings  

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
