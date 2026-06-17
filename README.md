# NetWatch

I started building this project because I got curious about how website monitoring tools actually work.

Every time I used something like UptimeRobot, I understood what it did but never really understood how it was doing it. So instead of watching another tutorial I decided to try building one myself.

NetWatch is basically my attempt at making a monitoring platform from scratch.

A user can sign up, add websites they want to monitor and then the backend keeps checking those websites automatically. The results get stored and later shown on a dashboard with uptime stats, response times and monitor history.

Not gonna lie, when I started this project I thought it would take maybe two week or maybe three. It ended up teaching me way more backend stuff than I expected.

---
## Live Demo

https://net-watch-2i7ayb80u-mohd-asim.vercel.app

---

## What it can do

* create monitors
* edit monitors
* delete monitors
* track uptime
* track response time
* keep monitoring history
* user authentication with JWT
* protected routes
* dashboard with monitor statistics

---

## Built with

Frontend:

* React
* Tailwind CSS
* React Router
* Axios

Backend:

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* bcrypt
* node-cron

---

## Project Structure

Backend/
├── controllers
├── models
├── routes
├── middleware
├── utils

Frontend/
├── pages
├── components
├── hooks
├── context
├── api

---

## Stuff that gave me headaches

Probably authentication 

JWT made sense in theory until I actually had to connect everything together.

Another annoying part was getting the monitor checking logic working properly and making sure old monitoring records didn't pile up forever in the database.
I was worried that if the data is stored every minute in mongoDB wouldnt it exceed the free limit at some point.

I also spent way longer than I want to admit fixing routing issues on the frontend.

---

## One thing I'm happy with

The dashboard.

I spent a lot of time redesigning the UI because I didn't want it to look like another generic admin panel.

The coffee brown and gold landing page especially went through a bunch of redesigns before I was happy with it.

---

## What I'd add next

If I continue working on this project I'd probably add:

* email alerts
* telegram notifications
* SSL certificate monitoring
* public status pages
* real time updates
* team accounts

---

## Screenshots

* Landing Page or register Page
<img width="1919" height="957" alt="image" src="https://github.com/user-attachments/assets/78b07155-32b8-4ef5-8fd7-c3a4ae72ee8b" />


*login page
<img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/5c140675-29fa-45f2-89c8-f9e430007a82" />


* Dashboard
<img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/13dac855-80d2-4a3c-997d-50b9f0925eb8" />


* Monitor Management
<img width="1910" height="964" alt="image" src="https://github.com/user-attachments/assets/692400eb-3df3-4217-a76d-93df88cb3ec5" />


* Monitor Details
<img width="1919" height="962" alt="image" src="https://github.com/user-attachments/assets/512ed3cb-5418-4c38-9e68-924ef13f84a6" />


*Create Monitor
<img width="1915" height="946" alt="image" src="https://github.com/user-attachments/assets/d603ef38-bea2-4542-8cac-5f03687fca46" />


*Edit Monitor
<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/64b5e445-63ca-4d58-9c1a-045018880a6b" />


*Filtering all UP monitors
<img width="1917" height="811" alt="image" src="https://github.com/user-attachments/assets/50bf9a62-2030-43e8-b3b2-17669025c8b3" />


*filtering a DOWN monitor
<img width="1919" height="517" alt="image" src="https://github.com/user-attachments/assets/70e1180f-09b0-48b2-b609-6f556c26a38a" />

## Live Demo

Currently not deployed.
Planning to deploy after adding documentation and final polishing.

---

## Final thoughts

This is probably the first project I've built where it actually felt like a product instead of just an assignment.

The goal wasn't really to clone an existing service perfectly. The goal was to understand the ideas behind monitoring systems and improve my backend skills while building something I would actually use myself.

And honestly that's exactly what this project ended up doing.
