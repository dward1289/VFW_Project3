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
	if(elId("business").checked){
		categoryValue = elId("business").value;
			}	
	if(elId("school").checked) {
		categoryValue = elId("school").value;
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
				elId("taskForm").style.display = "block";
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
	var storeData = function (key) {
		//No key = new key
		if(!key){
			var id = Math.floor(Math.random()*10000000001);
			}
			else{
				//Existing key will be saved when edited
				id = key;
				}
				
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
		var linksLi = document.createElement("li");
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
			makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create. edit and delete buttons for items in local storage
		}
	}
	//Make edit and delete buttons for each stored item
	var makeItemLinks = function (key, linksLi) {
		//add edit single item link
		var edit = document.createElement('a');
		edit.href = "#";
		edit.key = key;
		var editTxt = "Edit task";
		edit.addEventListener("click", editItem);
		edit.innerHTML= editTxt;
		linksLi.appendChild(edit);
		
		//add line break
		var breakIt = document.createElement("br");
		linksLi.appendChild(breakIt);
		
		//add delete single link
		var deleteIt = document.createElement('a');
		deleteIt.href = "#";
		deleteIt.key = key;
		var deleteTxt = "Delete Task";
		
		//deleteIt.addEventListener("click", deleteItem);
		deleteIt.innerHTML= deleteTxt;
		linksLi.appendChild(deleteIt);
		}
	
	var editItem = function () {
		//Grab the data first.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show form again
		toggleContr("off");
		
		//Populate with current
		elId("taskName").value = item.name[1];
		elId("priorities").value = item.priorityLevel[1];
		elId("taskDate").value = item.startUp[1];
		elId("taskEnd").value = item.ending[1];
		elId("alertWay").value = item.alertOption[1];
		elId("notes").value = item.note[1];
		if(item.category[1] == "home") {
			elId("home").setAttribute("checked", "checked");
			}
		if(item.category[1] == "business") {
			elId("business").setAttribute("checked", "checked");
					}
		if(item.category[1] == "school") {
			elId("school").setAttribute("checked", "checked");
					}
		
		
		//Remove listener from submit button.
		submit.removeEventListener("click", storeData);
		
		//Change submit value to edit
		elId("submit").value = "Edit Task";
		var editSubmit = elId("submit");
		
		//Save key value in this function as property of editSubmit, use that value when save edited data.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	var validate = function (e) {
		//Define elements
		var getPriority = elId("priorities");
		var getNot = elId("taskName");
		var getStart = elId("taskDate");
		var getEnd = elId("taskEnd");
		
		//Reset error messages
		errMsg.innerHTML = "";
		getPriority.style.border = "1px solid black";
		getNot.style.border = "1px solid black";
		getStart.style.border = "1px solid black";
		getEnd.style.border = "1px solid black";


		//Error messages array
		var message = [];
		
		//Priority validate
		if(getPriority.value === "--Choose Priority Level--") {
			var priorityError = "Please select priority level.";
			getPriority.style.border = "1px solid red";
			message.push(priorityError);
		}
		//Name of Task validate
		if(getNot.value === "") {
			var notError = "Please enter the name of task.";
			getNot.style.border = "1px solid red";
			message.push(notError);
		}
		//Start date validate
		if(getStart.value === "") {
			var startError = "Please select a start date.";
			getStart.style.border = "1px solid red";
			message.push(startError);
		}
		//End date validate
		if(getEnd.value === "") {
			var endError = "Please select an ending date.";
			getEnd.style.border = "1px solid red";
			message.push(endError);
		}
		//Explains errors
		if(message.length >=1) {
			for(var i = 0, j = message. length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = message[i];
				errMsg.appendChild(txt);
			}
		e.preventDefault();
		return false;	
		}
		else{
			storeData(this.key);
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
	var priorityGroup = ["--Choose Priority Level--","High","Medium","Low"];
	makeDrop();
	errMsg = elId("errors");
	
	//Set Link & Submit Click Events
	var displayLink = elId("displayData");
	displayLink.addEventListener("click", getData);
	var clearLink = elId("clear");
	clearLink.addEventListener("click", clearLocal);
	var submit = elId("submit");
	submit.addEventListener("click", validate);
	
});