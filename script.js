document.getElementById("addAppForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get input values
  var appName = document.getElementById("appNameInput").value;
  var appURL = document.getElementById("appURLInput").value;

  // Create a new list item element
  var li = document.createElement("li");

  // Create a link element for the app
  var link = document.createElement("a");
  link.href = appURL;
  link.textContent = appName;

  // Append the link to the list item
  li.appendChild(link);

  // Append the list item to the app list
  document.getElementById("appItems").appendChild(li);

  // Clear input fields
  document.getElementById("appNameInput").value = "";
  document.getElementById("appURLInput").value = "";

  // Save the app list to local storage
  saveAppList();
});

function saveAppList() {
  var appList = [];

  // Get all app links
  var appLinks = document.querySelectorAll("#appItems li a");

  // Add each app link to the appList array
  for (var i = 0; i < appLinks.length; i++) {
    var appLink = appLinks[i];
    appList.push({ name: appLink.textContent, url: appLink.href });
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
      var link = document.createElement("a");
      link.href = app.url;
      link.textContent = app.name;

      li.appendChild(link);
      document.getElementById("appItems").appendChild(li);
    }
  }
});
