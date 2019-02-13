const avgurl ="http://localhost:9595/expense/avg"
const maxurl="http://localhost:9595/expense/max"
const medurl="http://localhost:9595/expense/median"
const minurl="http://localhost:9595/expense/min"
const sumurl="http://localhost:9595/expense/sum"	
const taburl="http://localhost:9595/expense/all"
const addurl="http://localhost:9595/expense";
	

// Get Elements ||||||||||||||||||||||||||||||||||||||||||
var st=document.getElementById("stats");
if(st){
st.addEventListener("click", SendReq);
}
var gt=document.getElementById("GetTable")
if(gt) {gt.addEventListener("click", SendTabReq)};

function SendReq(){
	AvgReq(avgurl, InputAvg);
	MaxReq(maxurl, InputMax);
	MinReq(minurl, InputMin);
	SumReq(sumurl, InputSum);
	MedReq(medurl, InputMed);
}
function SendTabReq(){
	TabReq(taburl, InputTab);
}
//Average |||||||||||||||||||||||||||||||||||||||||||||||||||
function AvgReq(url, callback){
	let xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onreadystatechange = function(){
        if(this.readyState===4 && this.status===200){
            callback(this);
        } else if (this.status== 400){
            displayError();
        }
    }

    xhr.send();
	
}
function InputAvg(xhr){
	var avgInput=document.getElementById("average")
	let avgValue = JSON.parse(xhr.response);
	avgValue=Math.round(avgValue * 100) / 100;
	avgInput.innerHTML=`Average: ${avgValue}`;
}
//max ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function MaxReq(url, callback){
	let xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onreadystatechange = function(){
        if(this.readyState===4 && this.status===200){
            callback(this);
        } else if (this.status== 400){
            displayError();
        }
    }

    xhr.send();
	
}
function InputMax(xhr){
	var maxInput=document.getElementById("max")
	let maxValue = JSON.parse(xhr.response);
	maxInput.innerHTML=`Max: ${maxValue}`;
}
//min ||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function MinReq(url, callback){
	let xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onreadystatechange = function(){
        if(this.readyState===4 && this.status===200){
            callback(this);
        } else if (this.status== 400){
            displayError();
        }
    }

    xhr.send();
	
}
function InputMin(xhr){
	var minInput=document.getElementById("min")
	let minValue = JSON.parse(xhr.response);
	minInput.innerHTML=`Min: ${minValue}`;
}
//sum ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function SumReq(url, callback){
	let xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onreadystatechange = function(){
        if(this.readyState===4 && this.status===200){
            callback(this);
        } else if (this.status== 400){
            displayError();
        }
    }

    xhr.send();
	
}
function InputSum(xhr){
	var sumInput=document.getElementById("sum")
	let sumValue = JSON.parse(xhr.response);
	sumValue=Math.round(sumValue * 100) / 100;
	sumInput.innerHTML=`Sum: ${sumValue}`;
}
//med ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function MedReq(url, callback){
	let xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onreadystatechange = function(){
        if(this.readyState===4 && this.status===200){
            callback(this);
        } else if (this.status== 400){
            displayError();
        }
    }

    xhr.send();
	
}
function InputMed(xhr){
	var medInput=document.getElementById("median")
	let medValue = JSON.parse(xhr.response);
	medValue=Math.round(medValue * 100) / 100;
	medInput.innerHTML=`Median: ${medValue}`;
}
//Table ||||||||||||||||||||||||||||||||||||||||||||||||||||
function TabReq(url, callback){
let xhr = new XMLHttpRequest();

xhr.open("GET", url);

xhr.onreadystatechange = function(){
    if(this.readyState===4 && this.status===200){
        callback(this);
    } else if (this.status== 400){
        displayError();
    }
}

xhr.send();

}
function InputTab(xhr){
var tabInput=document.getElementById("tabArray")
let TabValue = JSON.parse(xhr.response);
var tabList="";
for(values of TabValue){
	addrow(values.id, values.category, values.cost, values.merchant, values.user.firstName, values.user.lastName, values.user.id);
}
//tabInput.innerHTML=TabValue.firstName;
console.log(TabValue);
}

function addrow(id, category, cost, merchant, firstName, lastName, userID){

	   let row = document.createElement("tr");
	   let cell1 = document.createElement("td");
	   let cell2 = document.createElement("td");
	   let cell3 = document.createElement("td");
	   let cell4 = document.createElement("td");
	   let cell5 = document.createElement("td");
	   let cell6 = document.createElement("td");
	   let cell7 = document.createElement("td");
	  

	   row.appendChild(cell1);
	   row.appendChild(cell2);
	   row.appendChild(cell3);
	   row.appendChild(cell4);
	   row.appendChild(cell5);
	   row.appendChild(cell6);
	   row.appendChild(cell7);

	   cell1.innerHTML=id;
	    cell2.innerHTML=category;
	    cell3.innerHTML=cost;
	    cell4.innerHTML=merchant;
	    cell5.innerHTML=userID;
	    cell6.innerHTML=firstName;
	    cell7.innerHTML=lastName;
	    
	    
	    document.getElementById("ExpTable").appendChild(row);
} 
// AddExpense||||||||||||||||||||||||||||||||||||||||||||||||

function makeAjaxPost(url, callback, newUserObject){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.onreadystatechange = function(){
      if(xhr.readyState===4&&xhr.status===201){
    	  document.getElementById("error").innerHTML="Added";
          callback(this);
      } if(xhr.status===400){
    	  document.getElementById("error").innerHTML="Please enter all fields";
    	  console.log(xhr.response);
      }
      if(xhr.status===500){
    	  document.getElementById("error").innerHTML="Expense ID already exist.";
    	  console.log(xhr.response);
      }
      else {
          console.log(xhr.response);
        
      }
  }
  xhr.setRequestHeader("Content-Type","application/json");
  let jsonUser = JSON.stringify(newUserObject);
  xhr.send(jsonUser);
console.log(jsonUser);
}

function printResponse(xhrObj){
  console.log(xhrObj.response);
}

var sub = document.getElementById("add")
sub.addEventListener("click", doFunction)

function doFunction(){
	let cat=document.getElementById("cat").value;
	let cost=document.getElementById("cost").value;
	let merch=document.getElementById("merch").value;
//	let fn=document.getElementById("fn").value;
//	let ln=document.getElementById("ln").value;
	let addExpID=document.getElementById("addExpID").value;
	let addUserID=document.getElementById("addID").value;
	
	cost=Math.round(cost * 100) / 100;
	
	console.log(cost);
	let NewExpense = {
	 "category": cat,
	 "cost": cost,
	 "id":addExpID,
	 "merchant":merch,
	 "user": {
//		 "firstName": fn,
		 "id":addUserID, 
//		 "lastName": ln
		 }
	}
	if(addExpID>100){
		document.getElementById("error").innerHTML="Table can not hold more than 100 expenese. Please delete an expense first";
		return;
	}
	if (cat.length>12){
		document.getElementById("error").innerHTML="Category must be less than 12 characters. Please abbreviate.";
		return;}
	if (cost>=1000){
		document.getElementById("error").innerHTML="Expense should be less than $1000.";
		return;	
		}
	if (merch.length>12){
		document.getElementById("error").innerHTML="The Merchant must be less than 12 characters. Please abbreviate.";
		return;	
		}
	if (addUserID>25){
		document.getElementById("error").innerHTML="There are only 25 users.";
		return;	
		}
   makeAjaxPost(addurl, printResponse, NewExpense);
}
// Editing an expense |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\

function makeAjaxPut(url, callback, newUserObject){
	  let xhr = new XMLHttpRequest();
	  xhr.open("PUT", url);
	  xhr.onreadystatechange = function(){
		  console.log(xhr.status);
	      if(xhr.readyState===4&&xhr.status===204){
	          document.getElementById("errorEdit").innerHTML="Edited";
	          callback(this);
	      } if(xhr.status===400){
	    	  document.getElementById("errorEdit").innerHTML="Please enter all fields";
	    	  console.log(xhr.response);
	      }
	      if(xhr.status===500){
	    	  document.getElementById("errorEdit").innerHTML="The expense does not exist";
	    	  console.log(xhr.response);
	      } else {
	          console.log(xhr.response);
	      }
	  }
	  xhr.setRequestHeader("Content-Type","application/json");
	  let jsonUser = JSON.stringify(newUserObject);
	  xhr.send(jsonUser);
	console.log(jsonUser);
	}

	function printResponse(xhrObj){
	  console.log(xhrObj.response);
	}

	var sub = document.getElementById("edd")
	sub.addEventListener("click", doEditFunction)

	function doEditFunction(){
		var cat=document.getElementById("eddCat").value;
		let cost=document.getElementById("eddCost").value;
		let merch=document.getElementById("eddMerch").value;
//		let fn=document.getElementById("eddFn").value;
//		let ln=document.getElementById("eddLn").value;
		let id=document.getElementById("eddID#").value;
		let userID=document.getElementById("eddID").value;

		cost=Math.round(cost * 100) / 100;
		console.log(cost);
		let NewExpense = {
		 "category": cat,
		 "cost": cost,
		 "id":id,
		 "merchant":merch,
		 "user": {
//			 "firstName": fn,
			 "id":userID, 
//			 "lastName": ln
			 }
		}
		if (cat.length>12){
			document.getElementById("errorEdit").innerHTML="Category must be less than 12 characters. Please abbreviate.";
			return;}
		if (cost>1000){
			document.getElementById("errorEdit").innerHTML="Expense should be less than $1000.";
			return;	
			}
		
		if (merch.length>12){
			document.getElementById("errorEdit").innerHTML="The Merchant must be less than 12 characters. Please abbreviate.";
			return;	
			}
		if (userID>25){
			document.getElementById("errorEdit").innerHTML="There are only 25 users.";
			return;	
			}
		makeAjaxPut(addurl, printResponse, NewExpense);
	}

// Deleting an expense |||||||||||||||||||||||||||||||||||||||||||||||||||||||||
	function makeAjaxDel(url, callback, newUserObject){
		  let xhr = new XMLHttpRequest();
		  xhr.open("DELETE", url);
		  xhr.onreadystatechange = function(){
		      if(xhr.readyState===4&&xhr.status===204){
		    	  console.log(xhr.status);
		    	  document.getElementById("errorDel").innerHTML="Deleted";
		          callback(this);
		      } if(xhr.status===400){
		    	  document.getElementById("errorDel").innerHTML="Please enter Valid ID";
		    	  console.log(xhr.response);
		      }
		      if(xhr.status===500){
		    	  document.getElementById("errorDel").innerHTML="One of the ids is invalid";
		    	  console.log(xhr.response);
		      } else {
		          console.log(xhr.response);
		      }
		  }
		  xhr.setRequestHeader("Content-Type","application/json");
		  let jsonUser = JSON.stringify(newUserObject);
		  xhr.send(jsonUser);
		console.log(jsonUser);
		}

		function printResponseDel(xhrObj){
		  console.log(xhrObj.response);
		}

		var sub = document.getElementById("del");
		sub.addEventListener("click", doDelFunction);

		function doDelFunction(){
//			let cat=document.getElementById("delCat").value;
//			let cost=document.getElementById("delCost").value;
//			let merch=document.getElementById("delMerch").value;
//			let fn=document.getElementById("delFn").value;
//			let ln=document.getElementById("delLn").value;
			let id=document.getElementById("id#").value;
//			let userID=document.getElementById("delID").value;
			
//			console.log(cat);
			let DelExpense = {
			 "category": "cat",
			 "cost": 5,
			 "id":id,
			 "merchant":"merch",
			 "user": {
				 "firstName": "fn",
				 "id":1, 
				 "lastName": "ln"}
			}
			if(id==""){document.getElementById("errorDel").innerHTML="Please enter Valid ID"}
			else{ makeAjaxDel(addurl, printResponseDel, DelExpense)};
		}

