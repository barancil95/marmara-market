import { NAVY, SURFACE, SLATE, BORDER, MUTED, DANGER } from './constants';

/** Seçili/seçili değil durumuna göre chip (etiket) renkleri. */
export function chip(active) {
  return active
    ? { bg: NAVY, fg: '#ffffff', bd: NAVY }
    : { bg: SURFACE, fg: SLATE, bd: BORDER };
}

/** Favori kalbinin rengi ve dolgusu. */
export function heart(liked, id) {
  const on = !!liked[id];
  return { heartColor: on ? DANGER : MUTED, heartFill: on ? 1 : 0 };
}

/**
 * Ham ilanı, kart bileşenlerinin beklediği hâle getirir:
 * kalp durumu + açma/beğenme davranışları eklenir.
 */
export function decorate(item, { liked, openItem, toggleLike }) {
  return {
    ...item,
    ...heart(liked, item.id),
    open: () => openItem(item.id),
    toggle: (e) => {
      e.stopPropagation();
      toggleLike(item.id);
    }
  };
}

/** Arama kutusu ve filtrelerin hepsini birden uygular. */
export function filterItems(items, { query, cat, campusFilter, cond, priceMax }) {
  const q = query.trim().toLowerCase();
  return items.filter(
    (it) =>
      (!q || it.title.toLowerCase().includes(q) || it.cat.toLowerCase().includes(q)) &&
      (!cat || it.cat === cat) &&
      (campusFilter === 'Tüm kampüsler' || it.campus === campusFilter) &&
      (!cond || it.cond === cond) &&
      it.p <= priceMax
  );
}
