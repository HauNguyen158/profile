// THREE.JS BACKGROUND
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const particleCount = 2200;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);
const skyPalette = [new THREE.Color('#38bdf8'),new THREE.Color('#0ea5e9'),new THREE.Color('#7dd3fc'),new THREE.Color('#00ffe7'),new THREE.Color('#0c3a5e')];

for (let i = 0; i < particleCount; i++) {
  positions[i*3]=(Math.random()-0.5)*200; positions[i*3+1]=(Math.random()-0.5)*200; positions[i*3+2]=(Math.random()-0.5)*120;
  const col=skyPalette[Math.floor(Math.random()*skyPalette.length)];
  colors[i*3]=col.r; colors[i*3+1]=col.g; colors[i*3+2]=col.b;
  sizes[i]=Math.random()*2.2+0.3;
}

const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
particleGeo.setAttribute('color',new THREE.BufferAttribute(colors,3));
particleGeo.setAttribute('size',new THREE.BufferAttribute(sizes,1));
const particleMat = new THREE.PointsMaterial({size:0.6,vertexColors:true,transparent:true,opacity:0.7,sizeAttenuation:true,blending:THREE.AdditiveBlending,depthWrite:false});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(18,32,32),new THREE.MeshBasicMaterial({color:0x38bdf8,wireframe:true,transparent:true,opacity:0.06}));
sphere.position.set(30,5,-20); scene.add(sphere);

const torus = new THREE.Mesh(new THREE.TorusGeometry(12,0.4,16,80),new THREE.MeshBasicMaterial({color:0x00ffe7,transparent:true,opacity:0.08}));
torus.position.set(-35,-10,-15); scene.add(torus);

const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(8,1),new THREE.MeshBasicMaterial({color:0x7dd3fc,wireframe:true,transparent:true,opacity:0.1}));
ico.position.set(-20,20,-30); scene.add(ico);

const linePoints=[];
for(let i=0;i<40;i++){const x1=(Math.random()-0.5)*180,y1=(Math.random()-0.5)*180,z1=(Math.random()-0.5)*80;linePoints.push(new THREE.Vector3(x1,y1,z1));linePoints.push(new THREE.Vector3(x1+(Math.random()-0.5)*30,y1+(Math.random()-0.5)*30,z1+(Math.random()-0.5)*20));}
const lines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(linePoints),new THREE.LineBasicMaterial({color:0x38bdf8,transparent:true,opacity:0.07,blending:THREE.AdditiveBlending}));
scene.add(lines);

let mouseX=0,mouseY=0,scrollY=0;
window.addEventListener('mousemove',(e)=>{mouseX=(e.clientX/window.innerWidth-0.5)*2;mouseY=(e.clientY/window.innerHeight-0.5)*2;});
window.addEventListener('scroll',()=>{scrollY=window.scrollY;});
window.addEventListener('resize',()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);});

let t=0;
function animate(){requestAnimationFrame(animate);t+=0.004;particles.rotation.y=t*0.08;particles.rotation.x=t*0.03+mouseY*0.02;sphere.rotation.y=t*0.3;sphere.rotation.x=t*0.15;torus.rotation.x=t*0.5;torus.rotation.z=t*0.2;ico.rotation.y=t*0.4;ico.rotation.x=t*0.25;camera.position.x+=(mouseX*6-camera.position.x)*0.04;camera.position.y+=(-mouseY*4-camera.position.y)*0.04;camera.position.z=50+scrollY*0.01;renderer.render(scene,camera);}
animate();

// CUSTOM CURSOR
const cursor=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
document.addEventListener('mousemove',(e)=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px';});
document.querySelectorAll('a, button, .skill-card, .project-card, .timeline-item, .lang-btn, .lang-option').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'));});

// INTERSECTION OBSERVER
const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');const bar=entry.target.querySelector('.skill-bar');if(bar)setTimeout(()=>{bar.style.width=bar.dataset.width;},150);observer.unobserve(entry.target);}});},{threshold:0.15});
document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

// TYPING EFFECT
const heroTitle=document.querySelector('.hero-title');
const fullText=heroTitle.textContent;
heroTitle.textContent='';
let idx=0;
function typeChar(){if(idx<fullText.length){heroTitle.textContent+=fullText[idx++];setTimeout(typeChar,55);}}
setTimeout(typeChar,1200);

// STAGGER HERO
document.querySelectorAll('.hero-content > *').forEach((el,i)=>{el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition='opacity 0.7s ease, transform 0.7s ease';setTimeout(()=>{el.style.opacity='1';el.style.transform='translateY(0)';},300+i*150);});

// =====================
// I18N SYSTEM
// =====================
const i18n = {
  en: {
    // NAV
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    // HERO
    'hero.tag': 'Frontend Developer · Hue, Vietnam',
    'hero.desc': '2+ years crafting scalable, reusable & accessible UI components.<br>Passionate about framework-agnostic architectures and design systems<br>that ensure consistency and performance across products.',
    'hero.btnProjects': 'View Projects',
    'hero.btnContact': 'Get In Touch',
    // STATS
    'stats.projects': 'Projects Shipped',
    'stats.years': 'Years Experience',
    // SKILLS
    'skills.label': 'Technical Expertise',
    'skills.title': 'My <em>Skills</em>',
    // EXPERIENCE — section headers
    'exp.label': 'Career Path',
    'exp.title': 'Work <em>Experience</em>',
    // EXPERIENCE — BMD Solutions
    'exp.bmd.period': '05/2025 — 11/2025',
    'exp.bmd.company': 'BMD Solutions',
    'exp.bmd.role': 'DEVELOPER',
    'exp.bmd.li1': 'Developed and maintained outsourced websites for clients',
    'exp.bmd.li2': 'Built internal web systems: employee management, attendance tracking, payroll processing',
    'exp.bmd.li3': 'Designed a travel website with tour booking, itinerary management & online payment',
    // EXPERIENCE — Tuan Phong Interior
    'exp.tpi.period': '10/2024 — 04/2025',
    'exp.tpi.company': 'Tuan Phong Interior',
    'exp.tpi.role': 'DEVELOPER',
    'exp.tpi.li1': 'Developed a modern, user-friendly website for interior product selection experience',
    'exp.tpi.li2': 'Implemented data-driven marketing strategies, increasing brand visibility and engagement',
    // EXPERIENCE — 3S Hue Intersoft
    'exp.3s.period': '04/2023 — 10/2024',
    'exp.3s.company': '3S Hue Intersoft',
    'exp.3s.role': 'DEVELOPER',
    'exp.3s.li1': 'Built Bank Data Management System (BDMS) — 20% performance improvement with interactive financial charts',
    'exp.3s.li2': 'Created a Dynamic Web Form Builder with drag-and-drop and integrated data visualization',
    'exp.3s.li3': 'Led development of Payroll & Attendance Management System for government officials',
    // PROJECTS — section headers
    'proj.label': 'Portfolio',
    'proj.title': 'Featured <em>Projects</em>',
    // PROJECTS — shared labels
    'proj.visitSite': 'Visit Site →',
    'proj.team8': 'Team: 8 members',
    'proj.team12': 'Team: 12 members',
    'proj.team14': 'Team: 14 members',
    'proj.team16': 'Team: 16 members',
    // PROJECTS — RIVI
    'proj.rivi.name': 'RIVI — Local SEO Platform',
    'proj.rivi.period': '05/2025 — 11/2025',
    'proj.rivi.desc': 'Platform to enhance local online presence by optimizing Google Business Profile and Maps reviews. Enables review management, keyword tracking, and conversion improvement.',
    // PROJECTS — EMS
    'proj.ems.name': 'Minh Global EMS',
    'proj.ems.period': '05/2025 — 11/2025',
    'proj.ems.desc': 'Web-based project management platform supporting construction project tracking, quality control, safety management, BOQ, HR and resource management with centralized dashboards.',
    // PROJECTS — KAF
    'proj.kaf.name': 'Khang An Foods Platform',
    'proj.kaf.period': '05/2025 — 11/2025',
    'proj.kaf.desc': 'Comprehensive platform for Khang An Foods with public company website and internal management: employees, payroll, shipment schedules, and delivery invoice printing.',
    // PROJECTS — Government Payroll
    'proj.gov.name': 'Government Payroll System',
    'proj.gov.period': '04/2024 — 10/2024',
    'proj.gov.desc': 'Modern system optimizing payroll processing, attendance, allowances, social insurance, and personal income tax for government officials with full automation.',
    // PROJECTS — Railway
    'proj.railway.name': 'Railway Data System',
    'proj.railway.period': '02/2024 — 04/2024',
    'proj.railway.desc': 'Application to store, process and analyze data for railway operations, maintenance, finance, and passenger management with intuitive interfaces.',
    // PROJECTS — DWF
    'proj.dwf.name': 'Dynamic Web Form Builder',
    'proj.dwf.period': '11/2023 — 02/2024',
    'proj.dwf.desc': 'Drag-and-drop form builder with data tables, checkboxes, radio buttons, charts, and code writing. Renders fully interactive forms for enterprise users.',
    // PROJECTS — BDMS
    'proj.bdms.name': 'Bank Data Management',
    'proj.bdms.period': '04/2023 — 11/2023',
    'proj.bdms.desc': 'Advanced bank data management system with interactive dashboards, accurate statistical calculations, and charts. Achieved 20% system performance improvement.',
    // EDUCATION
    'edu.label': 'Background',
    'edu.title': 'Education & <em>Certifications</em>',
    'edu.school': 'Danang Architecture University',
    'edu.degree': 'Bachelor of Information Technology',
    'edu.cert1.name': 'Legacy JavaScript Algorithms & Data Structures',
    'edu.cert2.name': 'Responsive Web Design',
    // CONTACT
    'contact.label': "Let's Connect",
    'contact.title': 'Get In <em>Touch</em>',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.location': 'Location',
    'contact.locationVal': 'Hue, Vietnam',
    'contact.birthday': 'Birthday',
    'text.scroll': 'SCROLL'
  },

  vi: {
    // NAV
    'nav.skills': 'Kỹ Năng',
    'nav.experience': 'Kinh Nghiệm',
    'nav.projects': 'Dự Án',
    'nav.education': 'Học Vấn',
    'nav.contact': 'Liên Hệ',
    // HERO
    'hero.tag': 'Lập Trình Viên Frontend · Huế, Việt Nam',
    'hero.desc': 'Hơn 2 năm kinh nghiệm xây dựng giao diện người dùng hiện đại và có khả năng mở rộng. <br/>Đam mê tạo ra các sản phẩm trực quan, hiệu năng cao và không ngừng cải thiện trải nghiệm người dùng thông qua thiết kế tinh tế và cách triển khai sạch sẽ.',
    'hero.btnProjects': 'Xem Dự Án',
    'hero.btnContact': 'Liên Hệ',
    // STATS
    'stats.projects': 'Dự Án Hoàn Thành',
    'stats.years': 'Năm Kinh Nghiệm',
    // SKILLS
    'skills.label': 'Chuyên Môn Kỹ Thuật',
    'skills.title': 'Kỹ <em>Năng</em>',
    // EXPERIENCE — section headers
    'exp.label': 'Lộ Trình Sự Nghiệp',
    'exp.title': 'Kinh Nghiệm <em>Làm Việc</em>',
    // EXPERIENCE — BMD Solutions
    'exp.bmd.period': '05/2025 — 11/2025',
    'exp.bmd.company': 'BMD Solutions',
    'exp.bmd.role': 'LẬP TRÌNH VIÊN',
    'exp.bmd.li1': 'Phát triển và duy trì các website outsource cho khách hàng',
    'exp.bmd.li2': 'Xây dựng hệ thống web nội bộ: quản lý nhân sự, chấm công, tính lương',
    'exp.bmd.li3': 'Thiết kế website du lịch với tính năng đặt tour, quản lý hành trình & thanh toán online',
    // EXPERIENCE — Tuan Phong Interior
    'exp.tpi.period': '10/2024 — 04/2025',
    'exp.tpi.company': 'Nội Thất Tuấn Phong',
    'exp.tpi.role': 'LẬP TRÌNH VIÊN',
    'exp.tpi.li1': 'Phát triển website hiện đại, thân thiện người dùng cho trải nghiệm lựa chọn sản phẩm nội thất',
    'exp.tpi.li2': 'Triển khai chiến lược marketing dựa trên dữ liệu, tăng khả năng hiển thị và tương tác thương hiệu',
    // EXPERIENCE — 3S Hue Intersoft
    'exp.3s.period': '04/2023 — 10/2024',
    'exp.3s.company': '3S Hue Intersoft',
    'exp.3s.role': 'LẬP TRÌNH VIÊN',
    'exp.3s.li1': 'Xây dựng Hệ thống Quản lý Dữ liệu Ngân hàng (BDMS) — cải thiện hiệu năng 20% với biểu đồ tài chính tương tác',
    'exp.3s.li2': 'Tạo Dynamic Web Form Builder với kéo-thả và tích hợp trực quan hóa dữ liệu',
    'exp.3s.li3': 'Dẫn dắt phát triển Hệ thống Lương & Chấm công cho cán bộ nhà nước',
    // PROJECTS — section headers
    'proj.label': 'Danh Mục Dự Án',
    'proj.title': 'Dự Án <em>Nổi Bật</em>',
    // PROJECTS — shared labels
    'proj.visitSite': 'Xem Website →',
    'proj.team8': 'Nhóm: 8 thành viên',
    'proj.team12': 'Nhóm: 12 thành viên',
    'proj.team14': 'Nhóm: 14 thành viên',
    'proj.team16': 'Nhóm: 16 thành viên',
    // PROJECTS — RIVI
    'proj.rivi.name': 'RIVI — Nền Tảng SEO Địa Phương',
    'proj.rivi.period': '05/2025 — 11/2025',
    'proj.rivi.desc': 'Nền tảng tăng cường hiện diện online địa phương bằng cách tối ưu Google Business Profile và đánh giá Maps. Cho phép quản lý review, theo dõi từ khóa và cải thiện tỷ lệ chuyển đổi.',
    // PROJECTS — EMS
    'proj.ems.name': 'Minh Global EMS',
    'proj.ems.period': '05/2025 — 11/2025',
    'proj.ems.desc': 'Nền tảng quản lý dự án xây dựng: theo dõi tiến độ, kiểm soát chất lượng, an toàn lao động, BOQ, nhân sự và tài nguyên với dashboard tổng hợp.',
    // PROJECTS — KAF
    'proj.kaf.name': 'Nền Tảng Khang An Foods',
    'proj.kaf.period': '05/2025 — 11/2025',
    'proj.kaf.desc': 'Nền tảng toàn diện cho Khang An Foods gồm website công ty và hệ thống quản lý nội bộ: nhân sự, lương, lịch vận chuyển và in phiếu giao hàng.',
    // PROJECTS — Government Payroll
    'proj.gov.name': 'Hệ Thống Lương Chính Phủ',
    'proj.gov.period': '04/2024 — 10/2024',
    'proj.gov.desc': 'Hệ thống hiện đại tối ưu xử lý lương, chấm công, phụ cấp, bảo hiểm xã hội và thuế thu nhập cá nhân cho cán bộ nhà nước với tự động hóa hoàn toàn.',
    // PROJECTS — Railway
    'proj.railway.name': 'Hệ Thống Dữ Liệu Đường Sắt',
    'proj.railway.period': '02/2024 — 04/2024',
    'proj.railway.desc': 'Ứng dụng lưu trữ, xử lý và phân tích dữ liệu vận hành đường sắt, bảo trì, tài chính và quản lý hành khách với giao diện trực quan.',
    // PROJECTS — DWF
    'proj.dwf.name': 'Công Cụ Tạo Form Động',
    'proj.dwf.period': '11/2023 — 02/2024',
    'proj.dwf.desc': 'Công cụ tạo form kéo-thả với bảng dữ liệu, checkbox, radio button, biểu đồ và soạn thảo code. Render form tương tác hoàn chỉnh cho người dùng doanh nghiệp.',
    // PROJECTS — BDMS
    'proj.bdms.name': 'Quản Lý Dữ Liệu Ngân Hàng',
    'proj.bdms.period': '04/2023 — 11/2023',
    'proj.bdms.desc': 'Hệ thống quản lý dữ liệu ngân hàng nâng cao với dashboard tương tác, tính toán thống kê chính xác và biểu đồ. Cải thiện hiệu năng hệ thống 20%.',
    // EDUCATION
    'edu.label': 'Nền Tảng',
    'edu.title': 'Học Vấn & <em>Chứng Chỉ</em>',
    'edu.school': 'Đại Học Kiến Trúc Đà Nẵng',
    'edu.degree': 'Cử Nhân Công Nghệ Thông Tin',
    'edu.cert1.name': 'Thuật Toán & Cấu Trúc Dữ Liệu JavaScript',
    'edu.cert2.name': 'Thiết Kế Web Responsive',
    // CONTACT
    'contact.label': 'Kết Nối',
    'contact.title': 'Liên <em>Hệ</em>',
    'contact.phone': 'Điện Thoại',
    'contact.email': 'Email',
    'contact.location': 'Địa Chỉ',
    'contact.locationVal': 'Huế, Việt Nam',
    'contact.birthday': 'Sinh Nhật',
    'text.scroll': 'CUỘN'
  }
};

const langConfig = {
  en: { label: 'EN' },
  vi: { label: 'VIE' }
};

let currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;
  const dict = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.getElementById('activeLangLabel').textContent = langConfig[lang].label;
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
  document.documentElement.lang = lang;
}

const switcher = document.getElementById('langSwitcher');
const langBtn = document.getElementById('langBtn');

langBtn.addEventListener('click', (e) => { e.stopPropagation(); switcher.classList.toggle('open'); });

document.querySelectorAll('.lang-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const lang = opt.dataset.lang;
    if (lang !== currentLang) {
      applyLang(lang);
      document.body.style.transition = 'opacity 0.18s';
      document.body.style.opacity = '0.7';
      setTimeout(() => { document.body.style.opacity = '1'; }, 180);
    }
    switcher.classList.remove('open');
    localStorage.setItem('portfolio_lang', lang);
  });
});

document.addEventListener('click', (e) => {
  if (!switcher.contains(e.target)) switcher.classList.remove('open');
});

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('portfolio_lang');
  if (!savedLang) return;
  const targetOption = document.querySelector(`.lang-option[data-lang="${savedLang}"]`);
  if (targetOption) targetOption.click();
});

const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});