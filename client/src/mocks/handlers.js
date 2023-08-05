import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3001/cars.json', (req, res, ctx) => {
    const cars = [
      {
        id: 1,
        image: "https://images.hgmsites.net/lrg/2013-toyota-camry-4-door-sedan-i4-auto-xle-natl-angular-front-exterior-view_100414692_l.jpg",
        name: "Toyota Camry 2013",
        category: "SEDAN",
        subcategory: "5 SEATS",
        model: "Camry 2014",
        mileage: 85364,
        fuel_type: "Petrol",
        seats: 5,
        price_per_day: 240,
        availability: "Yes",
        description: "A reliable and spacious sedan with great fuel economy."
      },
    ];
    return res(
        ctx.status(200),
        ctx.json({ cars })
        );
  }),
];
