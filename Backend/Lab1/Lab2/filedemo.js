import fs from "node:fs/promises";
const Filepath = "data.txt";

async function createFile(content) {
    try {
        await fs.writeFile(Filepath, content, "UTF8");
        console.log("File Created Successfully");
    }
    catch(err) {
        console.log("Error in creation");
    }
}
function readFile() {
    try {
        const content = fs.readFile(Filepath, "UTF8");
        console.log("Content: ", content);
    }
    catch(err) {
        console.log("Content not found");
    }
}
function appendFile(content) {
    try {
        await fs.writeFile(Filepath, content, "UTF8");
        console.log("File Updated Successfully");
    }
    catch(err) {
        console.log("Error in updation");
    }
}
async function deleteFile() {
    try {
        await fs.unlink(Filepath);
        console.log("File Deleted Succesfully");
    }
    catch(err) {
        console.log("Error in deletion");
    }
}
async function main() {
    await createFile("Hello World!!!");
    await readFile();
    await appendFile("Hello Everyone!!!");
    await readFile();
    deleteFile();
}
main();