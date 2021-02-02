// As specified in https://www.dot.ny.gov/portal/pls/portal/MEXIS_APP.BC_CONSULTING_NONAE_ADMIN.VIEWFILE?p_file_id=36703
//
// https://en.wikipedia.org/wiki/Rounding#Round_half_to_even
// https://stackoverflow.com/a/3109234/3970755
export default function gaussianRound(num: number, decimalPlaces: number = 0) {
  const d = decimalPlaces ?? 0;
  const m = Math.pow(10, d);
  const n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
  const i = Math.floor(n), f = n - i;
  const e = 1e-8; // Allow for rounding errors in f
  const r = (f > 0.5 - e && f < 0.5 + e) ?
    ((i % 2 == 0) ? i : i + 1) : Math.round(n);
  return d ? r / m : r;
}
