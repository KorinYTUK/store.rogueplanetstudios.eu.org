document.getElementById("addAppForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get input values
  var appName = document.getElementById("appNameInput").value;
  var appDesc = document.getElementById("appDescInput").value;
  var appAuthor = document.getElementById("appAuthorInput").value;
  var appVersion = document.getElementById("appVersionInput").value;
  var appImage = document.getElementById("appImageInput").files[0];
  var appInstaller = document.getElementById("appInstallerInput").files[0];

  // Create a new list item element
  var li = document.createElement("li");

  // Create an image element for the app
  var img = document.createElement("img");
  img.src = URL.createObjectURL(appImage);
  img.alt = appName;

  // Create a div for app details
  var detailsDiv = document.createElement("div");
  detailsDiv.className = "app-details";

  // Create a heading for app title
  var titleHeading = document.createElement("h3");
  titleHeading.textContent = appName;

  // Create a paragraph for app description
  var descPara = document.createElement("p");
  descPara.textContent = appDesc;

  // Create a paragraph for app author and version
  var authorPara = document.createElement("p");
  authorPara.innerHTML = "<strong>Author:</strong> " + appAuthor + "<br><strong>Version:</strong> " + appVersion;

  // Create a link for app installer
  var installerLink = document.createElement("a");
  installerLink.href = URL.createObjectURL(appInstaller);
  installerLink.textContent = "Download Installer";

  // Append the elements to the list item
  detailsDiv.appendChild(titleHeading);
  detailsDiv.appendChild(descPara);
  detailsDiv.appendChild(authorPara);
  detailsDiv.appendChild(installerLink);
  li.appendChild(img);
  li.appendChild(detailsDiv);

  // Append the list item to the app list
  document.getElementById("appItems").appendChild(li);

  // Clear input fields
  document.getElementById("appNameInput").value = "";
  document.getElementById("appDescInput").value = "";
  document.getElementById("appAuthorInput").value = "";
  document.getElementById("appVersionInput").value = "";
  document.getElementById("appImageInput").value = "";
  document.getElementById("appInstallerInput").value = "";

  // Save the app list to local storage
  saveAppList();
});

function saveAppList() {
  var appList = [];

  // Get all app list items
  var appItems = document.querySelectorAll("#appItems li");

  // Iterate over each app list item
  for (var i = 0; i < appItems.length; i++) {
    var appItem = appItems[i];

    // Get app details from the item
    var appName = appItem.querySelector("h3").textContent;
    var appDesc = appItem.querySelector("p").textContent;
    var appAuthor = appItem.querySelectorAll("p")[1].innerHTML.split("<br>")[0].replace("<strong>Author:</strong> ", "");
    var appVersion = appItem.querySelectorAll("p")[1].innerHTML.split("<br>")[1].replace("<strong>Version:</strong> ", "");
    var appImageSrc = appItem.querySelector("img").src;
    var appInstallerURL = appItem.querySelector("a").href;

    // Add the app details to the appList array
    appList.push({
      name: appName,
      description: appDesc,
      author: appAuthor,
      version: appVersion,
      imageSrc: appImageSrc,
      installerURL: appInstallerURL
    });
  }

  // Save the appList array to local storage
  localStorage.setItem("apps.list", JSON.stringify(appList));
}

// Load the app list from local storage on page load
window.addEventListener("load", function() {
  var savedAppList = localStorage.getItem("apps.list");

  if (savedAppList) {
    var appList = JSON.parse(savedAppList);

    // Add each app from the saved list to the appItems list
    for (var i = 0; i < appList.length; i++) {
      var app = appList[i];

      var li = document.createElement("li");

      var img = document.createElement("img");
      img.src = app.imageSrc;
      img.alt = app.name;

      var detailsDiv = document.createElement("div");
      detailsDiv.className = "app-details";

      var titleHeading = document.createElement("h3");
      titleHeading.textContent = app.name;

      var descPara = document.createElement("p");
      descPara.textContent = app.description;

      var authorPara = document.createElement("p");
      authorPara.innerHTML = "<strong>Author:</strong> " + app.author + "<br><strong>Version:</strong> " + app.version;

      var installerLink = document.createElement("a");
      installerLink.href = app.installerURL;
      installerLink.textContent = "Download Installer";

      detailsDiv.appendChild(titleHeading);
      detailsDiv.appendChild(descPara);
      detailsDiv.appendChild(authorPara);
      detailsDiv.appendChild(installerLink);
      li.appendChild(img);
      li.appendChild(detailsDiv);

      document.getElementById("appItems").appendChild(li);
    }
  }
});
