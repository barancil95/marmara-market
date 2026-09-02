import Icon from './Icon';

/**
 * Alt navigasyon. Ortadaki boşluğa "ilan ver" FAB'ı oturur.
 * Sticky: içerik uzun olsa da ekranın altında kalır.
 */
export default function BottomNav({ items, onPost }) {
  return (
    <div
      style={{
        flex: 'none',
        background: '#fff',
        borderTop: '1px solid #ebe7e7',
        height: 72,
        display: 'flex',
        alignItems: 'stretch',
        padding: '0 4px 8px',
        position: 'sticky',
        bottom: 0,
        zIndex: 20
      }}
    >
      {items.map((n, i) =>
        n.k ? (
          <button
            key={n.k}
            onClick={n.onClick}
            style={{
              flex: 1,
              border: 0,
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              cursor: 'pointer',
              color: n.color,
              fontFamily: 'Inter, sans-serif',
              paddingTop: 8
            }}
          >
            <Icon name={n.icon} size={23} fill={n.fill} />
            <span style={{ fontSize: 10, fontWeight: 600 }}>{n.label}</span>
          </button>
        ) : (
          // FAB'ın altındaki boşluk
          <div key={`gap-${i}`} style={{ flex: 1 }} aria-hidden="true" />
        )
      )}

      <button
        onClick={onPost}
        aria-label="İlan ver"
        style={{
          position: 'absolute',
          left: '50%',
          top: -16,
          transform: 'translateX(-50%)',
          width: 56,
          height: 56,
          borderRadius: 999,
          border: '4px solid #fff',
          background: '#003178',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 6px 16px -4px rgba(0,49,120,.55)'
        }}
      >
        <Icon name="add" size={26} />
      </button>
    </div>
  );
}
