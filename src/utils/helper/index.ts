import dayjs from '@libs/dayjs';

export const willTokenExpire = (
  expires: number = dayjs().unix(),
  minute = 13
) => dayjs().add(minute, 'minute').isAfter(dayjs.unix(expires));
