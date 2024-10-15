// No need to import express or set up an app, as Vercel handles routing automatically

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json([
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
    {
      title: 'Population',
      unit: 'people',
      ranking: [
        { name: 'Paris', value: '2100000' },
        { name: 'Marseille', value: '800000' },
        { name: 'Lyon', value: '400000' },
        { name: 'Toulouse', value: '300000' },
        { name: 'Nice', value: '300000' },
      ],
    },
  ]);
}
