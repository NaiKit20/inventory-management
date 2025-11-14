const dateFormatterTH = new Intl.DateTimeFormat("th-TH", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const monthYearFormatterTH = new Intl.DateTimeFormat("th-TH", {
  year: "numeric",
  month: "long",
});

/*
 * @param {Date|string|number|null|undefined} d
 * @returns {string}
 */
export function formatDateTH(d) {
  if (!d) return "-";
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return "-";
  return dateFormatterTH.format(date);
}

/**
 * @param {Date|string|number|null|undefined} d
 * @returns {string}
 */
export function formatMonthYearTH(d) {
  if (!d) return "-";
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return "-";
  return monthYearFormatterTH.format(date);
}
