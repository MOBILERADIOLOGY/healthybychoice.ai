// app/foundational/page.tsx
export default function FoundationalStack() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px',
      lineHeight: '1.6',
      color: '#1f2937'
    }}>
      {/* Skimlinks Script */}
      <script 
        type="text/javascript" 
        src="https://s.skimresources.com/js/301387X1789342.skimlinks.js"
      />

      <header style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
          Foundational Longevity Stack: 2 Science-Backed Basics
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
          Simple, research-aware support for lifelong wellness — healthybychoice.ai
        </p>
      </header>

      <div style={{
        background: '#f9fafb',
        borderLeft: '4px solid #2563eb',
        padding: '14px 16px',
        margin: '20px 0',
        fontSize: '0.95rem'
      }}>
        <strong>Transparency:</strong> I may earn a commission if you buy through links on this page. 
        This supports my independent research at no extra cost to you.
      </div>

      <div style={{ margin: '24px 0' }}>
        <p>Whether you're 18 or 95, foundational wellness starts with basics. At <strong>healthybychoice.ai</strong>, we believe in simplicity first.</p>
      </div>

      {/* Omega-3 Section */}
      <div style={{ margin: '32px 0', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#2563eb', marginBottom: '8px' }}>
          1. High-Quality Omega-3 (EPA/DHA)
        </h3>
        <h4 style={{ fontSize: '1.1rem', marginTop: '12px', marginBottom: '6px' }}>Why include it</h4>
        <p>Omega-3 fatty acids support cardiovascular function, cognitive health, and healthy inflammation response.</p>
        
        <h4 style={{ fontSize: '1.1rem', marginTop: '12px', marginBottom: '6px' }}>Where to find it</h4>
        <p>
          <a href="https://www.amazon.com/s?k=omega+3+epa+dha+third+party+tested" 
             style={{ color: '#2563eb', display: 'block', marginBottom: '8px' }}>
            → View Omega-3 options on Amazon
          </a>
          <a href="https://www.iherb.com/c/omega-3-fish-oil" 
             style={{ color: '#2563eb' }}>
            → Explore Omega-3 on iHerb
          </a>
        </p>
      </div>

      {/* Vitamin D Section */}
      <div style={{ margin: '32px 0', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#2563eb', marginBottom: '8px' }}>
          2. Vitamin D3 + K2 (Cholecalciferol + MK-7)
        </h3>
        <h4 style={{ fontSize: '1.1rem', marginTop: '12px', marginBottom: '6px' }}>Why include it</h4>
        <p>Vitamin D supports immune function, bone health, and cellular wellness. K2 helps direct calcium to bones.</p>
        
        <h4 style={{ fontSize: '1.1rem', marginTop: '12px', marginBottom: '6px' }}>Where to find it</h4>
        <p>
          <a href="https://www.amazon.com/s?k=vitamin+d3+k2+mk7" 
             style={{ color: '#2563eb', display: 'block', marginBottom: '8px' }}>
            → View D3+K2 on Amazon
          </a>
          <a href="https://www.iherb.com/c/vitamin-d" 
             style={{ color: '#2563eb' }}>
            → Browse Vitamin D on iHerb
          </a>
        </p>
      </div>

      <div style={{
        background: '#eff6ff',
        padding: '16px',
        borderRadius: '8px',
        margin: '28px 0'
      }}>
        <strong>Why only two?</strong> Starting simple reduces overwhelm and interaction risks.
      </div>

      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb',
        fontSize: '0.85rem',
        color: '#6b7280'
      }}>
        <strong>Important:</strong> I am not a doctor. This is not medical advice. 
        Consult your healthcare provider before starting any supplement.
      </div>
    </div>
  );
}
