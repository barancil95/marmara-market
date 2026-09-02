import Icon from './Icon';

/** Anasayfa / satıcı ekranındaki 2 sütunlu grid kartı. */
export default function ItemCard({ item }) {
  return (
    <article
      onClick={item.open}
      style={{
        background: '#fff',
        border: '1px solid #e5e2e1',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }}
    >
      <div
        style={{
          height: 110,
          background: '#f0edec',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderBottom: '1px solid #ebe7e7',
          overflow: 'hidden'
        }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <>
            <Icon name={item.icon} size={30} color="#c3c6d4" />
            <span
              style={{
                position: 'absolute',
                bottom: 6,
                left: 6,
                fontSize: 8.5,
                letterSpacing: '.06em',
                fontWeight: 600,
                color: '#a5a2a2'
              }}
            >
              FOTO
            </span>
          </>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            item.toggle();
          }}
          aria-label="Favori"
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 28,
            height: 28,
            border: 0,
            borderRadius: 999,
            background: 'rgba(255,255,255,.9)',
            boxShadow: '0 1px 4px rgba(0,0,0,.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: item.heartColor
          }}
        >
          <Icon name="favorite" size={16} fill={item.heartFill} />
        </button>
      </div>

      <div
        style={{
          padding: '9px 10px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          flex: 1
        }}
      >
        <span
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: '#003178'
          }}
        >
          {item.price}
        </span>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#1c1b1b', lineHeight: 1.3 }}>
          {item.title}
        </span>
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 10,
            color: '#737783',
            fontWeight: 500
          }}
        >
          <Icon name="location_on" size={12} />
          {item.campusShort}
          {item.swap && (
            <span
              style={{
                marginLeft: 'auto',
                background: '#f0edec',
                color: '#434652',
                borderRadius: 4,
                padding: '2px 5px',
                fontSize: 9,
                fontWeight: 600
              }}
            >
              TAKAS
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
