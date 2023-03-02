const config = require("./config.js")
const fetch = require("node-fetch")

const server = async () => {
    await fetch(config.pterodactyl.domain + "/api/application/servers", {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorizaticon": "Bearer " + config.pterodactyl.apikey
  }
}).then(response => response.json())
.then(json => {
    for(let i = 0; i < json.data.length; i++) {
       fetch(config.pterodactyl.domain + "/api/application/servers" + json.data[i].attributes.id + "/force", {
            "method": "DELETE",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorizaticon": "Bearer " + config.pterodactyl.apikey
        }.then(response => {
            if(response.status == 200) {
                console.log('Successfuly Deleted Server ' + json.data[i].attributes.name)
            } else {
                console.log("An Error Has Occured While Deleting Server " + json.data[i].attributes.name)
            }
        })
    }
  )}
  })
}

server();