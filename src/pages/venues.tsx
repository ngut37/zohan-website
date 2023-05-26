import React from 'react';

import { VenueList } from '@organisms/venues/venue-list';

import { Root } from '@modules/root';

export default function Venues() {
  return (
    <Root>
      <VenueList />
    </Root>
  );
}