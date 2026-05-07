// --- CONFIGURATION ---
const MY_UPI_ID = "sanjivkumar4480@nyes";
const MY_NAME = "Sanjiv Kumar";

// --- PAYMENT LOGIC ---
function pay(amount) {
  if (!amount || amount < 1) {
    alert("Pehle sahi amount enter karein (Min ₹1)!");
    return;
  }

  // UPI Link for App redirection
  const upiLink = `upi://pay?pa=${MY_UPI_ID}&pn=${encodeURIComponent(MY_NAME)}&am=${amount}&cu=INR&tn=Support`;

  // 1. Redirection for Mobile Users
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = upiLink;
  } else {
    console.log("Desktop detected: Showing QR Code.");
  }

  // 2. Show QR Section
  showQR(amount, upiLink);
}

function customPay() {
  const val = document.getElementById("customAmount").value;
  pay(val);
}

function showQR(amount, upiLink) {
  const container = document.getElementById("qrContainer");
  if (!container) return;

  // Dynamic QR for the specific amount
  const qrData = `upi://pay?pa=${MY_UPI_ID}&pn=${encodeURIComponent(MY_NAME)}&am=${amount}&cu=INR`;
  const dynamicQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  container.innerHTML = `
    <div id="paymentBox" style="margin-top:40px; padding:25px; border:1px solid rgba(255,255,255,0.1); border-radius:20px; background: rgba(255,255,255,0.02); text-align:center; animation: fadeIn 0.5s ease;">
      <h3 style="color:var(--yellow)">Scan to Pay</h3>
      
      <div style="background:white; display:inline-block; padding:10px; border-radius:12px; margin: 20px 0;">
        <img src="${dynamicQRUrl}" style="display:block; width:180px; height:180px; object-fit: contain;" alt="UPI QR" />
      </div>

      <p style="color:var(--text); font-weight:bold; font-size:1.2rem; margin-bottom:15px;">Amount: ₹${amount}</p>
      
      <a href="${upiLink}" style="display:inline-block; background:var(--yellow); color:black; padding:12px 25px; text-decoration:none; border-radius:10px; font-weight:700; margin-bottom:15px;">
        OPEN UPI APP
      </a>

      <br>

      <button onclick="showThankYou()" style="background:transparent; border:1px solid var(--yellow); color:var(--yellow); padding:8px 15px; border-radius:8px; cursor:pointer; font-size:0.9rem;">
        I have completed the payment
      </button>
    </div>
  `;
  container.scrollIntoView({ behavior: 'smooth' });
}

function showThankYou() {
  const container = document.getElementById("qrContainer");
  
  // Trigger Canvas Confetti (Requires: <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>)
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD500', '#ffffff', '#00ff88']
    });
  }

  container.innerHTML = `
    <div style="margin-top: 40px; padding: 50px 20px; border-radius: 20px; background: rgba(255, 213, 0, 0.03); border: 1px solid rgba(255, 213, 0, 0.2); text-align: center; animation: fadeIn 0.8s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <div style="font-size: 70px; margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(255,213,0,0.5));">❤️</div>
      <h2 style="color: #FFD500; font-size: 2rem; margin-bottom: 15px; letter-spacing: 1px;">THANK YOU FOR YOUR SUPPORT!</h2>
      <p style="color: #ffffff; font-size: 1.1rem; opacity: 0.8; line-height: 1.6; max-width: 80%; margin: 0 auto;">
        Aapka support mere kaam ko behtar banane mein madad karta hai. <br>
        It truly means a lot to me!
      </p>
      <button onclick="location.reload()" style="margin-top: 30px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 25px; border-radius: 30px; cursor: pointer; font-size: 0.9rem;">
        Back to Home
      </button>
    </div>
  `;
  container.scrollIntoView({ behavior: 'smooth' });
}

// --- CURSOR EFFECTS ---
const cur = document.getElementById('cur');
const curDot = document.getElementById('cur-dot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function moveCursor() {
  cx += (mx - cx) * .14;
  cy += (my - cy) * .14;
  if(cur) {
    cur.style.left = cx + 'px';
    cur.style.top = cy + 'px';
  }
  if(curDot) {
    curDot.style.left = mx + 'px';
    curDot.style.top = my + 'px';
  }
  requestAnimationFrame(moveCursor);
})();

// --- SCROLL PROGRESS ---
const prog = document.getElementById('progress');
window.addEventListener('scroll', () => {
  if(prog) {
    prog.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 + '%';
  }
}, { passive: true });

// --- PARTICLES BACKGROUND ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const PCOLS = ['#FF5800', '#0051A2', '#FFD500', '#009B48', '#C41E3A'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.init(true); }
  init(rand) {
    this.x = Math.random() * canvas.width;
    this.y = rand ? Math.random() * canvas.height : canvas.height + 10;
    this.sz = Math.random() * 7 + 2;
    this.col = PCOLS[Math.floor(Math.random() * PCOLS.length)];
    this.vx = (Math.random() - .5) * .5;
    this.vy = -(Math.random() * .45 + .1);
    this.rot = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - .5) * .045;
    this.a = Math.random() * .12 + .02;
  }
  tick() {
    this.x += this.vx;
    this.y += this.vy;
    this.rot += this.spin;
    if (this.y < -12 || this.x < -12 || this.x > canvas.width + 12) this.init(false);
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.globalAlpha = this.a;
    ctx.fillStyle = this.col;
    ctx.fillRect(-this.sz / 2, -this.sz / 2, this.sz, this.sz);
    ctx.restore();
  }
}

const parts = Array.from({ length: 72 }, () => new Particle());

(function tickP() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  parts.forEach(p => { p.tick(); p.draw(); });
  requestAnimationFrame(tickP);
})();