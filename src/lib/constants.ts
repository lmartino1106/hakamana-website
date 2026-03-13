export const SITE_NAME = "Hakamana";
export const SITE_DESCRIPTION =
  "Hakamana es el primer Fondo de Litigación chileno con presencia en Latinoamérica. Financiamos litigios y arbitrajes con fundamentos jurídicos sólidos.";
export const SITE_URL = "https://www.hakamana.cl";
export const CONTACT_EMAIL = "contacto@hakamana.cl";
export const CONTACT_PHONE = "+56 9 7799 7077";
export const CONTACT_PHONE_DISPLAY = "+56 9 7799 7077";
export const ADDRESS = "Raúl Labbé N° 12.613, Oficina 310, Lo Barnechea, Santiago, Chile";
export const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Ra%C3%BAl+Labb%C3%A9+12613+Lo+Barnechea+Santiago+Chile";

export const NAV_LINKS = [
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/nuestro-equipo", label: "Nuestro Equipo" },
  { href: "/que-hacemos", label: "Qué Hacemos" },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
  { href: "/prensa", label: "Prensa" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Francisco Orrego",
    role: "Presidente del Directorio",
    image: "/images/francisco-orrego.jpg",
    bio: "Abogado con más de 25 años de experiencia. Director de ENAMI, Leasing Urbano S.A., AGF Vision Advisors y Grupo Espacios-Inmobiliaria. Ex Subsecretario de Minería y ex Presidente de TVN.",
    slug: "francisco-orrego",
  },
  {
    name: "Andrés Veszpremy",
    role: "Presidente Comité de Inversiones",
    image: "/images/andres-veszpremy.jpg",
    bio: "Abogado con más de 30 años de experiencia. Socio del Estudio Palma Edwards Veszpremy (PEV). Magíster en Derecho (LL.M.) de American University, EE.UU. Ex Fiscal y Secretario de la Compañía y del Directorio de AFP Provida S.A.",
    slug: "andres-veszpremy",
  },
  {
    name: "Carolina Plaza",
    role: "Directora Ejecutiva",
    image: "/images/carolina-plaza.jpg",
    bio: "Ingeniero Civil Industrial con más de 10 años de experiencia. MBA de la Universidad de Chile. Ex Gerente General de AndinoMetal, ex directora de empresas mineras, con cargos ejecutivos en el sector financiero.",
    slug: "carolina-plaza",
  },
  {
    name: "Aldo Díaz",
    role: "Director Legal",
    image: "/images/aldo-diaz.jpg",
    bio: "Abogado con más de 10 años de experiencia. Director de Litigación Compleja en Estudio RCZ. Magíster en Derecho de la Universidad de Chile. Árbitro joven designado en 2020 por el Centro de Arbitraje y Mediación de la Cámara de Comercio de Santiago.",
    slug: "aldo-diaz",
  },
  {
    name: "Ciro Colombara",
    role: "Director",
    image: "/images/ciro-colombara.jpg",
    bio: "Abogado con más de 25 años de experiencia en litigios complejos y negociaciones, tanto nacionales como internacionales. Socio fundador de Estudio RCZ.",
    slug: "ciro-colombara",
  },
  {
    name: "Manuel Sotelo",
    role: "Subdirector Legal",
    image: "/images/manuel-sotelo.jpg",
    bio: "Abogado de la Universidad de Chile y Magíster en Derecho Privado (c). Sus áreas de especialización son la Litigación Civil y Arbitraje.",
    slug: "manuel-sotelo",
  },
  {
    name: "Ignacio Canals",
    role: "Director",
    image: "/images/ignacio-canals.jpg",
    bio: "Ingeniero Civil de la Pontificia Universidad Católica de Chile con más de 15 años de experiencia. Fundador de Lemontech, empresa Legaltech con presencia en 17 países y más de 10.000 usuarios abogados. Socio de Instagantt, Sosafe y Dentalink. Fundador de Migrante, Fintech para inmigrantes.",
    slug: "ignacio-canals",
  },
] as const;

export const PRESS_ARTICLES = [
  {
    title: "Fondo de litigación chileno es premiado por Chambers and Partners",
    source: "El Mercurio Legal",
    date: "2021-07-12",
    excerpt:
      "Hakamana, el primer fondo de financiamiento de litigación chileno, recibió reconocimiento de Chambers and Partners en la categoría 'Litigation funding' para Latinoamérica.",
    image: "/images/press/chambers-2021.jpg",
    slug: "chambers-and-partners-2021",
  },
  {
    title: "Hakamana es premiado por Chambers & Partners en su edición América Latina 2021",
    source: "Chambers & Partners",
    date: "2021-07-07",
    excerpt:
      "Fondo Hakamana fue reconocido por Chambers & Partners, siendo el único fondo de litigios de la región incluido en la nueva edición de la publicación británica.",
    image: "/images/press/chambers-latam.jpg",
    slug: "chambers-partners-latam-2021",
  },
  {
    title: "Primer fondo de litigios de Chile viaja a Londres y se reúne con pares mundiales",
    source: "La Tercera",
    date: "2020-01-05",
    excerpt:
      "A cuatro meses de su presentación, Hakamana viajó a Londres para reunirse con fondos internacionales importantes como Harbor Litigation Funding y Vannin Capital.",
    image: "/images/press/londres.jpg",
    slug: "viaje-londres-2020",
  },
  {
    title: "Primer fondo de litigación chileno para dar asesoría legal a las pymes que enfrentan arbitrajes",
    source: "Capital",
    date: "2019-12-19",
    excerpt:
      "Hakamana es el primer fondo de litigación chileno cuyo objetivo es el financiamiento de arbitrajes y litigios en Chile para pymes.",
    image: "/images/press/capital.jpg",
    slug: "capital-pymes-2019",
  },
  {
    title: "Lanzan primer fondo de litigios de Chile con financiamiento inicial de US$ 1 millón",
    source: "Pulso - La Tercera",
    date: "2019-09-29",
    excerpt:
      "Hakamana es el aterrizaje local de un mecanismo de financiamiento conocido como 'Third Party Funding', nacido en el mundo anglosajón hace más de una década.",
    image: "/images/press/pulso.jpg",
    slug: "lanzamiento-pulso-2019",
  },
] as const;

export const FAQS = [
  {
    question: "¿Desde cuándo existen los Fondos de Litigación?",
    answer:
      "Los fondos de litigación surgieron hace alrededor de 30 años en Australia y desde entonces se han extendido a Europa, Asia y Estados Unidos. En Latinoamérica, Hakamana es pionero como el primer fondo de litigación chileno.",
  },
  {
    question: "¿Por qué los Fondos de Litigación se focalizan en los arbitrajes?",
    answer:
      "Los fondos de litigación priorizan los arbitrajes, tanto nacionales como internacionales, porque tienen una duración acotada en el tiempo, mientras que los litigios ordinarios pueden tardar mucho más. Además, las decisiones arbitrales son más predecibles, lo que permite una mejor evaluación del riesgo de inversión.",
  },
  {
    question: "¿Cómo decide el Fondo de Litigación si financia un caso?",
    answer:
      "La decisión se basa en un análisis exhaustivo de los antecedentes del caso. El Comité de Inversiones evalúa que el caso tenga fundamentos legales sólidos y que existan probabilidades altas de obtener una sentencia favorable. Se realiza un riguroso due diligence legal y financiero antes de aprobar el financiamiento.",
  },
  {
    question: "¿Qué sucede si se pierde el caso financiado?",
    answer:
      "Hakamana opera bajo un modelo de non-recourse, lo que significa que si el caso se pierde, el fondo asume la pérdida total de la inversión realizada. El cliente no debe devolver los fondos invertidos en caso de resultado desfavorable.",
  },
  {
    question: "¿Qué tipo de gastos financia Hakamana?",
    answer:
      "Hakamana financia los gastos del litigio, incluyendo honorarios legales, costos administrativos del procedimiento arbitral y gastos de peritajes. El fondo cubre estos costos para permitir que empresas con casos sólidos puedan acceder a la justicia sin barreras económicas.",
  },
  {
    question: "¿Quiénes pueden solicitar financiamiento?",
    answer:
      "Empresas y personas que tengan disputas legales con fundamentos jurídicos sólidos y que requieran financiamiento para cubrir los costos de litigación o arbitraje. Hakamana evalúa cada caso individualmente para determinar su viabilidad legal y financiera.",
  },
] as const;

export const AWARDS = [
  { name: "Chambers & Partners 2023", image: "/images/awards/chambers-2023.png" },
  { name: "Chambers & Partners 2022", image: "/images/awards/chambers-2022.png" },
  { name: "Chambers & Partners 2021", image: "/images/awards/chambers-2021.png" },
  { name: "Leaders League", image: "/images/awards/leaders-league.png" },
  { name: "Latin Lawyer", image: "/images/awards/latin-lawyer.png" },
] as const;
