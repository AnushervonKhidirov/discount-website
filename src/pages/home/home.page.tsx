import type { Benefit as TBenefit } from '@type/benefit.type';

import Grid from '@component/common/grid/grid';
import Benefit from '@component/benefit/benefit';

const benefits: TBenefit[] = [
  {
    id: 1,
    about: null,
    archived: false,
    size: 45,
    company: {
      id: 1,
      name: 'Defacto',
      userId: 1,
      verified: true,
      archived: false,
      about: null,
      logoUrl: null,
      createdAt: new Date('9/10/2025'),
      updatedAt: new Date('9/10/2025'),
    },
    startAt: new Date('10/10/2025'),
    endAt: new Date('11/10/2025'),
    createdAt: new Date('9/10/2025'),
    updatedAt: new Date('9/10/2025'),
  },
  {
    id: 2,
    about: null,
    archived: false,
    size: 10,
    company: {
      id: 1,
      name: 'Defacto',
      userId: 1,
      verified: true,
      archived: false,
      about: null,
      logoUrl: null,
      createdAt: new Date('9/10/2025'),
      updatedAt: new Date('9/10/2025'),
    },
    bank: {
      id: 1,
      name: 'Alif',
      archived: false,
      logoUrl: null,
      createdAt: new Date('8/10/2025'),
      updatedAt: new Date('8/10/2025'),
    },
    startAt: new Date('10/10/2025'),
    endAt: new Date('11/10/2025'),
    createdAt: new Date('9/10/2025'),
    updatedAt: new Date('9/10/2025'),
  },
];

const HomePage = () => {
  return (
    <Grid>
      {benefits.map(benefit => (
        <Benefit {...benefit} key={benefit.id} />
      ))}
    </Grid>
  );
};

export default HomePage;
