export const SITE_CONFIG = {
  name: "Hakamana",
  fullName: "Hakamana - Fondo de Litigacion",
  tagline: "El primer Fondo de Litigacion chileno con presencia en LATAM",
  taglineEn: "The first Chilean Litigation Fund with presence in LATAM",
  meaning: "Hakamana es una palabra rapa nui que significa 'dar poder'",
  meaningEn: "Hakamana is a Rapa Nui word meaning 'to give power'",
  url: "https://www.hakamana.cl",
  email: "contacto@hakamana.cl",
  phone: "+56 9 7799 7077",
  address: {
    street: "Raul Labbe N° 12.613, oficina 310",
    city: "Lo Barnechea",
    region: "Santiago",
    country: "Chile",
  },
  mapsUrl: "https://goo.gl/maps/eTTgbsqAb7nFzay27",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.5!2d-70.5!3d-33.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRaul+Labbe+12613!5e0!3m2!1ses!2scl!4v1",
};

export const NAV_LINKS = [
  { href: "/quienes-somos", label: "Quienes Somos", labelEn: "About Us" },
  { href: "/nuestro-equipo", label: "Nuestro Equipo", labelEn: "Our Team" },
  { href: "/que-hacemos", label: "Que Hacemos", labelEn: "What We Do" },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes", labelEn: "FAQ" },
  { href: "/contacto", label: "Contacto", labelEn: "Contact" },
  { href: "/prensa", label: "Prensa", labelEn: "Press" },
];

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  roleEn: string;
  image: string;
  bio: string;
  bioEn: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "francisco-orrego",
    name: "Francisco Orrego",
    role: "Presidente del Directorio",
    roleEn: "Chairman of the Board",
    image: "/images/francisco-orrego.jpg",
    bio: "Abogado con mas de 25 anos de experiencia. Director de ENAMI, Leasing Urbano S.A., AGF Vision Advisors S.A. y Grupo Espacios-Inmobiliaria. Ex Subsecretario de Mineria. Ex Presidente de TVN.",
    bioEn: "Lawyer with over 25 years of experience. Director of ENAMI, Leasing Urbano S.A., AGF Vision Advisors S.A. and Grupo Espacios-Inmobiliaria. Former Undersecretary of Mining. Former Chairman of TVN.",
  },
  {
    slug: "andres-veszpremy",
    name: "Andres Veszpremy",
    role: "Presidente Comite de Inversiones",
    roleEn: "Chairman of the Investment Committee",
    image: "/images/andres-veszpremy.jpg",
    bio: "Abogado con mas de 30 anos de experiencia. Socio del Estudio Palma Edwards Veszpremy-PEV. Magister en Derecho (LL.M.) American University, EEUU. Ex Fiscal y Secretario de la Compania y del Directorio de AFP Provida S.A.",
    bioEn: "Lawyer with over 30 years of experience. Partner at Palma Edwards Veszpremy-PEV Law Firm. Master of Laws (LL.M.) American University, USA. Former General Counsel and Secretary of the Board at AFP Provida S.A.",
  },
  {
    slug: "carolina-plaza",
    name: "Carolina Plaza",
    role: "Directora Ejecutiva",
    roleEn: "Executive Director",
    image: "/images/carolina-plaza.jpg",
    bio: "Ingeniero Civil Industrial con mas de 10 anos de experiencia. MBA en Universidad de Chile. Ex Gerente General de AndinoMetal. Ex Directora de empresas mineras medianas. Desempeno cargos ejecutivos en empresas del sector financiero.",
    bioEn: "Industrial Civil Engineer with over 10 years of experience. MBA from Universidad de Chile. Former CEO of AndinoMetal. Former Director of mid-size mining companies. Held executive positions in financial sector companies.",
  },
  {
    slug: "aldo-diaz",
    name: "Aldo Diaz",
    role: "Director Legal",
    roleEn: "Legal Director",
    image: "/images/aldo-diaz.jpg",
    bio: "Abogado con mas de 10 anos de experiencia. Director de Litigacion Compleja de Estudio RCZ. Magister en Derecho de la Universidad de Chile. Durante 2020 fue nombrado como arbitro joven del Centro de Arbitraje y Mediacion de la Camara de Comercio de Santiago.",
    bioEn: "Lawyer with over 10 years of experience. Director of Complex Litigation at RCZ Law Firm. Master of Laws from Universidad de Chile. In 2020, appointed as young arbitrator at the Santiago Chamber of Commerce Arbitration and Mediation Center.",
  },
  {
    slug: "ciro-colombara",
    name: "Ciro Colombara",
    role: "Director",
    roleEn: "Director",
    image: "/images/ciro-colombara.jpg",
    bio: "Abogado con mas de 25 anos de experiencia en litigios complejos y negociaciones, tanto nacionales como internacionales. Socio fundador de Estudio RCZ. Ha desarrollado su carrera principalmente en controversias sofisticadas.",
    bioEn: "Lawyer with over 25 years of experience in complex litigation and negotiations, both domestic and international. Founding partner of RCZ Law Firm. Has developed his career primarily in sophisticated disputes.",
  },
  {
    slug: "manuel-sotelo",
    name: "Manuel Sotelo",
    role: "Subdirector Legal",
    roleEn: "Deputy Legal Director",
    image: "/images/manuel-sotelo.png",
    bio: "Abogado de la Universidad de Chile y Magister en Derecho Privado (c). Se integra a nuestro equipo como subdirector legal. Especialidad: Litigacion Civil y Arbitraje.",
    bioEn: "Lawyer from Universidad de Chile with a Master's in Private Law (c). Joined our team as Deputy Legal Director. Specialty: Civil Litigation and Arbitration.",
  },
  {
    slug: "ignacio-canals",
    name: "Ignacio Canals",
    role: "Director",
    roleEn: "Director",
    image: "/images/ignacio-canals.jpg",
    bio: "Ingeniero Civil UC con mas de 15 anos de experiencia. Fundador de Lemontech, empresa lider en Legaltech en America Latina, con clientes en 17 paises y mas de 10.000 abogados como usuarios. Socio y Director de empresas de software como Instagantt, Sosafe y Dentalink. Fundador de Migrante, empresa Fintech que apoya a inmigrantes.",
    bioEn: "Civil Engineer from UC with over 15 years of experience. Founder of Lemontech, a leading Legaltech company in Latin America, with clients in 17 countries and over 10,000 lawyers as users. Partner and Director of software companies such as Instagantt, Sosafe and Dentalink. Founder of Migrante, a Fintech company supporting immigrants.",
  },
  {
    slug: "emma-fischer",
    name: "Emma Fischer",
    role: "Directora de Estrategia",
    roleEn: "Strategy Director",
    image: "/images/emma-fischer.jpg",
    bio: "Abogada con formacion en derecho corporativo y experiencia en estrategia legal. Directora de Estrategia en Hakamana, donde lidera la planificacion estrategica y el desarrollo de nuevas oportunidades de inversion en litigios. Perfil bilingue con enfoque en mercados internacionales.",
    bioEn: "Lawyer with a background in corporate law and experience in legal strategy. Strategy Director at Hakamana, where she leads strategic planning and the development of new litigation investment opportunities. Bilingual profile with a focus on international markets.",
  },
  {
    slug: "luca-martino",
    name: "Luca Martino",
    role: "Abogado TI y Nuevas Tecnologias",
    roleEn: "IT & New Technologies Lawyer",
    image: "/images/luca-martino.jpg",
    bio: "Abogado especializado en tecnologias de la informacion y nuevas tecnologias. Se encarga de gestionar cuestiones de desarrollo e informatica con enfoque legal, y de evaluar aristas tecnologicas en juicios y arbitrajes.",
    bioEn: "Lawyer specialized in information technology and new technologies. Manages development and IT matters with a legal focus, and evaluates technological aspects in litigation and arbitration proceedings.",
  },
];

export const ABOUT_CONTENT = {
  description: "Hakamana es el primer Fondo de Litigacion chileno con presencia en LATAM, cuyo objetivo es el financiamiento de los gastos derivados de un litigio, tal como honorarios legales, costos administrativos, peritajes y otros, asumiendo los riesgos, ya que es un financiamiento sin recurso.",
  descriptionEn: "Hakamana is the first Chilean Litigation Fund with presence in LATAM, whose objective is to finance expenses derived from litigation, such as legal fees, administrative costs, expert reports and others, assuming the risks, as it is non-recourse financing.",
  mission: "Hakamana analiza cuidadosamente cada caso, tanto desde la perspectiva legal como financiera, para financiar aquellos litigios cuyo fundamento juridico sea serio y tengan, por lo tanto, altas probabilidades de exito.",
  missionEn: "Hakamana carefully analyzes each case, both from a legal and financial perspective, to finance those litigations whose legal basis is solid and therefore have a high probability of success.",
  vision: "Hakamana es un Fondo que sera lider en LATAM en el financiamiento de litigios, apoyando a empresas que teniendo la razon en una controversia legal no pueden solventar los costos de defender sus derechos o prefieren externalizar el riesgo de un litigio, destinando asi esos recursos a su giro comercial.",
  visionEn: "Hakamana is a Fund that will be a leader in LATAM in litigation financing, supporting companies that, having the right in a legal dispute, cannot afford the costs of defending their rights or prefer to outsource the risk of litigation, thus allocating those resources to their commercial operations.",
};

export const WHAT_WE_DO = {
  intro: "Hakamana analiza cuidadosamente cada caso, tanto desde la perspectiva legal como financiera, para financiar aquellos litigios cuyo fundamento juridico sea serio y tengan, por lo tanto, altas probabilidades de exito.",
  introEn: "Hakamana carefully analyzes each case, both from a legal and financial perspective, to finance those litigations whose legal basis is solid and therefore have a high probability of success.",
  dueDiligence: "El due diligence legal es clave y por esa razon abogados con experiencia considerable en litigacion y un Comite de Inversiones diverso profesionalmente y conocedor de la realidad toma las decisiones de inversion.",
  dueDiligenceEn: "Legal due diligence is key, which is why lawyers with considerable litigation experience and a professionally diverse Investment Committee knowledgeable about the reality make investment decisions.",
  outcome: "Si el caso se gana, el Fondo recupera la inversion mas la rentabilidad pactada. Si el caso se pierde, el Fondo pierde el total de la inversion.",
  outcomeEn: "If the case is won, the Fund recovers the investment plus the agreed return. If the case is lost, the Fund loses the entire investment.",
  steps: [
    {
      title: "Recepcion del Caso",
      titleEn: "Case Reception",
      description: "Recibimos su caso y realizamos una evaluacion preliminar de los antecedentes.",
      descriptionEn: "We receive your case and perform a preliminary evaluation of the background.",
    },
    {
      title: "Due Diligence Legal",
      titleEn: "Legal Due Diligence",
      description: "Nuestro equipo legal analiza exhaustivamente el fundamento juridico del caso.",
      descriptionEn: "Our legal team exhaustively analyzes the legal basis of the case.",
    },
    {
      title: "Evaluacion Financiera",
      titleEn: "Financial Evaluation",
      description: "El Comite de Inversiones evalua la viabilidad financiera y las probabilidades de exito.",
      descriptionEn: "The Investment Committee evaluates the financial viability and probability of success.",
    },
    {
      title: "Decision de Inversion",
      titleEn: "Investment Decision",
      description: "Se aprueba o rechaza el financiamiento basado en el analisis integral.",
      descriptionEn: "Financing is approved or rejected based on the comprehensive analysis.",
    },
    {
      title: "Financiamiento",
      titleEn: "Financing",
      description: "Se formaliza el acuerdo y se desembolsan los fondos para cubrir los gastos del litigio.",
      descriptionEn: "The agreement is formalized and funds are disbursed to cover litigation expenses.",
    },
  ],
};

export interface FAQ {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export const FAQS: FAQ[] = [
  {
    question: "Desde cuando existen los Fondos de Litigacion?",
    questionEn: "Since when have Litigation Funds existed?",
    answer: "Surgieron hace alrededor de 30 anos en Australia y se han extendido a Europa, Asia y Estados Unidos. En America Latina, Hakamana fue pionero al ser el primer fondo de litigacion chileno.",
    answerEn: "They emerged about 30 years ago in Australia and have spread to Europe, Asia and the United States. In Latin America, Hakamana was a pioneer as the first Chilean litigation fund.",
  },
  {
    question: "Por que razon los Fondos de Litigacion se han focalizado en los arbitrajes?",
    questionEn: "Why have Litigation Funds focused on arbitration?",
    answer: "Los arbitrajes tienen una duracion acotada versus los litigios ordinarios que pueden prolongarse por anos. Las decisiones arbitrales tienden a ser mas predecibles y algunos fondos ofrecen servicios financieros relacionados.",
    answerEn: "Arbitrations have a limited duration versus ordinary litigation that can go on for years. Arbitration decisions tend to be more predictable and some funds offer related financial services.",
  },
  {
    question: "Como decide el Fondo de Litigacion si financia un caso?",
    questionEn: "How does the Litigation Fund decide whether to finance a case?",
    answer: "El Fondo analiza los antecedentes cuidadosamente y el Comite de Inversiones evalua que los fundamentos legales sean solidos y que existan altas probabilidades de obtener una sentencia favorable.",
    answerEn: "The Fund carefully analyzes the background and the Investment Committee evaluates that the legal foundations are solid and that there is a high probability of obtaining a favorable ruling.",
  },
  {
    question: "Que tipo de casos financia Hakamana?",
    questionEn: "What type of cases does Hakamana finance?",
    answer: "Hakamana financia principalmente arbitrajes nacionales e internacionales, litigios comerciales complejos y disputas donde exista un fundamento juridico serio con altas probabilidades de exito.",
    answerEn: "Hakamana primarily finances national and international arbitrations, complex commercial litigation and disputes where there is a solid legal basis with a high probability of success.",
  },
  {
    question: "Que sucede si el caso se pierde?",
    questionEn: "What happens if the case is lost?",
    answer: "Si el caso se pierde, el Fondo asume la perdida total de la inversion. Es un financiamiento sin recurso, lo que significa que el cliente no debe devolver los fondos invertidos.",
    answerEn: "If the case is lost, the Fund assumes the total loss of the investment. It is non-recourse financing, which means the client does not have to return the invested funds.",
  },
  {
    question: "Cuanto tiempo toma el proceso de evaluacion?",
    questionEn: "How long does the evaluation process take?",
    answer: "El proceso de evaluacion depende de la complejidad del caso, pero generalmente toma entre 4 a 8 semanas desde la recepcion de los antecedentes hasta la decision de inversion.",
    answerEn: "The evaluation process depends on the complexity of the case, but generally takes between 4 to 8 weeks from receipt of the background to the investment decision.",
  },
];

export interface PressArticle {
  slug: string;
  title: string;
  titleEn: string;
  source: string;
  date: string;
  excerpt: string;
  excerptEn: string;
  image: string;
  externalUrl?: string;
}

export const PRESS_ARTICLES: PressArticle[] = [
  {
    slug: "chambers-and-partners-2023",
    title: "Fondo de litigacion chileno es premiado por Chambers and Partners",
    titleEn: "Chilean litigation fund awarded by Chambers and Partners",
    source: "El Mercurio Legal",
    date: "2023-05-15",
    excerpt: "Hakamana fue reconocido como el primer fondo de financiamiento de litigacion chileno y segundo de la region en el prestigioso ranking Chambers & Partners.",
    excerptEn: "Hakamana was recognized as the first Chilean litigation financing fund and second in the region in the prestigious Chambers & Partners ranking.",
    image: "/images/chambers_blue-400x250-1.png",
  },
  {
    slug: "chambers-partners-2021",
    title: "Hakamana es premiado por Chambers & Partners en su edicion America Latina 2021",
    titleEn: "Hakamana awarded by Chambers & Partners in its Latin America 2021 edition",
    source: "Chambers & Partners",
    date: "2021-07-20",
    excerpt: "Hakamana fue incluido como el unico fondo de litigios de la region en el prestigioso ranking Chambers & Partners 2021.",
    excerptEn: "Hakamana was included as the only litigation fund in the region in the prestigious Chambers & Partners 2021 ranking.",
    image: "/images/Chambers-Litigation-Support-2021.jpg",
  },
  {
    slug: "la-tercera-viaje-londres",
    title: "Primer fondo de litigios de Chile viaja a Londres y se reune con pares mundiales",
    titleEn: "First Chilean litigation fund travels to London and meets with global peers",
    source: "La Tercera",
    date: "2019-12-10",
    excerpt: "Hakamana realizo una gira por Londres visitando Harbor Litigation Funding y Vannin Capital, referentes mundiales en financiamiento de litigios.",
    excerptEn: "Hakamana toured London visiting Harbor Litigation Funding and Vannin Capital, global references in litigation financing.",
    image: "/images/LaTercera-Pulso-2.jpg",
    externalUrl: "https://www.latercera.com/pulso/noticia/primer-fondo-litigios-chile-viaja-londres-se-reune-pares-mundiales/961718/",
  },
  {
    slug: "capital-asesoria-pymes",
    title: "Primer fondo de litigacion chileno para dar asesoria legal a las pymes",
    titleEn: "First Chilean litigation fund to provide legal advice to SMEs",
    source: "Capital",
    date: "2019-11-15",
    excerpt: "Hakamana busca nivelar la cancha de las pequenas y medianas empresas que enfrentan arbitrajes sin los recursos necesarios para defender sus derechos.",
    excerptEn: "Hakamana seeks to level the playing field for small and medium enterprises facing arbitrations without the necessary resources to defend their rights.",
    image: "/images/nota3-ok.jpg",
  },
  {
    slug: "pulso-lanzamiento",
    title: "Lanzan primer fondo de litigios de Chile con financiamiento inicial de US$ 1 millon",
    titleEn: "First Chilean litigation fund launched with initial financing of US$ 1 million",
    source: "Pulso - La Tercera",
    date: "2019-09-20",
    excerpt: "En evento privado se lanza el primer fondo de litigios de Chile bajo el modelo Third Party Funding, con un financiamiento inicial de un millon de dolares.",
    excerptEn: "At a private event, the first Chilean litigation fund is launched under the Third Party Funding model, with initial financing of one million dollars.",
    image: "/images/pulso.jpg",
    externalUrl: "https://www.pulso.cl",
  },
  {
    slug: "leaders-league-reconocimiento",
    title: "Hakamana reconocido por Leaders League",
    titleEn: "Hakamana recognized by Leaders League",
    source: "Leaders League",
    date: "2020-03-10",
    excerpt: "Hakamana fue reconocido por Leaders League como un actor destacado en el mercado de financiamiento de litigios en America Latina.",
    excerptEn: "Hakamana was recognized by Leaders League as a prominent player in the litigation financing market in Latin America.",
    image: "/images/leaders-league.jpg",
  },
  {
    slug: "latin-lawyer-feature",
    title: "Hakamana destacado en Latin Lawyer",
    titleEn: "Hakamana featured in Latin Lawyer",
    source: "Latin Lawyer",
    date: "2020-07-15",
    excerpt: "La publicacion especializada Latin Lawyer destaco a Hakamana como un referente emergente en el financiamiento de litigios en la region.",
    excerptEn: "The specialized publication Latin Lawyer highlighted Hakamana as an emerging reference in litigation financing in the region.",
    image: "/images/latin-lawyer-630x147-1.png",
  },
  {
    slug: "chambers-ranked-firm-2022",
    title: "Hakamana mantiene su posicion en Chambers & Partners 2022",
    titleEn: "Hakamana maintains its position in Chambers & Partners 2022",
    source: "Chambers & Partners",
    date: "2022-05-20",
    excerpt: "Por segundo ano consecutivo, Hakamana fue reconocido en el ranking Chambers & Partners como referente en financiamiento de litigios.",
    excerptEn: "For the second consecutive year, Hakamana was recognized in the Chambers & Partners ranking as a reference in litigation financing.",
    image: "/images/Ranked-Firm-2022.png",
  },
  {
    slug: "chambers-ranked-firm-2023-leaders",
    title: "Hakamana obtiene reconocimiento Ranked Firm 2023 de Leaders",
    titleEn: "Hakamana obtains Ranked Firm 2023 recognition from Leaders",
    source: "Chambers & Partners",
    date: "2024-04-10",
    excerpt: "Hakamana consolida su liderazgo siendo nuevamente reconocido como Ranked Firm en la edicion 2023 de Chambers & Partners.",
    excerptEn: "Hakamana consolidates its leadership by being once again recognized as a Ranked Firm in the 2023 edition of Chambers & Partners.",
    image: "/images/RANKED_FIRM_2023_LEADERS.png",
  },
  {
    slug: "el-mercurio-legal-fondo-litigacion",
    title: "El financiamiento de litigios llega a Chile de la mano de Hakamana",
    titleEn: "Litigation financing arrives in Chile through Hakamana",
    source: "El Mercurio Legal",
    date: "2019-10-05",
    excerpt: "Hakamana introduce en Chile el modelo de Third Party Funding, permitiendo a empresas acceder a justicia sin asumir el costo total del litigio.",
    excerptEn: "Hakamana introduces the Third Party Funding model in Chile, allowing companies to access justice without assuming the full cost of litigation.",
    image: "/images/Foto.png",
  },
  {
    slug: "reunion-londres-harbor",
    title: "Hakamana se reune con Harbor Litigation Funding en Londres",
    titleEn: "Hakamana meets with Harbor Litigation Funding in London",
    source: "Hakamana",
    date: "2019-12-09",
    excerpt: "El equipo de Hakamana sostuvo reuniones estrategicas con Harbor Litigation Funding, uno de los fondos de litigacion mas grandes del mundo.",
    excerptEn: "The Hakamana team held strategic meetings with Harbor Litigation Funding, one of the largest litigation funds in the world.",
    image: "/images/WhatsApp-Image-2019-12-09-at-6.49.54-PM.jpeg",
  },
  {
    slug: "reunion-londres-vannin",
    title: "Encuentro con Vannin Capital en gira por Europa",
    titleEn: "Meeting with Vannin Capital on European tour",
    source: "Hakamana",
    date: "2019-12-10",
    excerpt: "Hakamana se reunio con Vannin Capital como parte de su gira por Londres para establecer alianzas con fondos de litigacion internacionales.",
    excerptEn: "Hakamana met with Vannin Capital as part of its London tour to establish alliances with international litigation funds.",
    image: "/images/WhatsApp-Image-2019-12-10-at-10.35.02-AM.jpeg",
  },
  {
    slug: "negocio-construccion",
    title: "Financiamiento de litigios en el sector construccion",
    titleEn: "Litigation financing in the construction sector",
    source: "Negocio y Construccion",
    date: "2020-07-10",
    excerpt: "Hakamana expande su alcance al sector construccion, financiando disputas legales en una de las industrias mas activas en arbitrajes.",
    excerptEn: "Hakamana expands its reach to the construction sector, financing legal disputes in one of the most active industries in arbitration.",
    image: "/images/8421.jpg",
  },
  {
    slug: "seminario-arbitraje-2020",
    title: "Hakamana participa en seminario sobre arbitraje comercial",
    titleEn: "Hakamana participates in commercial arbitration seminar",
    source: "Hakamana",
    date: "2020-10-15",
    excerpt: "El equipo de Hakamana participo en un importante seminario sobre arbitraje comercial, presentando las ventajas del financiamiento de litigios.",
    excerptEn: "The Hakamana team participated in an important commercial arbitration seminar, presenting the advantages of litigation financing.",
    image: "/images/IMG_0053.jpg",
  },
  {
    slug: "evento-lanzamiento-fotos",
    title: "Registro fotografico del lanzamiento de Hakamana",
    titleEn: "Photographic record of Hakamana's launch",
    source: "Hakamana",
    date: "2020-10-20",
    excerpt: "Imagenes del evento de lanzamiento oficial de Hakamana, el primer fondo de litigacion chileno.",
    excerptEn: "Images from the official launch event of Hakamana, the first Chilean litigation fund.",
    image: "/images/IMG_0163.jpg",
  },
];
