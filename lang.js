/**
 * =============================================
 *  LANGUAGE SYSTEM — lang - Copy.js
 *  Switches all page text between EN and RO.
 *  Persists choice via localStorage.
 * =============================================
 */

const translations = {
  ro: {
    /* ---- Shared nav ---- */
    'nav.home': 'Acasă',
    'nav.about': 'Despre',
    'nav.services': 'Servicii',
    'nav.team': 'Echipa',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',

    /* Home dropdown */
    'nav.home_hero': 'Pagina principală',
    'nav.home_about': 'Despre noi',
    'nav.home_services': 'Servicii',
    'nav.home_team': 'Echipa',
    'nav.home_contact': 'Contact',

    /* About dropdown */
    'nav.about_whatis': 'Ce este 3x3?',
    'nav.about_story': 'Povestea noastră',
    'nav.about_why': 'De ce această echipă',
    'nav.about_players': 'Jucători',
    'nav.about_blog': 'Blog',

    /* ---- Shared footer ---- */
    'footer.copyright': '© 2026 Proint MLD. Toate drepturile rezervate.',
    'footer.desc': 'Consultanță profesională în formare și dezvoltare web',

    /* ============================================
       INDEX PAGE
       ============================================ */

    /* Hero */
    'index.hero.badge': 'Bine ați venit la Proint MLD',
    'index.hero.title': 'Formare profesională și dezvoltare web',
    'index.hero.lead': 'Construiește site-uri reale alături de mentori experți, pas cu pas.',
    'index.hero.btn_services': 'Vezi serviciile',
    'index.hero.btn_contact': 'Contactează-ne',
    'index.hero.btn_learn': 'Află mai mult',
    'index.hero.card_badge': 'Program de încredere',
    'index.hero.card_title': 'Construiește. Învață. Lansează.',
    'index.hero.card_desc': 'Un parcurs clar de la prima ta pagină la un proiect gata de lansare.',
    'index.hero.card_li1': 'Ateliere practice cu feedback direct de la mentor',
    'index.hero.card_li2': 'Proiecte pe care le poți arăta în portofoliu',
    'index.hero.card_li3': 'Suport din partea instructorilor și colegilor',

    /* About section on index */
    'index.about.title': 'Despre Proint MLD',
    'index.about.lead': 'Ajutăm oamenii să învețe dezvoltare web prin proiecte reale, practice.',
    'index.about.desc': 'Fiecare lecție e construită pe rezultate clare, muncă în echipă și abilități practice pe care le poți folosi imediat.',
    'index.about.card_title': 'De ce aleg studenții',
    'index.about.card_li1': 'Cursuri bazate pe proiecte',
    'index.about.card_li2': 'Tehnologii moderne',
    'index.about.card_li3': 'Rezultat gata pentru portofoliu',

    /* Services */
    'index.services.title': 'Serviciile noastre',
    'index.services.lead': 'Vă oferim informații despre această echipă de vis.',
    'index.services.web_title': 'Dezvoltare web',
    'index.services.web_desc': 'Construim site-uri responsive, bine realizate și prietenoase cu vizitatorii.',
    'index.services.consult_title': 'Consultanță',
    'index.services.consult_desc': 'Ghidare practică în design de produs, performanță și strategie de lansare.',
    'index.services.train_title': 'Training',
    'index.services.train_desc': 'Sesiuni de formare practice axate pe abilități reale și rezultate concrete.',

    /* Team */
    'index.team.title': 'Echipa noastră',
    'index.team.curry_role': 'Fundaș',
    'index.team.lebron_role': 'Extremă mică',
    'index.team.wemby_role': 'Pivot',
    'index.team.embiid_role': 'Pivot (Rezervă)',

    /* Contact */
    'index.contact.title': 'Ia legătura cu noi',
    'index.contact.lead': 'Ești gata să începi aventura ta în 3x3?',
    'index.contact.name_label': 'Nume',
    'index.contact.name_ph': 'Numele tău complet',
    'index.contact.email_label': 'Email',
    'index.contact.email_ph': 'tu@exemplu.com',
    'index.contact.msg_label': 'Mesaj',
    'index.contact.msg_ph': 'Spune-ne ce cauți...',
    'index.contact.btn_send': 'Trimite mesajul',

    /* ============================================
       ABOUT PAGE
       ============================================ */

    /* Hero */
    'about.hero.badge': 'Baschet 3x3 de elită',
    'about.hero.title': 'Echipa supremă de 3x3',
    'about.hero.lead': 'Acolo unde legendele NBA redefinesc dominanța pe baschetul stradal.',
    'about.hero.btn_what': 'Ce este baschetul 3x3?',
    'about.hero.btn_why': 'De ce noi?',
    'about.hero.btn_players': 'Jucători',
    'about.hero.btn_story': 'Povestea noastră',
    'about.hero.card_title': 'Gata de campionat',
    'about.hero.card_desc': 'O echipă creată pentru supremația 3x3.',

    /* What is 3x3 */
    'about.whatis.title': 'Ce este baschetul 3x3?',
    'about.whatis.lead': 'Baschetul 3x3 este cea mai rapidă și intensă versiune a jocului.',
    'about.whatis.fast_label': 'Ritm rapid:',
    'about.whatis.fast_desc': 'Acțiune pe jumătate de teren cu oportunități de scor neîntrerupte.',
    'about.whatis.phys_label': 'Fizic:',
    'about.whatis.phys_desc': 'Apărare intensă și contact într-un spațiu compact.',
    'about.whatis.skill_label': 'Abilitate ridicată:',
    'about.whatis.skill_desc': 'IQ pur de baschet, aruncare și măiestrie unu-la-unu.',
    'about.whatis.card_title': 'Diferențe cheie',
    'about.whatis.card_desc': 'Mai mult spațiu înseamnă decizii mai rapide. Bătălii unu-la-unu mai dure. Fiecare posesie contează.',

    /* Our Story */
    'about.story.title': 'Povestea noastră',
    'about.story.lead': 'Cum am adus împreună cea mai bună echipă de 3x3.',
    'about.story.p1': 'Credem în asamblarea celor mai buni talente pentru dominanța în baschetul stradal. Această echipă reprezintă ani de experiență, abilități de neegalat și o mentalitate de câștigător.',
    'about.story.p2': 'Fiecare jucător a fost ales nu doar pentru talentul individual, ci pentru modul în care ridică nivelul echipei. Împreună, formează o forță de neoprit în baschetul 3x3.',
    'about.story.card_title': 'Misiunea noastră',
    'about.story.card_desc': 'Să demonstrăm ce e posibil când cei mai mari jucători de baschet 3x3 se unesc cu un singur scop: să domine jocul.',

    /* Why This Team */
    'about.why.title': 'De ce această echipă ar domina',
    'about.why.lead': 'Combinația perfectă de abilitate, forță și inteligență baschetbalistică.',
    'about.why.shoot_title': 'Aruncare de neegalat',
    'about.why.shoot_desc': 'Raza lui Stephen Curry forțează apărările la limită.',
    'about.why.iq_title': 'IQ superior',
    'about.why.iq_desc': 'Viziunea și deciziile lui LeBron controlează jocul.',
    'about.why.wing_title': 'Anvergură extraterestră',
    'about.why.wing_desc': 'Lungimea și block-urile lui Wembanyama redefinesc protecția inelului.',
    'about.why.sub_title': 'Rezervă de elită',
    'about.why.sub_desc': 'Joel Embiid aduce scor dominant și fizic de pe bancă.',

    /* Players */
    'about.players.title': 'Jucătorii',
    'about.players.curry_role': 'Fundaș',
    'about.players.curry_desc': 'Vrăjitor al spațiului și aruncărilor. Mișcarea fără minge creează haos în apărări.',
    'about.players.lebron_role': 'Extremă mică',
    'about.players.lebron_desc': 'Forță, IQ și versatilitate. Face jocuri inteligente și domină unu-la-unu.',
    'about.players.wemby_role': 'Pivot',
    'about.players.wemby_desc': 'Talent generațional cu block-uri de elită, rază de aruncare și lungime extraordinară.',
    'about.players.embiid_role': 'Pivot (Rezervă)',
    'about.players.embiid_desc': 'Scor interior și protecție la inel. Prezența fizică intimidează adversarii.',
    'about.players.read_more': 'Citește mai mult',

    /* Closing */
    'about.closing.title': 'Legendari și de neînvins',
    'about.closing.desc': 'Această echipă combină cel mai mare aruncător, cel mai inteligent jucător și cel mai versatil om mare din baschet — cu cel mai dominant pivot ca rezervă. În baschetul 3x3, ar fi de neoprit.',

    /* Player Stories */
    'about.stories.title': 'Poveștile jucătorilor',
    'about.stories.curry_sub': 'Trăgătorul de elită',
    'about.stories.curry_text': 'Stephen Curry aduce o rază de aruncare fără egal pe terenul de 3x3. Capacitatea sa de a crea spațiu și a marca de oriunde îl face practic neaperabil în baschetul stradal. Cu o rază care se extinde cu mult dincolo de arcul 3x3, prezența lui Curry forțează apărătorii să acopere tot terenul, creând coechipieri liberi și oportunități de scor.',
    'about.stories.lebron_sub': 'Creatorul de joc',
    'about.stories.lebron_text': 'Inteligența baschetbalistică și versatilitatea lui LeBron sunt de neegalat. Capacitatea lui de a citi jocul, de a face pasul corect și de a domina defensiv pe toate pozițiile îl face quarterbackul perfect pentru orice echipă de 3x3. Viziunea sa de teren și leadershipul transformă modul în care operează o echipă, ridicând nivelul fiecărui jucător din jurul lui.',
    'about.stories.wemby_sub': 'Extraterestrul',
    'about.stories.wemby_text': 'Victor Wembanyama este un talent generațional a cărui anvergură de 2.4 metri și abilitate de elită la aruncare îl fac un coșmar în baschetul 3x3. Block-urile sale, apărarea la perimetru și capacitatea de a marca de oriunde pe teren oferă acestei echipe un avantaj fără precedent. Combinația unică de mărime și abilitate a lui Wemby schimbă geometria jocului.',
    'about.stories.joel_sub': 'Forța dominantă (Rezervă)',
    'about.stories.joel_text': 'Prezența fizică, capacitatea de a marca și dominanța în zona vopsită a lui Joel Embiid îl fac de neoprit în baschetul 3x3. Combinația sa de mărime, abilitate și atletism oferă oricărei echipe o prezență interioară de elită. De la mișcări din postul jos la jumpere face-up, Embiid controlează jocul și protejează inelul cu apărare de elită.',
    'about.stories.learn_more': 'Află mai mult',

    /* Blog system */
    'about.blog.title': 'Blog comunitar',
    'about.blog.lead': 'Împărtășește-ți gândurile despre baschetul 3x3. Creează și citește postări de blog chiar aici.',
    'about.blog.create_title': 'Creează o postare',
    'about.blog.create_desc': 'Scrie o nouă postare pe blog. Va fi salvată în browserul tău.',
    'about.blog.label_title': 'Titlu',
    'about.blog.ph_title': 'Introdu titlul blogului...',
    'about.blog.label_topic': 'Subiect',
    'about.blog.topic_default': 'Alege despre cine este postarea...',
    'about.blog.topic_team': 'Întreaga echipă',
    'about.blog.label_content': 'Conținut',
    'about.blog.ph_content': 'Scrie conținutul blogului aici...',
    'about.blog.btn_publish': '<i class="bi bi-plus-lg me-1"></i> Publică postarea',
    'about.blog.all_posts': 'Toate postările',
    'about.blog.ph_search': 'Caută postări după titlu...',

    /* Blog detail page */
    'blog.back': '← Înapoi la blog',
    'blog.not_found_title': 'Postare negăsită',
    'blog.not_found_text': 'Această postare nu există sau a fost ștearsă.',
    'blog.delete': 'Șterge',
    'blog.read_more': 'Citește mai mult',
    'blog.no_posts': 'Nicio postare încă. Creează prima!',
    'blog.no_match': 'Nicio postare nu corespunde căutării tale.',
    'blog.confirm_title': 'Ștergi această postare?',
    'blog.confirm_delete': 'Ești sigur că vrei să ștergi această postare? Această acțiune nu poate fi anulată.',

    /* Modal buttons */
    'modal.cancel': 'Anulează',
    'modal.delete': 'Șterge'
  },

  en: {
    /* These are just the default English values — used to restore */
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.team': 'Team',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',

    /* Home dropdown */
    'nav.home_hero': 'Hero',
    'nav.home_about': 'About',
    'nav.home_services': 'Services',
    'nav.home_team': 'Team',
    'nav.home_contact': 'Contact',

    /* About dropdown */
    'nav.about_whatis': 'What is 3x3?',
    'nav.about_story': 'Our Story',
    'nav.about_why': 'Why This Team',
    'nav.about_players': 'Players',
    'nav.about_blog': 'Blog',

    'footer.copyright': '© 2026 Proint MLD. All rights reserved.',
    'footer.desc': 'Professional Training & Web Development Consulting',

    'index.hero.badge': 'Welcome to Proint MLD',
    'index.hero.title': 'Professional Training & Web Development',
    'index.hero.lead': 'Build real websites while working with expert mentors, step by step.',
    'index.hero.btn_services': 'See Services',
    'index.hero.btn_contact': 'Talk With Us',
    'index.hero.btn_learn': 'Learn More',
    'index.hero.card_badge': 'Trusted program',
    'index.hero.card_title': 'Build. Learn. Launch.',
    'index.hero.card_desc': 'A clear training path from your first page to a polished launch-ready project.',
    'index.hero.card_li1': 'Practical workshops with direct mentor feedback',
    'index.hero.card_li2': 'Projects you can show in your portfolio',
    'index.hero.card_li3': 'Support from instructors and peers along the way',

    'index.about.title': 'About Proint MLD',
    'index.about.lead': 'We help people learn web development through real, hands-on projects.',
    'index.about.desc': 'Every lesson is built around clear results, teamwork, and practical skills you can use right away.',
    'index.about.card_title': 'Why students choose us',
    'index.about.card_li1': 'Project-based classes',
    'index.about.card_li2': 'Modern stack',
    'index.about.card_li3': 'Portfolio-ready outcome',

    'index.services.title': 'Our Services',
    'index.services.lead': 'We provide you information about this dream team.',
    'index.services.web_title': 'Web Development',
    'index.services.web_desc': 'Building responsive sites that feel polished and work well for visitors.',
    'index.services.consult_title': 'Consulting',
    'index.services.consult_desc': 'Practical guidance on product design, performance, and launch-ready strategy.',
    'index.services.train_title': 'Training',
    'index.services.train_desc': 'Hands-on training sessions focused on real skills and practical outcomes.',

    'index.team.title': 'Our Team',
    'index.team.curry_role': 'Point Guard',
    'index.team.lebron_role': 'Small Forward',
    'index.team.wemby_role': 'Center',
    'index.team.embiid_role': 'Center (Sub)',

    'index.contact.title': 'Get In Touch',
    'index.contact.lead': 'Ready to start your 3x3 journey?',
    'index.contact.name_label': 'Name',
    'index.contact.name_ph': 'Your full name',
    'index.contact.email_label': 'Email',
    'index.contact.email_ph': 'you@example.com',
    'index.contact.msg_label': 'Message',
    'index.contact.msg_ph': 'Tell us what you\'re looking for...',
    'index.contact.btn_send': 'Send Message',

    'about.hero.badge': 'Elite 3x3 Basketball',
    'about.hero.title': 'The Ultimate 3x3 Team',
    'about.hero.lead': 'Where NBA legends redefine street basketball dominance.',
    'about.hero.btn_what': 'What is 3x3 Basketball?',
    'about.hero.btn_why': 'Why Us?',
    'about.hero.btn_players': 'Players',
    'about.hero.btn_story': 'Our Story',
    'about.hero.card_title': 'Championship Ready',
    'about.hero.card_desc': 'A team built for 3x3 supremacy.',

    'about.whatis.title': 'What is 3x3 Basketball?',
    'about.whatis.lead': '3x3 basketball is the fastest, most intense version of the game.',
    'about.whatis.fast_label': 'Fast-paced:',
    'about.whatis.fast_desc': 'Half-court action with non-stop scoring opportunities.',
    'about.whatis.phys_label': 'Physical:',
    'about.whatis.phys_desc': 'Intense defense and contact in a compact space.',
    'about.whatis.skill_label': 'High-skill:',
    'about.whatis.skill_desc': 'Pure basketball IQ, shooting, and one-on-one mastery.',
    'about.whatis.card_title': 'Key Differences',
    'about.whatis.card_desc': 'More space means faster decisions. Tougher one-on-one battles. Every possession counts.',

    'about.story.title': 'Our Story',
    'about.story.lead': 'How we brought the greatest 3x3 team together.',
    'about.story.p1': 'We believe in assembling the absolute best talent for street basketball domination. This team represents years of experience, unmatched skill, and a winning mentality.',
    'about.story.p2': 'Each player was selected not just for their individual talent, but for how they elevate the team around them. Together, they form an unstoppable force in 3x3 basketball.',
    'about.story.card_title': 'Our Mission',
    'about.story.card_desc': 'To demonstrate what\'s possible when the world\'s greatest 3x3 basketball players unite with a single purpose: to dominate the game.',

    'about.why.title': 'Why This Team Would Dominate',
    'about.why.lead': 'The perfect combination of skill, strength, and basketball intelligence.',
    'about.why.shoot_title': 'Unmatched Shooting',
    'about.why.shoot_desc': 'Stephen Curry\'s range stretches defenses to their limits.',
    'about.why.iq_title': 'Superior IQ',
    'about.why.iq_desc': 'LeBron\'s vision and decision-making control the game.',
    'about.why.wing_title': 'Alien Wingspan',
    'about.why.wing_desc': 'Wembanyama\'s length and shot-blocking redefine rim protection.',
    'about.why.sub_title': 'Elite Substitute',
    'about.why.sub_desc': 'Joel Embiid brings dominant scoring and physicality off the bench.',

    'about.players.title': 'The Players',
    'about.players.curry_role': 'Point Guard',
    'about.players.curry_desc': 'Spacing and shooting wizard. Off-ball movement creates chaos for defenses.',
    'about.players.lebron_role': 'Small Forward',
    'about.players.lebron_desc': 'Strength, IQ, and versatility. Makes smart plays and dominates one-on-one.',
    'about.players.wemby_role': 'Center',
    'about.players.wemby_desc': 'Generational talent with elite shot-blocking, shooting range, and otherworldly length.',
    'about.players.embiid_role': 'Center (Sub)',
    'about.players.embiid_desc': 'Interior scoring and rim protection. Physical presence intimidates opponents.',
    'about.players.read_more': 'Read More',

    'about.closing.title': 'Legendary and Unbeatable',
    'about.closing.desc': 'This team combines the greatest shooter, the smartest player, and the most versatile big man in basketball — with the most dominant center as a sub. In 3x3 basketball, they would be unstoppable.',

    'about.stories.title': 'Player Stories',
    'about.stories.curry_sub': 'The Sharpshooter',
    'about.stories.curry_text': 'Stephen Curry brings unparalleled shooting range to the 3x3 court. His ability to create space and drain shots from anywhere on the court makes him virtually unguardable in street basketball. With range that extends well beyond the 3x3 arc, Curry\'s presence forces defenders to cover the entire court, creating open teammates and scoring opportunities.',
    'about.stories.lebron_sub': 'The Playmaker',
    'about.stories.lebron_text': 'LeBron\'s basketball intelligence and versatility are unmatched. His ability to read the game, make the right play, and dominate defensively all positions makes him the perfect quarterback for any 3x3 squad. His court vision and leadership transform the way a team operates, elevating every player around him while maintaining elite defensive intensity.',
    'about.stories.wemby_sub': 'The Alien',
    'about.stories.wemby_text': 'Victor Wembanyama is a generational talent whose 8-foot wingspan and elite shooting ability make him a nightmare in 3x3 basketball. His shot-blocking, perimeter defense, and ability to score from anywhere on the court give this team an unprecedented advantage. Wemby\'s unique combination of size and skill changes the geometry of the game.',
    'about.stories.joel_sub': 'The Dominant Force (Sub)',
    'about.stories.joel_text': 'Joel Embiid\'s physical presence, scoring ability, and paint dominance make him unstoppable in 3x3 basketball. His combination of size, skill, and athleticism gives any team an elite interior presence. From low-post moves to face-up jumpers, Embiid controls the game and protects the rim with elite defense.',
    'about.stories.learn_more': 'Learn More',

    'about.blog.title': 'Community Blog',
    'about.blog.lead': 'Share your thoughts about 3x3 basketball. Create and read blog posts right here.',
    'about.blog.create_title': 'Create a Post',
    'about.blog.create_desc': 'Write a new blog post. It will be saved in your browser.',
    'about.blog.label_title': 'Title',
    'about.blog.ph_title': 'Enter blog title...',
    'about.blog.label_topic': 'Topic',
    'about.blog.topic_default': 'Choose who this post is about...',
    'about.blog.topic_team': 'The Whole Team',
    'about.blog.label_content': 'Content',
    'about.blog.ph_content': 'Write your blog content here...',
    'about.blog.btn_publish': '<i class="bi bi-plus-lg me-1"></i> Publish Post',
    'about.blog.all_posts': 'All Posts',
    'about.blog.ph_search': 'Search posts by title...',

    'blog.back': '← Back to Blog',
    'blog.not_found_title': 'Post Not Found',
    'blog.not_found_text': 'This blog post doesn\'t exist or has been deleted.',
    'blog.delete': 'Delete',
    'blog.read_more': 'Read More',
    'blog.no_posts': 'No blog posts yet. Create the first one!',
    'blog.no_match': 'No posts match your search.',
    'blog.confirm_title': 'Delete this post?',
    'blog.confirm_delete': 'Are you sure you want to delete this post? This action cannot be undone.',

    /* Modal buttons */
    'modal.cancel': 'Cancel',
    'modal.delete': 'Delete'
  }
};

/**
 * Apply the given language to all elements with data-i18n attributes.
 */
function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  // Text content translations
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // HTML content translations (for buttons with icons)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.placeholder = dict[key];
    }
  });

  // Update the toggle button label
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.querySelector('span').textContent = lang === 'ro' ? 'EN' : 'RO';
  }

  // Update <html lang>
  document.documentElement.lang = lang;

  // Save preference
  localStorage.setItem('siteLang', lang);
}

/**
 * Get the current language from localStorage, default to 'en'.
 */
function getCurrentLang() {
  return localStorage.getItem('siteLang') || 'en';
}

/* ---- Initialize on DOM ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  const currentLang = getCurrentLang();

  // Apply saved language on load
  if (currentLang !== 'en') {
    applyLanguage(currentLang);
  } else {
    // Still update button label
    if (langToggle) {
      langToggle.querySelector('span').textContent = 'RO';
    }
  }

  // Toggle handler
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = getCurrentLang() === 'en' ? 'ro' : 'en';
      applyLanguage(newLang);
    });
  }
});
