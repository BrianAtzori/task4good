/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Icon, IconProps} from '@ui-kitten/components';

export default function CloseIcon({fill}: IconProps) {
  return (
    <Icon
      name="close-circle-outline"
      fill={fill}
      style={{width: 24, height: 24}}
    />
  );
}
