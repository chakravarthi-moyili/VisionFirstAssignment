# VisionFirstAssignment

## Overview

This is a full-stack application that allows users to register, log in, and manage companies. It supports two types of users: administrators (ADMIN) and normal users (USER). Admins can create, approve, edit, and delete companies, while normal users can create companies and view those they own.

## Technologies Used

- **Language:** JavaScript
- **UI Framework:** React
- **Database:** MySQL

## Features

- **User Registration:** Users can register with their name, email, mobile number, password, username, and role.
- **User Login:** Users can log in with their username and password.
- **Admin Features:**
  - View a list of all companies with filters for company name and creator.
  - Approve, edit, or delete companies.
  - Create companies (auto-approved).
- **Normal User Features:**
  - Create companies (default status: UNAPPROVED).
  - View a list of companies they created, along with their status.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation
1. Set up app:
   ```bash
   npm create vite@latest vision-first-app
   cd vision-first-app
2. Install dependecies:
   ```bash
   npm install
3. Run the application:
   ```bash
   npm run dev

### Database Setup:
- You need to create the following tables in your MySQL database:
1. **User Table:**
   ```bash
   CREATE TABLE USER (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role ENUM('IT_ADMIN', 'IT_USER_NORMAL'),
    email VARCHAR(255) UNIQUE,
    mobile VARCHAR(15)
   );
  2. **Company Table:**
     ```bash
     CREATE TABLE COMPANY (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    created_by VARCHAR(255),
    status ENUM('APPROVED', 'UNAPPROVED')
    );

### Sample Users
## Admin
- Username: admin
- Password: admin123

## User
- User 1:
  -Username: Ajay_Rowdy
  -Password: Ajay@222
- User 2:
  -Username: Darling_Prabhas
  -Password: Darling@22
- User 3:
  -Username: Thala_vijay
  -Password: Vijay@22

### Usage
  -Visit https://vision-first-assignment.netlify.app/ in your browser.
  -Register or log in using the provided sample credentials.
  -Navigate through the admin and normal user screens based on your role.
  
### Contributing
  -Feel free to fork the repository and submit pull requests for any improvements or bug fixes.
