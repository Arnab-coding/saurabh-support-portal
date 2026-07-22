/*==========================================================
 Digital Support Portal
 NRS Medical College MBBS Batch of 1998
 Part 1
==========================================================*/

// ---------------------------------------------------------
// CHANGE THIS AFTER DEPLOYING GOOGLE APPS SCRIPT
// ---------------------------------------------------------

const API_URL =
"https://script.google.com/macros/s/AKfycbz74qkMO-KD7l2uM37SThFxsrfj-8kGHNTmT3Gjw7Puk3dhKYu7FD4uwNHgXGzNhYvPkA/exec";

// ---------------------------------------------------------

const form=document.getElementById("supportForm");

const message=document.getElementById("message");

const supportList=document.getElementById("supportList");

const supportCount=document.getElementById("supportCount");


// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded",()=>{

loadSupporters();

});


// ---------------------------------------------------------

form.addEventListener("submit",function(e){

e.preventDefault();

submitSupport();

});


// ---------------------------------------------------------

function showMessage(type,text){

message.className=type;

message.innerHTML=text;

window.scrollTo({

top:message.offsetTop-80,

behavior:"smooth"

});

}


// ---------------------------------------------------------

function clearMessage(){

message.className="";

message.innerHTML="";

}


// ---------------------------------------------------------

function validateName(name){

if(name.length<3)

return false;

return true;

}


// ---------------------------------------------------------

function validateMobile(number){

const regex=/^[6-9][0-9]{9}$/;

return regex.test(number);

}


// ---------------------------------------------------------

function disableButton(){

const btn=form.querySelector("button");

btn.disabled=true;

btn.innerHTML="Submitting...";

}


// ---------------------------------------------------------

function enableButton(){

const btn=form.querySelector("button");

btn.disabled=false;

btn.innerHTML="Submit Support";

}


// ---------------------------------------------------------

async function submitSupport(){

clearMessage();

const name=document.getElementById("name").value.trim();

const mobile=document.getElementById("mobile").value.trim();

const agree=document.getElementById("agree").checked;


if(!validateName(name)){

showMessage(

"error",

"Please enter a valid full name."

);

return;

}


if(!validateMobile(mobile)){

showMessage(

"error",

"Please enter a valid 10-digit mobile number."

);

return;

}


if(!agree){

showMessage(

"error",

"You must agree to the declaration."

);

return;

}


disableButton();


const data={

name:name,

mobile:mobile,

agree:true

};


try{

const response=await fetch(API_URL,{

method:"POST",

body:JSON.stringify(data)

});

const result=await response.json();


if(result.status==="duplicate"){

showMessage(

"error",

"Your support has already been recorded."

);

enableButton();

return;

}


if(result.status==="success"){

showSuccessCard(

name,

result.timestamp

);

openModal();

form.reset();

await loadSupporters();

enableButton();

return;

}

showMessage(

"error",

"Unexpected server response."

);

enableButton();

}

catch(error){

console.log(error);

showMessage(

"error",

"Unable to connect to server."

);

enableButton();

}

}


// ---------------------------------------------------------

async function loadSupporters(){

try{

const response=await fetch(

API_URL+"?action=list"

);

const data=await response.json();

renderSupporters(data);

}

catch(err){

console.log(err);

}

}


// ---------------------------------------------------------

function renderSupporters(data){

supportList.innerHTML="";

supportCount.innerHTML=data.length;


data.forEach(function(item,index){

const row=document.createElement("tr");

const c0=document.createElement("td");

const c1=document.createElement("td");

const c2=document.createElement("td");

c0.innerHTML=index+1;

c1.innerHTML=item.name;

c2.innerHTML=item.timestamp;

row.appendChild(c0);

row.appendChild(c1);

row.appendChild(c2);

supportList.appendChild(row);

});

}

/*==========================================================
 Digital Support Portal
 Part 2
==========================================================*/


// =========================================================
// Auto Refresh Supporters Every 30 Seconds
// =========================================================

setInterval(function(){

    loadSupporters();

},30000);


// =========================================================
// Loading Spinner
// =========================================================

function showLoading(){

    supportList.innerHTML=`
    <tr>
        <td colspan="2">
            <div class="loading">
                <div class="spinner"></div>
            </div>
        </td>
    </tr>
    `;

}


function hideLoading(){

    // Placeholder
}


// =========================================================
// Refresh Button (Future)
// =========================================================

function refreshSupporters(){

    showLoading();

    loadSupporters();

}



// =========================================================
// Search Supporters
// =========================================================

function searchSupporters(keyword){

    keyword=keyword.toLowerCase();

    const rows=document.querySelectorAll("#supportList tr");

    rows.forEach(row=>{

        const text=row.innerText.toLowerCase();

        if(text.indexOf(keyword)>-1){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }

    });

}



// =========================================================
// Format Date
// =========================================================

function formatDate(dateString){

    const date=new Date(dateString);

    return date.toLocaleString(

        "en-IN",

        {

            dateStyle:"medium",

            timeStyle:"short",

            timeZone:"Asia/Kolkata"

        }

    );

}



// =========================================================
// Smooth Scroll
// =========================================================

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



// =========================================================
// Highlight New Row
// =========================================================

function highlightLatest(){

    const row=document.querySelector("#supportList tr");

    if(!row) return;

    row.style.background="#d1e7dd";

    setTimeout(()=>{

        row.style.background="";

    },3000);

}



// =========================================================
// Success Animation
// =========================================================

function celebrate(){

    document.body.classList.add("submitted");

    setTimeout(function(){

        document.body.classList.remove("submitted");

    },1200);

}



// =========================================================
// Update Submit Time
// =========================================================

function updateSubmissionTime(time){

    const div=document.getElementById("submissionTime");

    if(!div) return;

    div.innerHTML=time;

}



// =========================================================
// Reset Form
// =========================================================

function resetForm(){

    form.reset();

}



// =========================================================
// Enable Submit Again
// =========================================================

function allowResubmit(){

    enableButton();

}



// =========================================================
// Validate Mobile Live
// =========================================================

document.getElementById("mobile")

.addEventListener("keyup",function(){

    const value=this.value;

    if(value.length<10){

        this.style.borderColor="#dc3545";

    }

    else{

        this.style.borderColor="#198754";

    }

});



// =========================================================
// Validate Name Live
// =========================================================

document.getElementById("name")

.addEventListener("keyup",function(){

    if(this.value.length<3){

        this.style.borderColor="#dc3545";

    }

    else{

        this.style.borderColor="#198754";

    }

});



// =========================================================
// Copy Support Link
// =========================================================

function copyLink(){

navigator.clipboard.writeText(window.location.href);

alert(

"Support portal link copied."

);

}



// =========================================================
// Export PDF
// =========================================================

function exportPDF(){

window.print();

}



// =========================================================
// Download CSV (Future)
// =========================================================

function downloadCSV(){

alert(

"CSV download available for Administrator."

);

}



// =========================================================
// Administrator Mode
// =========================================================

const ADMIN=false;



function adminOnly(){

if(!ADMIN){

return;

}

console.log("Administrator Logged In");

}



// =========================================================
// Connection Status
// =========================================================

window.addEventListener("offline",function(){

showMessage(

"error",

"You are offline."

);

});



window.addEventListener("online",function(){

showMessage(

"success",

"Internet connection restored."

);

});



// =========================================================
// Before Leaving Page
// =========================================================

window.addEventListener("beforeunload",function(e){

if(

document.getElementById("name").value!=="" ||

document.getElementById("mobile").value!==""

){

e.preventDefault();

e.returnValue="";

}

});



// =========================================================
// Keyboard Shortcut
// Ctrl + Shift + R
// Refresh Supporters
// =========================================================

document.addEventListener("keydown",function(e){

if(

e.ctrlKey &&

e.shiftKey &&

e.key==="R"

){

e.preventDefault();

refreshSupporters();

}

});



// =========================================================
// Footer Year
// =========================================================

const footer=document.querySelector("footer");

if(footer){

footer.innerHTML+=

"<br><br>© "

+

new Date().getFullYear()

+

" Digital Support Portal";

}



// =========================================================
// END OF PART 2
// =========================================================

/*==========================================================
 UI Enhancements
==========================================================*/


// Update Hero Counter

function updateHeroCount(count){

const hero=document.getElementById("supportCountHero");

if(hero){

hero.innerHTML=count;

}

}



// Update Last Updated

function updateLastUpdated(){

const now=new Date();

const text=now.toLocaleString(

"en-IN",

{

timeZone:"Asia/Kolkata"

}

);

const obj=document.getElementById("lastUpdated");

if(obj){

obj.innerHTML=text;

}

}



// Back To Top

const topButton=document.getElementById("topButton");

window.addEventListener("scroll",function(){

if(window.scrollY>400){

topButton.style.display="block";

}

else{

topButton.style.display="none";

}

});

topButton.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};



// Thank You Modal

function openModal(){

const modal=document.getElementById("thankModal");

if(modal){

modal.style.display="flex";

}

}



function closeModal(){

const modal=document.getElementById("thankModal");

if(modal){

modal.style.display="none";

}

}



// Close on outside click

window.onclick=function(event){

const modal=document.getElementById("thankModal");

if(event.target===modal){

modal.style.display="none";

}

};



// Replace the success section inside submitSupport()

// AFTER successful submission call:

// openModal();



// Improve renderSupporters()

const oldRender=renderSupporters;

renderSupporters=function(data){

oldRender(data);

supportCount.innerHTML=data.length;

updateHeroCount(data.length);

updateLastUpdated();

};

/*==========================================================
 Submission Confirmation
==========================================================*/

function showSuccessCard(name,time){

    message.className="success";

    message.innerHTML=`

    <div style="padding:20px">

        <h2 style="color:#198754;margin-bottom:15px;">
        ✓ Thank You
        </h2>

        <p>

        Your support has been successfully recorded.

        </p>

        <br>

        <table style="width:100%;border-collapse:collapse">

            <tr>

                <td><strong>Name</strong></td>

                <td>${name}</td>

            </tr>

            <tr>

                <td><strong>Submitted On</strong></td>

                <td>${time}</td>

            </tr>

        </table>

    </div>

    `;

}

/*==========================================================
 Refresh Counter
==========================================================*/

async function refreshCounter(){

try{

const response=await fetch(

API_URL+"?action=count"

);

const data=await response.json();

supportCount.innerHTML=data.count;

updateHeroCount(data.count);

}

catch(err){

console.log(err);

}

}

setInterval(function(){

refreshCounter();

},15000);

/*==========================================================
 Page Initialisation
==========================================================*/

async function initialisePortal(){

showLoading();

await loadSupporters();

await refreshCounter();

updateLastUpdated();

}

document.addEventListener(

"DOMContentLoaded",

initialisePortal

);

/*==========================================================
Print Final Letter
==========================================================*/

function printLetter(){

window.print();

}