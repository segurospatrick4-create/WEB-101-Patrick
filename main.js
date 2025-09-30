// Model for Weather Record
class WeatherRecord {
  constructor(date, temperature, humidity, condition) {
    this.date = date;
    this.temperature = temperature;
    this.humidity = humidity;
    this.condition = condition;
  }

  toString() {
    return ${this.date} | Temp: ${this.temperature}°C | Humidity: ${this.humidity}% | ${this.condition};
  }
}

// 1. Calculate average temperature
function calculateAverageTemperature(records) {
  const total = records.reduce((sum, r) => sum + r.temperature, 0);
  return records.length > 0 ? total / records.length : NaN;
}

// 2. Filter records by condition
function filterByCondition(records, condition) {
  return records.filter(r => r.condition.toLowerCase() === condition.toLowerCase());
}

// 3. Find the hottest day
function findHottestDay(records) {
  return records.reduce((max, r) => (r.temperature > max.temperature ? r : max), records[0]);
}

// 4. Group records by condition
function groupByCondition(records) {
  return records.reduce((groups, r) => {
    if (!groups[r.condition]) {
      groups[r.condition] = [];
    }
    groups[r.condition].push(r);
    return groups;
  }, {});
}

// 5. Simulate fetching new weather data asynchronously
function fetchNewWeatherData() {
  return new Promise(resolve => {
    setTimeout(() => {
      const conditions = ["Sunny", "Rainy", "Cloudy", "Windy"];
      const random = Math.floor(Math.random() * conditions.length);
      const newRecord = new WeatherRecord(
        new Date().toISOString().split("T")[0],
        (20 + Math.random() * 15).toFixed(1), // 20–35°C
        (40 + Math.random() * 50).toFixed(1), // 40–90%
        conditions[random]
      );
      resolve(newRecord);
    }, 1000); // simulate delay
  });
}

// --- Demo ---
const records = [
  new WeatherRecord("2025-09-25", 30.5, 70, "Sunny"),
  new WeatherRecord("2025-09-26", 25.2, 85, "Rainy"),
  new WeatherRecord("2025-09-27", 33.1, 60, "Sunny"),
  new WeatherRecord("2025-09-28", 28.0, 65, "Cloudy")
];

console.log("Average Temperature:", calculateAverageTemperature(records));
console.log("Sunny Days:", filterByCondition(records, "Sunny"));
console.log("Hottest Day:", findHottestDay(records).toString());
console.log("Grouped by Condition:", groupByCondition(records));

// Async fetch
fetchNewWeatherData().then(newRecord => {
  console.log("Fetched New Data:", newRecord.toString());
});
