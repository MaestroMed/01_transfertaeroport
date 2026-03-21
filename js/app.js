/* ============================================
   01 TRANSFERT AÉROPORT — App v2
   Prix par véhicule, tout compris 7 pax
   ============================================ */

const PRICES = { beauvais: 90, cdg: 65, orly: 65 };
const LABELS = { beauvais: 'Beauvais-Tillé', cdg: 'Charles de Gaulle', orly: 'Orly' };
const WA = '33651161440';

document.addEventListener('DOMContentLoaded', () => {
    initDate();
    initPills();
    initAirportChange();
    initCardFormat();
    initForm();
    initMobileMenu();
    initSmoothScroll();
});

// --- Date ---
function initDate() {
    const d = new Date(); d.setDate(d.getDate() + 1);
    const el = document.getElementById('date');
    const v = d.toISOString().split('T')[0];
    el.min = v; el.value = v;
}

// --- Pills ---
function initPills() {
    document.querySelectorAll('.route-pills, .pay-pills').forEach(g => {
        g.querySelectorAll('.pill').forEach(p => {
            p.addEventListener('click', () => {
                g.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
                p.classList.add('active');
            });
        });
    });
    document.querySelectorAll('.pay-pills .pill').forEach(p => {
        p.addEventListener('click', () => {
            const m = p.querySelector('input').value;
            document.getElementById('cardFields').style.display = m === 'cash' ? 'none' : '';
            document.getElementById('submitText').textContent = m === 'cash' ? 'Confirmer la réservation' : 'Confirmer et payer';
        });
    });
}

// --- Airport change -> instant price ---
function initAirportChange() {
    const sel = document.getElementById('airport');
    sel.addEventListener('change', updateInstantPrice);
    updateInstantPrice();
}

function updateInstantPrice() {
    const airport = document.getElementById('airport').value;
    const price = PRICES[airport];
    document.getElementById('ipAmount').textContent = price + '€';
}

function getPrice() {
    return PRICES[document.getElementById('airport').value] || 90;
}

// --- Card formatting ---
function initCardFormat() {
    const cn = document.getElementById('card-num');
    const ce = document.getElementById('card-exp');
    const cc = document.getElementById('card-cvc');
    cn?.addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim(); });
    ce?.addEventListener('input', e => { let v = e.target.value.replace(/\D/g, ''); if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2); e.target.value = v; });
    cc?.addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, ''); });
}

// --- Steps ---
function goStep(n) {
    if (n === 2 && !validate(['address', 'date', 'time'])) return;
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + n).classList.add('active');
    if (n === 2) updateRecap();
    document.querySelector('.booking-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validate(ids) {
    for (const id of ids) {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
            el.style.borderColor = '#e11900'; el.focus();
            el.addEventListener('input', function h() { el.style.borderColor = ''; el.removeEventListener('input', h); });
            return false;
        }
    }
    return true;
}

function getRouteLabel() {
    const r = document.querySelector('input[name="route"]:checked').value;
    const a = LABELS[document.getElementById('airport').value];
    return r === 'aeroport-paris' ? `${a} → Paris` : `Paris → ${a}`;
}

function fmtDate(s) {
    if (!s) return '--';
    const [y, m, d] = s.split('-');
    const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const mois = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'];
    const dt = new Date(y, m - 1, d);
    return `${jours[dt.getDay()]} ${+d} ${mois[dt.getMonth()]} ${y}`;
}

function updateRecap() {
    const p = getPrice();
    document.getElementById('rc-route').textContent = getRouteLabel();
    document.getElementById('rc-date').textContent = `${fmtDate(document.getElementById('date').value)} à ${document.getElementById('time').value}`;
    document.getElementById('rc-pax').textContent = `${document.getElementById('passengers').value} pax — ${document.getElementById('luggage').value} bagages`;
    document.getElementById('rc-price').textContent = p + '€';
}

// --- Submit ---
function initForm() {
    document.getElementById('bookingForm').addEventListener('submit', e => {
        e.preventDefault();
        if (!validate(['firstname', 'lastname', 'phone', 'email'])) return;
        if (!document.getElementById('terms').checked) { document.getElementById('terms').focus(); return; }

        const pay = document.querySelector('input[name="payment"]:checked').value;
        if (pay === 'card') {
            if (document.getElementById('card-num').value.replace(/\s/g, '').length < 16) { document.getElementById('card-num').focus(); return; }
            if (document.getElementById('card-exp').value.length < 5) { document.getElementById('card-exp').focus(); return; }
            if (document.getElementById('card-cvc').value.length < 3) { document.getElementById('card-cvc').focus(); return; }
        }

        const btn = document.getElementById('submitBtn');
        const txt = document.getElementById('submitText');
        const sp = document.getElementById('spinner');
        btn.disabled = true; txt.textContent = 'Traitement...'; sp.classList.remove('hidden');

        setTimeout(() => {
            btn.disabled = false;
            txt.textContent = pay === 'card' ? 'Confirmer et payer' : 'Confirmer la réservation';
            sp.classList.add('hidden');
            sendWhatsApp();
            showConfirm();
        }, 1800);
    });
}

// --- WhatsApp ---
function sendWhatsApp() {
    const price = getPrice();
    const pay = document.querySelector('input[name="payment"]:checked').value;
    const flight = document.getElementById('flight').value;
    const notes = document.getElementById('notes').value;

    const msg = `🚐 *NOUVELLE RÉSERVATION*
━━━━━━━━━━━━━━
📍 *${getRouteLabel()}*
📅 ${fmtDate(document.getElementById('date').value)} à ${document.getElementById('time').value}
📌 ${document.getElementById('address').value}
${flight ? '✈️ Vol : ' + flight : ''}
👥 ${document.getElementById('passengers').value} passagers — ${document.getElementById('luggage').value} bagages

👤 ${document.getElementById('firstname').value} ${document.getElementById('lastname').value}
📱 ${document.getElementById('phone').value}
📧 ${document.getElementById('email').value}
${notes ? '📝 ' + notes : ''}

💰 *${price}€* (van 7 places, tout compris)
💳 ${pay === 'card' ? 'Carte bancaire' : 'Espèces à bord'}
━━━━━━━━━━━━━━
✅ Via 01transfert-aeroport.fr`;

    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

// --- Confirm ---
function showConfirm() {
    const price = getPrice();
    document.getElementById('confirmDetails').innerHTML = `
        <strong>${getRouteLabel()}</strong><br>
        ${fmtDate(document.getElementById('date').value)} à ${document.getElementById('time').value}<br>
        ${document.getElementById('passengers').value} passagers<br>
        ${document.getElementById('firstname').value} ${document.getElementById('lastname').value}<br>
        <strong>Total : ${price}€ (van privé 7 places)</strong>`;
    openModal('confirmModal');
}

// --- Modals ---
function openModal(id) { document.getElementById(id).classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('active'); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal.active').forEach(m => { m.classList.remove('active'); document.body.style.overflow = ''; });
});

// --- Reset ---
function resetForm() {
    document.getElementById('bookingForm').reset();
    initDate();
    goStep(1);
    document.querySelectorAll('.route-pills .pill, .pay-pills .pill').forEach((p, i) => p.classList.toggle('active', i === 0));
    document.getElementById('cardFields').style.display = '';
    document.getElementById('submitText').textContent = 'Confirmer et payer';
    updateInstantPrice();
}

// --- Mobile menu ---
function initMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const links = document.getElementById('navLinks');
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        links.classList.toggle('open');
    });
}

// --- Smooth scroll ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 70;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
                document.getElementById('navLinks').classList.remove('open');
                document.getElementById('menuBtn').classList.remove('active');
            }
        });
    });
}
