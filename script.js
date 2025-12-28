/* ---------- SLIDESHOW ---------- */
const slides = document.querySelectorAll('.slide');
let i = 0;
setInterval(() => {
  slides[i].classList.remove('active');
  i = (i + 1) % slides.length;
  slides[i].classList.add('active');
}, 3000);

/* ---------- MUSIC ---------- */
const s1 = document.getElementById('song01');
const s2 = document.getElementById('song02');

window.addEventListener('click', () => {
  s1.currentTime = 15;
  s1.play();
}, { once: true });

s1.loop = true;

/* ---------- COUNTDOWN (DATE CHANGED) ---------- */
const target = new Date("January 18, 2026 00:00:00").getTime();
const title = document.getElementById('title');
const timerDiv = document.getElementById('timer');

let countdown = setInterval(() => {
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    clearInterval(countdown);
    endSequence();
    return;
  }

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  hours.innerText = String(h).padStart(2, '0');
  minutes.innerText = String(m).padStart(2, '0');
  seconds.innerText = String(s).padStart(2, '0');
}, 1000);

/* ---------- AFTER TIMER ---------- */
function endSequence() {
  s1.pause();
  s2.currentTime = 57;
  s2.play();

  title.style.display = 'none';
  timerDiv.style.display = 'none';

  const main = document.createElement('h1');
  main.innerText = "Happy Birthday Bachha";
  main.style.cssText = `
    position:absolute;
    top:45%;
    left:50%;
    transform:translate(-50%,-50%);
    color:peachpuff;
    font-size:3rem;
    z-index:3;
  `;
  document.body.appendChild(main);

  const line1 = document.createElement('h2');
  line1.innerText = "Shyd ha tuza 4th birthday aahe jevha pasun aapn sobt aaho";
  line1.style.cssText = `
    position:absolute;
    top:53%;
    left:50%;
    transform:translateX(-50%);
    color:peachpuff;
    font-size:1.5rem;
    text-align:center;
  `;
  document.body.appendChild(line1);

  const line2 = document.createElement('h2');
  line2.innerText = "aani mi promise krto ki aaj pasun tuzya har b'day sobt midun mnvu";
  line2.style.cssText = `
    position:absolute;
    top:58%;
    left:50%;
    transform:translateX(-50%);
    color:peachpuff;
    font-size:1.5rem;
    text-align:center;
  `;
  document.body.appendChild(line2);

  setTimeout(() => {
    line1.remove();
    line2.innerText = "I LOVE UHH SO MUCH..";
  }, 13000);

  spawnBalloons();
  fireworks();
}

/* ---------- RED BALLOONS ---------- */
function spawnBalloons() {
  const container = document.getElementById('balloons');
  for (let i = 0; i < 15; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = Math.random() * 100 + '%';
    b.style.animationDelay = Math.random() + 's';
    container.appendChild(b);
    setTimeout(() => b.remove(), 3000);
  }
}

/* ---------- FIREWORKS ---------- */
function fireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let particles = Array.from({length:100}, () => ({
    x: innerWidth/2,
    y: innerHeight/2,
    a: Math.random()*Math.PI*2,
    s: Math.random()*6+2,
    r: Math.random()*2+1,
    c: `hsl(${Math.random()*360},100%,60%)`,
    l: 80
  }));

  const loop = setInterval(() => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x+=Math.cos(p.a)*p.s;
      p.y+=Math.sin(p.a)*p.s;
      p.l--;
      ctx.fillStyle=p.c;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    particles = particles.filter(p=>p.l>0);
    if(!particles.length) clearInterval(loop);
  },33);

  setTimeout(()=>ctx.clearRect(0,0,canvas.width,canvas.height),4000);
}