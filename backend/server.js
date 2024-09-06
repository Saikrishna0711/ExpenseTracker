const express = require("express");
const fs = require("fs");
const cors = require("cors"); // Import cors module
const app = express();
const port = 3001;
const ipAddress = "192.168.0.169";

// Use cors middleware
app.use(cors());

app.use(express.json());

app.post("/writeToFile", (req, res) => {
  const { data } = req.body;
  // Write data to a JSON file
  let usersData = fs.readFileSync("userData.json", "utf8");
  let users = JSON.parse(usersData);
  users.users.push(data);
  fs.writeFile("userData.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error writing to file");
    } else {
      res.send("Data written to file");
    }
  });
});

app.post("/addExpenses", (req, res) => {
  const { data } = req.body;

  // Write data to a JSON file
  let usersData = fs.readFileSync("userData.json", "utf8");
  let users = JSON.parse(usersData);
  const newArray = users.users.map((item) => {
    // Check if the current object matches the specified key-value pair
    if (item["uniqId"] === data.username) {
      // If a match is found, create a new object with the modified value
      const expensesArray = Array.isArray(item.expenses) ? item.expenses : [];
      return { ...item, expenses: [...expensesArray, data.expenses] };
    }

    // If no match is found, return the original object
    return item;
  });

  users.users = newArray;

  fs.writeFile("userData.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error writing to file");
    } else {
      res.send("Data written to file");
    }
  });
});

app.post("/deleteExpense", (req, res) => {
  const { data, username } = req.body;
  console.log(data, username);

  // Read the existing JSON data from file
  fs.readFile("userData.json", "utf8", (err, userData) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    let users = JSON.parse(userData);

    // Find the user by username
    const user = users.users.find((user) => user.uniqId === username);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    // Find and remove the expense data
    user.expenses = user.expenses.filter((expense) => {
      // Check if the expense matches the provided data
      for (const [key, value] of Object.entries(expense)) {
        if (
          Array.isArray(value) &&
          data[key] &&
          value[0] === data[key][0] &&
          value[1] === data[key][1] &&
          value[2] === data[key][2]
        ) {
          return false; // Exclude this expense from the array
        }
      }
      return true; // Keep other expenses
    });
    console.log(user.expenses);

    // Write the updated JSON data back to the file
    fs.writeFile("userData.json", JSON.stringify(users), "utf8", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send("Expense deleted successfully");
    });
  });
});

app.get("/readFile", (req, res) => {
  // Read data from the JSON file
  fs.readFile("userData.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
    } else {
      // Parse the JSON data and send it as a response
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});
app.post("/updateUserData", (req, res) => {
  const { username, updatedData } = req.body;
  fs.readFile("userData.json", "utf8", (err, userData) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    let users = JSON.parse(userData);
    // Find the user in your data (you can use a database query here)
    const user = users.users.find((user) => user.uniqId === username);
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Update user's email and/or phone number
    if (updatedData.email) {
      user.email = updatedData.email;
    }
    if (updatedData.phNumber) {
      user.phNumber = updatedData.phNumber;
    }
    // Write the updated JSON data back to the file
    fs.writeFile("userData.json", JSON.stringify(users), "utf8", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send("Expense deleted successfully");
    });
    // You may want to save the updated data to your database here
    // Respond with a success message
    res.send("User data updated successfully");
  });
});

app.post("/goalSetting", (req, res) => {
  const { data } = req.body;

  // Write data to a JSON file
  let usersData = fs.readFileSync("userData.json", "utf8");
  let users = JSON.parse(usersData);
  const newArray = users.users.map((item) => {
    // Check if the current object matches the specified key-value pair
    if (item["uniqId"] === data.username) {
      // If a match is found, create a new object with the modified value
      return { ...item, ...data["goalSetting"] };
    }

    // If no match is found, return the original object
    return item;
  });

  users.users = newArray;

  fs.writeFile("userData.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error writing to file");
    } else {
      res.send("Data written to file");
    }
  });
});
app.listen(port, ipAddress, () => {
  console.log(`Server is running on port ${port}`);
});
