import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Mitochondrial Longevity Stack: NMN + Urolithin A | healthybychoice.ai',
  description: 'The two supplements with the strongest human clinical trial evidence for mitochondrial health and cellular aging — NMN and Urolithin A. Science citations included.',
  keywords: ['NMN', 'Urolithin A', 'mitochondria', 'NAD+', 'longevity supplements', 'mitophagy', 'anti-aging'],
  openGraph: {
    title: 'Mitochondrial Longevity Stack: NMN + Urolithin A',
    description: 'Two supplements with direct human trial evidence for mitochondrial health and cellular aging support.',
    url: 'https://www.healthybychoice.ai/foundational',
    siteName: 'healthybychoice.ai',
    type: 'article',
  },
}

// ─── Affiliate disclosure ─────────────────────────────────────────────────────
function DisclosureBanner() {
  return (
    <div id="disclosure" className="bg-amber-50 border-b border-amber-200 py-3 px-6 text-center">
      <p className="text-xs text-amber-800 max-w-4xl mx-auto">
        <strong>Affiliate Disclosure:</strong> This page contains affiliate links. We may earn a small commission at no extra cost to you. This does not influence our recommendations.{' '}
        <strong>Not medical advice.</strong> Consult your physician before starting any supplement.
      </p>
    </div>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-slate-800">Healthy By Choice</span>
          </Link>
          <Link
            href="/quiz"
            className="hidden md:block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ─── Study badge ──────────────────────────────────────────────────────────────
function StudyBadge({ journal, year }: { journal: string; year: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-100">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
      {journal} · {year}
    </span>
  )
}

// ─── YouTube embed (privacy-enhanced, no competitor ads) ──────────────────────
function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
        🎥 Watch — {title}
      </p>
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100"
           style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

// ─── Product card with image + buy links ─────────────────────────────────────
function ProductCard({
  imageSrc,
  imageAlt,
  productName,
  tagline,
  amazonUrl,
  iherbUrl,
  accentColor,
}: {
  imageSrc: string
  imageAlt: string
  productName: string
  tagline: string
  amazonUrl: string
  iherbUrl: string
  accentColor: 'violet' | 'emerald'
}) {
  const accent = {
    violet: {
      bg: 'from-violet-600 to-purple-600',
      shadow: 'shadow-violet-500/30',
      btn: 'bg-white text-violet-700 hover:bg-violet-50',
      border: 'border-violet-100',
      badge: 'bg-violet-50 text-violet-700',
    },
    emerald: {
      bg: 'from-emerald-600 to-teal-600',
      shadow: 'shadow-emerald-500/30',
      btn: 'bg-white text-emerald-700 hover:bg-emerald-50',
      border: 'border-emerald-100',
      badge: 'bg-emerald-50 text-emerald-700',
    },
  }[accentColor]

  return (
    <div className={`rounded-2xl border ${accent.border} overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow`}>
      {/* Product image — linked to Amazon */}
      <a
        href={amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full bg-slate-50 overflow-hidden group"
        style={{ height: '220px' }}
        aria-label={`Buy ${productName} on Amazon`}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white text-sm font-semibold">View on Amazon →</span>
        </div>
      </a>

      {/* Info */}
      <div className="p-5">
        <h4 className="font-bold text-slate-800 text-base mb-1">{productName}</h4>
        <p className="text-slate-500 text-sm mb-4">{tagline}</p>
        <div className="flex flex-col gap-2">
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full text-center font-bold py-2.5 rounded-full bg-gradient-to-r ${accent.bg} text-white shadow-md ${accent.shadow} hover:opacity-90 transition-opacity text-sm`}
          >
            Buy on Amazon
          </a>
          <a
            href={iherbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full text-center font-semibold py-2.5 rounded-full border ${accent.border} ${accent.badge} hover:opacity-80 transition-opacity text-sm`}
          >
            Buy on iHerb
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Supplement 1 — NMN ───────────────────────────────────────────────────────
function NMNSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="nmn">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-violet-500/30">
            ⚡
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600">Supplement #1</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-1">
              NMN — Nicotinamide Mononucleotide
            </h2>
            <p className="text-slate-500 mt-1 font-medium">Restores the cellular fuel your mitochondria run on</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 mb-8 border border-violet-100">
          <h3 className="font-bold text-slate-800 text-lg mb-2">The problem no one talks about</h3>
          <p className="text-slate-600 leading-relaxed">
            Your mitochondria run on a molecule called <strong>NAD+</strong>. It drives energy production, DNA repair, and cellular communication. The catch: <strong>by middle age, your NAD+ levels have dropped roughly 50% from their peak.</strong> NMN is a direct precursor to NAD+ — your body converts it efficiently into the fuel your cells have been running short on for decades.
          </p>
        </div>

        {/* Product cards — image + buy links */}
        <h3 className="font-bold text-slate-800 text-xl mb-4">Recommended products</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <ProductCard
            imageSrc="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80"
            imageAlt="NMN supplement capsules for NAD+ support"
            productName="β-NMN 250–500 mg"
            tagline="Look for pure β-NMN, third-party tested, GMP certified"
            amazonUrl="https://www.amazon.com/s?k=NMN+nicotinamide+mononucleotide+beta+250mg+500mg"
            iherbUrl="https://www.iherb.com/c/nmn"
            accentColor="violet"
          />
          <ProductCard
            imageSrc="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80"
            imageAlt="NAD+ cellular energy molecule supplement"
            productName="Liposomal NMN (enhanced absorption)"
            tagline="Liposomal form may improve bioavailability past stomach acid"
            amazonUrl="https://www.amazon.com/s?k=liposomal+NMN+supplement+NAD"
            iherbUrl="https://www.iherb.com/c/nmn"
            accentColor="violet"
          />
        </div>

        <h3 className="font-bold text-slate-800 text-xl mb-4">What the human trials show</h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:border-violet-200 transition-colors">
            <span className="text-2xl mt-0.5">🏃</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Cell Metabolism" year="2022" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A randomized, multicenter, double-blind placebo-controlled trial found that 250 mg/day of NMN over 10 weeks improved muscle insulin sensitivity by 25% compared to placebo. Muscle gene expression linked to energy remodeling also improved significantly.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:border-violet-200 transition-colors">
            <span className="text-2xl mt-0.5">🚶</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="NPJ Aging" year="2022" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                In older adults (65–75), 12 weeks of NMN supplementation significantly improved 4-meter walking speed and elevated blood NAD+ levels compared to placebo — physical markers directly tied to healthy aging trajectories.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:border-violet-200 transition-colors">
            <span className="text-2xl mt-0.5">🧬</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Advances in Nutrition (Meta-analysis)" year="2023" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A systematic review and meta-analysis pooling 9 human studies and 412 participants concluded NMN has positive effects on muscle function, muscle mass, insulin resistance, and telomere length in middle-aged and elderly individuals.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8">
          <h4 className="font-bold text-slate-800 mb-3">Dosage & what to look for</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-violet-50 rounded-xl">
              <div className="font-bold text-violet-700 text-lg">250–500 mg</div>
              <div className="text-slate-600">Daily dose in most trials</div>
            </div>
            <div className="text-center p-3 bg-violet-50 rounded-xl">
              <div className="font-bold text-violet-700 text-lg">β-NMN only</div>
              <div className="text-slate-600">Active isomer — check the label</div>
            </div>
            <div className="text-center p-3 bg-violet-50 rounded-xl">
              <div className="font-bold text-violet-700 text-lg">GMP certified</div>
              <div className="text-slate-600">Quality manufacturing standard</div>
            </div>
          </div>
        </div>

        {/* Video — placed AFTER buy buttons so buyers aren't slowed down */}
        <VideoEmbed
          videoId="Ykvkg2Jz3X8"
          title="Dr. David Sinclair (Harvard) explains NMN & NAD+ aging science — Huberman Lab"
        />
      </div>
    </section>
  )
}

// ─── Supplement 2 — Urolithin A ───────────────────────────────────────────────
function UroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50" id="urolithin">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-emerald-500/30">
            🔬
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Supplement #2</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-1">
              Urolithin A
            </h2>
            <p className="text-slate-500 mt-1 font-medium">The only supplement proven in humans to activate mitophagy</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-100">
          <h3 className="font-bold text-slate-800 text-lg mb-2">Your cells have a built-in recycling system — and it slows with age</h3>
          <p className="text-slate-600 leading-relaxed">
            <strong>Mitophagy</strong> is your body's process for identifying and clearing out damaged mitochondria so they can be replaced with healthy ones. This recycling slows dramatically with age, allowing damaged mitochondria to accumulate and drag down energy production throughout your entire body. Urolithin A is the <strong>only compound with human clinical trial data directly confirming mitophagy activation.</strong>
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            It's derived from pomegranate, berries, and walnuts via your gut microbiome — but only about 30–40% of people can produce it naturally at meaningful levels. Direct supplementation bypasses this gap entirely.
          </p>
        </div>

        {/* Product cards */}
        <h3 className="font-bold text-slate-800 text-xl mb-4">Recommended products</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <ProductCard
            imageSrc="https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=600&q=80"
            imageAlt="Pomegranate — the natural source of Urolithin A"
            productName="Timeline Mitopure® (Softgels)"
            tagline="The clinically studied form — 500 mg/day, NSF certified"
            amazonUrl="https://www.amazon.com/s?k=Timeline+Mitopure+Urolithin+A+softgels"
            iherbUrl="https://www.iherb.com/c/urolithin-a"
            accentColor="emerald"
          />
          <ProductCard
            imageSrc="https://images.unsplash.com/photo-1550159930-40066082a4fc?w=600&q=80"
            imageAlt="Urolithin A supplement powder for mitochondrial health"
            productName="Timeline Mitopure® (Berry Powder)"
            tagline="Mix into yogurt or smoothies — same 500 mg clinically tested dose"
            amazonUrl="https://www.amazon.com/s?k=Timeline+Mitopure+Urolithin+A+powder+berry"
            iherbUrl="https://www.iherb.com/c/urolithin-a"
            accentColor="emerald"
          />
        </div>

        <h3 className="font-bold text-slate-800 text-xl mb-4">What the human trials show</h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-white hover:border-emerald-200 transition-colors">
            <span className="text-2xl mt-0.5">🧪</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Nature Metabolism" year="2019" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                The first-in-human clinical trial confirmed Urolithin A is safe, bioavailable, and induces a measurable molecular signature of improved mitochondrial health in human skeletal muscle after 4 weeks of oral supplementation.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-white hover:border-emerald-200 transition-colors">
            <span className="text-2xl mt-0.5">💪</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Cell Reports Medicine" year="2022" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A randomized, double-blind, placebo-controlled trial (88 participants, 4 months) found approximately 12% improvement in muscle strength. Aerobic endurance and walk performance also improved. C-reactive protein (inflammation) was significantly reduced. Muscle biopsies confirmed upregulation of mitophagy proteins.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-white hover:border-emerald-200 transition-colors">
            <span className="text-2xl mt-0.5">🛡️</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Nature Aging" year="2026" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                The most recent RCT (50 healthy middle-aged adults, 1,000 mg/day, 4 weeks) demonstrated that Urolithin A expanded populations of less-exhausted, more youthful CD8+ immune cells — suggesting benefits extend beyond muscle to immune aging.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8">
          <h4 className="font-bold text-slate-800 mb-3">Dosage & what to look for</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <div className="font-bold text-emerald-700 text-lg">500–1,000 mg</div>
              <div className="text-slate-600">Dose range in published trials</div>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <div className="font-bold text-emerald-700 text-lg">Mitopure™</div>
              <div className="text-slate-600">Only clinically validated form</div>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <div className="font-bold text-emerald-700 text-lg">Any time</div>
              <div className="text-slate-600">Food doesn't affect absorption</div>
            </div>
          </div>
        </div>

        {/* Video — after buy buttons */}
        <VideoEmbed
          videoId="REPLACE_WITH_URO_VIDEO_ID"
          title="The science of Urolithin A and mitophagy explained"
        />
        <p className="text-xs text-slate-400 mt-2">
          💡 <strong>Note for site owner:</strong> Replace <code>REPLACE_WITH_URO_VIDEO_ID</code> above with a YouTube video ID of your choice — Timeline's official channel, Peter Attia, or Dr. Mark Hyman's interview with Timeline's CMO Dr. Anurag Singh are all excellent options.
        </p>
      </div>
    </section>
  )
}

// ─── Combined stack section ───────────────────────────────────────────────────
function StackSection() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-block px-4 py-2 bg-white/10 text-emerald-300 rounded-full text-sm font-semibold mb-6">
          🔗 Why these two work together
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          The Mitochondrial{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            One-Two Punch
          </span>
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          NMN replenishes the NAD+ fuel your existing mitochondria need to function. Urolithin A removes damaged mitochondria that are dragging everything down. Together they address the same root problem from two different angles.
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-3">⚡ NMN</div>
            <div className="text-white font-semibold mb-2">Refuels your mitochondria</div>
            <div className="text-slate-400 text-sm">Restores NAD+ — down ~50% by midlife — powering cellular energy production, DNA repair, and sirtuin activation.</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-3">🔬 Urolithin A</div>
            <div className="text-white font-semibold mb-2">Clears out the damaged ones</div>
            <div className="text-slate-400 text-sm">Activates mitophagy — the cellular process that removes dysfunctional mitochondria before they trigger inflammation and accelerate aging.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950 to-emerald-950 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur text-emerald-300 rounded-full text-sm font-semibold mb-6">
          🔬 Human-trial evidence only — no animal studies, no hype
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Two Supplements That{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">
            Directly Target
          </span>
          {' '}Your Mitochondria
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
          These are the only two supplements with peer-reviewed, randomized, controlled human trial data supporting direct mitochondrial and cellular aging benefits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#nmn" className="bg-violet-500 hover:bg-violet-400 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-violet-500/30">
            ⚡ NMN — Refuel Your Cells
          </a>
          <a href="#urolithin" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-emerald-500/30">
            🔬 Urolithin A — Clear the Damage
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 text-center text-xs text-slate-400 max-w-3xl mx-auto">
        <p className="mb-2">
          <strong>Medical disclaimer:</strong> Information on this page is for educational purposes only. Not intended as medical advice, diagnosis, or treatment. Statements have not been evaluated by the FDA. These products are not intended to diagnose, treat, cure, or prevent any disease. Consult a qualified healthcare provider before starting any supplement.
        </p>
        <p>© {new Date().getFullYear()} Healthy By Choice · <Link href="/" className="hover:text-emerald-600 underline">Home</Link> · <Link href="/foundational#disclosure" className="hover:text-emerald-600 underline">Affiliate Disclosure</Link></p>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FoundationalPage() {
  return (
    <main className="min-h-screen bg-white">
      <DisclosureBanner />
      <Nav />
      <Hero />
      <NMNSection />
      <UroSection />
      <StackSection />
      <Footer />
    </main>
  )
}
