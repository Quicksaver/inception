export const cookiesBanner: {
  body: string;
  options: [ string, string, boolean? ][];
  title: string;
} = {
  body: 'With your permission, by navigating this site data will be stored in your browser, in order to enhance your browsing experience.',
  options: [
    [ 'essential', 'Essential - Remember some of your incomplete actions, for a smooth experience across sessions.', true ],
    [ 'analytics', 'Analytics - Site behavior and interaction, to improve and evolve the platform.' ],
  ],
  title: 'Your privacy is important to us.',
};
