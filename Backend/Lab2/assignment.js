import fs from "node:fs/promises";
const filePath = "userdata.json";
const data ={"message":"Hello world"};
async function createFile(data) {
    try{
await fs.writeFile(filePath, data, "utf8");
    console.log("File created successfully");
    }
    catch (err) {
        console.error("Error creating file:", err);
    }
}
createFile("Hello world!");

async function readFile() {
    try{
    const content = await fs.readFile(filePath, "utf8");
    console.log("File content:", content);
      }
    catch (err) {
        console.error("Error reading file:", err);
    }       
}
readFile();
async function appendFile() {
    try{
        await fs.appendFile(filePath, "Additional content", "utf8");
        console.log("Content appended successfully");
    }
    catch (err) {
        console.error("Error appending to file:", err);
    }
}
appendFile();


async function deleteFile() {
    try{
        await fs.unlink(filePath);
        console.log("File deleted successfully");
    }
    catch (err) {
        console.error("Error deleting file:", err);
    }
}
deleteFile();

    async function run() {
await createFile(data);
await readFile();
await appendFile();
await readFile();
 deleteFile();
    }
run();