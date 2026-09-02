import Icon from '../components/Icon';
import { NAVY, YEL } from '../constants';

const STATS = [
  { value: '3', label: 'Aktif ilan' },
  { value: '9', label: 'Satıldı' },
  { value: '12', label: 'Favori' }
];

export default function ProfileScreen({ nav, verified, pickup }) {
  const menu = [
    { icon: 'inventory_2', label: 'İlanlarım', meta: '3 aktif', onClick: nav.seller },
    { icon: 'favorite', label: 'Favorilerim', meta: '12', onClick: nav.fav },
    { icon: 'location_on', label: 'Teslim noktalarım', meta: pickup.split(' · ')[0], onClick: nav.pickup },
    {
      icon: 'verified_user',
      label: 'Hesap doğrulama',
      meta: verified ? 'Doğrulandı' : 'Bekliyor',
      onClick: nav.login
    },
    { icon: 'star', label: 'Değerlendirmelerim', meta: '4.6', onClick: nav.seller },
    { icon: 'settings', label: 'Ayarlar', meta: '', onClick: () => {} }
  ];

  return (
    <div>
      {/* Lacivert profil başlığı */}
      <div style={{ background: NAVY, padding: '18px 16px 22px', borderRadius: '0 0 22px 22px' }}>
        <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 999,
              background: 'rgba(255,255,255,.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,.6)',
              flex: 'none'
            }}
          >
            <Icon name="person" size={30} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 700,
                color: '#fff'
              }}
            >
              Mert Kaya
            </div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.72)' }}>
              Mühendislik Fakültesi · RTE Kampüsü
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
              <span
                style={{
                  border: '1px solid rgba(255,255,255,.28)',
                  borderRadius: 6,
                  padding: '3px 7px',
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3
                }}
              >
                <Icon name="verified" size={12} fill={1} />
                Doğrulanmış
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>4.6</span>
              <Icon name="star" size={13} fill={1} color={YEL} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 18,
            background: 'rgba(255,255,255,.1)',
            borderRadius: 10,
            padding: '11px 0'
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                textAlign: 'center',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,.14)' : undefined
              }}
            >
              <div
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#fff'
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.7)', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menü */}
      <div style={{ padding: 16 }}>
        {menu.map((m) => (
          <button
            key={m.label}
            onClick={m.onClick}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: '#fff',
              border: '1px solid #e5e2e1',
              borderRadius: 10,
              padding: 14,
              marginBottom: 8,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              textAlign: 'left'
            }}
          >
            <Icon name={m.icon} size={20} color={NAVY} />
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: '#1c1b1b' }}>
              {m.label}
            </span>
            <span style={{ fontSize: 11, color: '#737783', fontWeight: 500 }}>{m.meta}</span>
            <Icon name="chevron_right" size={18} color="#c3c6d4" />
          </button>
        ))}
      </div>
    </div>
  );
}
