import React from 'react';
import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) => (
  <>
    <path
      d="M35.6886 26.1977L36.1143 22.182C36.861 15.1381 31.3391 9 24.2558 9C17.1725 9 11.6507 15.1381 12.3973 22.182L12.823 26.1978C13.414 31.7731 17.1623 36.51 22.4525 38.367C23.6198 38.7767 24.8918 38.7767 26.0591 38.367C31.3493 36.51 35.0976 31.7731 35.6886 26.1977Z"
      fill={props.iconPrimary}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.9002 22.2347C11.1222 14.8955 16.8755 8.5 24.2559 8.5C31.6362 8.5 37.3895 14.8955 36.6116 22.2347L36.1859 26.2505C35.5745 32.0178 31.6972 36.9179 26.2248 38.8388C24.9503 39.2861 23.5614 39.2861 22.2869 38.8388C16.8146 36.9179 12.9372 32.0179 12.3259 26.2505L11.9002 22.2347ZM24.2559 9.5C17.4695 9.5 12.1792 15.3807 12.8946 22.1293L13.3203 26.1451C13.8909 31.5284 17.5101 36.1022 22.6181 37.8952C23.6782 38.2673 24.8335 38.2673 25.8936 37.8952C29.3334 36.6878 32.0981 34.2192 33.7113 31.0916L31.4454 31.8103L30.5 34L29.5547 31.8103L27 31L29.5547 30.1897L30.5 28L31.4454 30.1897L33.7914 30.9338C34.5285 29.4592 35.0115 27.8424 35.1914 26.145L35.6171 22.1292C36.3325 15.3807 31.0422 9.5 24.2559 9.5ZM18.5 17L19.4454 19.5547L22 20.5L19.4454 21.4453L18.5 24L17.5547 21.4453L15 20.5L17.5547 19.5547L18.5 17Z"
      fill="black"
    />
  </>
);

export const viewBox = '0 0 48 48';
