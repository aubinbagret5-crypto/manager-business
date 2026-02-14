let users = [];
let currentUser = null;
let balance = 0;

function showLoginForm(){ document.getElementById('signup-form').style.display='none'; document.getElementById('login-form').style.display='block'; }
function showSignupForm(){ document.getElementById('signup-form').style.display='block'; document.getElementById('login-form').style.display='none'; }
function showDashboardSection(section){ 
  document.getElementById('home-section').style.display='none';
  document.getElementById('plan-section').style.display='none';
  document.getElementById('menu-section').style.display='none';
  document.getElementById(section+'-section').style.display='block';
}

// Générer code unique par utilisateur
function generateUserCode() {
  return 'MI' + Math.floor(100000 + Math.random() * 900000); // ex: MI123456
}

function signup(){
  let name=document.getElementById('name').value;
  let email=document.getElementById('email').value;
  let password=document.getElementById('password').value;
  let referral=document.getElementById('referral').value;
  if(!email||!password||!name){ alert('Veuillez remplir tous les champs'); return; }

  let userCode = generateUserCode();
  users.push({name,email,password,balance:0,code:userCode,referral:referral,refBonus:0}); 
  currentUser=email; balance=0;

  // Bonus parrainage
  if(referral){
    let refUser = users.find(u=>u.code===referral);
    if(refUser){ refUser.refBonus += 0; }
  }

  showDashboardSection('home'); 
  document.getElementById('balance').innerText=balance;

  // Effet fondu accueil
  let homeSection = document.getElementById('home-section');
  homeSection.style.opacity = 0;
  homeSection.style.transition = "opacity 1s";
  setTimeout(() => { homeSection.style.opacity = 1; }, 50);
}

function login(){
  let email=document.getElementById('login-email').value;
  let password=document.getElementById('login-password').value;
  let user=users.find(u=>u.email===email && u.password===password);
  if(!user){ alert('Email ou mot de passe incorrect'); return; }
  currentUser=email; balance=user.balance; showDashboardSection('home'); document.getElementById('balance').innerText=balance;
}

function investPlan(amount){ 
  if(balance<amount){ alert('Votre solde est insuffisant, veuillez recharger'); return; }
  balance-=amount; document.getElementById('balance').innerText=balance; alert('Investissement effectué !'); 
}

function generateRechargeCode(){ 
  let amount=parseInt(document.getElementById('recharge-amount').value);
  if(amount<2000){ alert('Dépôt minimum 2 000 FCFA'); return; }
  document.getElementById('recharge-code-section').style.display='block';
  document.getElementById('recharge-code').innerText=Math.floor(Math.random()*900000+100000);
}

function confirmRecharge(){ 
  let amount=parseInt(document.getElementById('recharge-amount').value);
  balance+=amount; document.getElementById('balance').innerText=balance; alert('Paiement validé ! Solde mis à jour automatiquement');
}

function withdrawFromMenu(){ 
  let amount=parseInt(document.getElementById('withdraw-amount').value);
  if(amount<1500){ alert('Retrait minimum 1 500 FCFA'); return; }
  if(amount>500000){ alert('Retrait maximum 500 000 FCFA'); return; }
  let name=document.getElementById('withdraw-name').value;
  let number=document.getElementById('withdraw-number').value;
  let network=document.getElementById('withdraw-network').value;
  let pin=document.getElementById('withdraw-pin').value;
  if(!name||!number||!network||!pin){ alert('Veuillez remplir tous les champs pour le retrait'); return; }
  balance-=amount; document.getElementById('balance').innerText=balance; alert('Retrait effectué ! Taxes 15% appliquées. Solde mis à jour automatiquement.');
}