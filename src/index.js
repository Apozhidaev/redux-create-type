export const SELF = Symbol('SELF');
export const SYNC = null;
export const FETCH = ['REQUEST', 'SUCCESS', 'FAILURE'];
export const ASYNC = ['BEGIN', 'END'];


export function action(type, payload = {}) {
  return { type, ...payload };
}

export function createType(namespace, ...paths) {
  const globalPath = paths.length ? `${paths.join('_')}_` : '';
  const globalPrefix = namespace ? `${namespace}/${globalPath}` : globalPath;

  const type = (definition, prefix) => {
    const container = {};

    if (Array.isArray(definition[SELF])) {
      definition[SELF].reduce((self, sufix) => {
        self[sufix] = `${prefix}${sufix}`;
        return self;
      }, container);
    }

    Object.keys(definition).reduce((ctr, key) => {
      const value = definition[key];
      if (Array.isArray(value)) {
        ctr[key] = value.reduce((sufixs, sufix) => {
          sufixs[sufix] = `${prefix}${key}_${sufix}`;
          return sufixs;
        }, {});
      } else if (value && typeof value === 'object') {
        ctr[key] = type(value, `${prefix}${key}_`);
      } else {
        ctr[key] = `${prefix}${key}`;
      }
      return ctr;
    }, container);

    return container;
  };

  return definition => type(definition, globalPrefix);
}
