# ORVIX Marketplace

ORVIX is a modern marketplace-style web application inspired by platforms like Ozon and Amazon.
The project demonstrates a scalable frontend architecture built with **Next.js, TypeScript, Zustand, and React Query**.

The application includes a product catalog, product pages, categories, favorites, and a shopping cart.
Data is fetched from the **DummyJSON API** and managed using modern state management patterns.

---

DEMO: https://marketplace-app-taupe-seven.vercel.app/

## Tech Stack

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Zustand** – global state management
* **Zustand Persist** – localStorage persistence
* **React Query** – server state management
* **SCSS (Sass)** – styling
* **DummyJSON API** – product data source

---

## Features

### Product Catalog

* Grid layout with product cards
* Discount display
* Product availability
* Responsive design

### Product Page

* Image gallery
* Product details
* Price and discount information
* Add to cart
* Add to favorites
* Related products

### Categories

* Category navigation
* Dynamic category pages

### Shopping Cart

* Add/remove items
* Increase/decrease quantity
* Total price calculation

### Favorites

* Save products to favorites
* Persistent favorites list

### State Persistence

Cart and favorites are stored in **localStorage** using Zustand persist middleware, so the data remains after page reload.

---

## Project Structure

```
src
 ├── app
 │   ├── page.tsx
 │   ├── layout.tsx
 │   ├── cart
 │   ├── favorites
 │   ├── category
 │   └── product
 │
 ├── components
 │   ├── Header
 │   ├── Footer
 │   ├── CategoriesGrid
 │   ├── CatalogMenu
 │   └── ProductPageClient
 │
 ├── scss
 │   ├── _reset.scss
 │   └── _variables.scss
 │
 ├── store.ts
 └── types
```

---

## API

Product data is provided by:

https://dummyjson.com/products

The API is used for:

* product catalog
* product pages
* category filtering

---

## Installation

Clone the repository:

```
git clone https://github.com/bellatrisa1/marketplace-app.git
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Build the project:

```
npm run build
```

Start production build:

```
npm start
```

---

## Future Improvements

Planned features include:

* Product filtering (price, rating, brand)
* Pagination / infinite scroll
* Improved search system
* Authentication
* Checkout flow
* Order history
* Performance optimization

---

## Purpose

This project is being developed as a **portfolio project** to demonstrate frontend architecture for a marketplace-style application.

It focuses on:

* clean project structure
* scalable state management
* modern React patterns
* production-ready UI components
