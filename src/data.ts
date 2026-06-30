import type { ConfigOption, RalColor, SerreModel, Testimonial } from './types'

const cdn = (path: string) =>
  `https://cdn.prod.website-files.com/62d6989abb98a33f33f0ea56/${path}`

const cdnSite = (path: string) =>
  `https://cdn.prod.website-files.com/62d6989abb98a366adf0ea30/${path}`

export const brand = {
  name: 'Serre Exclusief',
  tagline: 'Volmaakt thuis',
  description:
    'Serre Exclusief staat voor de beste kwaliteit serres tegen eerlijke prijzen. Maatwerk serres in heel Nederland — vrijblijvend advies op locatie.',
  logoLight: '/logo-white.svg',
  logoDark: '/logo-dark.svg',
  logoIcon: '/logo-white.svg',
  ogImage: cdnSite('6351616c888e2fffb3501e1f_serre-og.webp'),
  website: 'https://www.serreexclusief.nl',
}

export const contact = {
  company: 'Serre Exclusief',
  address: 'Ambachtstraat 34',
  postalCode: '7622 AP',
  city: 'Borne',
  phone: '074 278 3950',
  phoneHref: 'tel:+31742783950',
  email: 'info@serreexclusief.nl',
  mapsUrl: 'https://maps.google.com/?q=Ambachtstraat+34+7622+AP+Borne',
  showroom: {
    title: 'Showroom Borne',
    hours: [
      'Ma–Do: 9:00–12:00 (middag en avond op afspraak)',
      'Vr–Za: 10:00–17:00',
    ],
    note: 'Bel 074 278 3950 of maak een afspraak via de configurator.',
  },
}

export const models: SerreModel[] = [
  {
    id: 'serre-uitbouw',
    name: 'Serre uitbouw',
    shortName: 'Uitbouw',
    description:
      'De perfecte manier om uw huis en tuin te verbinden met hoogwaardig aluminium. Volledig geïsoleerd en op maat.',
    image: cdn('632f3b19721a28c061fe3902_serre-uitbouw-thumbnail.avif'),
    heroImage: '/impressions/uitbouw/hero-exterior.jpg',
    basePrice: 15000,
    pricePerSqm: [2000, 2500],
    material: 'aluminium',
    features: ['Thermisch geïsoleerd', 'Alle RAL-kleuren', 'Lichtstraat mogelijk', 'Geveldoorbraak'],
  },
  {
    id: 'steellook-serre',
    name: 'Steellook Serre',
    shortName: 'Steellook',
    description:
      'Staalachtige uitstraling met slanke, goed geïsoleerde aluminium kozijnen. Geen roest, geen schilderwerk.',
    image: cdn('632f3effff3a74db641f472f_steellook-serre-thumbnail.avif'),
    heroImage: '/impressions/steellook/hero-exterior.jpg',
    basePrice: 18000,
    pricePerSqm: [2300, 2800],
    material: 'aluminium',
    features: ['Staallook afwerking', 'Slanke profielen', 'Poedercoating', 'Monumentaal geschikt'],
  },
  {
    id: 'houten-serre',
    name: 'Houten Serre',
    shortName: 'Houten',
    description:
      'Traditionele uitbouw met klassieke uitstraling. Ook wel Engelse serre genoemd. Ideaal voor monumentale panden.',
    image: cdn('6377894fa06693cc9a9ff0a0_houten-serre-3.avif'),
    heroImage: '/impressions/houten/hero-exterior.jpg',
    basePrice: 20000,
    pricePerSqm: [2500, 3500],
    material: 'hout',
    features: ['FSC/PEFC hout', 'Klassieke uitstraling', 'Op maat geschaafd', 'Welstandsgeschikt'],
  },
  {
    id: 'tuinkamer-veranda',
    name: 'Tuinkamer / Veranda',
    shortName: 'Tuinkamer',
    description:
      'Een verlengstuk van uw woning. Heerlijk vertoeven ongeacht weer en wind, het hele jaar door.',
    image: cdn('632f489e9ea73b5ac52e9759_tuinkamer-veranda-thumbnail.avif'),
    heroImage: '/impressions/tuinkamer/hero-exterior.jpg',
    basePrice: 12000,
    pricePerSqm: [1500, 2000],
    material: 'aluminium',
    features: ['Jaarrond bruikbaar', 'Flexibel ontwerp', 'Zon- en windbescherming', 'Snelle plaatsing'],
  },
  {
    id: 'minimalistische-schuifpui',
    name: 'Minimalistische schuifpui',
    shortName: 'Schuifpui',
    description:
      'Ultra slanke schuifpui voor maximaal glasoppervlak. Speciaal geschikt voor grote afmetingen.',
    image: cdn('632f362b96a21be0c03f1c29_minimalistische-schuifpui-thumbnail.avif'),
    heroImage: '/impressions/schuifpui/hero-exterior.jpg',
    basePrice: 10000,
    pricePerSqm: [1800, 2200],
    material: 'aluminium',
    features: ['Maximaal glas', 'Slanke profielen', 'Grote afmetingen', 'Naadloze overgang'],
  },
]

export const ralColors: RalColor[] = [
  { code: 'RAL 9005', name: 'Diepzwart', hex: '#0E0E10' },
  { code: 'RAL 7016', name: 'Antraciet', hex: '#383E42' },
  { code: 'RAL 9011', name: 'Grafiet', hex: '#27292B' },
  { code: 'RAL 9006', name: 'Wit aluminium', hex: '#A1A1A0' },
  { code: 'RAL 8017', name: 'Chocoladebruin', hex: '#45322E' },
  { code: 'RAL 6009', name: 'Dennengroen', hex: '#27352A' },
  { code: 'RAL 1015', name: 'Licht ivoor', hex: '#E6D2B5' },
  { code: 'RAL 9010', name: 'Zuiver wit', hex: '#F7F9EF' },
]

export const configOptions: ConfigOption[] = [
  { id: 'vloerverwarming', name: 'Vloerverwarming', description: 'Comfortabel verwarmen in de winter', price: 4500 },
  { id: 'zonwering', name: 'Zonwering', description: 'Elektrische zonwering op het dak', price: 3200 },
  { id: 'schuifpui', name: 'Schuifpui (dubbel)', description: 'Twee schuifbare glaspartijen', price: 5500 },
  { id: 'lichtstraat', name: 'Centrale lichtstraat', description: 'Extra daglicht van bovenaf', price: 3800 },
  { id: 'fundering', name: 'Fundering & vloer', description: 'Complete fundering door Serre Exclusief', price: 6000 },
  { id: 'triple-glas-upgrade', name: 'Triple glas upgrade', description: 'Drielaags isolerend glas', price: 2800 },
  { id: 'zonwering-glas', name: 'Zonwerend glas', description: 'Extra warmtewering in de zomer', price: 1800 },
  { id: 'elektrische-ramen', name: 'Elektrische raamopeners', description: 'Automatische ventilatie', price: 2200 },
]

export const testimonials: Testimonial[] = [
  {
    id: 'dalfsen',
    title: 'Serre uitbouw in Dalfsen',
    quote:
      'Het is in alles het ideale verlengstuk van ons huis. De serre is meer en meer onze leefplek geworden — met vloerverwarming, drielaags glas en schuifpuien aan alle kanten.',
    authors: 'Barend & Carla Scheppink',
    location: 'Zwolle',
    model: 'Serre uitbouw',
    highlight: 'Bijna 50 m² extra licht en ruimte',
    image: cdn('632f2c596a78d7667cb263cb_van-Dalen-Dalfsen-thumbnail.avif'),
    gallery: [
      '632f2c7791252da548ee6814_van-Dalen-Dalfsen-01.avif',
      '632f2c7791252d25f4ee6813_van-Dalen-Dalfsen-02.avif',
      '632f2c786a13714efb1fcc4f_van-Dalen-Dalfsen-03.avif',
      '632f2c77e5a2548512fe93f7_van-Dalen-Dalfsen-04.avif',
      '632f2c76721a2857cbfd1f2e_van-Dalen-Dalfsen-05.avif',
      '632f2c76e5a254a147fe93d0_van-Dalen-Dalfsen-06.avif',
      '632f2c77fa208d06a27a65ee_van-Dalen-Dalfsen-07.avif',
      '632f2c7724771a1d2968a4ab_van-Dalen-Dalfsen-08.avif',
      '632f2c770ee1f122acafc4c2_van-Dalen-Dalfsen-09.avif',
      '632f2c7749442aaca1a79146_van-Dalen-Dalfsen-10.avif',
    ].map(cdn),
    story: [
      'Omdat hun boerderij een historische boerderij is, is verbouwing voor meer licht bijna niet mogelijk. Vandaar het idee van een serre aansluitend aan de boerderij — met vol respect voor de rijke historie.',
      'Tijdens een bezoek aan Museum More in kasteel Ruurlo zagen ze hoe mooi een glazen uitbouw kan combineren met een oud, klassiek pand. Zo kwamen ze bij Serre Exclusief terecht.',
      'Albert Koetse kwam snel langs met de perfecte oplossing. Er is niet naar andere leveranciers gezocht — het gevoel was meteen meer dan goed.',
      'In alles heeft de serre hun wensen vervuld. Ze genieten elke dag van bijna 50 vierkante meter extra ruimte, maar vooral van het extra licht en de lucht.',
      'De samenwerking mag zonder meer als ideaal worden bestempeld. Tevredenheid, supertevredenheid zelfs alom. Vrienden zijn vol overtuiging doorverwezen.',
    ],
  },
  {
    id: 'amstelveen',
    title: 'Serre uitbouw in Amstelveen',
    quote:
      'Serre Exclusief doet alles. Van de fundering tot en met de zonnewering. Alles in eigen huis, in eigen hand — geen losse onderaannemers.',
    authors: 'Mike & Nathalie Muz',
    location: 'Amstelveen',
    model: 'Serre uitbouw',
    highlight: 'Gebouwd in slechts 3 weken',
    image: cdn('632f50223e498e3a6b447ad7_muzki-miki-amstelveen-thumbnail.avif'),
    gallery: [
      '632f5032e846c04093e37033_muzki-miki-amstelveen-01.avif',
      '632f503291252d4e74f0b56d_muzki-miki-amstelveen-02.avif',
      '632f5032fa208d02a97c899b_muzki-miki-amstelveen-03.avif',
      '632f50326a78d72334b44b0f_muzki-miki-amstelveen-04.avif',
    ].map(cdn),
    story: [
      'Mike en zijn vrouw wisten precies wat ze wilden. Eerst werd de garage omgebouwd, daarna wilden ze een stuk tuin opofferen voor meer woonruimte.',
      'Veel aannemers begrepen niet wat ze voor ogen hadden. Albert van Serre Exclusief wist meteen hun vertrouwen te winnen door zich in hun wensen te verplaatsen.',
      'Bij andere aanbieders werden bouwtermijnen van 2 tot 3 maanden genoemd. Serre Exclusief beloofde 3 weken — en in 3 weken was het geregeld.',
      'Geen dag gaat voorbij of ze genieten van hun serre. Waar binnen buiten en buiten binnen voelt. Het licht heeft het hele jaar door vrij spel.',
    ],
  },
  {
    id: 'oldenzaal',
    title: 'Tuinkamer in Oldenzaal',
    quote:
      'De eerlijkheid en openheid van Serre Exclusief waren zonder meer wezenlijke pluspunten. Niets werd mooier gemaakt dan het was.',
    authors: 'Samuel & Anja Reintjes',
    location: 'Oldenzaal',
    model: 'Tuinkamer / Veranda',
    highlight: 'Tuin komt naar het huis toe',
    image: cdn('632f287a0ee1f18b94af82c1_oldenhof-hengelo-thumbnail.avif'),
    gallery: [
      '632f288d4a0d2f161868eb12_oldenhof-hengelo-01.avif',
      '632f288d96a21b7da63e1015_oldenhof-hengelo-02.avif',
      '632f288d8294536872f26412_oldenhof-hengelo-03.avif',
      '632f288d91252d0869ee3986_oldenhof-hengelo-04.avif',
      '632f288dbb4d2a40da9042de_oldenhof-hengelo-05.avif',
      '632f288c0ee1f17ff7af8387_oldenhof-hengelo-06.avif',
      '632f288daa8aac539d76f44c_oldenhof-hengelo-07.avif',
      '632f288df6766d6d0b934615_oldenhof-hengelo-08.avif',
      '632f288d24771a6ff2686fd0_oldenhof-hengelo-09.avif',
      '632f288d047920dd70afc676_oldenhof-hengelo-10.avif',
    ].map(cdn),
    story: [
      'Anja en haar man houden van licht en lucht. Ze wilden de seizoenen zoveel mogelijk beleven met een tuinkamer — tuin ademen, niet de woonkamer doortrekken.',
      'De tegels op de vloer vormen één doorlopend geheel met het terras. De tuin komt naar het huis toe, het huis niet naar de tuin.',
      'De dame in de showroom van Serre Exclusief was dermate prettig dat ze meteen verkocht waren. Eerlijkheid en openheid waren wezenlijke pluspunten.',
      'De bouw duurde zo\'n twee weken. Elke avond maakten de monteurs foto\'s van de vorderingen. Het project is in alles perfect geregeld.',
      'Licht, lucht, ruimte, tuin, buiten, seizoenen — het komt allemaal samen in hun tuinkamer.',
    ],
  },
  {
    id: 'hengelo',
    title: 'Tuinkamer in Hengelo',
    quote:
      'Bijna niets zo lekker als een warme dag, een malse regenbui en in de tuinkamer zitten. Het getik op het dak, de geuren uit de tuin — heerlijk!',
    authors: 'Jan & Mendy Lommers',
    location: 'Hengelo',
    model: 'Tuinkamer / Veranda',
    highlight: 'Tuinkamer Qube · 12 m²',
    image: cdn('632f242c24771ac3936828cb_bonvanie-hengelo-thumbnail.avif'),
    gallery: [
      '632f24506a1371a2471f4d72_bonvanie-hengelo-01.avif',
      '632f245049442ac66ba70fd5_bonvanie-hengelo-02.avif',
      '632f2450721a28bab2fcb90a_bonvanie-hengelo-03.avif',
      '632f2450721a285278fcb908_bonvanie-hengelo-04.avif',
      '632f2450fc80c8283b019713_bonvanie-hengelo-05.avif',
      '632f2450721a28d17efcb90b_bonvanie-hengelo-06.avif',
      '632f2450e5a254827cfe1aa6_bonvanie-hengelo-07.avif',
      '632f24506a78d703d2b1d603_bonvanie-hengelo-08.avif',
    ].map(cdn),
    story: [
      'Waar nu de tuinkamer is, was tot oktober 2020 een veranda — een prettige plek, maar ook een behoorlijk tochtgat.',
      'Albert Koetse kwam vrijwel meteen langs met goede ideeën: tuinkamer Qube. Om daarmee hun huis pas echt af te maken.',
      'De bouw duurde een week en verliep tot volle tevredenheid. Alles ging soepel, geen enkel gezeur.',
      'Hun huis voelt niet alleen echt af, het oogt ook echt af. Alsof de tuinkamer er altijd al was.',
      'Zomer, herfst, winter, lente — ze zitten er middenin, heerlijk, in de seizoenen.',
    ],
  },
  {
    id: 'borne',
    title: 'Steellook serre in Borne',
    quote:
      'Ze leven vrijwel in de serre. Ontbijten, werken, schilderen, de krant lezen — alleen televisiekijken doen ze elders.',
    authors: 'De heer en mevrouw Peters',
    location: 'Borne',
    model: 'Steellook serre',
    highlight: '25 m² extra woonruimte',
    image: cdn('632f24dd6f7c9240674e0719_buma-pol-thumbnail.avif'),
    gallery: [
      '632f24f2829453d852f23580_buma-pol-borne-01.avif',
      '632f24f29ea73b76622c5dfe_buma-pol-borne-02.avif',
      '632f24f296a21bf0153dc601_buma-pol-borne-03.avif',
      '632f24f249442a4b1da71772_buma-pol-borne-04.avif',
      '632f24f2e846c017b4e0a9a5_buma-pol-borne-05.avif',
      '632f24f20ee1f11057af5498_buma-pol-borne-06.avif',
      '632f24f2bb4d2a44e190071b_buma-pol-borne-07.avif',
      '632f24f2721a281116fcc20a_buma-pol-borne-08.avif',
      '632f24f2aa8aace49076a944_buma-pol-borne-09.avif',
      '632f24f2e846c0f01ce0a9ac_buma-pol-borne-10.avif',
    ].map(cdn),
    story: [
      'Beetje bij beetje kwamen ze bij de vraag: waarom dan geen serre? Bij Serre Exclusief in de buurt ging het balletje rollen.',
      'Het eerste contact was een en al hartelijkheid. Hun serre staat er sinds oktober 2017 — tot meer dan volle tevredenheid.',
      'De woonkamer van 50 m² is met de serre ineens 25 m² groter. In de zomer én de rest van het jaar is de serre hun domein.',
      'De samenwerking was vanaf het eerste moment prima. Ze pasten hun plannen 4 of 5 keer aan — nooit een onvertogen woord.',
      'De aftersales is meer dan prima. Exclusief staat voor kwaliteit: klantbenadering, begeleiding, bouw en nazorg op uitzonderlijk hoog niveau.',
    ],
  },
]

export const faqs = [
  {
    question: 'Heb ik een vergunning nodig?',
    answer:
      'Kleine aanbouwen (tot ca. 4 meter diep, niet hoger dan de nok) zijn vaak vergunningvrij. Serre Exclusief adviseert u hierover en kan de vergunningsaanvraag voor u verzorgen.',
  },
  {
    question: 'Hoeveel kost een aluminium serre?',
    answer:
      'Een aluminium serre begint vanaf circa € 15.000 (incl. plaatsing, excl. BTW). De gemiddelde prijs per m² ligt tussen € 2.000 en € 2.500.',
  },
  {
    question: 'Hoe lang duurt het traject?',
    answer:
      'Na goedkeuring van het ontwerp duurt de productie gemiddeld 6–10 weken. De plaatsing volgt daarna in 3–7 werkdagen.',
  },
  {
    question: 'Maakt Serre Exclusief ook de fundering?',
    answer:
      'Ja. Serre Exclusief verzorgt het volledige project van A tot Z: van fundering en kozijnen tot glas, zonwering en interieurafwerking.',
  },
  {
    question: 'Wat is het verschil tussen een serre en tuinkamer?',
    answer:
      'Een serre is volledig geïsoleerd en een luxe aan- of uitbouw. Een tuinkamer is een ongeïsoleerde buitenruimte, afgesloten van de woonruimte.',
  },
  {
    question: 'Hebben jullie een showroom?',
    answer:
      'Jazeker, u bent van harte welkom in Borne! Ma–Do 9:00–12:00 (middag en avond op afspraak), Vr–Za 10:00–17:00. Bel 074 278 3950 of plan een afspraak via de configurator.',
  },
  {
    question: 'Hoeveel onderhoud heeft een serre nodig?',
    answer:
      'Aluminium serres zijn onderhoudsarm. Eens in de zoveel tijd schoonmaken met lauw water en eventueel een scheutje mild reinigingsmiddel is voldoende.',
  },
  {
    question: 'Wat is het voordeel van steellook t.o.v. stalen kozijnen?',
    answer:
      'Steellook kozijnen hebben het uiterlijk van staal maar zijn gemaakt van geïsoleerd aluminium — geen roest, geen schilderwerk en onderhoudsarm.',
  },
]

export const usps = [
  { title: 'Alles onder één dak', description: 'Van fundering tot zonwering, alles in eigen huis' },
  { title: 'Volledig op maat', description: 'Elke serre wordt speciaal voor uw woning ontworpen' },
  { title: 'Eigen monteursteam', description: 'Plaatsing door vakmensen uit Borne, door heel Nederland' },
  { title: 'Gratis advies', description: 'Vrijblijvend adviesgesprek en opmeting bij u thuis' },
]

export const heroSlides = [
  { src: '/impressions/uitbouw/hero-exterior.jpg', label: 'Serre uitbouw' },
  { src: '/impressions/uitbouw/evening-luxury.jpg', label: 'Avond sfeer' },
  { src: '/impressions/steellook/hero-exterior.jpg', label: 'Steellook serre' },
  { src: '/impressions/houten/hero-exterior.jpg', label: 'Houten serre' },
  { src: '/impressions/tuinkamer/hero-exterior.jpg', label: 'Tuinkamer' },
  { src: '/impressions/schuifpui/hero-exterior.jpg', label: 'Schuifpui' },
  { src: cdn('632f2c7791252da548ee6814_van-Dalen-Dalfsen-01.avif'), label: 'Referentie Dalfsen' },
]

export const galleryImages = [
  { src: '/impressions/uitbouw/hero-exterior.jpg', label: 'Serre uitbouw — visualisatie', span: 'lg:col-span-2 lg:row-span-2', category: 'serre-uitbouw' },
  { src: '/impressions/uitbouw/evening-luxury.jpg', label: 'Avond in uw serre', span: '', category: 'serre-uitbouw' },
  { src: '/impressions/uitbouw/interior-living.jpg', label: 'Licht interieur', span: '', category: 'serre-uitbouw' },
  { src: cdn('6374b630219fba2eddc47d0e_serre-uitbouw.avif'), label: 'Echt project', span: '', category: 'serre-uitbouw' },
  { src: cdn('6374b6308a4b542f0e40c210_serre-uitbouw1.avif'), label: 'Interieur serre', span: '', category: 'serre-uitbouw' },
  { src: '/impressions/steellook/hero-exterior.jpg', label: 'Steellook — visualisatie', span: 'lg:col-span-2', category: 'steellook-serre' },
  { src: '/impressions/steellook/evening-luxury.jpg', label: 'Steellook avond', span: '', category: 'steellook-serre' },
  { src: '/impressions/steellook/interior-living.jpg', label: 'Steellook interieur', span: '', category: 'steellook-serre' },
  { src: '/impressions/houten/hero-exterior.jpg', label: 'Houten serre — visualisatie', span: 'lg:col-span-2', category: 'houten-serre' },
  { src: '/impressions/houten/interior-living.jpg', label: 'Warm houten interieur', span: '', category: 'houten-serre' },
  { src: '/impressions/tuinkamer/hero-exterior.jpg', label: 'Tuinkamer — visualisatie', span: 'lg:col-span-2', category: 'tuinkamer-veranda' },
  { src: '/impressions/tuinkamer/evening-garden.jpg', label: 'Zomeravond tuinkamer', span: '', category: 'tuinkamer-veranda' },
  { src: '/impressions/tuinkamer/cozy-rain.jpg', label: 'Regendag tuinkamer', span: '', category: 'tuinkamer-veranda' },
  { src: '/impressions/schuifpui/hero-exterior.jpg', label: 'Schuifpui — visualisatie', span: '', category: 'minimalistische-schuifpui' },
  { src: '/impressions/schuifpui/evening-luxury.jpg', label: 'Schuifpui avond', span: '', category: 'minimalistische-schuifpui' },
  { src: cdn('632f2c7791252da548ee6814_van-Dalen-Dalfsen-01.avif'), label: 'Dalfsen', span: '', category: 'referentie' },
  { src: cdn('632f5032e846c04093e37033_muzki-miki-amstelveen-01.avif'), label: 'Amstelveen', span: '', category: 'referentie' },
]

export const blogPosts = [
  {
    title: 'Serre als Thuiskantoor',
    excerpt: 'Hoe u een serre kunt transformeren tot een productieve werkruimte met daglicht en rust.',
    image: cdn('65cdd577f62da96f967d8e79_placeholder-slider-afbeelding-large%20(3).avif'),
    href: `${brand.website}/blog/serre-als-thuiskantoor-hoe-u-een-serre-kunt-transformeren-tot-een-productieve-werkruimte`,
  },
  {
    title: 'Serre Trends 2024',
    excerpt: 'Ontdek de laatste trends in serre-ontwerp, materialen en afwerking.',
    image: cdn('65cdce551f31351c3d6b6e34_placeholder-slider-afbeelding-large%20(2).avif'),
    href: `${brand.website}/blog/ontdek-de-laatste-serre-trends-voor-2024`,
  },
  {
    title: 'Seizoensbeleving',
    excerpt: 'De invloed van serres op hoe u de seizoenen beleeft — van lente tot winter.',
    image: cdn('65ccc18b9bd2cf2bd09b8097_placeholder-slider-afbeelding-large%20(1).avif'),
    href: `${brand.website}/blog/de-invloed-van-serres-op-seizoensbeleving`,
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Configurator',
    description: 'Stel uw serre samen in 3D en ontvang direct een prijsindicatie.',
    image: 'https://cdn.prod.website-files.com/62d6989abb98a33f33f0ea56/637786de3a645d346edfa1ee_schuifpui-slank.avif',
    duration: '5 min',
  },
  {
    step: '02',
    title: 'Advies thuis',
    description: 'Gratis en vrijblijvend gesprek met opmeting bij u aan huis.',
    image: 'https://cdn.prod.website-files.com/62d6989abb98a33f33f0ea56/632f50223e498e3a6b447ad7_muzki-miki-amstelveen-thumbnail.avif',
    duration: '1 dag',
  },
  {
    step: '03',
    title: 'Productie',
    description: 'Maatwerk in onze werkplaats in Borne, 6–10 weken levertijd.',
    image: 'https://cdn.prod.website-files.com/62d6989abb98a33f33f0ea56/637787bf28d036f65201e9fe_steellook_serre1.avif',
    duration: '6–10 wk',
  },
  {
    step: '04',
    title: 'Plaatsing',
    description: 'Eigen monteursteam plaatst uw serre in 3–7 werkdagen.',
    image: 'https://cdn.prod.website-files.com/62d6989abb98a33f33f0ea56/6374b630219fba2eddc47d0e_serre-uitbouw.avif',
    duration: '3–7 dgn',
  },
]

export const showroomPhotos = [
  { src: cdn('6374b630219fba2eddc47d0e_serre-uitbouw.avif'), label: 'Serre uitbouw in showroom' },
  { src: cdn('637787be7bbecf6df3e3c8e6_steellook_serre2.avif'), label: 'Steellook afwerking' },
  { src: cdn('6377894fd1a010a861e8edb6_houten-serre-2.avif'), label: 'Houten serre detail' },
  { src: cdn('6374b6dec86c3e4691b9c443_tuinkamer_veranda0.avif'), label: 'Tuinkamer interieur' },
]