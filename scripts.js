// FILL IN THE FUNCTIONS BELOW
maxFieldChar = 32;
currentFieldChar = 0;
maxAreaChar = 140;
currentAreaChar = 0;
maxPasswordChar = 16;
currentPasswordChar = 0;


 var CountFieldChar = function(){
   document.getElementById("fieldCounterText").style.color = "black";
var charCount = document.getElementById("field").value.length;

if (charCount <= 0) { document.getElementById("fieldCounterText").innerHTML = " ";}
else{document.getElementById("fieldCounterText").innerHTML = charCount;}
 }

 var CountAreaChar = function(){
   document.getElementById("areaCounterText").style.color = "black";
var charCount = document.getElementById("area").value.length;

if (charCount <= 0) { document.getElementById("areaCounterText").innerHTML = " ";}
else{document.getElementById("areaCounterText").innerHTML = charCount;}
 }
 var CountPasswordChar = function(){
var charCount = document.getElementById("pass").value.length;

if (charCount <= 0) { document.getElementById("validate").innerHTML = ""; document.getElementById("passCounterText").innerHTML = " ";}
else{document.getElementById("passCounterText").innerHTML = charCount;
CheckPassword();
}
 }

var CheckPassword =  function(){
  if(document.getElementById("pass").value === "word")
  {
    document.getElementById("validate").style.color = "black";
document.getElementById("validate").innerHTML = "log in";
  }else{
  document.getElementById("validate").style.color = "red";
    document.getElementById("validate").innerHTML = "password not right";}

}
var ValidateLogIn =  function(){
if(document.getElementById("field").value.length > 32){
document.getElementById("fieldCounterText").innerHTML = "Too Long";
document.getElementById("fieldCounterText").style.color = "red";
 }
 if(document.getElementById("area").value.length > 16){
 document.getElementById("areaCounterText").innerHTML = "Too Long";
 document.getElementById("areaCounterText").style.color = "red";
  }

  if(document.getElementById("pass").value === "word")
  {


  }
}
