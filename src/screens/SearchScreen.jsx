import Icon from '../components/Icon';
import ItemRow from '../components/ItemRow';
import { chip } from '../utils';
import { CONDITIONS, CAMPUSES } from '../constants';

/** Filtre panelindeki küçük seçim düğmesi (kampüs / durum). */
function FilterOption({ label, active, onClick }) {
  const s = chip(active);
  return (
    <button
      onClick={onClick}
      style={{
        border: `1px solid ${s.bd}`,
        background: s.bg,
        color: s.fg,
        borderRadius: 6,
        padding: '7px 11px',
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
}

const SECTION_LABEL = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '.04em',
  color: '#737783',
  marginBottom: 8
};

export default function SearchScreen({
  nav,
  results,
  query,
  setQuery,
  cat,
  setCat,
  campusFilter,
  setCampusFilter,
  cond,
  setCond,
  priceMax,
  setPriceMax,
  filtersOpen,
  setFiltersOpen
}) {
  const toggleFilters = () => setFiltersOpen((o) => !o);

  const resetFilters = () => {
    setCat(null);
    setCond(null);
    setCampusFilter('Tüm kampüsler');
    setPriceMax(20000);
    setQuery('');
  };

  const priceLabel = `₺0 – ₺${priceMax.toLocaleString('tr-TR')}`;

  // Başlıktaki hızlı filtre rozetleri
  const pills = [
    { label: cat || 'Tüm kategoriler', active: !!cat, onClick: () => setCat(null) },
    {
      label: campusFilter,
      active: campusFilter !== 'Tüm kampüsler',
      onClick: () => setFiltersOpen(true)
    },
    { label: cond || 'Her durum', active: !!cond, onClick: () => setCond(null) },
    { label: 'Takasa açık', active: false, onClick: () => setQuery('') }
  ];

  return (
    <div>
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #ebe7e7',
          padding: '8px 12px 12px',
          position: 'sticky',
          top: 0,
          zIndex: 5
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={nav.back}
            aria-label="Geri"
            style={{
              width: 34,
              height: 34,
              border: 0,
              background: 'transparent',
              color: '#1c1b1b',
              cursor: 'pointer'
            }}
          >
            <Icon name="arrow_back" size={22} />
          </button>

          <div
            style={{
              flex: 1,
              height: 40,
              background: '#f6f3f2',
              border: '1px solid #e5e2e1',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 10px'
            }}
          >
            <Icon name="search" size={18} color="#737783" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ara"
              style={{
                flex: 1,
                border: 0,
                background: 'transparent',
                outline: 'none',
                fontSize: 13.5,
                fontFamily: 'Inter, sans-serif',
                color: '#1c1b1b',
                minWidth: 0
              }}
            />
          </div>

          <button
            onClick={toggleFilters}
            aria-label="Filtreler"
            style={{
              width: 40,
              height: 40,
              border: '1px solid #003178',
              borderRadius: 8,
              background: '#fff',
              color: '#003178',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flex: 'none'
            }}
          >
            <Icon name="tune" size={20} />
          </button>
        </div>

        <div
          className="no-scrollbar"
          style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto' }}
        >
          {pills.map((p) => {
            const s = chip(p.active);
            return (
              <button
                key={p.label}
                onClick={p.onClick}
                style={{
                  flex: 'none',
                  border: `1px solid ${s.bd}`,
                  background: s.bg,
                  color: s.fg,
                  borderRadius: 999,
                  padding: '6px 11px',
                  fontSize: 11.5,
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer'
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Açılır filtre paneli */}
      {filtersOpen && (
        <div style={{ background: '#fff', borderBottom: '1px solid #ebe7e7', padding: '14px 16px 18px' }}>
          <div style={SECTION_LABEL}>KAMPÜS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {CAMPUSES.map((c) => (
              <FilterOption
                key={c}
                label={c}
                active={campusFilter === c}
                onClick={() => setCampusFilter(c)}
              />
            ))}
          </div>

          <div style={SECTION_LABEL}>DURUM</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {CONDITIONS.map((c) => (
              <FilterOption
                key={c}
                label={c}
                active={cond === c}
                onClick={() => setCond((cur) => (cur === c ? null : c))}
              />
            ))}
          </div>

          <div style={{ ...SECTION_LABEL, marginBottom: 10 }}>FİYAT ARALIĞI · {priceLabel}</div>
          <input
            type="range"
            min="100"
            max="20000"
            step="100"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#003178' }}
          />

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button
              onClick={resetFilters}
              style={{
                flex: 1,
                height: 42,
                border: '1px solid #c3c6d4',
                background: '#fff',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: '#434652',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer'
              }}
            >
              Temizle
            </button>
            <button
              onClick={toggleFilters}
              style={{
                flex: 2,
                height: 42,
                border: 0,
                background: '#003178',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer'
              }}
            >
              {results.length} ilanı göster
            </button>
          </div>
        </div>
      )}

      <div style={{ padding: '14px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 12, color: '#737783', fontWeight: 500 }}>
          {results.length} sonuç
        </div>
        {results.map((it) => (
          <ItemRow key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
}
