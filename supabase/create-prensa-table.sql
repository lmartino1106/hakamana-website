-- Tabla de artículos de prensa para Hakamana
-- Ejecutar en Supabase SQL Editor: https://supabase.com/dashboard/project/olngvmszddmwkrjelkrr/sql

CREATE TABLE IF NOT EXISTS prensa (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL,
  date DATE NOT NULL,
  excerpt TEXT NOT NULL,
  excerpt_en TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '/images/hakamana.jpg',
  external_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_prensa_published_date ON prensa (published, date DESC);

-- Habilitar Row Level Security
ALTER TABLE prensa ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública (el sitio web puede leer artículos publicados)
CREATE POLICY "Artículos publicados son públicos" ON prensa
  FOR SELECT USING (published = true);

-- Política de escritura con service_role (solo el backend/dashboard puede escribir)
CREATE POLICY "Service role puede gestionar artículos" ON prensa
  FOR ALL USING (auth.role() = 'service_role');

-- Insertar artículos existentes del sitio
INSERT INTO prensa (slug, title, title_en, source, date, excerpt, excerpt_en, image, external_url) VALUES
('chambers-and-partners-2023', 'Fondo de litigación chileno es premiado por Chambers and Partners', 'Chilean litigation fund awarded by Chambers and Partners', 'El Mercurio Legal', '2023-05-15', 'Hakamana fue reconocido como el primer fondo de financiamiento de litigación chileno y segundo de la región en el prestigioso ranking Chambers & Partners.', 'Hakamana was recognized as the first Chilean litigation financing fund and second in the region in the prestigious Chambers & Partners ranking.', '/images/chambers_blue-400x250-1.png', NULL),
('chambers-partners-2021', 'Hakamana es premiado por Chambers & Partners en su edición América Latina 2021', 'Hakamana awarded by Chambers & Partners in its Latin America 2021 edition', 'Chambers & Partners', '2021-07-20', 'Hakamana fue incluido como el único fondo de litigios de la región en el prestigioso ranking Chambers & Partners 2021.', 'Hakamana was included as the only litigation fund in the region in the prestigious Chambers & Partners 2021 ranking.', '/images/Chambers-Litigation-Support-2021.jpg', NULL),
('chambers-ranked-firm-2023-leaders', 'Hakamana obtiene reconocimiento Ranked Firm 2023 de Leaders', 'Hakamana obtains Ranked Firm 2023 recognition from Leaders', 'Chambers & Partners', '2024-04-10', 'Hakamana consolida su liderazgo siendo nuevamente reconocido como Ranked Firm en la edición 2023 de Chambers & Partners.', 'Hakamana consolidates its leadership by being once again recognized as a Ranked Firm in the 2023 edition of Chambers & Partners.', '/images/RANKED_FIRM_2023_LEADERS.png', NULL),
('chambers-ranked-firm-2022', 'Hakamana mantiene su posición en Chambers & Partners 2022', 'Hakamana maintains its position in Chambers & Partners 2022', 'Chambers & Partners', '2022-05-20', 'Por segundo año consecutivo, Hakamana fue reconocido en el ranking Chambers & Partners como referente en financiamiento de litigios.', 'For the second consecutive year, Hakamana was recognized in the Chambers & Partners ranking as a reference in litigation financing.', '/images/Ranked-Firm-2022.png', NULL),
('la-tercera-viaje-londres', 'Primer fondo de litigios de Chile viaja a Londres y se reúne con pares mundiales', 'First Chilean litigation fund travels to London and meets with global peers', 'La Tercera', '2019-12-10', 'Hakamana realizó una gira por Londres visitando Harbor Litigation Funding y Vannin Capital, referentes mundiales en financiamiento de litigios.', 'Hakamana toured London visiting Harbor Litigation Funding and Vannin Capital, global references in litigation financing.', '/images/LaTercera-Pulso-2.jpg', 'https://www.latercera.com/pulso/noticia/primer-fondo-litigios-chile-viaja-londres-se-reune-pares-mundiales/961718/'),
('capital-asesoria-pymes', 'Primer fondo de litigación chileno para dar asesoría legal a las pymes', 'First Chilean litigation fund to provide legal advice to SMEs', 'Capital', '2019-11-15', 'Hakamana busca nivelar la cancha de las pequeñas y medianas empresas que enfrentan arbitrajes sin los recursos necesarios para defender sus derechos.', 'Hakamana seeks to level the playing field for small and medium enterprises facing arbitrations without the necessary resources to defend their rights.', '/images/nota3-ok.jpg', NULL),
('pulso-lanzamiento', 'Lanzan primer fondo de litigios de Chile con financiamiento inicial de US$ 1 millón', 'First Chilean litigation fund launched with initial financing of US$ 1 million', 'Pulso - La Tercera', '2019-09-20', 'En evento privado se lanza el primer fondo de litigios de Chile bajo el modelo Third Party Funding, con un financiamiento inicial de un millón de dólares.', 'At a private event, the first Chilean litigation fund is launched under the Third Party Funding model, with initial financing of one million dollars.', '/images/pulso.jpg', 'https://www.pulso.cl'),
('leaders-league-reconocimiento', 'Hakamana reconocido por Leaders League', 'Hakamana recognized by Leaders League', 'Leaders League', '2020-03-10', 'Hakamana fue reconocido por Leaders League como un actor destacado en el mercado de financiamiento de litigios en América Latina.', 'Hakamana was recognized by Leaders League as a prominent player in the litigation financing market in Latin America.', '/images/leaders-league.jpg', NULL),
('latin-lawyer-feature', 'Hakamana destacado en Latin Lawyer', 'Hakamana featured in Latin Lawyer', 'Latin Lawyer', '2020-07-15', 'La publicación especializada Latin Lawyer destacó a Hakamana como un referente emergente en el financiamiento de litigios en la región.', 'The specialized publication Latin Lawyer highlighted Hakamana as an emerging reference in litigation financing in the region.', '/images/latin-lawyer-630x147-1.png', NULL),
('el-mercurio-legal-fondo-litigacion', 'El financiamiento de litigios llega a Chile de la mano de Hakamana', 'Litigation financing arrives in Chile through Hakamana', 'El Mercurio Legal', '2019-10-05', 'Hakamana introduce en Chile el modelo de Third Party Funding, permitiendo a empresas acceder a justicia sin asumir el costo total del litigio.', 'Hakamana introduces the Third Party Funding model in Chile, allowing companies to access justice without assuming the full cost of litigation.', '/images/Foto.png', NULL),
('reunion-londres-harbor', 'Hakamana se reúne con Harbor Litigation Funding en Londres', 'Hakamana meets with Harbor Litigation Funding in London', 'Hakamana', '2019-12-09', 'El equipo de Hakamana sostuvo reuniones estratégicas con Harbor Litigation Funding, uno de los fondos de litigación más grandes del mundo.', 'The Hakamana team held strategic meetings with Harbor Litigation Funding, one of the largest litigation funds in the world.', '/images/WhatsApp-Image-2019-12-09-at-6.49.54-PM.jpeg', NULL),
('reunion-londres-vannin', 'Encuentro con Vannin Capital en gira por Europa', 'Meeting with Vannin Capital on European tour', 'Hakamana', '2019-12-10', 'Hakamana se reunió con Vannin Capital como parte de su gira por Londres para establecer alianzas con fondos de litigación internacionales.', 'Hakamana met with Vannin Capital as part of its London tour to establish alliances with international litigation funds.', '/images/WhatsApp-Image-2019-12-10-at-10.35.02-AM.jpeg', NULL),
('negocio-construccion', 'Financiamiento de litigios en el sector construcción', 'Litigation financing in the construction sector', 'Negocio y Construcción', '2020-07-10', 'Hakamana expande su alcance al sector construcción, financiando disputas legales en una de las industrias más activas en arbitrajes.', 'Hakamana expands its reach to the construction sector, financing legal disputes in one of the most active industries in arbitration.', '/images/8421.jpg', NULL),
('seminario-arbitraje-2020', 'Hakamana participa en seminario sobre arbitraje comercial', 'Hakamana participates in commercial arbitration seminar', 'Hakamana', '2020-10-15', 'El equipo de Hakamana participó en un importante seminario sobre arbitraje comercial, presentando las ventajas del financiamiento de litigios.', 'The Hakamana team participated in an important commercial arbitration seminar, presenting the advantages of litigation financing.', '/images/IMG_0053.jpg', NULL),
('evento-lanzamiento-fotos', 'Registro fotográfico del lanzamiento de Hakamana', 'Photographic record of Hakamana launch', 'Hakamana', '2020-10-20', 'Imágenes del evento de lanzamiento oficial de Hakamana, el primer fondo de litigación chileno.', 'Images from the official launch event of Hakamana, the first Chilean litigation fund.', '/images/IMG_0163.jpg', NULL)
ON CONFLICT (slug) DO NOTHING;
