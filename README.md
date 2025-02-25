# Ayoga

A yoga platform that provides a range of classes featuring AI pose detection. Users holding international yoga certifications can apply to become instructors and design classes for others to join.

## 📋 Table of Contents

- [Features](#features)
- [Backend Installation & Usage](#backend-installation--usage)
- [Frontend Installation & Usage ](#frontend-installation--usage)

## 🌟 Features

#### 👤 For User role:
- Feature 1: Buy and withdrawal credits 🛒
- Feature 2: Search for and book yoga classes 🔎 ✅
- Feature 3: Learn the correct yoga poses with AI 🤖


#### 🧑‍🏫 For Teacher role:
- Feature 1: Create yoga classes 🧘
- Feature 2: Manage classes with calendars and student list 🗓️
- Feature 3: Measure performance with the revenue chart 📈

#### 🧑‍💼 For Admin role:
- Feature 1: Check teacher requests 📝
- Feature 2: Update user roles 📇
- Feature 3: Handle refunds 💰

## 🗄️ Backend Installation & Usage

### ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Janicejim/ayoga.git
   ```
2. Go to backend folder:
   ```bash
   cd backend
   ```
3. Install packages:
   ``` bash
   yarn 
   ```
4. Create .env and paste value according to env.example.ts
   ```
   // .env 
    DB_USER=
    DB_NAME=
    DB_PASSWORD=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    STRIPE_SECRET_KEY=
    MAIL_FROM=
    MAIL_PASS=
    S3_REGION=
    S3_BUCKET_NAME=
    FRONTEND_URL=
    JWT_SECRET=
   ```

5. Create database in PostgresSQL and input the DB name and password to .env. And  then create the table and seed by running :
   ``` bash
   yarn knex migrate:latest
   yarn knex seed:run 
   ```

6. All the images will push to s3 bucket, need to create s3 bucket and set the aws access key and secret in .env. Apply teacher success will use nodemailer send the email, need to set the email address and password first.

### 🛠 Usage
   ```bash
   yarn run dev
   ```

## 🌐 Frontend Installation & Usage

### ⚙️ Installation

1. Go to frontend folder:
   ```bash
   cd frontend
   ```
2. Install packages:
   ``` bash
   yarn 
   ```
3. Create .env and paste value according to env.example.ts
   ```
   // .env 
    REACT_APP_API_SERVER=
    REACT_APP_GOOGLE_MAP_API_KEY=
    REACT_APP_UPLOAD_IMAGE=
    REACT_APP_STRIPE_API_KEY=
   ```


4. Need google map api key for show the yoga class location and need stripe api key for buy the package. Paste the key in .env file .

### 🛠 Usage
   ```bash
   yarn start
   ```
