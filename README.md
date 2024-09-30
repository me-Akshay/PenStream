# Penstream - A Modern Blog Platform

Penstream is a feature-rich, user-friendly blog platform where users can share their experiences across various fields. It provides seamless blog management with advanced features like user authentication, rich text editing, content summarization, and categorized blogging.

## Features

- **User Authentication**: 
  - Secure login and user management using JWT tokens and sessions.
  
- **Blog Management**: 
  - Create, update, and delete your blog posts easily.
  - Rich text editor powered by **React Quill** for enhanced blog writing.
  
- **Categories**:
  - Organize posts into predefined categories like Art, Cinema, Technology, Design, and Food.
  
- **Summarization**:
  - Quickly summarize blogs using Google's Generative AI (Gemini) for a short overview of lengthy posts.

- **User-Friendly Interface**:
  - Intuitive, interactive, and designed for a smooth user experience.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Authentication**: JWT Tokens, Sessions
- **Rich Text Editor**: React Quill
- **AI for Summarization**: Google Gemini (GenAI)


## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user
- **POST** `/api/auth/login`: Log in and receive JWT token
- **POST** `/api/auth/logout`: Log out the authenticated user

### Posts

- **GET** `/api/posts`: Get all blog posts
- **GET** `/api/posts/:id`: Get a specific blog post by ID
- **POST** `/api/posts`: Create a new blog post
- **PUT** `/api/posts/:id`: Update an existing blog post by ID
- **DELETE** `/api/posts/:id`: Delete a blog post by ID

### Summarization

- **GET** `/api/posts/summarize/:postId`: Summarize a specific blog post using AI

