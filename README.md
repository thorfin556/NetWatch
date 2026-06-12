# NetWatch

I started building this project because I got curious about how website monitoring tools actually work.

Every time I used something like UptimeRobot, I understood what it did but never really understood how it was doing it. So instead of watching another tutorial I decided to try building one myself.

NetWatch is basically my attempt at making a monitoring platform from scratch.

A user can sign up, add websites they want to monitor and then the backend keeps checking those websites automatically. The results get stored and later shown on a dashboard with uptime stats, response times and monitor history.

Not gonna lie, when I started this project I thought it would take maybe a week or two. It ended up teaching me way more backend stuff than I expected.

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

## Stuff that gave me headaches

Probably authentication 😭

JWT made sense in theory until I actually had to connect everything together.

Another annoying part was getting the monitor checking logic working properly and making sure old monitoring records didn't pile up forever in the database.

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

I'll add screenshots here soon.

* Landing Page
<img width="1919" height="956" alt="image" src="https://github.com/user-attachments/assets/a9adddca-cee0-4be3-ac7b-15c46792f26d" />

  
* Dashboard
* Monitor Management
* Monitor Details

---

## Final thoughts

This is probably the first project I've built where it actually felt like a product instead of just an assignment.

The goal wasn't really to clone an existing service perfectly. The goal was to understand the ideas behind monitoring systems and improve my backend skills while building something I would actually use myself.

And honestly that's exactly what this project ended up doing.
