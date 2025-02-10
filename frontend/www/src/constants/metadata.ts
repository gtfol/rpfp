export const defaultMetadata = {
  title: 'Remove People From Photos',
  description: 'Magically remove unwanted people from your photos',
};

const ogImage = {
  url: 'https://removepeoplefromphotos.com/logo.png',
  width: 600,
  height: 600,
  alt: 'Remove People From Photos',
};

export const defaultOpenGraph = {
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  images: [ogImage],
};

export const defaultTwitter = {
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  images: [ogImage.url],
};
