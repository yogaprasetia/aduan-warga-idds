// Layanan Aduan Warga — logika halaman (data disimpan di localStorage peramban, untuk demo).
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const KEY = 'aduan-warga-v1';
  const ALUR = ['Diterima', 'Diverifikasi', 'Diproses', 'Selesai'];
  const BADGE = { Diterima: 'info', Diverifikasi: 'info', Diproses: 'warning', Selesai: 'success', Ditolak: 'error' };
  const pad = (n, w = 2) => String(n).padStart(w, '0');
  // selalu tampil dalam WIB, apa pun zona waktu perangkat
  const fmt = new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
  const tglID = (iso) => { const p = Object.fromEntries(fmt.formatToParts(new Date(iso)).map((x) => [x.type, x.value])); return `${p.day} ${p.month} ${p.year}, ${p.hour}.${p.minute} WIB`; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- data
  function load() {
    try { const d = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(d)) return d; } catch (_) {}
    const contoh = [{
      tiket: 'ADU-20261028-0001', kategori: 'Jalan dan saluran air', lokasi: 'Jl. Melati RT 03/RW 05, depan masjid',
      uraian: 'Saluran air tersumbat sampah sehingga jalan tergenang setiap hujan, menyulitkan pejalan kaki dan pengendara motor.',
      dibuat: '2026-10-28T09:12:00+07:00',
      riwayat: [
        { waktu: '2026-10-28T09:12:00+07:00', status: 'Diterima', ket: 'Aduan diterima sistem.', oleh: 'Sistem' },
        { waktu: '2026-10-29T10:05:00+07:00', status: 'Diverifikasi', ket: 'Lokasi dicek petugas; aduan valid.', oleh: 'Rina (Seksi Pembangunan)' },
        { waktu: '2026-10-30T13:40:00+07:00', status: 'Diproses', ket: 'Dijadwalkan kerja bakti pembersihan saluran Sabtu, 1 November 2026.', oleh: 'Rina (Seksi Pembangunan)' },
      ],
    }];
    save(contoh); return contoh;
  }
  function save(d) { localStorage.setItem(KEY, JSON.stringify(d)); }
  const statusOf = (a) => a.riwayat[a.riwayat.length - 1].status;
  function noTiket(data) {
    const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date()).replaceAll('-', '');
    const n = data.filter((a) => a.tiket.includes(ymd)).length + 1;
    return `ADU-${ymd}-${pad(n, 4)}`;
  }

  // ---------- navigasi (hash)
  const views = [...document.querySelectorAll('[data-view]')];
  function show() {
    const id = (location.hash || '#beranda').slice(1).split('?')[0];
    const v = views.find((x) => x.dataset.view === id) ? id : 'beranda';
    views.forEach((x) => (x.hidden = x.dataset.view !== v));
    document.querySelectorAll('[data-nav]').forEach((a) => { if (a.dataset.nav === v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    const h1 = $(`[data-view="${v}"] h1`); document.title = `${h1 ? h1.textContent : 'Beranda'} · Layanan Aduan Warga`;
    if (v === 'beranda') stats();
    const q = new URLSearchParams(location.hash.split('?')[1] || '');
    if (v === 'status' && q.get('t')) { $('#tiket').value = q.get('t'); cek(); }
    window.scrollTo(0, 0);
    if (location.hash) $('#konten').focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', show);

  function stats() {
    const d = load(); const now = new Date();
    const bulanIni = d.filter((a) => { const t = new Date(a.dibuat); return t.getMonth() === now.getMonth() && t.getFullYear() === now.getFullYear(); });
    $('#st-total').textContent = bulanIni.length;
    $('#st-selesai').textContent = bulanIni.filter((a) => statusOf(a) === 'Selesai').length;
  }

  // ---------- validasi field (pola IDDS: wrapper --status-error + helper text --error)
  function setErr(id, msg) {
    const box = document.querySelector(`[data-f="${id}"]`);
    const input = document.getElementById(id);
    const help = document.getElementById(`${id}-msg`);
    if (box) {
      const w = box.querySelector('.ina-text-field__wrapper, .ina-text-area__wrapper');
      const pre = w.classList.contains('ina-text-area__wrapper') ? 'ina-text-area__wrapper--status-' : 'ina-text-field__wrapper--status-';
      w.classList.remove(pre + 'error', pre + 'neutral'); w.classList.add(pre + (msg ? 'error' : 'neutral'));
    }
    if (input) input.toggleAttribute('aria-invalid', !!msg);
    if (help) {
      if (msg) { help.textContent = msg; help.hidden = false; help.classList.add('ina-text-field__helper-text--error'); }
      else if (id === 'uraian') { help.textContent = 'Minimal 20 karakter.'; help.classList.remove('ina-text-field__helper-text--error'); }
      else { help.hidden = true; help.textContent = ''; }
    }
    return !msg;
  }
  const rules = {
    nama: (v) => (v.trim().length < 3 ? 'Tulis nama lengkap minimal 3 huruf.' : ''),
    nik: (v) => (!/^\d{16}$/.test(v) ? 'NIK harus 16 digit angka. Periksa kembali sesuai KTP.' : ''),
    telp: (v) => (!/^(08|\+628)\d{8,12}$/.test(v.replace(/[\s-]/g, '')) ? 'Nomor ponsel diawali 08 atau +628, 10–14 digit.' : ''),
    lokasi: (v) => (v.trim().length < 5 ? 'Tulis lokasi yang dapat ditemukan petugas, misalnya nama jalan dan RT/RW.' : ''),
    uraian: (v) => (v.trim().length < 20 ? `Uraian terlalu singkat (${v.trim().length}/20 karakter). Jelaskan masalahnya lebih rinci.` : ''),
  };
  Object.keys(rules).forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener('blur', () => { if (el.value) setErr(id, rules[id](el.value)); });
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') !== null) setErr(id, rules[id](el.value)); });
  });
  $('#nik').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });
  const ura = $('#uraian');
  ura.addEventListener('input', () => { $('#uraian-count').textContent = `${ura.value.length}/500`; });

  function katErr(msg) {
    const help = $('#kategori-msg'); help.hidden = !msg; help.textContent = msg; help.classList.toggle('ina-text-field__helper-text--error', !!msg);
    return !msg;
  }
  document.querySelectorAll('input[name=kategori]').forEach((r) => r.addEventListener('change', () => katErr('')));
  $('#setuju').addEventListener('change', (e) => { if (e.target.checked) $('#setuju-msg').hidden = true; });

  $('#form-aduan').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    let ok = true, first = null;
    Object.keys(rules).forEach((id) => {
      const good = setErr(id, rules[id](document.getElementById(id).value));
      if (!good) { ok = false; first = first || document.getElementById(id); }
    });
    const kat = f.querySelector('input[name=kategori]:checked');
    if (!katErr(kat ? '' : 'Pilih satu kategori yang paling sesuai.')) { ok = false; first = first || $('#kat-jalan'); }
    if (!$('#setuju').checked) { $('#setuju-msg').hidden = false; ok = false; first = first || $('#setuju'); }
    const banner = $('#form-error');
    if (!ok) { banner.hidden = false; banner.focus(); setTimeout(() => first && first.focus(), 50); return; }
    banner.hidden = true;
    const data = load();
    const tiket = noTiket(data);
    const now = new Date().toISOString();
    data.push({ tiket, kategori: kat.value, lokasi: f.lokasi.value.trim(), uraian: f.uraian.value.trim(), dibuat: now,
      riwayat: [{ waktu: now, status: 'Diterima', ket: 'Aduan diterima sistem. Petugas akan memverifikasi paling lambat 2 hari kerja.', oleh: 'Sistem' }] });
    save(data);
    f.reset(); $('#uraian-count').textContent = '0/500';
    document.querySelectorAll('.ina-checkbox__box').forEach((b) => { b.classList.remove('ina-checkbox__box--checked'); b.classList.add('ina-checkbox__box--unchecked'); });
    $('#tiket-baru').textContent = tiket;
    $('#lihat-status').href = `#status?t=${tiket}`;
    location.hash = '#berhasil';
    if (window.InaUI && InaUI.showToast) InaUI.showToast({ title: 'Aduan terkirim', message: `Nomor tiket ${tiket}`, state: 'positive', position: 'top-right' });
  });

  // ---------- cek status
  function stepper(status) {
    const idx = ALUR.indexOf(status);
    const check = '<svg class="ina-stepper__check-icon" width="16" height="16" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5l10 -10"/></svg>';
    return '<div class="ina-stepper ina-stepper--horizontal" role="list" aria-label="Tahapan aduan">' + ALUR.map((s, i) => {
      const st = i < idx || status === 'Selesai' ? 'completed' : i === idx ? 'active' : '';
      const sep = i ? `<div class="ina-stepper__separator${i <= idx ? ' ina-stepper__separator--completed' : ''}" aria-hidden="true"></div>` : '';
      const lbl = st === 'completed' ? 'selesai' : st === 'active' ? 'tahap saat ini' : 'belum';
      return `${sep}<div class="ina-stepper__item${st ? ' ina-stepper__item--' + st : ''}" role="listitem" aria-label="${s}: ${lbl}"${st === 'active' ? ' aria-current="step"' : ''}>` +
        `<div class="ina-stepper__icon-wrapper">${st === 'completed' ? check : `<span class="ina-stepper__step-number">${i + 1}</span>`}</div><div class="ina-stepper__label">${s}</div></div>`;
    }).join('') + '</div>';
  }
  const badge = (s) => `<span class="ina-badge ina-badge--soft ina-badge--${BADGE[s] || 'neutral'} ina-badge--md ina-badge--rounded-full">${esc(s)}</span>`;

  function cek() {
    const raw = $('#tiket').value.trim().toUpperCase(); $('#tiket').value = raw;
    const hasil = $('#hasil');
    if (!/^ADU-\d{8}-\d{4}$/.test(raw)) { setErr('tiket', 'Format nomor tiket: ADU-YYYYMMDD-NNNN, misalnya ADU-20261028-0001.'); hasil.hidden = true; return; }
    const a = load().find((x) => x.tiket === raw);
    if (!a) { setErr('tiket', 'Nomor tiket tidak ditemukan. Periksa kembali penulisannya atau hubungi kantor kelurahan.'); hasil.hidden = true; return; }
    setErr('tiket', '');
    const s = statusOf(a);
    $('#d-tiket').textContent = a.tiket;
    $('#d-badge').innerHTML = `<span class="sr">Status: </span>${badge(s)}`;
    $('#d-stepper').innerHTML = stepper(s);
    $('#d-kat').textContent = a.kategori; $('#d-lok').textContent = a.lokasi; $('#d-tgl').textContent = tglID(a.dibuat); $('#d-ura').textContent = a.uraian;
    $('#d-riwayat').innerHTML = a.riwayat.slice().reverse().map((r) =>
      `<tr class="ina-table__row"><td class="ina-table__cell">${esc(tglID(r.waktu))}</td><td class="ina-table__cell">${badge(r.status)}</td><td class="ina-table__cell">${esc(r.ket)}</td><td class="ina-table__cell">${esc(r.oleh)}</td></tr>`).join('');
    hasil.hidden = false;
  }
  $('#form-cek').addEventListener('submit', (e) => { e.preventDefault(); cek(); });
  $('#contoh-tiket').addEventListener('click', (e) => { e.preventDefault(); $('#tiket').value = 'ADU-20261028-0001'; cek(); });

  load(); show();
})();
