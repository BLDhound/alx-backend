import { createClient, print } from 'redis';

const client = createClient();

client.on("error", (error) => {
    console.error(`Redis client not connected to the server: ${error}`);
});
const key = 'HolbertonSchools';

client.on("connect", () => {
    console.log("Redis client connected to the server");
});

const keys = ['Portland', 'Seattle', 'New York', 'Bogota', 'Cali', 'Paris'];
const values = [50, 80, 20, 20, 40, 2];

keys.forEach((key, index) => {
  client.hset(key, key, values[index], print);
});

client.hgetall(key, (err, value) => {
  console.log(value);
});
