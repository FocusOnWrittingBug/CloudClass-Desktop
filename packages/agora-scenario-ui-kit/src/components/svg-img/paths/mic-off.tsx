import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) =>
    <g fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.3371 11.5249C16.0619 9.65735 17.8763 8.33337 20 8.33337C22.7614 8.33337 25 10.5719 25 13.3334V20C25 20.1987 24.9884 20.3947 24.9659 20.5873L15.3371 11.5249ZM15 16.9296V20C15 22.7615 17.2386 25 20 25C21.0033 25 21.9375 24.7046 22.7205 24.1959L15 16.9296ZM23.7138 25.1308C22.6705 25.8873 21.3874 26.3334 20.0001 26.3334C16.5023 26.3334 13.6667 23.4978 13.6667 20V17.5C13.6667 16.8557 13.1444 16.3334 12.5001 16.3334C11.8557 16.3334 11.3334 16.8557 11.3334 17.5V20C11.3334 24.362 14.5559 27.9713 18.7501 28.5772V29.1667H16.1667C15.5224 29.1667 15.0001 29.689 15.0001 30.3334C15.0001 30.9777 15.5224 31.5 16.1667 31.5H23.8334C24.4777 31.5 25.0001 30.9777 25.0001 30.3334C25.0001 29.689 24.4777 29.1667 23.8334 29.1667H21.2501V28.5772C22.8208 28.3503 24.2553 27.7021 25.4352 26.751L23.7138 25.1308ZM27.9686 23.4135C28.4179 22.366 28.6667 21.212 28.6667 20V17.5C28.6667 16.8557 28.1444 16.3334 27.5001 16.3334C26.8557 16.3334 26.3334 16.8557 26.3334 17.5V20C26.3334 20.5766 26.2564 21.1352 26.112 21.666L27.9686 23.4135Z" fill={props.iconPrimary} />
        <path d="M27.5 25.8334L13.3333 12.5" stroke={props.iconPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>


export const viewBox = '0 0 40 40';
