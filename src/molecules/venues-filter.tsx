import React, { useMemo } from 'react';

import { UseFormSetValue } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { HiOutlineX } from 'react-icons/hi';

import { ListVenuesQueryParameters } from '@api/venues';
import { PopulatedRegion } from '@api/address/types';
import {
  ServiceName,
  ServiceType,
  serviceVariants,
  SERVICE_TYPES,
} from '@api/services';

import { messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';

import { Button, Text } from '@atoms';

import { InputLabel } from '@molecules/input-label';

import {
  VStack,
  Select,
  Checkbox,
  Grid,
  CheckboxGroup,
  Collapse,
  Box,
  CheckboxProps,
} from '@chakra-ui/react';

type Props = {
  populatedRegions: PopulatedRegion[];
  formValues: ListVenuesQueryParameters;
  setFormValue: UseFormSetValue<ListVenuesQueryParameters>;
  formSubmit: () => void;
  formReset: () => void;
  checkboxHeight?: CheckboxProps['height'];
};

const m = messageIdConcat('services');

export const VenuesFilter = ({
  populatedRegions,
  formValues,
  setFormValue,
  formSubmit,
  formReset,
  checkboxHeight = '50px',
}: Props) => {
  const intl = useIntl();

  const regionSelectRef = React.useRef<HTMLSelectElement>(null);
  const serviceTypeSelectRef = React.useRef<HTMLSelectElement>(null);

  const regionSelect = useMemo(() => {
    return (
      <VStack width="100%" marginTop="10px !important">
        <InputLabel message={{ id: m('filter.input.region.label') }} />
        <Select
          ref={regionSelectRef}
          onChange={(e) => {
            // unset district and mop when changing region
            setFormValue('districts', undefined);
            setFormValue('mops', undefined);

            setFormValue('region', e.target.value);
          }}
          value={formValues.region}
          placeholder={messageToString(
            { id: m('filter.input.region.placeholder') },
            intl,
          )}
        >
          {populatedRegions.map((region, i) => (
            <option key={i} value={region._id}>
              {region.name}
            </option>
          ))}
        </Select>
      </VStack>
    );
  }, [formValues.region, populatedRegions, intl, setFormValue]);

  const districtOrMopCheckboxes = useMemo(() => {
    // if region is Prague, show mops
    if (formValues.region === '19') {
      return (
        <CheckboxGroup
          key="mops"
          colorScheme="teal"
          value={formValues.mops?.map((mop) => mop.toString())}
          onChange={(selectedMopIds) => {
            const setOfSelectedMopIds = new Set(selectedMopIds);
            setFormValue('mops', [
              ...(setOfSelectedMopIds as unknown as string[]),
            ]);
          }}
        >
          <Grid templateColumns="repeat(2, 1fr)" width="100%">
            {populatedRegions
              .find((region) => {
                return region._id === Number(formValues.region);
              })
              ?.districts[0].mops.map((mop, i) => {
                return (
                  <Checkbox
                    key={i}
                    width="100%"
                    height={checkboxHeight}
                    value={mop._id.toString()}
                  >
                    <Text fontSize="sm" message={{ text: mop.name }} />
                  </Checkbox>
                );
              })}
          </Grid>
        </CheckboxGroup>
      );
    }

    return (
      <CheckboxGroup
        key="districts"
        colorScheme="teal"
        defaultValue={formValues.districts}
        onChange={(selectedDistrictIds) => {
          const setOfSelectedDistrictIds = new Set(selectedDistrictIds);
          setFormValue('districts', [
            ...(setOfSelectedDistrictIds as unknown as string[]),
          ]);
        }}
      >
        <Grid templateColumns="repeat(2, 1fr)" width="100%">
          {populatedRegions
            .find((region) => {
              return region._id === Number(formValues.region);
            })
            ?.districts.map((district, i) => {
              return (
                <Checkbox
                  key={i}
                  width="100%"
                  height={checkboxHeight}
                  value={district._id.toString()}
                >
                  <Text fontSize="sm" message={{ text: district.name }} />
                </Checkbox>
              );
            })}
        </Grid>
      </CheckboxGroup>
    );
  }, [formValues, populatedRegions, checkboxHeight]);

  const serviceTypeSelect = useMemo(() => {
    return (
      <VStack width="100%">
        <InputLabel message={{ id: m('filter.input.service_type.label') }} />
        <Select
          ref={serviceTypeSelectRef}
          onChange={(e) => {
            // unset district and mop when changing region
            setFormValue('serviceNames', undefined);

            setFormValue('serviceType', e.target.value as ServiceType);
          }}
          value={formValues.serviceType ?? undefined}
          placeholder={messageToString(
            { id: m('filter.input.service_type.placeholder') },
            intl,
          )}
        >
          {Object.keys(SERVICE_TYPES).map((serviceType, i) => (
            <option key={i} value={serviceType}>
              {messageToString({ id: `service_type.${serviceType}` }, intl)}
            </option>
          ))}
        </Select>
      </VStack>
    );
  }, [formValues.serviceType, setFormValue, intl]);

  const serviceNamesCheckboxes = useMemo(() => {
    if (formValues.serviceType) {
      return (
        <CheckboxGroup
          key="districts"
          colorScheme="teal"
          defaultValue={formValues.serviceNames}
          onChange={(selectedServiceNames) => {
            const setOfSelectedDistrictIds = new Set(selectedServiceNames);
            setFormValue('serviceNames', [
              ...(setOfSelectedDistrictIds as unknown as ServiceName[]),
            ]);
          }}
        >
          <VStack width="100%">
            {serviceVariants[formValues.serviceType].map((serviceName, i) => {
              return (
                <Checkbox
                  key={i}
                  width="100%"
                  height={checkboxHeight}
                  value={serviceName}
                >
                  <Text
                    fontSize="sm"
                    message={{ id: `service_name.${serviceName}` }}
                  />
                </Checkbox>
              );
            })}
          </VStack>
        </CheckboxGroup>
      );
    }
  }, [
    formValues.serviceType,
    formValues.serviceNames,
    checkboxHeight,
    setFormValue,
  ]);

  return (
    <VStack width="100%" alignItems="flex-start" spacing="30px">
      <Button
        variant="link"
        size="sm"
        leftIcon={<HiOutlineX />}
        message={{ id: 'button.reset_filter' }}
        onClick={() => {
          if (regionSelectRef.current) {
            regionSelectRef.current.value = '';
          }
          if (serviceTypeSelectRef.current) {
            serviceTypeSelectRef.current.value = '';
          }
          formReset();
        }}
      />

      {regionSelect}
      <Box width="100%">
        <Collapse
          in={Boolean(formValues.region)}
          animateOpacity
          unmountOnExit={false}
        >
          {districtOrMopCheckboxes}
        </Collapse>
      </Box>
      {serviceTypeSelect}
      <Box width="100%">
        <Collapse
          in={Boolean(formValues.serviceType)}
          animateOpacity
          unmountOnExit={false}
        >
          {serviceNamesCheckboxes}
        </Collapse>
      </Box>
      <Button
        w="100%"
        variant="outline"
        message={{ id: 'button.filter' }}
        onClick={() => {
          setFormValue('page', 1);
          formSubmit();
        }}
      />
    </VStack>
  );
};
