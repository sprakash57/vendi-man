export const omit = (obj: { [key: string]: any }, omitKeys: string | string[]) => {
  const keys = Array.isArray(omitKeys) ? omitKeys : [omitKeys];
  return Object.keys(obj).reduce((result: { [key: string]: any }, key: string) => {
    if (!keys.includes(key)) result[key] = obj[key];
    return result;
  }, {});
};
