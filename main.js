//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){

	//getElementById function
	var elId = function (n) {
		var theElement = document.getElementById(n);
		return theElement;
	}
	//Create select field element and populate with options.
	var makeDrop = function (){
		var formTag = document.getElementsByTagName("form"); //formTag is array
		var selectList = elId("select");
		var makeSelect = document.createElement("select");
		makeSelect.setAttribute("id", "priorities");
	for(var i=0, p=priorityGroup.length; i<p; i++) {
		var makeOption = document.createElement("option");
		var optText = priorityGroup[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
		}
		selectList.appendChild(makeSelect);
	}
	
	//Find value of selected checkbox.
	var checkedbox = function () {
	if(elId("home").checked) {
		categoryValue = elId("home").value;
		}
		else {
			categoryValue = "No"
			}
	if(elId("business").checked) {
		categoryValue = elId("business").value;
		}
		else {
			categoryValue = "No"
			}
	if(elId("school").checked) {
		categoryValue = elId("school").value;
		}
		else {
			categoryValue = "No"
			}
	}
	
	var toggleContr = function (n) {
		switch(n) {
			case "on":
				elId("taskForm").style.display = "none";
				elId("clear").style.display = "inline";
				elId("displayData").style.display = "none";
				elId("addOne").style.display = "inline";
				break;
			case "off":
				elId("form").style.display = "block";
				elId("clear").style.display = "inline";
				elId("displayData").style.display = "inline";
				elId("addOne").style.display = "none";
				elId("items").style.display = "none";
				
				break;
			default:
				return false;
				}
			}
			
	
	//Store data function
	var storeData = function () {
		var id = Math.floor(Math.random()*10000000001);
		//Get all form field values and store in object
		//Object properties contain array w/from label and input value
		checkedbox();
		var item = {};
		item.name = ["Name of Task: ", elId("taskName").value];
		item.category = ["Category: ", categoryValue];
		item.priorityLevel = ["Priority: ", elId("priorities").value];
		item.startUp = ["Starting Date of Task: ", elId("taskDate").value];
		item.ending = ["Ending Date of Task: ", elId("taskEnd").value];
		item.alertOption = ["Type of Alert: ", elId("alertWay").value];
		item.note = ["Notes", elId("notes").value];
	
		//Save data into Local Storage: stringify to convert object to string
		localStorage.setItem(id, JSON.stringify(item));
		alert("Task Saved!");
	}
	
	//Get data function
	var getData = function () {
		toggleContr("on");
		if(localStorage.length === 0) {
			alert("There is no data in storage.");
			}
		//Write data from local storage to browser
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(var i=0, len=localStorage.length; i<len; i++) {
		var makeLi = document.createElement("li");
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		//Convert string from local to object
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		makeLi.appendChild(makeSubList);
		for(var r in obj) {
			var makeSubLi = document.createElement("li");
			makeSubList.appendChild(makeSubLi);
			var optSubText = obj[r][0]+" "+obj[r][1];
			makeSubLi.innerHTML = optSubText;
			}
		}
	}
	
	var clearLocal = function () {
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}
		else{
			localStorage.clear();
			alert("All tasks have been cleared.");
			window.location.reload();
			return false;
		}
	
	}
	
	//Variable defaults
	var priorityGroup = ["High","Medium","Low"];
	makeDrop();
	
	//Set Link & Submit Click Events
	var displayLink = elId("displayData");
	displayLink.addEventListener("click", getData);
	var clearLink = elId("clear");
	clearLink.addEventListener("click", clearLocal);
	var submit = elId("submit");
	submit.addEventListener("click", storeData);
	var categoryValue = "No";
	
});