/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Icon, IconProps} from '@ui-kitten/components';

export default function GreenTaskIcon({fill}: IconProps) {
  return (
    <Icon
      name="globe-2-outline"
      fill={fill}
      style={{width: 24, height: 24}}
    />
  );
}
