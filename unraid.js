// ==UserScript==
// @name         Unraid traefik
// @namespace    http://tampermonkey.net/
// @version      2024-04-10
// @description  Buttons that allows you to easily add traefik.enable and wanted middlewares
// @author       Masapa
// @match        http://unraid.local/Docker/AddContainer*
// @match        http://unraid.local/Docker/UpdateContainer*
// @match        http://unraid.local/Apps/AddContainer*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const middlewares = ["auth@file","local@file"];


  const addButton = (i = 0) => {
    const name = document.getElementsByName("contName")[0].value;

    let opts = {
      Description: "",
      Name: "Enable traefik",
      Type: "Label",
      Target: "traefik.enable",
      Value: "true",
      Buttons:
        "<button type='button' onclick='editConfigPopup(" +
        confNum +
        ",false)'>Edit</button><button type='button' onclick='removeConfig(" +
        confNum +
        ")'>Remove</button>",
      Number: confNum,
    };

    let opts2 = {
      Description: "",
      Name: "Traefik auth",
      Type: "Label",
      Target: "traefik.http.routers." + name + ".middlewares",
      Value: middlewares[0],
      Buttons:
        "<button type='button' onclick='editConfigPopup(" +
        confNum +
        ",false)'>Edit</button><button type='button' onclick='removeConfig(" +
        confNum +
        ")'>Remove</button>",
      Number: confNum,
    };
    $("#configLocation").append(makeConfig(opts));

    if (i === 2) {
      opts2 = {
        Description: "",
        Name: "Traefik auth",
        Type: "Label",
        Target: "traefik.http.routers." + name + ".middlewares",
        Value: middlewares.join(","),
        Buttons:
          "<button type='button' onclick='editConfigPopup(" +
          confNum +
          ",false)'>Edit</button><button type='button' onclick='removeConfig(" +
          confNum +
          ")'>Remove</button>",
        Number: confNum,
      };
      reloadTriggers();
      $('input[name="contName"]').trigger("change"); // signal change
    }

    $("#configLocation").append(makeConfig(opts2));
    reloadTriggers();
    $('input[name="contName"]').trigger("change"); // signal change
  };

  const button = document.createElement("button");
  button.addEventListener("click", () => addButton());
  button.innerHTML = "TRAEFIK";
  document.getElementsByClassName("left")[0].append(button);
  const button2 = document.createElement("button");
  button2.addEventListener("click", () => addButton(2));
  button2.innerHTML = "Local only";
  document.getElementsByClassName("left")[0].append(button, button2);

})();
