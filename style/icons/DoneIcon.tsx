/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Icon, IconProps} from '@ui-kitten/components';

export default function DoneIcon({fill}: IconProps) {
  return (
    <Icon name="checkmark-square-2-outline" fill={fill} style={{width: 24, height: 24}} />
  );
}
