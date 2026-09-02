import Icon from '../components/Icon';
import ScreenHeader from '../components/ScreenHeader';
import { NAVY, YEL } from '../constants';

const STATS = [
  { value: '6', label: 'Aktif ilan' },
  { value: '31', label: 'Satıldı' },
  { value: '~2 sa', label: 'Yanıt süresi' }
];

export default function SellerScreen({ nav, items }) {
  return (
    <div>
      <ScreenHeader title="Satıcı Profili" onBack={nav.back} />

      <div style={{ padding: 16 }}>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e2e1',
            borderRadius: 12,
            padding: 16
          }}
        >
          <div style={{ display: 'flex', gap: 13 }}>
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 999,
                background: '#f0edec',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c3c6d4',
                flex: 'none',
                overflow: 'hidden'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
                alt="Elif Yıldırım"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: 19,
                    fontWeight: 700,
                    color: '#1c1b1b'
                  }}
                >
                  Elif Yıldırım
                </span>
                <Icon name="verified" size={17} fill={1} color="#1b6d24" />
              </div>
              <div style={{ fontSize: 12, color: '#434652' }}>İşletme Fakültesi, 3. sınıf</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1c1b1b' }}>4.8</span>
                <Icon name="star" size={14} fill={1} color={YEL} />
                <span style={{ fontSize: 11, color: '#737783' }}>26 değerlendirme</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
            <span
              style={{
                border: '1px solid #cfe3cf',
                background: '#eaf3ea',
                color: '#1b6d24',
                borderRadius: 6,
                padding: '5px 9px',
                fontSize: 11,
                fontWeight: 600
              }}
            >
              @marun.edu.tr doğrulandı
            </span>
            <span
              style={{
                border: '1px solid #c3c6d4',
                background: '#f6f3f2',
                color: '#434652',
                borderRadius: 6,
                padding: '5px 9px',
                fontSize: 11,
                fontWeight: 600
              }}
            >
              Göztepe Kampüsü
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 16,
              paddingTop: 14,
              borderTop: '1px solid #f0edec'
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  borderLeft: i > 0 ? '1px solid #f0edec' : undefined
                }}
              >
                <div
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: NAVY
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 10.5, color: '#737783', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <h2
          style={{
            margin: '22px 0 10px',
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 17,
            fontWeight: 700,
            color: '#1c1b1b'
          }}
        >
          Yayındaki ilanları
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {items.map((it) => (
            <article
              key={it.id}
              onClick={it.open}
              style={{
                background: '#fff',
                border: '1px solid #e5e2e1',
                borderRadius: 10,
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  height: 98,
                  background: '#f0edec',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c3c6d4',
                  borderBottom: '1px solid #ebe7e7',
                  overflow: 'hidden'
                }}
              >
                {it.image ? (
                  <img
                    src={it.image}
                    alt={it.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <Icon name={it.icon} size={28} />
                )}
              </div>
              <div style={{ padding: '9px 10px 11px' }}>
                <div
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: NAVY
                  }}
                >
                  {it.price}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1c1b1b', lineHeight: 1.3 }}>
                  {it.title}
                </div>
                <div
                  style={{ fontSize: 10, color: '#737783', marginTop: 4, fontWeight: 500 }}
                >
                  {it.campusShort}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
