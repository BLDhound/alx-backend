import { promisify } from 'util';
import { createClient, print } from "redis";

const client = createClient();

client.on("error", (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

client.on("connect", () => {
  console.log("Redis client connected to the server");
});

const setNewSchool = (schoolName, value) => {
    client.set(schoolName, value, print);
};

const displaySchoolValue = async (schoolName) => {
    console.log(
        await promisify(client.get).bind(client)(schoolName)
    );
};
async function main() {
    await displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');
}

// client.on('connect', async() => {
//     console.log('Redis client connected to the server');
//     await main();
// });
main()

     
