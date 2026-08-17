const taskTemplate = [
  ['office','before','Assign office','',-3], ['zulip','before','Invite to Zulip','',-3], ['ip','before','Assign IP address for ethernet','',-2],
  ['calendar','before','Invite to Nextcloud and ITSC calendar','',-2], ['website','before','Add new member to staff section of website','',-1], ['itsc','before','Add new member to ITSC email list','',-1],
  ['zim','week','Activate ZIM account','Request a PIN if it did not arrive with the contract or by house mail.',1],
  ['key','week','Complete key request form','Send the signed form to the dean via Hauspost.',2], ['stationery','week','Get stationery','Collect office supplies in room FME 01.06.',3],
  ['equipment','week','Set up equipment','Order anything missing together with Jutta.',4], ['ethernet','week','Set up ethernet and Wi-Fi','Use the assigned IP settings and verify access via the ZIM account.',5],
  ['email-list','week','Request access to the ITSC mailing list','Write to Raphael Heitjohann from your university email address.',2],
  ['enrol','month','Enrol as doctoral student','If applicable, complete university enrolment.',10], ['library','month','Request library access','Submit the form and collect the library card after confirmation.',12],
  ['phonebook','month','Enter data into the university phonebook','',14], ['safety','month','Complete safety briefing','Sign the document confirming attendance.',16],
  ['accounts','month','Set up accounts and software','Email, calendar, Git, Moodle, Zulip and Zotero where needed.',18], ['photo','month','Send a photo for the staff section','',20],
  ['staff-id','month','Get a staff ID','',22], ['pension','month','Review private pension information','Decide within two months whether you want to cancel it.',25],
  ['bahn','month','Request a Deutsche Bahn business account','Use the ITSC email template and request the 5% business discount.',28],
  ['phd-tips','general','Read the tips for starting a PhD','Review the recommended guide for new doctoral researchers.',7],
  ['certificate','general','Review university certificate services','Learn where to request digital certificates and related services.',8],
  ['graduate-studies','general','Register with the Center for Graduate Studies','Receive invitations to events with other PhD students.',14],
  ['illness','general','Read the illness reporting procedure','Inform the dean’s office by 10 a.m. on the first day and report back when returning.',2],
  ['vacation','general','Review the vacation request process','Register requested days in the MATRIX system and have them approved.',3],
  ['campus','general','Open the Campus Freudenberg map','Locate the office, parking area and key campus facilities.',1],
  ['kitchen','general','Review the shared-kitchen guidelines','Clean used items and replace shared coffee or milk when needed.',1],
  ['parking','general','Review parking access','The main barrier closes around 9 p.m.; parking between buildings remains accessible.',1],
  ['office-hours','general','Review building and office access','Learn the door, key-box and late-hours alarm procedures before working outside normal hours.',1]
].map(([id,section,title,detail,offset]) => ({ id, section, title, detail, offset, done: false }));

const sections = [
  ['week','Days 1–7','In the first week'], ['month','Days 8–30','In the first month'],
  ['general','Good to know','Important information']
];

const colleaguePreparation = [
  'An office will be assigned to you.',
  'You will be invited to Zulip.',
  'An IP address for ethernet will be assigned to you.',
  'You will be invited to Nextcloud and the ITSC calendar.',
  'Your profile will be added to the staff section of the website.'
];

const taskResources = {
  zim: `<details class="task-extra"><summary>Open account application</summary><a href="https://zim.uni-wuppertal.de/en/my-account/account-application/employees/" target="_blank" rel="noopener noreferrer">ZIM account application for employees ↗</a></details>`,
  key: `<details class="task-extra"><summary>Show key application details</summary><a href="https://dez5.uni-wuppertal.de/de/online-hilfe/ablauf-schluesselantrag/" target="_blank" rel="noopener noreferrer">Key application process ↗</a><p><strong>Rooms you need access to:</strong></p><ul class="resource-list room-list"><li>FME 02.03</li><li>FME 02.04</li><li>FME 02.06</li><li>FME 02.07</li><li>FME 02.08</li><li>FME 02.09</li><li>FME 02.13</li><li>FME 00.93</li></ul></details>`,
  stationery: `<details class="task-extra"><summary>Show office-supply collection times</summary><p><strong>FME 01.06 — Office-supply collection</strong></p><dl class="network-settings"><div><dt>Monday–Wednesday</dt><dd>09:30–11:30</dd></div><div><dt>Thursday–Friday</dt><dd>09:30–11:00</dd></div></dl></details>`,
  ethernet: `<details class="task-extra"><summary>Show ethernet settings</summary><dl class="network-settings"><div><dt>Gateway</dt><dd>132.195.214.254</dd></div><div><dt>Subnet mask</dt><dd>255.255.255.192</dd></div><div><dt>DNS 1</dt><dd>132.195.249.13</dd></div><div><dt>DNS 2</dt><dd>132.195.20.3</dd></div><div><dt>DNS 3</dt><dd>132.195.20.13</dd></div></dl></details>`,
  enrol: `<details class="task-extra"><summary>Open doctoral enrolment information</summary><a href="https://zgs.uni-wuppertal.de/de/info-beratung/promovieren-an-der-buw/formaler-ablauf-von-promotionen-ab-sose-26/" target="_blank" rel="noopener noreferrer">Formal doctoral procedure ↗</a></details>`,
  library: `<details class="task-extra"><summary>Open library card application</summary><a href="https://bib.uni-wuppertal.de/de/besuchen/bibliotheksausweis/formular-a-ausweis/" target="_blank" rel="noopener noreferrer">Library card form ↗</a></details>`,
  phonebook: `<details class="task-extra"><summary>Open university phonebook</summary><a href="https://userdb.uni-wuppertal.de/tel_email/angestellte/" target="_blank" rel="noopener noreferrer">University employee phonebook ↗</a></details>`,
  accounts: `<details class="task-extra"><summary>Show account setup details</summary><ul class="resource-list"><li><strong>Email:</strong> Use the account information from your ZIM account.</li><li><strong>Calendar:</strong> Use your Nextcloud account.</li><li>Sign up for sciebo and <a href="https://zulip.itsc.uni-wuppertal.de/#narrow/stream/58-new-staff/topic/Share/near/820" target="_blank" rel="noopener noreferrer">post your username in Zulip ↗</a>.</li><li>Accept your invitation to Zulip.</li><li>Access Git and Moodle with your ZIM account. Ask ITSC members to invite you to the ITSC Git organisation.</li><li>If necessary, create a zotero.org account. Send Tibor your Zotero account name and ask him to invite you to the ITSC group.</li></ul></details>`,
  photo: `<details class="task-extra"><summary>Show photo submission address</summary><p>Send your photo to Kai at <a href="mailto:gellert@uni-wuppertal.de">gellert@uni-wuppertal.de</a>.</p></details>`,
  safety: `<details class="task-extra"><summary>Open safety briefing information</summary><a href="https://uni-wuppertal.agu-hochschulen.de/ablauforganisation/unterstuetzende-prozesse/aus-und-weiterbildung/unterweisungen" target="_blank" rel="noopener noreferrer">Safety instructions and briefings ↗</a></details>`,
  'phd-tips': `<details class="task-extra"><summary>Open PhD-starting tips</summary><a href="https://garbledcircus.com/advising/" target="_blank" rel="noopener noreferrer">Advice for starting a PhD ↗</a></details>`,
  'graduate-studies': `<details class="task-extra"><summary>Open Center for Graduate Studies mailing list (optional)</summary><a href="https://zgs.uni-wuppertal.de/de/about/kontakt/mailingliste/" target="_blank" rel="noopener noreferrer">Center for Graduate Studies mailing list ↗</a></details>`,
  certificate: `<details class="task-extra"><summary>Open certificate application workflow</summary><a href="https://zim.uni-wuppertal.de/de/unsere-dienste/digitale-zertifikate/beantragung-eines-nutzerzertifikats/" target="_blank" rel="noopener noreferrer">Apply for a user certificate ↗</a></details>`,
  illness: `<details class="task-extra"><summary>Show illness reporting procedure</summary><p>Inform the dean’s office (Ms. Richert) by 10 a.m. on the first day of illness, preferably by email at <a href="mailto:FRichert@uni-wuppertal.de">FRichert@uni-wuppertal.de</a> or by phone at <a href="tel:+492024391850">0202 439-1850</a>. Report your return by 10 a.m. on the first day back. The dean’s office will notify HR of the leave period.</p></details>`,
  vacation: `<details class="task-extra"><summary>Show vacation request procedure</summary><p>Register requested days off in the MATRIX system. Tibor or Kai will approve the request there. Unlike sick leave, reporting back after vacation has not been required since 14 June 2023.</p></details>`,
  campus: `<details class="task-extra"><summary>Show campus information</summary><p>Use the Campus Freudenberg map to locate the office, parking areas and important facilities.</p><a href="Lageplan_Freudenberg.pdf" target="_blank" rel="noopener noreferrer">Open Campus Freudenberg map ↗</a></details>`,
  kitchen: `<details class="task-extra"><summary>Show shared-kitchen guidelines</summary><p>Kitchen equipment is free for everyone to use. Clean everything after use. Coffee and milk are shared; please replace them when needed, especially if you use a lot.</p></details>`,
  parking: `<details class="task-extra"><summary>Show parking information</summary><p>The barrier at the large main parking lot closes at around 9 p.m. Cars may still be parked between the buildings at all times.</p></details>`,
  'office-hours': `<details class="task-extra"><summary>Show late-hours building rules</summary><p>You may stay in the building as long as needed and always leave through the exit by the kitchen. This door is one-way once locked. A key is available in the secretary’s key box and must be registered in the key logbook. After the main doors lock at 7:30 p.m., do not enter other building sections because movement sensors may trigger the alarm. The first-floor toilets above the kitchen are accessible, but do not continue toward the mailboxes. Let Mr. Grossman or Mr. Alt know before working very late or on weekends.</p></details>`
};

let data = null;
let calendarCursor = new Date();
let currentFileHandle = null;
let checklistRendered = false;
const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

function taskResource(taskId) {
  if (taskId === 'pension') {
    return `<details class="task-extra"><summary>Open pension information</summary><a href="pension-information.pdf" target="_blank" rel="noopener noreferrer">Pension information for first-time insured employees ↗</a></details>`;
  }
  if (taskId === 'bahn') {
    const nameParts = data.profile.name.trim().split(/\s+/);
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ');
    const email = data.profile.email || '<YOUR E-MAIL ADDRESS>';
    const template = `Liebe Reisekostenstelle,\n\nbitte richten Sie für mich ein Firmenkundenkonto bei der Deutschen Bahn ein. Im Weiteren die Informationen:\n\nVorname: ${firstName}\nNachname: ${lastName}\nFakultät: Fakultät 6 (Fakultät für Elektrotechnik, Informationstechnik und Medientechnik)\nE-Mail: ${email}\nWunschpasswort: <A PASSWORD OF YOUR CHOICE>\n\nMit freundlichen Grüßen\n\n${data.profile.name}`;
    return `<details class="task-extra"><summary>Show DB business-account instructions</summary><p>A Deutsche Bahn business account grants a 5% discount on business-trip tickets. Without the discount, the administration may reimburse only 95% of the ticket price. Request a Firmenkundenkonto from your work email by writing to <a href="mailto:travelmanager@uni-wuppertal.de">travelmanager@uni-wuppertal.de</a>. Include your first name, last name, faculty and a temporary password, and change the password after receiving the account.</p><a href="https://git.uni-wuppertal.de/groups/itsc-researchers/-/wikis/New-member-checklist" target="_blank" rel="noopener noreferrer">More information in the ITSC wiki ↗</a><details class="email-template-details"><summary>Show/hide the email template</summary><pre>${escapeHtml(template)}</pre></details></details>`;
  }
  if (taskId === 'email-list') {
    const email = data.profile.email || '<YOUR UNIVERSITY E-MAIL ADDRESS>';
    const subject = 'Request to join the ITSC mailing list';
    const body = `Dear Mr Heitjohann,\n\nmy name is ${data.profile.name}, and I recently joined ITSC in the role of ${data.profile.role}. Could you please add my university email address (${email}) to the ITSC mailing list?\n\nThank you very much.\n\nKind regards,\n${data.profile.name}`;
    const mailto = `mailto:heitjohann@uni-wuppertal.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return `<details class="task-extra"><summary>Show contact and email template</summary><p>Contact <a href="https://itsc.uni-wuppertal.de/en/group-members/raphael-heitjohann/" target="_blank" rel="noopener noreferrer">Raphael Heitjohann ↗</a> or <a href="${mailto}">open a prepared email to heitjohann@uni-wuppertal.de</a>.</p><details class="email-template-details"><summary>Show/hide the email template</summary><pre>Subject: ${escapeHtml(subject)}\n\n${escapeHtml(body)}</pre></details></details>`;
  }
  return taskResources[taskId] || '';
}

function dateAtOffset(startDate, offset) { const date = new Date(`${startDate}T12:00:00`); date.setDate(date.getDate() + offset); return date; }
function isoDate(date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
function displayDate(date) { return new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short'}).format(date); }
function isOptionalTask(task) { return task.id === 'staff-id'; }
function isStudentAssistant() { return data.profile.role === 'Student assistant (SHK)' || data.profile.role === 'Student assistant'; }
function startDateLimits() {
  const today = new Date(); today.setHours(12,0,0,0);
  const minimum = new Date(today); minimum.setFullYear(minimum.getFullYear()-1);
  const maximum = new Date(today); maximum.setFullYear(maximum.getFullYear()+5);
  return { minimum: isoDate(minimum), maximum: isoDate(maximum) };
}
function prepareStartDateInput() {
  const input = $('#newForm input[name="startDate"]');
  const { minimum, maximum } = startDateLimits();
  input.min = minimum; input.max = maximum;
  $('#dateError').textContent = '';
}
function validStartDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00`);
  const { minimum, maximum } = startDateLimits();
  return !Number.isNaN(parsed.getTime()) && isoDate(parsed)===value && value>=minimum && value<=maximum;
}
function isTaskOverdue(task) {
  const today = new Date(); today.setHours(12,0,0,0);
  return !isOptionalTask(task) && !task.done && dateAtOffset(data.profile.startDate,task.offset) < today;
}

function openPlan(plan) {
  const savedTasks = new Map(plan.tasks.map(task=>[task.id,task]));
  plan.tasks = taskTemplate.map(task=>({...task,done:Boolean(savedTasks.get(task.id)?.done)}));
  delete plan.attachments;
  data = plan;
  checklistRendered = false;
  const start = new Date(`${data.profile.startDate}T12:00:00`);
  calendarCursor = new Date(start.getFullYear(), start.getMonth(), 1);
  $('#welcome').classList.add('hidden'); $('#dashboard').classList.remove('hidden');
  render();
}

function render() {
  const firstName = data.profile.name.trim().split(/\s+/)[0];
  $('#welcomeName').textContent = `Good to have you here, ${firstName}.`;
  $('#startCopy').innerHTML = `Your first day is <strong>${new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(`${data.profile.startDate}T12:00:00`))}</strong>. Here is everything you need for a smooth start.`;
  $('#avatar').textContent = data.profile.name.split(/\s+/).map(part => part[0]).join('').slice(0,2).toUpperCase();
  const studentAssistant = isStudentAssistant();
  $('#progressCard').classList.toggle('hidden', studentAssistant);
  $('#calendarCard').classList.toggle('hidden', studentAssistant);
  if (studentAssistant) renderStudentAssistantInfo(); else { renderProgress(); renderChecklists(); renderCalendar(); }
  renderProfile();
}

function renderStudentAssistantInfo() {
  $('#checklists').innerHTML = `<section class="notes-card panel"><p class="eyebrow">Informationen für studentische Hilfskräfte</p><h2>Arbeiten als SHK</h2><p>Diese Hinweise sind eine Informationssammlung und keine Checkliste.</p><details class="task-extra" open><summary>Zeiterfassung</summary><p>Folgendes Formular muss monatlich ausgefüllt, vom Betreuer unterschrieben und im Sekretariat eingereicht werden:</p><a href="Stundentabelle_Hilfskräfte.xlsx" download>Stundentabelle für Hilfskräfte herunterladen ↧</a><br><a href="https://dez4.uni-wuppertal.de/de/abt-43/sgb-434-wissenschaftliche-und-studentische-hilfskraefte-und-lehrbeauftragungen/arbeitszeiterfassung/" target="_blank" rel="noopener noreferrer">Informationen zur Arbeitszeiterfassung ↗</a><p><strong>Folgende Punkte sind zu beachten:</strong></p><ul class="resource-list"><li>Die Stundenanzahl pro Monat muss stimmen. Zu viele Stunden könnten dazu führen, dass die Minijob-Grenze überschritten und zusätzliche Abgaben fällig werden. Dies kann nachträglich nicht mehr korrigiert werden. Zu wenig Stunden ziehen Sanktionen nach sich.</li><li>Urlaub und Krankheit müssen eingetragen und kenntlich gemacht werden.</li><li>Für Urlaubs- und Krankentage wird die Wochenarbeitszeit auf den Tag umgerechnet zugrunde gelegt. Beispiel: Bei 10 Stunden pro Woche entsprechen das 2 Stunden pro Tag; im Stundenzettel: U = 120 min.</li><li>Für Feiertage gilt die anteilige Arbeitszeit pro Tag, die nicht gearbeitet werden muss. Beispiel: Im Stundenzettel: F = 120 min.</li><li>Bitte beachtet auch die Infobroschüre für Hilfskräfte auf der Internetseite von Dezernat 4.1.2.</li></ul></details><details class="task-extra"><summary>Krankheit</summary><ul class="resource-list"><li>Eine Hilfskraft muss sich sofort krankmelden, wenn sie ihren Dienst nicht antreten kann. Es reicht die Meldung am Arbeitsplatz; Dezernat 4.1.2 (Frau Emde) muss zunächst nicht informiert werden.</li><li>Hält die Krankheit länger als drei Arbeitstage an oder können die wöchentlichen Arbeitsstunden vollständig nicht geleistet werden, ist eine Arbeitsunfähigkeitsbescheinigung (AU) erforderlich. Diese sowie eventuelle Folgebescheinigungen müssen sofort bei Dezernat 4.1.2 eingereicht werden. Beispiel: Bei 10 Stunden pro Woche ist eine AU nötig, wenn in einer Woche 6 Stunden (entspricht drei Arbeitstagen) nicht geleistet werden können.</li><li>Seit dem 01.01.2023 gilt die e-AU: Familienversicherte Hilfskräfte müssen den Arzt oder die Ärztin ausdrücklich darauf hinweisen, dass sie nicht nur studieren, sondern auch Arbeitnehmer*in sind. Die e-AU muss digital an die jeweilige Krankenkasse gemeldet werden.</li><li>Die Vergütung wird bis zum Ende der sechsten Woche der Arbeitsunfähigkeit weitergezahlt, jedoch nicht über das Ende des Dienstvertrages hinaus.</li><li>Studentisch krankenversicherte Personen erhalten kein Krankengeld. Bei einer Erkrankung von mehr als sechs Wochen erhalten sie daher weder Gehalt noch Krankengeld.</li><li>Nach einer Krankheit mit AU muss der Dienstantritt Dezernat 4.1.2 gemeldet werden. Wurde die Krankheit nur am Arbeitsplatz gemeldet, muss der Dienstantritt dort bekanntgegeben werden.</li><li>Aus Gründen des Versicherungsschutzes muss jeder Krankheitstag sofort mitgeteilt und gegebenenfalls auf der AU vermerkt sein – auch wenn an diesem Wochentag normalerweise nicht gearbeitet wird.</li></ul></details><details class="task-extra"><summary>Urlaub</summary><ul class="resource-list"><li>Jede Hilfskraft hat grundsätzlich einen Urlaubsanspruch, der im Sekretariat berechnet wird.</li><li>Für die Tage der Universitätsschließung zwischen Weihnachten und Neujahr muss Urlaub genommen werden.</li><li>Die Höhe des Urlaubsanspruchs richtet sich nach der Vertragslaufzeit. Das Urlaubsjahr ist das Kalenderjahr (1.1.–31.12.); nicht genommener Urlaub verfällt am Jahresende.</li><li>Urlaub muss mit dem entsprechenden Formular beantragt, von Herrn Jager genehmigt und im Sekretariat abgegeben werden. Nach der Rückkehr muss die Hilfskraft sich am ersten Arbeitstag bis 10:00 Uhr telefonisch oder per E-Mail bei <a href="mailto:maerten@uni-wuppertal.de">maerten@uni-wuppertal.de</a> zurückmelden.</li><li>Nach der Sonderregelung genügt ein Urlaubsantrag per E-Mail an <a href="mailto:tibor.jager@uni-wuppertal.de">tibor.jager@uni-wuppertal.de</a> mit <a href="mailto:maerten@uni-wuppertal.de">maerten@uni-wuppertal.de</a> in Kopie.</li><li>Bei einer Woche Urlaub werden fünf Tage angerechnet. Bei einzelnen Urlaubstagen müssen die verbleibenden vertraglich vereinbarten Wochenstunden an den übrigen Tagen geleistet werden. Beispiel: Bei 10 Stunden pro Woche und drei Urlaubstagen werden 6 Stunden als Urlaub angerechnet; an den übrigen zwei Tagen müssen noch 4 Stunden gearbeitet werden.</li><li>Bei zwei nahtlos aufeinanderfolgenden Verträgen im selben Kalenderjahr kann der Urlaubsanspruch aus Vertrag 1 in Vertrag 2 übernommen werden.</li><li>Es kann nur bereits erarbeiteter Urlaub genommen werden. Reicht der Anspruch für die Schließtage zwischen Weihnachten und Neujahr nicht aus, muss die fehlende Zeit vorgearbeitet werden.</li></ul></details><details class="task-extra"><summary>Praktische Informationen</summary><ul class="resource-list"><li><strong>Foto:</strong> Bitte ein Foto an Kai senden: <a href="mailto:gellert@uni-wuppertal.de">gellert@uni-wuppertal.de</a>.</li><li><strong>Parken:</strong> Die Schranke am großen Hauptparkplatz schließt gegen 21 Uhr. Zwischen den Gebäuden kann jederzeit geparkt werden.</li><li><strong>Küche:</strong> Küchenausstattung kann von allen genutzt werden. Bitte nach der Nutzung alles säubern sowie gemeinsamen Kaffee oder Milch bei Bedarf ersetzen.</li></ul></details></section>`;
}

function renderProgress() {
  const personalTasks = data.tasks.filter(task => task.section !== 'before' && !isOptionalTask(task));
  const completed = personalTasks.filter(task => task.done).length;
  const progress = Math.round(completed / personalTasks.length * 100);
  $('#progressPercent').textContent = `${progress}%`; $('#progressCount').textContent = `${completed} of ${personalTasks.length}`;
  $('#progressRing').style.setProperty('--progress', `${progress * 3.6}deg`);
}

function renderChecklists() {
  const previouslyOpen = new Set([...document.querySelectorAll('#checklists details[data-section][open]')].map(element=>element.dataset.section));
  const today = new Date(); today.setHours(12,0,0,0);
  const start = new Date(`${data.profile.startDate}T12:00:00`);
  const daysSinceStart = Math.floor((today-start)/86400000);
  const shouldOpen = section => checklistRendered ? previouslyOpen.has(section) : section==='before' ? daysSinceStart<0 : section==='week' ? daysSinceStart>=0&&daysSinceStart<=7 : section==='month' ? daysSinceStart>=8&&daysSinceStart<=30 : daysSinceStart>30;
  const preparation = `<details class="preparation-info panel" data-section="before" ${shouldOpen('before')?'open':''}><summary><span><small>Preparation by your colleagues</small><strong>Before your first day</strong></span><i>⌄</i></summary><div class="preparation-content"><ul>${colleaguePreparation.map(point=>`<li>${escapeHtml(point)}</li>`).join('')}</ul><p>If any of these steps appear to have been missed, please contact your colleagues via Zulip where available, or by email otherwise.</p></div></details>`;
  $('#checklists').innerHTML = preparation + sections.map(([id,eyebrow,title]) => {
    const tasks = data.tasks.filter(task => task.section === id).sort((a, b) => a.offset - b.offset); const requiredTasks = tasks.filter(task=>!isOptionalTask(task)); const done = requiredTasks.filter(task => task.done).length;
    const hasOverdue = tasks.some(isTaskOverdue);
    return `<details class="checklist-section panel" data-section="${id}" ${shouldOpen(id)?'open':''}><summary class="section-heading"><div><p class="eyebrow">${eyebrow}</p><h2>${title}${hasOverdue?'<b class="overdue-alert" title="This section contains overdue tasks">!</b>':''}</h2></div><span>${done}/${requiredTasks.length}</span><i class="fold-arrow">⌄</i></summary><div class="task-list">${tasks.map(task => `<div class="task-row ${task.done?'done':''}"><label class="task-main"><input type="checkbox" data-task="${task.id}" ${task.done?'checked':''}><span class="custom-check">✓</span><span class="task-copy"><strong>${escapeHtml(task.title)}${isOptionalTask(task)?'<b class="optional-badge">Optional</b>':''}</strong>${task.detail?`<small>${escapeHtml(task.detail)}</small>`:''}</span></label><time>${displayDate(dateAtOffset(data.profile.startDate,task.offset))}</time>${taskResource(task.id)}</div>`).join('')}</div></details>`;
  }).join('') + `<section class="notes-card panel"><p class="eyebrow">Personal notes</p><textarea id="notes" placeholder="Add names, room numbers or anything you want to remember…">${escapeHtml(data.notes)}</textarea></section>`;
  checklistRendered = true;
  document.querySelectorAll('[data-task]').forEach(input => input.addEventListener('change', () => { const task=data.tasks.find(item=>item.id===input.dataset.task); task.done=input.checked; renderProgress(); renderChecklists(); renderCalendar(); }));
  $('#notes').addEventListener('input', event => { data.notes = event.target.value; });
}

function renderCalendar() {
  $('#calendarTitle').textContent = new Intl.DateTimeFormat('en',{month:'long',year:'numeric'}).format(calendarCursor);
  const firstWeekday = (new Date(calendarCursor.getFullYear(),calendarCursor.getMonth(),1).getDay()+6)%7;
  const days = new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()+1,0).getDate();
  const today = new Date();
  today.setHours(12,0,0,0);
  const dueDates = new Map(); data.tasks.filter(task=>task.section!=='before').forEach(task => { const key=isoDate(dateAtOffset(data.profile.startDate,task.offset)); dueDates.set(key,[...(dueDates.get(key)||[]),task]); });
  const cells = Array.from({length:42},(_,index)=>index-firstWeekday+1);
  $('#calendarGrid').innerHTML = cells.map(day => {
    if (day<1||day>days) return '<span class="calendar-day empty"></span>';
    const calendarDate = new Date(calendarCursor.getFullYear(),calendarCursor.getMonth(),day,12);
    const key=isoDate(calendarDate); const due=dueDates.get(key)||[]; const isStart=key===data.profile.startDate; const complete=due.length&&due.every(task=>task.done);
    const openTasks = due.filter(task=>!task.done&&!isOptionalTask(task));
    const daysUntilDue = Math.round((calendarDate-today)/86400000);
    const overdue = openTasks.length>0 && daysUntilDue<0;
    const dueSoon = openTasks.length>0 && daysUntilDue>=0 && daysUntilDue<=3;
    return `<span class="calendar-day ${isStart?'start-day':''} ${due.length?'has-tasks':''} ${overdue?'overdue':''} ${dueSoon?'due-soon':''}" title="${escapeHtml(due.map(task=>task.title).join('\n'))}"><b>${day}</b>${isStart?'<small>Start</small>':''}${due.length?`<i class="${complete?'complete-dot':''}">${due.length}</i>`:''}</span>`;
  }).join('');
}

function renderProfile() {
  $('#profileCard').innerHTML = `<p class="eyebrow">Your details</p><h3>${escapeHtml(data.profile.name)}</h3><p>${escapeHtml(data.profile.role)}</p>${data.profile.email?`<a href="mailto:${escapeHtml(data.profile.email)}">${escapeHtml(data.profile.email)}</a>`:''}<button class="secondary wide" id="closePlan">Close plan</button>`;
  $('#closePlan').onclick = () => { data=null; currentFileHandle=null; $('#dashboard').classList.add('hidden'); $('#welcome').classList.remove('hidden'); };
}

function importFile(file, fileHandle = null) {
  if (!file) return; const reader=new FileReader();
  reader.onload=()=>{ try { const parsed=JSON.parse(reader.result); if(parsed.version!==1||!parsed.profile?.name||!parsed.profile?.startDate||!Array.isArray(parsed.tasks)) throw new Error(); currentFileHandle=fileHandle; $('#welcomeError').textContent=''; openPlan(parsed); } catch { $('#welcomeError').textContent='This file is not a valid onboarding plan.'; } $('#fileInput').value=''; };
  reader.readAsText(file);
}

async function chooseImportFile() {
  if ('showOpenFilePicker' in window) {
    try {
      const [handle] = await window.showOpenFilePicker({ types: [{ description: 'ITSC onboarding file', accept: { 'application/json': ['.json'] } }], multiple: false });
      importFile(await handle.getFile(), handle);
    } catch (error) { if (error.name !== 'AbortError') $('#welcomeError').textContent='The file could not be opened.'; }
  } else {
    $('#fileInput').click();
  }
}

function downloadFile() {
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const anchor=document.createElement('a');
  anchor.href=url; anchor.download=`${data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')||'onboarding'}.onboarding.json`; anchor.click(); URL.revokeObjectURL(url);
}

async function saveFile(saveAs = false) {
  try {
    if ('showSaveFilePicker' in window && (saveAs || !currentFileHandle)) {
      currentFileHandle = await window.showSaveFilePicker({ suggestedName: `${data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')||'onboarding'}.onboarding.json`, types: [{ description: 'ITSC onboarding file', accept: { 'application/json': ['.json'] } }] });
    }
    if (currentFileHandle) {
      const writable = await currentFileHandle.createWritable();
      await writable.write(JSON.stringify(data,null,2));
      await writable.close();
      return;
    }
    downloadFile();
  } catch (error) {
    if (error.name !== 'AbortError') alert('The onboarding file could not be saved.');
  }
}

$('#previewCalendar').innerHTML = Array.from({length:28},(_,i)=>`<i class="${[4,8,12,18,24].includes(i)?'active':i===10?'start':''}">${i+1}</i>`).join('');
$('#newPlan').onclick=()=>{prepareStartDateInput();$('#newDialog').classList.remove('hidden');}; $('#closeDialog').onclick=()=>$('#newDialog').classList.add('hidden');
$('#newDialog').addEventListener('mousedown',event=>{if(event.target===event.currentTarget) $('#newDialog').classList.add('hidden');});
$('#newForm').addEventListener('submit',event=>{event.preventDefault(); const form=new FormData(event.target); const startDate=String(form.get('startDate')||''); if(!validStartDate(startDate)){const {minimum,maximum}=startDateLimits();$('#dateError').textContent=`Please choose a valid start date between ${minimum} and ${maximum}.`;return;} $('#dateError').textContent=''; currentFileHandle=null; openPlan({version:1,profile:{name:form.get('name'),email:form.get('email'),role:form.get('role'),startDate},tasks:taskTemplate.map(task=>({...task})),notes:''}); $('#newDialog').classList.add('hidden'); event.target.reset();});
['#importWelcome','#importDashboard'].forEach(selector=>$(selector).onclick=chooseImportFile); $('#fileInput').onchange=event=>importFile(event.target.files[0]); $('#saveFile').onclick=()=>saveFile(false); $('#saveAsFile').onclick=()=>saveFile(true);
$('#previousMonth').onclick=()=>{calendarCursor=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()-1,1);renderCalendar();};
$('#nextMonth').onclick=()=>{calendarCursor=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()+1,1);renderCalendar();};
$('#startMonth').onclick=()=>{const start=new Date(`${data.profile.startDate}T12:00:00`);calendarCursor=new Date(start.getFullYear(),start.getMonth(),1);renderCalendar();};
