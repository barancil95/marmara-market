import Icon from '../components/Icon';
import ScreenHeader from '../components/ScreenHeader';
import { NAVY, YEL } from '../constants';
import { PICKUPS, CAMPUS_DATA } from '../data/items';

export default function PickupScreen({ nav, pickup, setPickup }) {
  const isBasibuyuk = pickup?.includes('RTE') || pickup?.includes('Başıbüyük');
  const campusKey = isBasibuyuk ? 'RTE Başıbüyük' : 'Göztepe';
  const campusInfo = CAMPUS_DATA[campusKey];

  return (
    <div>
      <ScreenHeader title="Teslim noktası" onBack={nav.back} />

      <div
        style={{
          height: 180,
          background: '#e5e3df',
          borderBottom: '1px solid #ebe7e7',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <iframe
          title={`${campusInfo.name} Google Haritası`}
          src={campusInfo.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            padding: '4px 10px',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            boxShadow: '0 2px 6px rgba(0,0,0,.15)',
            fontSize: 11,
            fontWeight: 700,
            color: NAVY
          }}
        >
          <Icon name="pin_drop" size={14} color="#d93025" />
          {campusInfo.name}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <p style={{ margin: '0 0 14px', fontSize: 12.5, color: '#434652', lineHeight: 1.5 }}>
          Kampüs içi güvenli teslim noktaları. Görüşmeler gündüz saatlerinde ve kalabalık alanlarda
          önerilir.
        </p>

        {PICKUPS.map((g) => (
          <div key={g.g} style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.04em',
                color: '#737783',
                marginBottom: 8
              }}
            >
              {g.g}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {g.pts.map((p) => {
                // Seçili değer "Göztepe · Merkez Kütüphane önü" biçiminde tutulur
                const val = `${g.g.split(' ')[0]} · ${p.label}`;
                const on = pickup === val;
                return (
                  <button
                    key={p.label}
                    onClick={() => setPickup(val)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 11,
                      border: `1px solid ${on ? NAVY : '#e5e2e1'}`,
                      background: on ? '#f2f6fd' : '#ffffff',
                      borderRadius: 8,
                      padding: 12,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      textAlign: 'left'
                    }}
                  >
                    <Icon name={p.icon} size={20} color={on ? NAVY : '#737783'} />
                    <span style={{ flex: 1 }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#1c1b1b'
                        }}
                      >
                        {p.label}
                      </span>
                      <span style={{ display: 'block', fontSize: 11, color: '#737783' }}>
                        {p.hint}
                      </span>
                    </span>
                    <Icon name="check_circle" size={18} color={on ? NAVY : '#e5e2e1'} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <button
          onClick={nav.back}
          style={{
            width: '100%',
            height: 48,
            border: 0,
            borderRadius: 10,
            background: NAVY,
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer'
          }}
        >
          Bu noktayı kullan
        </button>
      </div>
    </div>
  );
}
