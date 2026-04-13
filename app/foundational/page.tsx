import { Metadata } from 'next'
import Link from 'next/link'

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

// ─── Affiliate disclosure banner ──────────────────────────────────────────────
function DisclosureBanner() {
  return (
    <div id="disclosure" className="bg-amber-50 border-b border-amber-200 py-3 px-6 text-center">
      <p className="text-xs text-amber-800 max-w-4xl mx-auto">
        <strong>Affiliate Disclosure:</strong> This page contains affiliate links. If you purchase through our links, we may earn a small commission at no extra cost to you. This does not influence our recommendations — we only feature supplements backed by peer-reviewed human research.{' '}
        <strong>This is not medical advice.</strong> Always consult your physician before starting any supplement.
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

// ─── Supplement 1 — NMN ───────────────────────────────────────────────────────
function NMNSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
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

        {/* The core problem */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 mb-8 border border-violet-100">
          <h3 className="font-bold text-slate-800 text-lg mb-2">The problem no one talks about</h3>
          <p className="text-slate-600 leading-relaxed">
            Your mitochondria — the power plants inside every cell — run on a molecule called <strong>NAD+</strong>. It drives energy production, DNA repair, and cellular communication. The catch: <strong>by middle age, your NAD+ levels have dropped roughly 50% from their peak.</strong> This decline is now considered one of the primary drivers of how we age at the cellular level.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            NMN is a direct precursor to NAD+ — meaning your body converts it efficiently and quickly into the NAD+ your cells actually need. Think of it as restocking the fuel your mitochondria have been running short on for decades.
          </p>
        </div>

        {/* What the research says */}
        <h3 className="font-bold text-slate-800 text-xl mb-4">What the human trials actually show</h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:border-violet-200 transition-colors">
            <span className="text-2xl mt-0.5">🏃</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Cell Metabolism" year="2022" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A randomized, multicenter, double-blind placebo-controlled trial found that 250 mg/day of NMN over 10 weeks improved muscle insulin sensitivity by 25% in participants compared to placebo — measured by the gold-standard metabolic test. Muscle gene expression linked to energy remodeling also improved.
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
                In older adults (65–75), 12 weeks of NMN supplementation significantly improved 4-meter walking speed and elevated blood NAD+ and its metabolites compared to placebo — physical performance markers directly tied to healthy aging.
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
                A systematic review and meta-analysis pooling data from 9 human studies and 412 participants concluded that NMN has positive effects on muscle function, muscle mass, and insulin resistance markers in middle-aged and elderly individuals. Telomere length preservation was also observed.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:border-violet-200 transition-colors">
            <span className="text-2xl mt-0.5">🛡️</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="GeroScience / Multiple RCTs" year="2020–2024" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                Across more than a dozen human clinical trials at doses ranging from 100–1,250 mg/day, NMN has demonstrated a consistently favorable safety profile with no significant adverse events reported — confirming its tolerability for long-term use.
              </p>
            </div>
          </div>
        </div>

        {/* Dosage guidance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8">
          <h4 className="font-bold text-slate-800 mb-3">Dosage & timing</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-violet-50 rounded-xl">
              <div className="font-bold text-violet-700 text-lg">250–500 mg</div>
              <div className="text-slate-600">Daily dose used in most trials</div>
            </div>
            <div className="text-center p-3 bg-violet-50 rounded-xl">
              <div className="font-bold text-violet-700 text-lg">Morning</div>
              <div className="text-slate-600">Best taken with or without food, AM</div>
            </div>
            <div className="text-center p-3 bg-violet-50 rounded-xl">
              <div className="font-bold text-violet-700 text-lg">β-NMN</div>
              <div className="text-slate-600">Look for the active β isomer only</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-lg">Start replenishing your NAD+ today</h4>
              <p className="text-violet-200 text-sm mt-1">Your mitochondria have been waiting — every year you wait, NAD+ levels continue to fall.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="https://www.amazon.com/s?k=NMN+nicotinamide+mononucleotide+250mg"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-violet-700 font-bold px-6 py-3 rounded-full hover:bg-violet-50 transition-colors text-sm text-center whitespace-nowrap"
              >
                View NMN on Amazon →
              </a>
              <a
                href="https://www.iherb.com/c/nmn"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/50 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm text-center whitespace-nowrap"
              >
                View NMN on iHerb →
              </a>
            </div>
          </div>
          <p className="text-violet-300 text-xs mt-4">
            💡 <strong>What to look for:</strong> Products listing β-NMN (not a blend), third-party tested, 250–500 mg per serving. Avoid proprietary blends that obscure the actual dose.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Supplement 2 — Urolithin A ───────────────────────────────────────────────
function UroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
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

        {/* The core concept */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-100">
          <h3 className="font-bold text-slate-800 text-lg mb-2">Your cells have a built-in recycling system — and it slows with age</h3>
          <p className="text-slate-600 leading-relaxed">
            <strong>Mitophagy</strong> is your body's process for identifying and clearing out damaged, dysfunctional mitochondria so they can be replaced with healthy ones. It's essentially cellular housekeeping at the most fundamental level. The problem: this recycling process slows dramatically as you age, allowing damaged mitochondria to accumulate and drag down cellular energy production throughout your entire body.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            Urolithin A is the <strong>only compound that has demonstrated mitophagy activation in human clinical trials</strong>. It's derived naturally from pomegranate, berries, and walnuts via your gut microbiome — but the research shows that supplementing directly bypasses the gut conversion step that most people's microbiomes can't reliably complete.
          </p>
        </div>

        {/* What the research says */}
        <h3 className="font-bold text-slate-800 text-xl mb-4">What the human trials actually show</h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-white hover:border-emerald-200 transition-colors">
            <span className="text-2xl mt-0.5">🧪</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Nature Metabolism" year="2019" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                The first-in-human clinical trial of Urolithin A — published in one of science's most prestigious journals — confirmed it is safe, bioavailable, and induces a measurable molecular signature of improved mitochondrial health in human skeletal muscle after just 4 weeks of oral supplementation.
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
                A randomized, double-blind, placebo-controlled trial (88 participants, 4 months) found approximately 12% improvement in muscle strength with Urolithin A. Aerobic endurance (VO₂ peak) and 6-minute walk test performance also showed clinically meaningful improvements. Plasma C-reactive protein (inflammation marker) was significantly reduced, and muscle biopsies confirmed upregulation of proteins linked to mitophagy and mitochondrial metabolism.
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
                The most recent RCT (50 healthy middle-aged adults, 1,000 mg/day for 4 weeks) demonstrated that Urolithin A expanded populations of less-exhausted, more youthful CD8+ immune cells — and improved CD8+ fatty acid oxidation capacity — suggesting benefits extend to immune aging, not just muscle.
              </p>
            </div>
          </div>
        </div>

        {/* Dosage guidance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8">
          <h4 className="font-bold text-slate-800 mb-3">Dosage & timing</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <div className="font-bold text-emerald-700 text-lg">500–1,000 mg</div>
              <div className="text-slate-600">Dose range used in published trials</div>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <div className="font-bold text-emerald-700 text-lg">Any time</div>
              <div className="text-slate-600">Food does not affect bioavailability</div>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <div className="font-bold text-emerald-700 text-lg">Mitopure™</div>
              <div className="text-slate-600">The clinically studied form by Timeline</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-lg">Activate your cellular recycling system today</h4>
              <p className="text-emerald-200 text-sm mt-1">Every day, damaged mitochondria accumulate. Urolithin A is the only supplement shown in humans to reverse that process.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="https://www.amazon.com/s?k=urolithin+a+mitopure+timeline"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors text-sm text-center whitespace-nowrap"
              >
                View Urolithin A on Amazon →
              </a>
              <a
                href="https://www.iherb.com/c/urolithin-a"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/50 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm text-center whitespace-nowrap"
              >
                View Urolithin A on iHerb →
              </a>
            </div>
          </div>
          <p className="text-emerald-300 text-xs mt-4">
            💡 <strong>What to look for:</strong> The brand Timeline's Mitopure is the most clinically studied form. Look for a clearly labeled dose of 500–1,000 mg Urolithin A, not a proprietary blend.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Combined stack callout ────────────────────────────────────────────────────
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
          NMN replenishes the NAD+ fuel your existing mitochondria need to function properly. Urolithin A removes the damaged mitochondria that are dragging everything down and triggering cellular senescence. Together, they address the same fundamental problem from two different angles — making the combination more comprehensive than either alone.
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-3">⚡ NMN</div>
            <div className="text-white font-semibold mb-2">Refuels your mitochondria</div>
            <div className="text-slate-400 text-sm">Restores NAD+ — the molecule that powers cellular energy production, DNA repair, and sirtuin activation. Declines ~50% by midlife.</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-3">🔬 Urolithin A</div>
            <div className="text-white font-semibold mb-2">Clears out the damaged ones</div>
            <div className="text-slate-400 text-sm">Activates mitophagy — the cellular process that identifies and removes dysfunctional mitochondria before they trigger inflammation and accelerate aging.</div>
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
        <p className="text-lg md:text-xl text-slate-300 mb-4 leading-relaxed max-w-2xl mx-auto">
          Mitochondrial decline is not inevitable — it's addressable. These are the only two supplements with peer-reviewed, randomized, controlled human trial data supporting direct mitochondrial and cellular aging benefits.
        </p>
        <p className="text-slate-400 text-sm mb-10">
          No omega-3s. No generic antioxidants. These go deeper.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#nmn" className="bg-violet-500 hover:bg-violet-400 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-violet-500/30">
            ⚡ Start with NMN
          </a>
          <a href="#urolithin" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-emerald-500/30">
            🔬 Start with Urolithin A
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
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center text-xs text-slate-400 max-w-3xl mx-auto">
          <p className="mb-2">
            <strong>Medical disclaimer:</strong> The information on this page is for educational purposes only and is not intended as medical advice, diagnosis, or treatment. Statements about supplements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Always consult a qualified healthcare provider before starting any supplement regimen.
          </p>
          <p>© {new Date().getFullYear()} Healthy By Choice · <Link href="/" className="hover:text-emerald-600 underline">Home</Link> · <Link href="/foundational#disclosure" className="hover:text-emerald-600 underline">Affiliate Disclosure</Link></p>
        </div>
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
      <div id="nmn">
        <NMNSection />
      </div>
      <div id="urolithin">
        <UroSection />
      </div>
      <StackSection />
      <Footer />
    </main>
  )
}
