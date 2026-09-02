import Icon from './Icon';

/** Geri butonlu üst çubuk. İç ekranların çoğunda kullanılır. */
export default function ScreenHeader({ title, onBack, bg = '#fcf9f8', right = null }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        background: bg,
        height: 52,
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        borderBottom: '1px solid #ebe7e7',
        zIndex: 5
      }}
    >
      <button
        onClick={onBack}
        aria-label="Geri"
        style={{
          width: 38,
          height: 38,
          border: 0,
          background: 'transparent',
          color: '#1c1b1b',
          cursor: 'pointer',
          flex: 'none'
        }}
      >
        <Icon name="arrow_back" size={22} />
      </button>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#1c1b1b', marginLeft: 4 }}>
        {title}
      </span>
      {right && <div style={{ marginLeft: 'auto', display: 'flex' }}>{right}</div>}
    </div>
  );
}
