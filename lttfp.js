// ==UserScript==
// @name         Unraid traefik
// @namespace    https://greasyfork.org/en/users/1388191-masapa
// @version      2024-10-29_2
// @license       MIT
// @description  Buttons that allows you to easily add traefik.enable and wanted middlewares
// @author       Masapa
// @match        http://kissapuu.local/Docker/AddContainer*
// @match        http://kissapuu.local/Docker/UpdateContainer*
// @match        http://kissapuu.local/Apps/AddContainer*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/514694/Unraid%20traefik.user.js
// @updateURL https://update.greasyfork.org/scripts/514694/Unraid%20traefik.meta.js
// ==/UserScript==

(function () {
  "use strict";

  const middlewares = ["auth@file"];
  const customEntrypoints = ["local"];

    const generateOpts = (name, target, value) => {
     return (
         {
      Description: "",
      Name: name,
      Type: "Label",
      Target: target,
      Value: value,
      Buttons:
        "<button type='button' onclick='editConfigPopup(" +
        confNum +
        ",false)'>Edit</button><button type='button' onclick='removeConfig(" +
        confNum +
        ")'>Remove</button>",
      Number: confNum,
         }
     )

    }


  const addButton = (i = 0) => {
    const name = document.getElementsByName("contName")[0].value;
    const configLocation = $("#configLocation");


      if(i === 0) {
        configLocation.append(makeConfig(generateOpts("Enable traefik","traefik.enable","true")));
        configLocation.append(makeConfig(generateOpts("Traefik auth","traefik.http.routers." + name + ".middlewares",middlewares[0])));
      }
      if(i === 1) {
        configLocation.append(makeConfig(generateOpts("Enable traefik","traefik.enable","true")));
        configLocation.append(makeConfig(generateOpts("Traefik auth","traefik.http.routers." + name + ".middlewares",middlewares.join(","))));
      }
      if(i === 2) {
        configLocation.append(makeConfig(generateOpts("Traefik entrypoints","traefik.http.routers." + name + ".entrypoints",customEntrypoints.join(","))));
      }
      if(i === 3) {
          configLocation.append(makeConfig(generateOpts("Traefik container port","traefik.http.services."+name+".loadbalancer.server.port","8080")));
      }
  
  };

    //

  const button = document.createElement("button");
    button.addEventListener("click", () => addButton());
  button.innerHTML = "TRAEFIK";
  document.getElementsByClassName("left")[0].append(button);
  const button2 = document.createElement("button");
  button2.addEventListener("click", () => addButton(1));
  button2.innerHTML = "With all middlewares";

  const button3 = document.createElement("button");
  button3.addEventListener("click", () => addButton(2));
  button3.innerHTML = "Add endpoints";

  const button4 = document.createElement("button");
  button4.addEventListener("click", () => addButton(3));
  button4.innerHTML = "Add port";

document.getElementsByClassName("left")[0].append(button, button2,button3,button4);
})();
