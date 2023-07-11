import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

export const secondsToDay = (s: number) => Math.floor(s / (24 * 60 * 60))

export const convertTimeToSeconds = (time: string): number => {
  return parseInt(time) * 1000
}

// https://date-fns.org/v2.28.0/docs/formatDistanceToNowStrict
export const distanceToNowStrict = (timeInMilliSeconds: number) => {
  const endTime = new Date(timeInMilliSeconds)
  return new Date() > endTime || !Number.isFinite(timeInMilliSeconds)
    ? `0 seconds`
    : formatDistanceToNowStrict(endTime, { unit: 'day' })
}

/**
 * @param {number} timeInMilliSeconds 秒
 * @param {'month' | 'day' | 'second' | 'minute' | 'hour' | 'year'} unit  单位
 * @returns {string} 距离现在的时间
 */
export const distanceToNowStrictWithUnit = (
  timeInMilliSeconds: number,
  unit: 'month' | 'day' | 'second' | 'minute' | 'hour' | 'year',
): string => {
  const endTime = new Date(timeInMilliSeconds)
  return new Date() > endTime || !Number.isFinite(timeInMilliSeconds)
    ? `0 seconds`
    : formatDistanceToNowStrict(endTime, { unit })
}
