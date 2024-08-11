import { enUS } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const dayjsConfigNZ: ILocale = {
  name: 'en-nz',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
    '_'
  ),
  months:
    'January_February_March_April_May_June_July_August_September_October_November_December'.split(
      '_'
    ),
  weekStart: 1,
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  ordinal: function (e: number) {
    const a = ['th', 'st', 'nd', 'rd'];
    const t = e % 100;
    return '[' + e + (a[(t - 20) % 10] || a[t] || a[0]) + ']';
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'h:mm:ss A',
    L: 'DD/MMM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A',
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
};
dayjs.locale(dayjsConfigNZ, undefined, true);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Pacific/Auckland');
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const nzLocale =
  enUS.components.MuiLocalizationProvider.defaultProps.localeText;
nzLocale.fieldMonthPlaceholder = (params) =>
  params.contentType === 'letter' ? 'MMM' : 'MM';

export const nzLocaleText = nzLocale;
export { Dayjs } from 'dayjs';
export default dayjs;
