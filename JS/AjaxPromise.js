/******************************************************************************************
 * 
 * Ability to view Employee Data from JSON Server having ID, Name and Salary using AJAX 
    - Run the JS code using Node Compiler
    - Run npm install xmlhttprequest

 *    
 ******************************************************************************************/

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, callback, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("State Changed Called. Ready State: " + xhr.readyState +
                " Status: " + xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XR Failed!");
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent to the server.");
    });
}

const getURL = "http://127.0.0.1:3000/employees/";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: " + responseText);
    })
    .catch(error => console.log("GET Error Status: "
        + JSON.stringify(error)));

const deleteURL = "http://127.0.0.1:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: " + responseText);
    })
    .catch(error => console.log("DELETE Error Status: "
        + JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const emplData = { "name": "Harry", "salary": "5000" };
makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        console.log("User Added: " + responseText);
    })
    .catch(error => console.log("POST Error Status: "
        + JSON.stringify(error)));

/**
 * Execution steps:
     1. Open the NodeJS Command Prompt. Set the path to the file  directory.
     2. Initially install json-server: npm install -g json-server
     3. Start the server everytime to perform the AJAX operation: json-server --watch empDB.json
     4. Open gitbash terminal and set the path.
     5. To run the .js file and GET the value: node AjaxCallback.js
     6. To GET the data from .js file using curl command: curl -X GET -H "Content-Type: application/json" "http://localhost:3000/employees" -w "\n"
     7. To POST the data in .js file using curl command: curl -X POST -H "Content-Type: application/json" -d '{"name": "Harry","salary": "5000"}' "http://localhost:3000/employees" -w "\n"
     8. To DELETE the data from .js file using curl command: curl -X DELETE -H "Content-Type: application/json" "http://localhost:3000/employees/5" -w "\n"
    NOTE: Keep the json-server running while performing the HTTP operations.
 */