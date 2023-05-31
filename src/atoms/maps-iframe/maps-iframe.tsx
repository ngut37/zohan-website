import React, { useMemo } from 'react';

import { GetVenueByIdData } from '@api/venues';

import { Flex } from '@chakra-ui/react';

type Props = {
  venue: GetVenueByIdData['venue'];
  zoom?: number;
};

export const MapsIframe = ({ venue, zoom = 13 }: Props) => {
  const concatAddress = useMemo(() => {
    return `${venue.stringAddress}, ${venue.district || venue.mop}, ${
      venue.region
    }`;
  }, [venue.stringAddress, venue.district, venue.mop, venue.region]);

  return (
    <Flex width="100%" height="100%">
      <iframe
        width="100%"
        height="100%"
        scrolling="no"
        loading="lazy"
        style={{ border: 0, width: '100%', height: '100%' }}
        src={`https://maps.google.com/maps/embed/v1/place?key=AIzaSyA5RTWJwN_izUs_zIrdYIMNuXoZKixw6zo&q=${concatAddress}&zoom=${zoom}&language=cs`}
      ></iframe>
    </Flex>
  );
};
