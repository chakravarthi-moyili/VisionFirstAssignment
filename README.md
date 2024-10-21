# VisionFirstAssignment

## Overview

This is a full-stack application that allows users to register, log in, and manage companies. It supports two types of users: administrators (IT_ADMIN) and normal users (IT_USER_NORMAL). Admins can create, approve, edit, and delete companies, while normal users can create companies and view those they own.

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

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd company-management-app
