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
      d="M11.9002 22.2347C11.1222 14.8955 16.8755 8.5 24.2559 8.5C31.6362 8.5 37.3895 14.8955 36.6116 22.2347L36.4597 23.6671C36.6441 23.4987 36.9271 23.4756 37.1388 23.6262C37.2802 23.7269 37.4136 23.8337 37.5379 23.9465C37.7594 24.1475 37.776 24.4901 37.575 24.7116C37.374 24.9331 37.0314 24.9497 36.8099 24.7487C36.7193 24.6665 36.6194 24.5863 36.5106 24.5088C36.4602 24.473 36.4179 24.4302 36.3839 24.3826L36.1859 26.2505C36.1081 26.9846 35.9773 27.7046 35.7971 28.4062C35.812 28.4346 35.8246 28.4647 35.8346 28.4964C35.9117 28.7415 35.8055 29.0005 35.5931 29.1255C34.2003 33.6082 30.7603 37.2467 26.2248 38.8388C24.9503 39.2861 23.5614 39.2861 22.2869 38.8388C17.8113 37.2677 14.4026 33.704 12.9749 29.3028C12.8198 29.2647 12.6679 29.2222 12.5197 29.1756C12.2343 29.0858 12.0757 28.7818 12.1655 28.4964C12.2342 28.278 12.4284 28.1338 12.6437 28.1184C12.4997 27.5081 12.3931 26.8845 12.3258 26.2505L11.9002 22.2347ZM34.8069 28.2408C34.7906 28.2449 34.7742 28.249 34.7578 28.253C34.4672 28.3241 34.2892 28.6173 34.3603 28.9078C34.3871 29.0174 34.4455 29.111 34.5235 29.1812C33.1559 33.2032 30.0076 36.4511 25.8936 37.8952C24.8335 38.2673 23.6782 38.2673 22.6181 37.8952C17.5101 36.1022 13.8909 31.5284 13.3203 26.1451L13.0708 23.7914C13.1273 23.776 13.1845 23.7612 13.2423 23.747C13.5329 23.6759 13.7108 23.3827 13.6398 23.0922C13.5687 22.8016 13.2755 22.6236 12.9849 22.6947L12.9553 22.702L12.8946 22.1293C12.1792 15.3807 17.4695 9.5 24.2559 9.5C31.0422 9.5 36.3325 15.3807 35.6171 22.1292L35.541 22.8475C35.5215 22.8387 35.5013 22.831 35.4804 22.8244C35.329 22.7768 35.1738 22.7335 35.0152 22.6947C34.7246 22.6236 34.4314 22.8016 34.3603 23.0922C34.2892 23.3827 34.4672 23.6759 34.7578 23.747C34.8941 23.7804 35.0268 23.8174 35.1554 23.8578C35.2485 23.8871 35.3436 23.89 35.4325 23.8706L35.1914 26.145C35.1157 26.8594 34.9863 27.5595 34.8069 28.2408ZM14.7616 22.4615C14.8407 22.4594 14.9202 22.4583 15 22.4583C15.0799 22.4583 15.1594 22.4594 15.2385 22.4615C15.5375 22.4694 15.7735 22.7182 15.7656 23.0173C15.7577 23.3163 15.5089 23.5524 15.2098 23.5444C15.1403 23.5426 15.0704 23.5417 15 23.5417C14.9297 23.5417 14.8598 23.5426 14.7903 23.5444C14.4912 23.5524 14.2424 23.3163 14.2345 23.0173C14.2266 22.7182 14.4626 22.4694 14.7616 22.4615ZM16.3603 23.0922C16.4314 22.8016 16.7246 22.6236 17.0152 22.6947C17.1738 22.7335 17.329 22.7768 17.4804 22.8244C17.7658 22.9142 17.9243 23.2182 17.8346 23.5036C17.7449 23.789 17.4408 23.9476 17.1554 23.8578C17.0268 23.8174 16.8941 23.7804 16.7578 23.747C16.4672 23.6759 16.2892 23.3827 16.3603 23.0922ZM11.6167 23.7534C11.7902 23.9972 11.7332 24.3354 11.4895 24.5088C11.3807 24.5863 11.2808 24.6665 11.1902 24.7487C10.9687 24.9497 10.6261 24.9331 10.4251 24.7116C10.2241 24.4901 10.2407 24.1475 10.4622 23.9465C10.5864 23.8337 10.7199 23.7269 10.8613 23.6262C11.105 23.4528 11.4432 23.5097 11.6167 23.7534ZM18.3834 23.7534C18.5569 23.5097 18.8951 23.4528 19.1388 23.6262C19.2802 23.7269 19.4136 23.8337 19.5379 23.9465C19.7594 24.1475 19.776 24.4901 19.575 24.7116C19.374 24.9331 19.0314 24.9497 18.8099 24.7487C18.7193 24.6665 18.6194 24.5863 18.5106 24.5088C18.2669 24.3354 18.2099 23.9972 18.3834 23.7534ZM10.0797 25.2389C10.3766 25.2753 10.5878 25.5456 10.5513 25.8425C10.545 25.8945 10.5417 25.947 10.5417 26C10.5417 26.053 10.545 26.1055 10.5513 26.1575C10.5878 26.4544 10.3766 26.7247 10.0797 26.7611C9.78277 26.7976 9.51252 26.5864 9.47608 26.2895C9.46435 26.1939 9.45837 26.0974 9.45837 26C9.45837 25.9026 9.46435 25.8061 9.47608 25.7105C9.51252 25.4136 9.78277 25.2024 10.0797 25.2389ZM19.9204 25.2389C20.2173 25.2024 20.4876 25.4136 20.524 25.7105C20.5357 25.8061 20.5417 25.9026 20.5417 26C20.5417 26.0974 20.5357 26.1939 20.524 26.2895C20.4876 26.5864 20.2173 26.7976 19.9204 26.7611C19.6235 26.7247 19.4123 26.4544 19.4487 26.1575C19.4551 26.1055 19.4584 26.053 19.4584 26C19.4584 25.947 19.4551 25.8945 19.4487 25.8425C19.4123 25.5456 19.6235 25.2753 19.9204 25.2389ZM19.575 27.2884C19.776 27.5099 19.7594 27.8525 19.5379 28.0535C19.4136 28.1663 19.2802 28.2731 19.1388 28.3738C18.8951 28.5472 18.5569 28.4903 18.3834 28.2466C18.2099 28.0028 18.2669 27.6646 18.5106 27.4912C18.6194 27.4137 18.7193 27.3335 18.8099 27.2513C19.0314 27.0503 19.374 27.0669 19.575 27.2884ZM10.4251 27.2884C10.6261 27.0669 10.9687 27.0503 11.1902 27.2513C11.2808 27.3335 11.3807 27.4137 11.4895 27.4912C11.7332 27.6646 11.7902 28.0028 11.6167 28.2466C11.4432 28.4903 11.105 28.5472 10.8613 28.3738C10.7199 28.2731 10.5864 28.1663 10.4622 28.0535C10.2407 27.8525 10.2241 27.5099 10.4251 27.2884ZM17.8346 28.4964C17.9243 28.7818 17.7658 29.0858 17.4804 29.1756C17.329 29.2232 17.1738 29.2665 17.0152 29.3053C16.7246 29.3764 16.4314 29.1984 16.3603 28.9078C16.2892 28.6173 16.4672 28.3241 16.7578 28.253C16.8941 28.2196 17.0268 28.1826 17.1554 28.1422C17.4408 28.0524 17.7449 28.211 17.8346 28.4964ZM14.2345 28.9827C14.2424 28.6837 14.4912 28.4477 14.7903 28.4556C14.8598 28.4574 14.9297 28.4583 15 28.4583C15.0704 28.4583 15.1403 28.4574 15.2098 28.4556C15.5089 28.4477 15.7577 28.6837 15.7656 28.9827C15.7735 29.2818 15.5375 29.5306 15.2385 29.5385C15.1594 29.5406 15.0799 29.5417 15 29.5417C14.9202 29.5417 14.8407 29.5406 14.7616 29.5385C14.4626 29.5306 14.2266 29.2818 14.2345 28.9827ZM33 22.4583C32.9202 22.4583 32.8407 22.4594 32.7616 22.4615C32.4626 22.4694 32.2266 22.7182 32.2345 23.0173C32.2424 23.3163 32.4912 23.5524 32.7903 23.5444C32.8598 23.5426 32.9297 23.5417 33 23.5417C33.0704 23.5417 33.1403 23.5426 33.2098 23.5444C33.5089 23.5524 33.7577 23.3163 33.7656 23.0173C33.7735 22.7182 33.5375 22.4694 33.2385 22.4615C33.1594 22.4594 33.0799 22.4583 33 22.4583ZM31.2423 23.747C31.5329 23.6759 31.7108 23.3827 31.6398 23.0922C31.5687 22.8016 31.2755 22.6236 30.9849 22.6947C30.8263 22.7335 30.6711 22.7768 30.5197 22.8244C30.2343 22.9142 30.0757 23.2182 30.1655 23.5036C30.2552 23.789 30.5593 23.9476 30.8447 23.8578C30.9733 23.8174 31.106 23.7804 31.2423 23.747ZM29.4895 24.5088C29.7332 24.3354 29.7902 23.9972 29.6167 23.7534C29.4432 23.5097 29.105 23.4528 28.8613 23.6262C28.7199 23.7269 28.5864 23.8337 28.4622 23.9465C28.2407 24.1475 28.2241 24.4901 28.4251 24.7116C28.6261 24.9331 28.9687 24.9497 29.1902 24.7487C29.2808 24.6665 29.3807 24.5863 29.4895 24.5088ZM28.5513 25.8425C28.5878 25.5456 28.3766 25.2753 28.0797 25.2389C27.7828 25.2024 27.5125 25.4136 27.4761 25.7105C27.4643 25.8061 27.4584 25.9026 27.4584 26C27.4584 26.0974 27.4643 26.1939 27.4761 26.2895C27.5125 26.5864 27.7828 26.7976 28.0797 26.7611C28.3766 26.7247 28.5878 26.4544 28.5513 26.1575C28.545 26.1055 28.5417 26.053 28.5417 26C28.5417 25.947 28.545 25.8945 28.5513 25.8425ZM38.524 25.7105C38.4876 25.4136 38.2173 25.2024 37.9204 25.2389C37.6235 25.2753 37.4123 25.5456 37.4487 25.8425C37.4551 25.8945 37.4584 25.947 37.4584 26C37.4584 26.053 37.4551 26.1055 37.4487 26.1575C37.4123 26.4544 37.6235 26.7247 37.9204 26.7611C38.2173 26.7976 38.4876 26.5864 38.524 26.2895C38.5357 26.1939 38.5417 26.0974 38.5417 26C38.5417 25.9026 38.5357 25.8061 38.524 25.7105ZM37.5379 28.0535C37.7594 27.8525 37.776 27.5099 37.575 27.2884C37.374 27.0669 37.0314 27.0503 36.8099 27.2513C36.7193 27.3335 36.6194 27.4137 36.5106 27.4912C36.2669 27.6646 36.2099 28.0028 36.3834 28.2466C36.5569 28.4903 36.8951 28.5472 37.1388 28.3738C37.2802 28.2731 37.4136 28.1663 37.5379 28.0535ZM29.1902 27.2513C28.9687 27.0503 28.6261 27.0669 28.4251 27.2884C28.2241 27.5099 28.2407 27.8525 28.4622 28.0535C28.5864 28.1663 28.7199 28.2731 28.8613 28.3738C29.105 28.5472 29.4432 28.4903 29.6167 28.2466C29.7902 28.0028 29.7332 27.6646 29.4895 27.4912C29.3807 27.4137 29.2808 27.3335 29.1902 27.2513ZM30.8447 28.1422C30.5593 28.0524 30.2552 28.211 30.1655 28.4964C30.0757 28.7818 30.2343 29.0858 30.5197 29.1756C30.6711 29.2232 30.8263 29.2665 30.9849 29.3053C31.2755 29.3764 31.5687 29.1984 31.6398 28.9078C31.7108 28.6173 31.5329 28.3241 31.2423 28.253C31.106 28.2196 30.9733 28.1826 30.8447 28.1422ZM32.7903 28.4556C32.4912 28.4477 32.2424 28.6837 32.2345 28.9827C32.2266 29.2818 32.4626 29.5306 32.7616 29.5385C32.8407 29.5406 32.9202 29.5417 33 29.5417C33.0799 29.5417 33.1594 29.5406 33.2385 29.5385C33.5375 29.5306 33.7735 29.2818 33.7656 28.9827C33.7577 28.6837 33.5089 28.4477 33.2098 28.4556C33.1403 28.4574 33.0704 28.4583 33 28.4583C32.9297 28.4583 32.8598 28.4574 32.7903 28.4556Z"
      fill="black"
    />
  </>
);

export const viewBox = '0 0 48 48';
