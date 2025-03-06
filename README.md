# MovieMate — Built with Lynx

**MovieMate** is a blazing-fast **movie recommendation engine** built using **Lynx**, the brand-new open-source cross-platform framework from ByteDance. MovieMate helps you find movies you’ll love, with filters for genre, year, and ratings — all wrapped in a cutting-edge, **truly native** UI experience powered by Lynx's revolutionary dual-threaded architecture.

---

## Why Lynx?

Lynx launched publicly on **March 5th, 2025** (yesterday as of the creation of this app), and aims to redefine how developers create cross-platform apps. Unlike React Native, Lynx **removes the traditional bridge entirely**, using **Preact under the hood** and introducing **Rspeedy**, a Rust-based toolchain, for lightning-fast builds. It supports **ReactLynx** for a familiar component-driven workflow, but with direct access to **native UI primitives**.

Key Advantages:
- Multi-threaded architecture — UI is always buttery smooth.
- First-class support for **both iOS and Android** from the start.
- **Instant First Frame Rendering (IFR)** for faster app startup.
- Rust-powered builds via **Rspeedy**, as fast as (or faster than) Vite.
- Full CSS support, including modern effects like **masking, gradients, and animations**.
- Ships with **Lynx Devtool**, a powerful inspector for UI hierarchy and styles.
- Designed to match native performance at scale, already powering parts of TikTok.

---

## About MovieMate

MovieMate is a **simple, lightweight movie finder** that lets users discover films to watch based on their preferences. It pulls real-time data from **TMDB** and provides:

- Genre Filters: All, Action, Comedy, Drama  
- Year Filters: All, 2020s, 2010s, 2000s  
- Recommendation Mode: Random or Highest Rated  
- Movie Details: Title, Rating, Description, Release Date, Genre Tags, Poster  

---

## In Use
<img src="https://github.com/user-attachments/assets/5886e593-f12f-4486-bc42-cf36d6f7dda5" alt="Simulator Screenshot 1" width="200"/>
<img src="https://github.com/user-attachments/assets/adc1487f-c785-4470-ba7e-383984db3e82" alt="Simulator Screenshot 2" width="200"/>
<img src="https://github.com/user-attachments/assets/72dbc5d5-8491-4130-96cb-fb142424882c" alt="Simulator Screenshot 3" width="200"/>

---

## Target Platforms

MovieMate is currently developed and tested on **iOS** using **Xcode Simulator**, but thanks to Lynx’s **native-first design**, the app can be deployed to both **Android** and **iOS** with minimal effort.

---

## Tech Stack & Tooling

| Tech                  | Purpose                                   |
|----------------------|---------------------------------|
| **Lynx**              | Core framework for native UI       |
| **ReactLynx**        | React-like component model     |
| **Rspeedy**           | Rust-based build tool                |
| **Lynx Devtool**   | Debugging & UI Inspection    |
| **Preact**               | Ultra-light virtual DOM               |
| **TMDB API**        | Movie data source                    |
| **TypeScript**      | Type-safe development        |

---

## Why Lynx Stood Out

I chose Lynx because it directly addresses some of **React Native's long-standing performance pain points**:

✅ **No More Bridge Bottleneck** — Lynx directly manages the rendering pipeline.  
✅ **Multi-Threaded by Design** — Business logic offloaded to a background thread.  
✅ **Instant First Frame Rendering** — Perceived instant startup without white flashes.  
✅ **Main Thread Scripting (MTS)** — Priority gestures/events always handled smoothly.

---

## Architecture Challenges

Using Lynx early came with its learning curve. Some key challenges:

🔴 Limited debugging — Syntax errors would crash the app in Explorer with no clear logs.  
🔴 Sparse documentation — I relied heavily on reading source code and internal examples since there isn't much of an ecosystem yet.  
🔴 Strict thread separation — Lynx splits work between a **main thread** (UI updates) and a **background thread** (logic & effects) so strict rules have to be followed when working with Lynx.

---

## Future Plans

Upcoming features could include:

- User Accounts & Favorites
- Improved recommendation algorithm
- Expanded Filtering (Language, Runtime, etc.)  
- Animated Transitions using Lynx CSS capabilities  

---

## Learn More about Lynx

Want to experiment with Lynx yourself? Check out:

- [Official Lynx Docs](https://lynxjs.org)
- [Lynx Blog Post](https://lynxjs.org/blog/lynx-unlock-native-for-more)

---

## Credits

Built by: [Dylan Anctil](https://github.com/danctila)  
Using: Lynx, ReactLynx, Rspeedy, PrimJS, and TMDB API.
