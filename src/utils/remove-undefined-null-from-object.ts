export const removeFalsyPropertiesFromObject = <T extends Record<any, any>>(
  obj: T,
): T => {
  const filteredObj: Partial<T> = {};

  for (const key in obj) {
    if (
      // eslint-disable-next-line no-prototype-builtins
      obj.hasOwnProperty(key) &&
      Boolean(obj[key]) &&
      obj[key] !== undefined &&
      obj[key] !== null
    ) {
      filteredObj[key] = obj[key];
    }
  }

  return filteredObj as T;
};
