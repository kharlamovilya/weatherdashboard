# Requirements Traceability Matrix (RTM)

Project: Interactive Weather Dashboard

| SRS ID | Requirement Description              | Code File / Module                   | Actual Test File                   |
| ------ | ------------------------------------ | ------------------------------------ | ---------------------------------- |
| FR-01  | Search weather by city name          | weatherRoutes.js                     | weather.test.js                    |
| FR-02  | Display current weather data         | weatherService.js                    | weather.test.js                    |
| FR-03  | Display forecast data                | weatherService.js                    | weather.test.js                    |
| FR-04  | Save favorite cities                 | favoritesRoutes.js                   | favorites.test.js                  |
| FR-05  | Remove favorite cities               | favoritesRoutes.js                   | favoritesDelete.test.js            |
| FR-06  | View search history                  | historyRoutes.js                     | history.test.js                    |
| FR-07  | Switch temperature units             | weatherService.js, script.js         | weather.test.js                    |
| FR-08  | Handle errors properly               | weatherRoutes.js                     | weather.test.js                    |
| FR-09  | Responsive interface                 | index.html, style.css                | Manual Testing                     |
| FR-10  | Store data for favorites and history | favoritesRoutes.js, historyRoutes.js | favorites.test.js, history.test.js |
| FR-11  | Use external weather API             | weatherService.js                    | weather.test.js                    |
| FR-12  | Dashboard UI                         | index.html, script.js                | Manual Testing                     |

## Test Case Mapping

| Test Case ID | Description                             |
| ------------ | --------------------------------------- |
| TC-01        | Verify city search request              |
| TC-02        | Verify weather data retrieval           |
| TC-03        | Verify forecast retrieval               |
| TC-04        | Verify adding favorite city             |
| TC-05        | Verify removing favorite city           |
| TC-06        | Verify search history retrieval         |
| TC-07        | Verify temperature unit switching       |
| TC-08        | Verify invalid request handling         |
| TC-09        | Verify responsive UI layout             |
| TC-10        | Verify storage of favorites and history |
| TC-11        | Verify external API communication       |
| TC-12        | Verify dashboard rendering              |
