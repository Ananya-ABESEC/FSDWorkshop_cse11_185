import EventEmiter from "node:events";
const myEmiter = new EventEmiter();
myEmiter .on("greet", (teacher) => {
    console.log(`class started by ${teacher}`);
});
myEmiter .on("exit", (teacher) => {
    console.log(`class finished by ${teacher}`);
});
myEmiter.emit("greet", "abcd");
myEmiter.emit("exit", "abcd");
