import type { ModelId, SerreConfig } from '../types'

const cdn = (path: string) =>
  `https://cdn.prod.website-files.com/62d6989abb98a33f33f0ea56/${path}`

export type ImpressionType = 'ai' | 'referentie' | 'optie'

export interface ImpressionSlide {
  src: string
  caption: string
  location?: string
  type?: ImpressionType
}

export interface ModelImpressionSet {
  headline: string
  subline: string
  highlights: string[]
  quote?: { text: string; author: string; location: string }
  slides: ImpressionSlide[]
}

const impressions: Record<ModelId, ModelImpressionSet> = {
  'serre-uitbouw': {
    headline: 'Stel het u voor',
    subline: 'Visualisaties én echte projecten — zo wordt uw uitbouw de nieuwe favoriete plek in huis.',
    highlights: ['Tot 50 m² extra', 'Drielaags glas', 'Vloerverwarming mogelijk'],
    quote: {
      text: 'De serre is meer en meer onze leefplek geworden — met schuifpuien aan alle kanten.',
      author: 'Barend & Carla Scheppink',
      location: 'Zwolle',
    },
    slides: [
      { src: '/impressions/uitbouw/hero-exterior.jpg', caption: 'Zo kan uw uitbouw eruitzien', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/uitbouw/evening-luxury.jpg', caption: 'Uw serre in het avondlicht', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/uitbouw/interior-living.jpg', caption: 'Lichtrijke leefruimte met tuinzicht', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/uitbouw/morning-breakfast.jpg', caption: 'Ontbijten in uw nieuwe serre', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/uitbouw/cozy-rain.jpg', caption: 'Heerlijk vertoeven — ook bij regen', location: 'Visualisatie', type: 'ai' },
      { src: cdn('6374b630219fba2eddc47d0e_serre-uitbouw.avif'), caption: 'Lichtrijke serre uitbouw', location: 'Echt project', type: 'referentie' },
      { src: cdn('632f2c7791252da548ee6814_van-Dalen-Dalfsen-01.avif'), caption: 'Ruimte en licht', location: 'Dalfsen', type: 'referentie' },
      { src: cdn('632f2c7791252d25f4ee6813_van-Dalen-Dalfsen-02.avif'), caption: 'Naadloze overgang naar de tuin', location: 'Dalfsen', type: 'referentie' },
      { src: cdn('632f5032e846c04093e37033_muzki-miki-amstelveen-01.avif'), caption: 'Modern wooncomfort', location: 'Amstelveen', type: 'referentie' },
      { src: cdn('6374b6308a4b542f0e40c210_serre-uitbouw1.avif'), caption: 'Interieur met uitzicht', location: 'Echt project', type: 'referentie' },
    ],
  },
  'steellook-serre': {
    headline: 'Staallook elegantie',
    subline: 'Ultraslanke profielen met maximale lichtinval — zonder onderhoud van staal.',
    highlights: ['Staallook afwerking', 'Geen roest', 'Monumentaal geschikt'],
    quote: {
      text: 'Ze leven vrijwel in de serre. Ontbijten, werken, schilderen — alleen tv kijken doen ze elders.',
      author: 'De heer en mevrouw Peters',
      location: 'Borne',
    },
    slides: [
      { src: '/impressions/steellook/hero-exterior.jpg', caption: 'Zo kan uw steellook serre eruitzien', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/steellook/evening-luxury.jpg', caption: 'Avondsfeer met warm interieurlicht', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/steellook/interior-living.jpg', caption: 'Minimalistisch wonen in glas', location: 'Visualisatie', type: 'ai' },
      { src: cdn('637787bf28d036f65201e9fe_steellook_serre1.avif'), caption: 'Slanke steellook profielen', location: 'Echt project', type: 'referentie' },
      { src: cdn('637787be7bbecf6df3e3c8e6_steellook_serre2.avif'), caption: 'Detailafwerking kozijn', location: 'Referentie', type: 'referentie' },
      { src: cdn('632f24f2829453d852f23580_buma-pol-borne-01.avif'), caption: '25 m² extra woonruimte', location: 'Borne', type: 'referentie' },
      { src: cdn('632f24f29ea73b76622c5dfe_buma-pol-borne-02.avif'), caption: 'Licht van alle kanten', location: 'Borne', type: 'referentie' },
      { src: cdn('637787bf285ac86a00368d98_steellook_serre3.avif'), caption: 'Tijdloze uitstraling', location: 'Referentie', type: 'referentie' },
      { src: cdn('632f24f296a21bf0153dc601_buma-pol-borne-03.avif'), caption: 'Wonen in de serre', location: 'Borne', type: 'referentie' },
    ],
  },
  'houten-serre': {
    headline: 'Klassieke Engelse serre',
    subline: 'Warme houten kozijnen — perfect bij karakteristieke en monumentale panden.',
    highlights: ['FSC/PEFC hout', 'Op maat geschaafd', 'Welstandsgeschikt'],
    slides: [
      { src: '/impressions/houten/hero-exterior.jpg', caption: 'Zo kan uw houten serre eruitzien', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/houten/interior-living.jpg', caption: 'Warm interieur met tuinzicht', location: 'Visualisatie', type: 'ai' },
      { src: cdn('6377894fa06693cc9a9ff0a0_houten-serre-3.avif'), caption: 'Traditionele houten serre', location: 'Referentie', type: 'referentie' },
      { src: cdn('6377894fd1a010a861e8edb6_houten-serre-2.avif'), caption: 'Warme houtstructuur', location: 'Referentie', type: 'referentie' },
      { src: cdn('63778950826f877b944e8f13_houten-serre-4.avif'), caption: 'Klassiek ontwerp', location: 'Referentie', type: 'referentie' },
      { src: cdn('6374b630394e3871cac5b52f_serre-uitbouw2.avif'), caption: 'Licht en karakter', location: 'Referentie', type: 'referentie' },
    ],
  },
  'tuinkamer-veranda': {
    headline: 'Het hele jaar buiten',
    subline: 'Tuinkamer of veranda — geniet ongeacht weer en wind, dicht bij uw tuin.',
    highlights: ['Jaarrond bruikbaar', 'Snelle plaatsing', 'Flexibel ontwerp'],
    quote: {
      text: 'Bijna niets zo lekker als een warme dag, regenbui en in de tuinkamer zitten. Het getik op het dak — heerlijk!',
      author: 'Jan & Mendy Lommers',
      location: 'Hengelo',
    },
    slides: [
      { src: '/impressions/tuinkamer/hero-exterior.jpg', caption: 'Zo kan uw tuinkamer eruitzien', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/tuinkamer/evening-garden.jpg', caption: 'Zomeravond in de tuinkamer', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/tuinkamer/cozy-rain.jpg', caption: 'Heerlijk vertoeven — ook bij regen', location: 'Visualisatie', type: 'ai' },
      { src: cdn('6374b6de5ebece827dd5fa00_tuinkamer_veranda.avif'), caption: 'Tuinkamer aan de woning', location: 'Referentie', type: 'referentie' },
      { src: cdn('632f288d4a0d2f161868eb12_oldenhof-hengelo-01.avif'), caption: 'Tuin ademen', location: 'Oldenzaal', type: 'referentie' },
      { src: cdn('632f288d96a21b7da63e1015_oldenhof-hengelo-02.avif'), caption: 'Seizoenen beleven', location: 'Oldenzaal', type: 'referentie' },
      { src: cdn('632f245049442ac66ba70fd5_bonvanie-hengelo-02.avif'), caption: 'Buitengevoel binnen', location: 'Hengelo', type: 'referentie' },
      { src: cdn('6374b6dec86c3e94edb9c442_tuinkamer_veranda1.avif'), caption: 'Open naar de tuin', location: 'Referentie', type: 'referentie' },
      { src: cdn('632f288df6766d6d0b934615_oldenhof-hengelo-08.avif'), caption: 'Licht en lucht', location: 'Oldenzaal', type: 'referentie' },
    ],
  },
  'minimalistische-schuifpui': {
    headline: 'Maximaal glasoppervlak',
    subline: 'Vloer-tot-plafond schuifpuien — naadloze overgang tussen woning en tuin.',
    highlights: ['Ultra slank kozijn', 'Grote afmetingen', 'Naadloze overgang'],
    quote: {
      text: 'Serre Exclusief doet alles. Van fundering tot zonnewering — alles in eigen huis.',
      author: 'Mike & Nathalie Muz',
      location: 'Amstelveen',
    },
    slides: [
      { src: '/impressions/schuifpui/hero-exterior.jpg', caption: 'Zo kan uw schuifpui eruitzien', location: 'Visualisatie', type: 'ai' },
      { src: '/impressions/schuifpui/evening-luxury.jpg', caption: 'Naadloze overgang dag en nacht', location: 'Visualisatie', type: 'ai' },
      { src: cdn('637786de3a645d346edfa1ee_schuifpui-slank.avif'), caption: 'Minimalistische schuifpui', location: 'Referentie', type: 'referentie' },
      { src: cdn('637786dea70bb335b2add018_schuifpui-slank1.avif'), caption: 'Vloer-tot-plafond glas', location: 'Referentie', type: 'referentie' },
      { src: cdn('632f5032e846c04093e37033_muzki-miki-amstelveen-01.avif'), caption: 'Ruimte en licht', location: 'Amstelveen', type: 'referentie' },
      { src: cdn('637786deccc56f9146868a70_schuifpui-slank2.avif'), caption: 'Panoramisch uitzicht', location: 'Referentie', type: 'referentie' },
      { src: cdn('632f5032fa208d02a97c899b_muzki-miki-amstelveen-03.avif'), caption: 'Modern wonen', location: 'Amstelveen', type: 'referentie' },
    ],
  },
}

const roofBonus: Partial<Record<SerreConfig['roof'], ImpressionSlide>> = {
  lichtstraat: {
    src: cdn('6374b6308a4b542f0e40c210_serre-uitbouw1.avif'),
    caption: 'Extra daglicht via lichtstraat',
    location: 'Optie',
    type: 'optie',
  },
  schuin: {
    src: cdn('6377894fd1a010a861e8edb6_houten-serre-2.avif'),
    caption: 'Schuin dak met karakter',
    location: 'Optie',
    type: 'optie',
  },
}

export function getModelImpressions(config: SerreConfig): ModelImpressionSet {
  const base = impressions[config.model]
  const slides = [...base.slides]
  const hasAiSlides = slides.some((s) => s.type === 'ai')

  if (!hasAiSlides) {
    const roofSlide = roofBonus[config.roof]
    if (roofSlide && config.model !== 'tuinkamer-veranda' && config.model !== 'minimalistische-schuifpui') {
      slides.unshift(roofSlide)
    }
    if (config.options.includes('vloerverwarming')) {
      slides.unshift({
        src: cdn('6374b630394e3871cac5b52f_serre-uitbouw2.avif'),
        caption: 'Comfortabel met vloerverwarming',
        location: 'Optie',
        type: 'optie',
      })
    }
  }

  return { ...base, slides }
}