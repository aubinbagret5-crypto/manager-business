let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

function save(){
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function signup(){
let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

if(!name || !email || !password){
alert("Remplis tous les champs");
return;
}

if(users.find(u=>u.email===email)){
alert("Compte déjà existant");
return;
}

let user={
name,
email,
password,
balance:0,
history:[],
card:null
};

users.push(user);
currentUser=user;
save();

document.getElementById("auth").style.display="none";
document.getElementById("success-screen").style.display="block";
document.getElementById("success-message").innerText =
name + " votre compte a été créé avec succès";
}

function goToHome(){
document.getElementById("success-screen").style.display="none";
document.getElementById("dashboard").style.display="block";
updateUI();
}

function login(){
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

let user=users.find(u=>u.email===email && u.password===password);

if(!user){
alert("Identifiants incorrects");
return;
}

currentUser=user;
save();
showDashboard();
}

function showDashboard(){
document.getElementById("auth").style.display="none";
document.getElementById("dashboard").style.display="block";
updateUI();
}

function showSection(section){
document.querySelectorAll(".section").forEach(s=>s.style.display="none");
document.getElementById(section).style.display="block";
}

function updateUI(){
document.getElementById("balance").innerText=currentUser.balance;

let historyList=document.getElementById("history");
historyList.innerHTML="";
currentUser.history.forEach(h=>{
let li=document.createElement("li");
li.innerText=h;
historyList.appendChild(li);
});
}

function recharge(){
let amount=prompt("Montant à recharger (min 2000)");
amount=parseInt(amount);

if(amount<2000){alert("Minimum 2000");return;}

currentUser.balance+=amount;
currentUser.history.push("Recharge: "+amount+" FCFA");
save();
updateUI();
}

function withdraw(){
let amount=prompt("Montant à retirer");
amount=parseInt(amount);

if(amount>currentUser.balance){
alert("Solde insuffisant");
return;
}

currentUser.balance-=amount;
currentUser.history.push("Retrait: "+amount+" FCFA");
save();
updateUI();
}

function invest(amount){
if(amount>currentUser.balance){
alert("Solde insuffisant");
return;
}

currentUser.balance-=amount;
currentUser.history.push("Investissement VIP: "+amount+" FCFA");
save();
updateUI();
}

function linkCard(){
let card=document.getElementById("card").value;

if(!card){
alert("Entrez un numéro de carte");
return;
}

currentUser.card=card;
currentUser.history.push("Carte bancaire liée");
save();
updateUI();
alert("Carte liée avec succès");
}

if(currentUser){
showDashboard();
}