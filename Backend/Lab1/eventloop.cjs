console.log("This is the starting point of my code");
process.nextTick(() => {
    console.log("This process.nextTick operation");
});
setTimeout(() => {
    console.log("This is the first timeout operation");
}, 2500);

setTimeout(() => {
    console.log("This is the second timeout operation");
}, 6000);

setImmediate(() => {
    console.log("This is setImmediate operation");
});

process.nextTick(() => {
    console.log("This is second process.nextTick operation");
});

new Promise((resolve, reject) => {
    let success = true;
    if(success)resolve ("Data fetched successfully");
    else reject ("Data fetched failed");
});
