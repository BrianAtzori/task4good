/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Icon, IconProps} from '@ui-kitten/components';

export default function PersonalTaskIcon({fill}: IconProps) {
  return (
    <Icon
      name="person-done-outline"
      fill={fill}
      style={{width: 24, height: 24}}
    />
  );
}
