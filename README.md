<p align="center">
  <a href="https://nextjs-flask-starter.vercel.app/">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h3 align="center">Next.js Flask Starter - Jira Clone</h3>
  </a>
</p>

<p align="center">Simple Next.js boilerplate that uses <a href="https://flask.palletsprojects.com/">Flask</a> as the API backend.</p>

<br/>

## Introduction

This is a hybrid Next.js + Python app that uses Next.js as the frontend and Flask as the API backend. One great use case of this is to write Next.js apps that use Python AI libraries on the backend.

## Developing Locally

You can clone & create this repo with the following command

```bash
npx create-next-app nextjs-flask --example "https://github.com/vercel/examples/tree/main/python/nextjs-flask"
```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).
