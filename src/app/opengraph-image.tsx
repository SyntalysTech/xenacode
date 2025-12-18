import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'XenaCode - Programador Full Stack Senior';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0f1a',
          backgroundImage: 'linear-gradient(135deg, #0a0f1a 0%, #172140 50%, #0a0f1a 100%)',
          padding: '40px 80px',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'flex',
              }}
            >
              {'<'}
            </div>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginLeft: '10px',
                marginRight: '10px',
                display: 'flex',
              }}
            >
              XenaCode
            </div>
            <div
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'flex',
              }}
            >
              {'/>'}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#e2e8f0',
              marginBottom: '20px',
              display: 'flex',
            }}
          >
            Programador Full Stack Senior
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              marginBottom: '40px',
              display: 'flex',
            }}
          >
            +12 años de experiencia
          </div>

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Desarrollo Web', 'Apps Móviles', 'IA', 'Ciberseguridad'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  color: '#a5b4fc',
                  fontSize: '18px',
                  fontWeight: '500',
                  display: 'flex',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* URL at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#64748b',
              display: 'flex',
            }}
          >
            xenacode.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
