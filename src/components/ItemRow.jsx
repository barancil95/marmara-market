import Icon from './Icon';

/** Arama sonuçları ve favorilerdeki yatay liste satırı. */
export default function ItemRow({ item }) {
  return (
    <article
      onClick={item.open}
      style={{
        background: '#fff',
        border: '1px solid #e5e2e1',
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        gap: 12,
        cursor: 'pointer'
      }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          flex: 'none',
          borderRadius: 8,
          background: '#f0edec',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c3c6d4',
          overflow: 'hidden'
        }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <Icon name={item.icon} size={26} />
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 17,
            fontWeight: 700,
            color: '#003178'
          }}
        >
          {item.price}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1c1b1b' }}>{item.title}</span>
        <span style={{ fontSize: 11.5, color: '#434652', lineHeight: 1.35 }}>{item.blurb}</span>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 10.5,
            color: '#737783',
            fontWeight: 500
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Icon name="location_on" size={13} />
            {item.campusShort}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Icon name="sell" size={13} />
            {item.cond}
          </span>
        </div>
      </div>

      <button
        onClick={item.toggle}
        style={{
          width: 28,
          height: 28,
          flex: 'none',
          border: 0,
          background: 'transparent',
          cursor: 'pointer',
          color: item.heartColor
        }}
      >
        <Icon name="favorite" size={19} fill={item.heartFill} />
      </button>
    </article>
  );
}
