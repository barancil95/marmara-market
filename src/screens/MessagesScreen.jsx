import Icon from '../components/Icon';
import { NAVY, YEL } from '../constants';
import { THREADS } from '../data/items';

export default function MessagesScreen({ nav }) {
  return (
    <div>
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          zIndex: 5,
          padding: '12px 16px',
          borderBottom: '1px solid #ebe7e7'
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: '#1c1b1b'
          }}
        >
          Mesajlar
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {THREADS.map((t) => (
          <div
            key={t.name}
            onClick={nav.chat}
            style={{
              display: 'flex',
              gap: 12,
              padding: '13px 16px',
              borderBottom: '1px solid #f0edec',
              cursor: 'pointer',
              background: t.bg
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
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
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Icon name="person" size={24} />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1c1b1b' }}>{t.name}</span>
                <Icon name="verified" size={14} fill={1} color="#1b6d24" />
                <span style={{ marginLeft: 'auto', fontSize: 10.5, color: '#737783' }}>
                  {t.time}
                </span>
              </div>
              <div style={{ fontSize: 11, color: NAVY, fontWeight: 600, marginTop: 1 }}>
                {t.item}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#434652',
                  lineHeight: 1.35,
                  marginTop: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {t.last}
              </div>
            </div>

            {t.unread && (
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: YEL,
                  alignSelf: 'center',
                  flex: 'none'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
