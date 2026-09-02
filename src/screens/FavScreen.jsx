import Icon from '../components/Icon';
import { NAVY } from '../constants';
import { SAVED_SEARCHES, FAV_SELLERS } from '../data/items';

const TABS = ['İlanlar', 'Aramalar', 'Satıcılar'];
const TITLES = ['Favori ilanlarım', 'Kayıtlı aramalarım', 'Takip ettiklerim'];
const ACTIONS = ['view_list', 'add', 'person_add'];

export default function FavScreen({ nav, favTab, setFavTab, listings }) {
  return (
    <div>
      <div
        style={{
          background: '#fff',
          padding: '10px 16px 0',
          borderBottom: '1px solid #ebe7e7',
          position: 'sticky',
          top: 0,
          zIndex: 5
        }}
      >
        <div
          style={{
            display: 'flex',
            background: '#f6f3f2',
            borderRadius: 10,
            padding: 4,
            gap: 4
          }}
        >
          {TABS.map((label, i) => (
            <button
              key={label}
              onClick={() => setFavTab(i)}
              style={{
                flex: 1,
                padding: '9px 0',
                border: 0,
                borderRadius: 8,
                background: favTab === i ? '#ffffff' : 'transparent',
                color: favTab === i ? NAVY : '#737783',
                fontSize: 12.5,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 0 12px'
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: '#1c1b1b'
            }}
          >
            {TITLES[favTab]}
          </h1>
          <button
            style={{
              width: 32,
              height: 32,
              border: '1px solid #e5e2e1',
              borderRadius: 8,
              background: '#fff',
              color: '#434652',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Icon name={ACTIONS[favTab]} size={18} />
          </button>
        </div>
      </div>

      {/* Favori ilanlar */}
      {favTab === 0 && (
        <div style={{ padding: '14px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {listings.map((it) => (
            <article
              key={it.id}
              onClick={it.open}
              style={{
                background: '#f6f3f2',
                borderRadius: 10,
                padding: 10,
                display: 'flex',
                gap: 12,
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  flex: 'none',
                  borderRadius: 8,
                  background: '#e5e2e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b9b6b6',
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
                  <Icon name={it.icon} size={26} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: NAVY
                  }}
                >
                  {it.price}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1b1b' }}>{it.title}</div>
                <div style={{ fontSize: 11.5, color: '#434652', lineHeight: 1.35 }}>{it.blurb}</div>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginTop: 5,
                    fontSize: 10.5,
                    color: '#737783',
                    fontWeight: 500
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Icon name="location_on" size={13} />
                    {it.campusShort}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Icon name="sell" size={13} />
                    {it.cond}
                  </span>
                </div>
              </div>
              <button
                aria-label="Diğer"
                style={{
                  width: 26,
                  height: 26,
                  border: 0,
                  background: 'transparent',
                  color: '#737783',
                  cursor: 'pointer',
                  flex: 'none'
                }}
              >
                <Icon name="more_vert" size={18} />
              </button>
            </article>
          ))}
        </div>
      )}

      {/* Kayıtlı aramalar */}
      {favTab === 1 && (
        <div style={{ padding: '14px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SAVED_SEARCHES.map((s) => (
            <div
              key={s.q}
              onClick={nav.search}
              style={{
                background: '#fff',
                border: '1px solid #e5e2e1',
                borderRadius: 10,
                padding: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                cursor: 'pointer'
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  flex: 'none',
                  borderRadius: 8,
                  background: '#f6f3f2',
                  color: NAVY,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon name="search" size={19} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1c1b1b' }}>{s.q}</div>
                <div style={{ fontSize: 11, color: '#737783' }}>{s.meta}</div>
              </div>
              <span
                style={{
                  background: '#eaf3ea',
                  color: '#1b6d24',
                  borderRadius: 999,
                  padding: '3px 8px',
                  fontSize: 10.5,
                  fontWeight: 700
                }}
              >
                {s.new}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Takip edilen satıcılar */}
      {favTab === 2 && (
        <div style={{ padding: '14px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAV_SELLERS.map((s) => (
            <div
              key={s.name}
              onClick={nav.seller}
              style={{
                background: '#fff',
                border: '1px solid #e5e2e1',
                borderRadius: 10,
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
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
                {s.avatar ? (
                  <img
                    src={s.avatar}
                    alt={s.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Icon name="person" size={22} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1c1b1b' }}>{s.name}</span>
                  <Icon name="verified" size={14} fill={1} color="#1b6d24" />
                </div>
                <div style={{ fontSize: 11, color: '#737783' }}>{s.meta}</div>
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: NAVY }}>{s.count} ilan</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
