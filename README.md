# 🧾 Quotation Maker

A simple and elegant app to generate, export, and store quotations — built with **Next.js**, **ShadCN UI**, **Sequelize**, and **Nodemailer**.

---

## ✨ Features

### 🖥️ Frontend

- [x] Setup ShadCN UI
- [x] Create quotation form
- [ ] Create calendar view for home
- [ ] Create view for individual day listings
- [ ] Add search view
- [ ] Create view for individual quotation
- [ ] Create shareable link view for clients
- [ ] View form with email confirmation & optional payment link

### 🗄️ Backend

- [x] Setup Sequelize
- [ ] Support for customizable DB (SQLite, MySQL, etc.)
- [ ] Create models for database
- [ ] Setup API routes
- [ ] Create email templates
- [ ] Setup Nodemailer for sending emails
- [ ] Integrate PDF generation for quotations

---

## 🛠️ Tech Stack

- **Framework:** Next.js
- **UI:** ShadCN UI (Radix + Tailwind)
- **ORM:** Sequelize
- **Mailer:** Nodemailer
- **PDF Generator:** TBD

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/whizydan/quotation-maker.git
```

### 2. cd into the folder

```bash
cd quotation-maker
```
### 3. Install dependencies

```bash
npm install
```

### 4. Add environment variables

 - open the .env.sample file and fill the fields
 - then rename it to .env

### 5. Run the project

```bash
npm run dev
```

`by default the project uses sqlite to change to mysql change the initialization in the api folder for the /database/config.ts`

## Live demo

To witness the app in action visit the link [Quotia](https://qoutia.vercel.app)