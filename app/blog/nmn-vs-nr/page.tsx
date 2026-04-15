import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'NMN vs NR: Which Is Better for NAD+ and Longevity? (2025) | healthybychoice.ai',
  description: 'NMN and NR both raise NAD+ levels — but they work differently. Here is what the human clinical trials actually show, and which one makes more sense for you.',
  keywords: ['NMN vs NR', 'nicotinamide mononucleotide vs nicotinamide riboside', 'best NAD+ precursor', 'NMN or NR longevity'],
  openGraph: {
    title: 'NMN vs NR: Which Is Better for NAD+ and Longevity?',
    description: 'A science-based comparison of the two leading NAD+ precursors — what the human trials show and which one to choose.',
    url: 'https://www.healthybychoice.ai/blog/nmn-vs-nr',
    siteName: 'healthybychoice.ai',
    type: 'article',
  },
}

// ─── Shared components ────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-slate-800">Healthy By Choice</span>
          </Link>
          <Link href="/foundational" className="hidden md:block text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            Longevity Stack →
          </Link>
        </div>
      </div>
    </nav>
  )
}

function DisclosureBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 py-2 px-6 text-center">
      <p className="text-xs text-amber-800 max-w-4xl mx-auto">
        <strong>Affiliate Disclosure:</strong> This article contains affiliate links. We may earn a small commission at no extra cost to you.{' '}
        <strong>Not medical advice.</strong> Consult your physician before starting any supplement.
      </p>
    </div>
  )
}

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

// ─── CTA box ──────────────────────────────────────────────────────────────────
function CTABox() {
  return (
    <div className="my-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white">
      <h3 className="font-bold text-lg mb-2">Ready to start with NMN?</h3>
      <p className="text-violet-200 text-sm mb-4">
        See our full Mitochondrial Longevity Stack guide — with product recommendations, dosing guidance, and the Urolithin A pairing that addresses the same aging problem from a different angle.
      </p>
      <Link
        href="/foundational"
        className="inline-block bg-white text-violet-700 font-bold px-6 py-2.5 rounded-full hover:bg-violet-50 transition-colors text-sm"
      >
        View the Full Longevity Stack →
      </Link>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 bg-white border-t border-slate-100 mt-16">
      <div className="max-w-4xl mx-auto px-6 text-center text-xs text-slate-400">
        <p className="mb-2">
          <strong>Medical disclaimer:</strong> This article is for educational purposes only. Not medical advice. Statements have not been evaluated by the FDA. Consult a qualified healthcare provider before starting any supplement.
        </p>
        <p>© {new Date().getFullYear()} Healthy By Choice ·{' '}
          <Link href="/" className="hover:text-emerald-600 underline">Home</Link> ·{' '}
          <Link href="/foundational" className="hover:text-emerald-600 underline">Longevity Stack</Link>
        </p>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NMNvsNRPage() {
  return (
    <main className="min-h-screen bg-white">
      <DisclosureBanner />
      <Nav />

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">NAD+ Science</span>
            <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">Updated April 2025</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            NMN vs NR: Which Is Better for NAD+ and Longevity?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Both NMN and NR raise NAD+ levels. Both have human clinical trial data. Both are sold by dozens of brands making nearly identical claims. So how do you actually choose? Here is what the peer-reviewed evidence shows — without the brand spin.
          </p>
        </div>

        {/* Quick answer box */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-slate-800 text-base mb-2">⚡ Quick Answer</h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            NMN and NR both effectively raise NAD+ levels and are safe in human trials. NMN is one metabolic step closer to NAD+ and has a rapidly growing body of human trial data showing benefits for insulin sensitivity, walking speed, muscle function, and telomere length. NR has a longer published clinical track record. Neither has been proven to extend human lifespan. For most people starting a longevity protocol today, <strong>NMN is the stronger current choice</strong> — but the more important question is whether you are taking either one consistently and at an adequate dose.
          </p>
        </div>

        {/* Section 1 */}
        <h2 className="text-2xl font-extrabold text-slate-900 mt-12 mb-4">
          Why NAD+ Matters in the First Place
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          NAD+ (nicotinamide adenine dinucleotide) is a coenzyme found in every cell in your body. It powers the mitochondria, enables DNA repair, activates sirtuins (the proteins most associated with longevity), and regulates hundreds of metabolic reactions. Without it, cells cannot produce energy.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          The problem is that NAD+ levels decline steadily with age. By the time you reach your 50s, you may have half the NAD+ you had in your 20s. This decline is now recognized as one of the central mechanisms driving the cellular deterioration we associate with aging — reduced energy, slower DNA repair, impaired mitochondrial function, and increased inflammation.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          NMN and NR are both precursors — molecules your body converts into NAD+. The core argument for supplementing with either one is simple: if your NAD+ is low, give your cells the raw materials to make more.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-extrabold text-slate-900 mt-12 mb-4">
          How NMN and NR Differ — The Biochemistry
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Both molecules feed into the same NAD+ salvage pathway — your body's primary system for recycling and producing NAD+. But they enter at different points.
        </p>

        {/* Pathway comparison */}
        <div className="grid md:grid-cols-2 gap-4 my-8">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="text-2xl mb-2">🔵</div>
            <h3 className="font-bold text-slate-800 mb-2">NR (Nicotinamide Riboside)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Enters cells via nucleoside transporters, then gets converted to NMN by NR kinase enzymes — and finally to NAD+. Two conversion steps required.
            </p>
            <div className="mt-3 text-xs text-slate-500 font-mono bg-white rounded-lg p-2 border border-slate-100">
              NR → NMN → NAD+
            </div>
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-bold text-slate-800 mb-2">NMN (Nicotinamide Mononucleotide)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              One step closer to NAD+. Converted directly by NMNAT enzymes. In 2025, researchers confirmed a dedicated NMN transporter (Slc12a8) that allows cells to absorb NMN directly.
            </p>
            <div className="mt-3 text-xs text-slate-500 font-mono bg-white rounded-lg p-2 border border-violet-100">
              NMN → NAD+
            </div>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed mb-6">
          The discovery of the Slc12a8 transporter is significant — it means NMN has its own dedicated cellular uptake mechanism, independent of the conversion pathway NR relies on. This may explain why NMN appears particularly effective in tissues like the gut and skeletal muscle that express this transporter.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-extrabold text-slate-900 mt-12 mb-4">
          What Human Clinical Trials Actually Show
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          This is where most NMN vs NR comparisons fall short — they cite animal studies or cherry-pick single trials. Here is an honest summary of the human evidence for both.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-4">NMN — Human Trial Results</h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xl mt-0.5">💉</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Cell Metabolism" year="2022" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A randomized, multicenter, double-blind placebo-controlled trial found 250 mg/day NMN improved muscle insulin sensitivity by 25% over 10 weeks in overweight women with prediabetes — measured by the gold-standard metabolic clamp test.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xl mt-0.5">🚶</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="NPJ Aging" year="2024" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                In healthy older adults aged 65–75, 12 weeks of 250 mg/day NMN significantly improved 4-meter walking speed and elevated blood NAD+ levels compared to placebo — a direct measure of physical aging.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xl mt-0.5">🧬</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Advances in Nutrition (Meta-analysis)" year="2023" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A systematic review and meta-analysis pooling 9 human studies and 412 participants found NMN has positive effects on muscle function, gait speed, insulin resistance, and telomere length in middle-aged and elderly individuals.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xl mt-0.5">🛡️</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Multiple RCTs" year="2020–2025" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                Across more than a dozen human clinical trials at doses of 100–1,250 mg/day, NMN has shown a consistently favorable safety profile. The FDA confirmed in September 2025 that NMN qualifies as a legal dietary supplement in the United States.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4">NR — Human Trial Results</h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-white border-blue-100">
            <span className="text-xl mt-0.5">📈</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Nature Communications" year="2018" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A landmark trial showed 500 mg NR twice daily raised blood NAD+ by approximately 60% in healthy middle-aged adults over 6 weeks. This established NR's bioavailability in humans and became the reference point for much subsequent research.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-white border-blue-100">
            <span className="text-xl mt-0.5">🧠</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Alzheimers & Dementia" year="2024" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A pilot study in older adults with mild cognitive impairment found NR supplementation safely raised blood NAD+ levels. NR has also been studied in Parkinson's disease patients and heart failure populations — giving it a broader tested population range than NMN currently.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-white border-blue-100">
            <span className="text-xl mt-0.5">⚠️</span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <StudyBadge journal="Science Advances" year="2023" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A thorough review of NR human trials concluded that while NR consistently raises NAD+ levels, evidence for downstream functional benefits such as insulin sensitivity or physical performance improvements remains more limited compared to NMN's growing trial data.
              </p>
            </div>
          </div>
        </div>

        {/* Head to head comparison table */}
        <h2 className="text-2xl font-extrabold text-slate-900 mt-12 mb-6">
          NMN vs NR: Side-by-Side Comparison
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left p-4 font-bold text-slate-700">Factor</th>
                <th className="text-left p-4 font-bold text-violet-700">NMN ⚡</th>
                <th className="text-left p-4 font-bold text-blue-700">NR 🔵</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-medium text-slate-700">Steps to NAD+</td>
                <td className="p-4 text-slate-600">1 step (NMN → NAD+)</td>
                <td className="p-4 text-slate-600">2 steps (NR → NMN → NAD+)</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-4 font-medium text-slate-700">Dedicated transporter</td>
                <td className="p-4 text-emerald-600 font-semibold">✅ Yes (Slc12a8, confirmed 2025)</td>
                <td className="p-4 text-slate-500">No dedicated transporter</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-700">NAD+ elevation in humans</td>
                <td className="p-4 text-slate-600">~1.7–2.5x at 250 mg/day</td>
                <td className="p-4 text-slate-600">~1.6x at 1,000 mg/day</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-4 font-medium text-slate-700">Human trials (functional outcomes)</td>
                <td className="p-4 text-emerald-600 font-semibold">✅ Strong — muscle, insulin, walking speed, telomeres</td>
                <td className="p-4 text-slate-600">Moderate — NAD+ elevation well documented, functional benefits less consistent</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-700">Safety record</td>
                <td className="p-4 text-slate-600">Excellent across 12+ RCTs</td>
                <td className="p-4 text-slate-600">Excellent — longest safety track record</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-4 font-medium text-slate-700">Typical effective dose</td>
                <td className="p-4 text-slate-600">250–500 mg/day</td>
                <td className="p-4 text-slate-600">300–1,000 mg/day</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-700">Cost per month (approx.)</td>
                <td className="p-4 text-slate-600">$30–$60</td>
                <td className="p-4 text-slate-600">$40–$80 (branded NIAGEN)</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-4 font-medium text-slate-700">FDA legal status (US)</td>
                <td className="p-4 text-emerald-600 font-semibold">✅ Confirmed dietary supplement (Sept 2025)</td>
                <td className="p-4 text-emerald-600 font-semibold">✅ Legal dietary supplement</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-700">Best for</td>
                <td className="p-4 text-slate-600">Physical performance, metabolic health, telomere support</td>
                <td className="p-4 text-slate-600">Neurological health, broader population data</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA mid-article */}
        <CTABox />

        {/* Section 4 */}
        <h2 className="text-2xl font-extrabold text-slate-900 mt-12 mb-4">
          Has Anyone Actually Compared Them Head-to-Head?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          No. As of 2025, there is no published randomized controlled trial that has directly compared NMN and NR against each other in the same study. Every comparison you read — including this one — is based on indirect evidence from separate trials with different participants, doses, and outcome measures.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          A 2025 preprint from researchers who searched five major databases concluded that the structural differences between NMN and NR trial designs make a reliable head-to-head comparison currently impossible. The honest answer is that we do not know which one is definitively superior — only that both raise NAD+ and both are safe.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-extrabold text-slate-900 mt-12 mb-4">
          Which Should You Choose?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Based on the current state of the evidence, here is a practical guide:
        </p>
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 p-5 rounded-xl bg-violet-50 border border-violet-100">
            <span className="text-2xl">⚡</span>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Choose NMN if:</h4>
              <ul className="text-slate-600 text-sm space-y-1 list-disc list-inside">
                <li>You want the most direct NAD+ precursor with one fewer conversion step</li>
                <li>Physical performance, muscle function, or metabolic health is your primary goal</li>
                <li>You want access to the rapidly expanding 2023–2025 clinical trial data</li>
                <li>You are price-sensitive — the generic NMN market is competitive and affordable</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl bg-blue-50 border border-blue-100">
            <span className="text-2xl">🔵</span>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Choose NR if:</h4>
              <ul className="text-slate-600 text-sm space-y-1 list-disc list-inside">
                <li>You value the longest published human safety track record</li>
                <li>You prefer the established branded NIAGEN form with extensive quality data</li>
                <li>Neurological health or cognitive support is your primary concern</li>
                <li>You are in a specific clinical population (heart failure, Parkinson's) where NR has been studied</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <h2 className="text-2xl font-extrabold text-slate-900 mt-12 mb-4">
          What to Look for When Buying Either One
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: '🧪', title: 'Third-party tested', desc: 'Look for COA (Certificate of Analysis) from an independent lab confirming purity and dose.' },
            { icon: '🏭', title: 'GMP certified', desc: 'Good Manufacturing Practices certification means quality controls are in place.' },
            { icon: '📋', title: 'Transparent dose', desc: 'Avoid proprietary blends. The label should clearly state the exact mg of NMN or NR per serving.' },
            { icon: '⚗️', title: 'Active form only', desc: 'For NMN: look for β-NMN specifically. For NR: NIAGEN (ChromaDex) is the most studied form.' },
          ].map(item => (
            <div key={item.title} className="flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-semibold text-slate-800 text-sm mb-1">{item.title}</div>
                <div className="text-slate-600 text-xs leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 7 */}
        <h2 className="text-2xl font-extrabold text-slate-900 mt-12 mb-4">
          The Bigger Picture: NAD+ Is Just the Start
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Whether you choose NMN or NR, you are addressing one side of the mitochondrial aging problem — you are refueling your existing mitochondria with the NAD+ they need to function properly. But there is a second problem that neither NMN nor NR addresses: the accumulation of damaged, dysfunctional mitochondria that drag down cellular energy production and trigger inflammation.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          That is where Urolithin A comes in. It activates mitophagy — the cellular process that identifies and removes damaged mitochondria before they cause harm. The two work together: NMN refuels your mitochondria, Urolithin A clears out the broken ones.
        </p>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-violet-950 rounded-2xl p-6 text-white my-10">
          <h3 className="font-extrabold text-xl mb-2">
            See the Full Mitochondrial Longevity Stack
          </h3>
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">
            Our complete guide covers both NMN and Urolithin A — with peer-reviewed citations, dosing guidance, product recommendations, and the science of why these two work better together than either alone.
          </p>
          <Link
            href="/foundational"
            className="inline-block bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold px-6 py-2.5 rounded-full transition-colors text-sm"
          >
            Read the Longevity Stack Guide →
          </Link>
        </div>

        {/* Sources */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-widest">Sources & Further Reading</h3>
          <ul className="space-y-2 text-xs text-slate-500">
            <li>Yoshino et al. (2021). Nicotinamide mononucleotide increases muscle insulin sensitivity. <em>Cell Metabolism.</em></li>
            <li>Igarashi et al. (2024). β-NMN intake maintains walking speed and improves sleep in older adults. <em>NPJ Aging.</em></li>
            <li>Song et al. (2023). Safety and antiaging effects of NMN in human clinical trials. <em>Advances in Nutrition.</em></li>
            <li>Trammel et al. (2016). Nicotinamide riboside raises NAD+ in healthy adults. <em>Nature Communications.</em></li>
            <li>Yang et al. (2025). Updated review on NMN and NR mechanisms and clinical comparisons. <em>Food Frontiers.</em></li>
            <li>FDA (September 2025). Response to citizen petition confirming NMN dietary supplement status.</li>
          </ul>
        </div>

      </article>

      <Footer />
    </main>
  )
}
