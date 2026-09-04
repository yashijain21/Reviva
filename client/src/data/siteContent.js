export const brand = {
  name: 'Reviva Skin & Surgery',
  tagline: "Delhi NCR's leading aesthetic clinic",
  subtitle: 'Where integrity meets aesthetic',
  phoneGhaziabad: '+91 78274 48711',
  phoneNoida: '+91 85958 56844',
  whatsapp: 'https://wa.me/917827448711',
}

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Non Surgical Face Lift (HIFU)', href: '/services/non-surgical-face-lift-hifu' },
      { label: 'RF Face Tightening', href: '/services/rf-face-tightening' },
      { label: 'Laser Treatment', href: '/services/laser-treatment' },
      { label: 'Skin Treatments', href: '/services/skin-treatments' },
      { label: 'Hair Treatment', href: '/services/hair-treatment' },
      { label: 'Medi Facials', href: '/services/medi-facials' },
      { label: 'Anti Ageing', href: '/services/anti-ageing' },
      { label: 'Dermatosurgery', href: '/services/dermatosurgery' },
    ],
  },
]

export const stats = [
  { value: '10+', label: 'Years experience' },
  { value: '10,000+', label: 'Happy patients' },
  { value: '15+', label: 'Core treatments' },
  { value: '99%', label: 'Patient satisfaction' },
]

export const trustPoints = [
  'Board certified dermatology',
  'USFDA approved lasers',
  'Award winning care',
  'Personalised plans',
]

export const featuredServices = [
  {
    slug: 'laser-treatment',
    title: 'Laser Hair Removal',
    category: 'Laser Treatment',
    description: 'Long-term reduction of unwanted hair with comfortable, precise sessions.',
    icon: 'spark',
  },
  {
    slug: 'anti-ageing',
    title: 'Botox and Fillers',
    category: 'Anti Ageing',
    description: 'Soft, natural rejuvenation for wrinkles, contours, and facial balance.',
    icon: 'face',
  },
  {
    slug: 'skin-treatments',
    title: 'Acne Treatment',
    category: 'Skin Treatments',
    description: 'Clear acne, scars, and pigmentation with evidence-led skin care.',
    icon: 'shield',
  },
  {
    slug: 'hair-treatment',
    title: 'Hair Transplant and PRP',
    category: 'Hair Treatment',
    description: 'Restore density and confidence with regenerative hair solutions.',
    icon: 'leaf',
  },
  {
    slug: 'medi-facials',
    title: 'Skin Rejuvenation',
    category: 'Medi Facials',
    description: 'Glow-focused treatments designed for brighter, healthier skin.',
    icon: 'glow',
  },
  {
    slug: 'dermatosurgery',
    title: 'Pigmentation Care',
    category: 'Dermatosurgery',
    description: 'Targeted correction for uneven tone, texture, and stubborn spots.',
    icon: 'target',
  },
]

export const doctor = {
  name: 'Dr. Aarushi Tyagi',
  credentials: 'MBBS, MD Dermatology, DNB Dermatology',
  bio: 'A board-certified dermatologist known for patient-first care, clinical precision, and aesthetic results that still look like you.',
}

export const whyReviva = [
  {
    title: 'Board certified expertise',
    description: 'Treatments led by qualified skin specialists with clinical depth.',
    icon: 'shield',
  },
  {
    title: 'Advanced technology',
    description: 'Modern lasers and devices selected for safe, effective outcomes.',
    icon: 'pulse',
  },
  {
    title: 'Personalised plans',
    description: 'Every protocol is shaped around your skin, hair, and treatment goals.',
    icon: 'leaf',
  },
  {
    title: 'Ethical and honest',
    description: 'We prioritise natural-looking results and transparent guidance.',
    icon: 'spark',
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Basic consultation',
    description: 'We understand your concern, history, and expectations.',
  },
  {
    step: '02',
    title: 'Skin assessment',
    description: 'A deeper diagnosis helps us choose the right approach.',
  },
  {
    step: '03',
    title: 'Custom treatment',
    description: 'Your care plan is built from the right treatment mix.',
  },
  {
    step: '04',
    title: 'Lasting glow',
    description: 'We support long-term maintenance and visible progress.',
  },
]

export const testimonials = [
  {
    name: 'Priya Sharma',
    treatment: 'Laser treatment',
    quote: 'Dr. Aarushi is extremely gentle and professional. My acne and pigmentation improved beautifully.',
  },
  {
    name: 'Rohit Verma',
    treatment: 'Skin rejuvenation',
    quote: 'One of the best aesthetic clinics in NCR. Natural results and premium care throughout.',
  },
  {
    name: 'Anjali Mehta',
    treatment: 'Botox and fillers',
    quote: 'Absolutely loved the experience. Everything from consultation to treatment was flawless.',
  },
]

export const journalEntries = [
  {
    date: 'JUNE 2024',
    title: 'How to choose the best sunscreen for Indian skin',
    description: 'Dermatologist-approved tips for healthy, protected skin.',
  },
  {
    date: 'MAY 2024',
    title: 'Laser hair removal: what actually works?',
    description: 'Everything you need to know before your sessions.',
  },
  {
    date: 'APRIL 2024',
    title: 'Acne scar treatments that truly deliver results',
    description: 'Modern treatments explained by experts.',
  },
]

export const serviceSections = [
  'Overview',
  'Who it is for',
  'Benefits',
  'How it works',
  'Recovery and aftercare',
  'FAQs',
]

export const servicePages = [
  {
    slug: 'non-surgical-face-lift-hifu',
    title: 'Non Surgical Face Lift (HIFU)',
    summary: 'Lift and contour without surgery using focused ultrasound energy.',
    concerns: ['Mild skin laxity', 'Jawline definition', 'Lower face lift'],
  },
  {
    slug: 'rf-face-tightening',
    title: 'RF Face Tightening',
    summary: 'Heat-based skin tightening for firmer texture and improved elasticity.',
    concerns: ['Early sagging', 'Fine lines', 'Texture refinement'],
  },
  {
    slug: 'laser-treatment',
    title: 'Laser Treatment',
    summary: 'Precision laser care for hair removal, pigmentation, and skin renewal.',
    concerns: ['Hair reduction', 'Pigmentation', 'Acne marks'],
  },
  {
    slug: 'skin-treatments',
    title: 'Skin Treatments',
    summary: 'Clinical skin solutions for acne, scars, glow, and barrier repair.',
    concerns: ['Acne', 'Scars', 'Uneven tone'],
  },
  {
    slug: 'hair-treatment',
    title: 'Hair Treatment',
    summary: 'Regenerative and restoration-based therapies for healthier hair growth.',
    concerns: ['Hair fall', 'Thinning', 'Low density'],
  },
  {
    slug: 'medi-facials',
    title: 'Medi Facials',
    summary: 'Results-driven facials designed to hydrate, clarify, and brighten.',
    concerns: ['Dullness', 'Congestion', 'Glow boost'],
  },
  {
    slug: 'anti-ageing',
    title: 'Anti Ageing',
    summary: 'Subtle rejuvenation options that soften lines and refresh contours.',
    concerns: ['Wrinkles', 'Volume loss', 'Tired appearance'],
  },
  {
    slug: 'dermatosurgery',
    title: 'Dermatosurgery',
    summary: 'Procedure-led treatment for lesions, scars, pigmentation, and repair.',
    concerns: ['Lesions', 'Scars', 'Localized correction'],
  },
]

