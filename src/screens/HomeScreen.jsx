import Icon from '../components/Icon';
import ItemCard from '../components/ItemCard';
import { CATS } from '../data/items';
import { chip } from '../utils';
import logo from '../assets/logo-white.png';

const DEFAULT_CAMPUS = 'Göztepe Kampüsü';

export default function HomeScreen({ nav, items, onPickCategory, activeCat, showTrustCard = true }) {
  return (
    <div>
      {/* Lacivert başlık: logo, arama kutusu, kampüs seçici */}
      <div style={{ background: '#003178', padding: '8px 16px 18px', borderRadius: '0 0 22px 22px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img
              src={logo}
              alt="marmarket"
              style={{ height: 30, width: 'auto', display: 'block' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            <button
              aria-label="Bildirimler"
              style={{
                width: 34,
                height: 34,
                border: 0,
                borderRadius: 999,
                background: 'rgba(255,255,255,.12)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Icon name="notifications" size={19} />
            </button>
            <button
              onClick={nav.profile}
              aria-label="Profil"
              style={{
                width: 34,
                height: 34,
                border: '1px solid rgba(255,255,255,.3)',
                borderRadius: 999,
                background: 'rgba(255,255,255,.12)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Icon name="person" size={19} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <div
            onClick={nav.search}
            style={{
              flex: 1,
              height: 44,
              background: '#fff',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 12px',
              cursor: 'pointer'
            }}
          >
            <Icon name="search" size={20} color="#737783" />
            <span style={{ fontSize: 14, color: '#737783' }}>Kitap, laptop, mobilya ara</span>
          </div>
          <button
            onClick={nav.search}
            aria-label="Filtreler"
            style={{
              width: 44,
              height: 44,
              border: 0,
              borderRadius: 8,
              background: 'rgba(255,255,255,.14)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Icon name="tune" size={20} />
          </button>
        </div>

        <button
          onClick={nav.pickup}
          style={{
            marginTop: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'transparent',
            border: 0,
            padding: 0,
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer'
          }}
        >
          <Icon name="location_on" size={16} />
          {DEFAULT_CAMPUS}
          <Icon name="expand_more" size={16} />
        </button>
      </div>

      {/* Kategori şeridi */}
      <div
        className="no-scrollbar"
        style={{ display: 'flex', gap: 8, padding: '16px 16px 4px', overflowX: 'auto' }}
      >
        {CATS.map((c) => {
          const s = chip(activeCat === c.key);
          return (
            <button
              key={c.key}
              onClick={() => onPickCategory(c.key)}
              style={{
                flex: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                width: 72,
                border: 0,
                background: 'transparent',
                padding: 0,
                cursor: 'pointer'
              }}
            >
              <span
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: s.bg,
                  color: s.fg,
                  border: `1px solid ${s.bd}`
                }}
              >
                <Icon name={c.icon} size={24} />
              </span>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 500,
                  lineHeight: 1.25,
                  textAlign: 'center',
                  color: '#434652'
                }}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Kampüste yeni */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '18px 16px 10px'
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: '#1c1b1b'
          }}
        >
          Kampüste&nbsp;yeni
        </h2>
        <button
          onClick={nav.search}
          style={{
            border: 0,
            background: 'transparent',
            padding: 0,
            fontSize: 12,
            fontWeight: 600,
            color: '#003178',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Tümü
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          padding: '0 16px 20px'
        }}
      >
        {items.map((it) => (
          <ItemCard key={it.id} item={it} />
        ))}
      </div>

      {/* Güven kartı */}
      {showTrustCard && (
        <div
          style={{
            margin: '0 16px 24px',
            border: '1px solid #c3c6d4',
            borderRadius: 10,
            padding: 14,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            background: '#fff'
          }}
        >
          <span
            style={{
              width: 38,
              height: 38,
              flex: 'none',
              borderRadius: 999,
              background: '#eaf3ea',
              color: '#1b6d24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name="verified_user" size={20} fill={1} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1b1b' }}>
              Sadece doğrulanmış öğrenciler
            </div>
            <div style={{ fontSize: 11, color: '#434652', lineHeight: 1.4 }}>
              Her satıcı @marun.edu.tr adresiyle doğrulanır, fakültesi ve puanı görünür.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
