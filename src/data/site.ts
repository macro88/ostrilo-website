export const release = {
  version: '0.9.0',
  reviewed: '7 October 2026',
  revision: 'd70a0c1e83087a4db6593fc8658912f70767fd6c',
  chromeStoreUrl: null as string | null,
};

export const github = 'https://github.com/macro88/ostrilo';
export const source = (path: string) => `${github}/blob/main/${path}`;
export const page = (path = '') => `${import.meta.env.BASE_URL}${path}`;

export const navigation = [
  { label: 'Product', path: '' },
  { label: 'Security', path: 'security/' },
  { label: 'Roadmap', path: 'roadmap/' },
  { label: 'Developers', path: 'developers/' },
];
