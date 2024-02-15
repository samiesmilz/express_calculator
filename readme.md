---

# Statistics Calculator API

This is a simple Express.js API that provides endpoints for calculating statistical measures such as mean, median, and mode of a list of numbers.

## Setup

1. Clone the repository:

```
git clone <repository-url>
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
nodemom app.py
```

The server will start running on `http://localhost:3000` by default.

## Usage

### Mean

To calculate the mean of a list of numbers, make a GET request to `/mean` endpoint with the list of numbers as a query parameter `nums`. For example:

```
GET /mean?nums=1,2,3,4,5
```

This will return the mean of the provided numbers.

### Median

To calculate the median of a list of numbers, make a GET request to `/median` endpoint with the list of numbers as a query parameter `nums`. For example:

```
GET /median?nums=1,2,3,4,5
```

This will return the median of the provided numbers.

### Mode

To calculate the mode of a list of numbers, make a GET request to `/mode` endpoint with the list of numbers as a query parameter `nums`. For example:

```
GET /mode?nums=1,2,3,4,5,5
```

This will return the mode of the provided numbers.

### All Statistics

To calculate all statistics (count, mean, median, and mode) of a list of numbers, make a GET request to `/all` endpoint with the list of numbers as a query parameter `nums`. For example:

```
GET /all?nums=1,2,3,4,5,5
```

This will return all statistics of the provided numbers.

## Error Handling

- If the query string is empty or contains invalid numbers, the API will respond with an appropriate error message and status code.
- If the requested route does not exist, the API will respond with a "Not Found" error.

## Technologies Used

- Express.js: for building the API endpoints and handling requests.
- JavaScript: for server-side logic and calculations.
- npm: for managing dependencies and scripts.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
