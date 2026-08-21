import EventEmiter from "node:events";
function createDOMElements() {
    const DOMEvent = new EventEmiter();
    return {
        addEventListner() {
            console.log("Data Submitted Successfully");
        }
    }
}
DOMEvent .on("eventtype", (event) => {
    console.log(`event triggered by ${event}`);
});
DOMEvent.emit("eventtype", "abcd");