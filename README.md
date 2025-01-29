# Mustacchio: A Community for Mustache Enthusiasts

## Overview
Mustacchio is a dynamic web application built with **Node.js, Express, and MongoDB** that allows mustache enthusiasts to share ideas, explore mustache styles, read blogs, and interact with the community. The project implements an **MVC architecture** and provides user authentication, a REST API, and admin functionalities.

## Features

### Core Functionality
- **Dynamic Mustache Gallery** – Browse various mustache styles with detailed descriptions and images.
- **Detailed Style View** – Get more insights by clicking on a style.
- **User Authentication & Sessions** – Secure account registration and login.
- **Blog System** – Read and interact with blog posts.
- **Contact System** – Submit inquiries for admin review and response.

### Advanced Functionality
- **Favorite Styles** – Save mustache styles to your profile.
- **New Style Submission** – Upload and submit your own mustache styles.
- **Admin Panel** – Manage users, permissions, and contact requests.
- **REST API** – Retrieve mustache style data in JSON format.
- **API Authentication** – Secure API access via JWT authentication.
- **Logging Middleware** – Request tracking using Morgan.
- **External API Integration** – Fetch and display data from third-party APIs.
- **Database Migration** – Transitioned from **MySQL (Sequelize) to MongoDB (Mongoose)**.

## Tech Stack
- **Frontend:** EJS templating engine
- **Backend:** Node.js with Express
- **Database:** MongoDB (Previously MySQL with Sequelize)
- **Authentication:** Express-session & bcrypt for password hashing
- **File Uploads:** Multer for image handling
- **API Security:** JSON Web Token (JWT)
- **Logging:** Morgan for request tracking

## API Endpoints
```http
GET /api/styles     # Fetch all mustache styles
GET /api/token      # Retrieve a JWT token
GET /api/styles/:styleSlug  # Fetch details of a specific mustache style
```

## Future Enhancements
- **User-to-User Messaging** – Implement real-time chat with WebSockets.
- **Interactive Mustache Try-On** – Use face recognition APIs for virtual try-ons.
- **Event Listings** – Showcase mustache-related events and meetups.

---

_Developed with passion for the mustache community._

