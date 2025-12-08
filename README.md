# EDM Prompter – React Native (Expo) App

EDM Prompter is a mobile application for learning and browsing rapid prototyping methods.  
The app uses Expo, React Navigation, and SQLite for offline storage of favorites, search history, and reading history.

---

## Features
### Search
- Search articles by keyword  
- Local search history stored in SQLite  
- Tap previous keywords to run searches again  

### Favorites
- Add or remove favorite articles  
- Stored offline using SQLite  
- Swipe-to-delete support  

### History
- Automatically records articles the user opens  
- Grouped by date  
- Fully offline  

### Articles
- Supports markdown-like formatting  
- Displays teaser, properties, steps, description, and references  

### Explore
- Fetches random articles from API  
- Integrates with favorites and history  
- Handles offline mode gracefully

## SQLite Data Model
* **Favorites** stored as JSON objects in SQLite.
* **History** Each article is stored with an added date field, then grouped by date in the UI.
* **Search History** stored as a single JSON array limited to the 20 most recent search terms.

### API Endpoints Used
The app requires a backend with the following endpoints:
```
GET article/random/3
GET search/:keyword/filter
GET def
```
