type IconProps = React.HTMLAttributes<SVGElement>;

export const SvgIcon = {
  logo: (props: IconProps) => (
    <svg
      {...props}
      width="30"
      height="12"
      viewBox="0 0 190 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 65.7254C20 43.892 42.4 2.82538 52 13.2254C64 26.2254 49 77.7254 71.5 61.7254C94 45.7254 109 -25.7746 125 35.2254C137.8 84.0254 167.667 55.5587 181 35.2254"
        stroke="currentColor"
        strokeWidth="21"
      />
    </svg>
  ),
  arrowBack: (props: IconProps) => (
    <svg strokeLinejoin="round" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.46966 13.7803L6.99999 14.3107L8.06065 13.25L7.53032 12.7197L3.56065 8.75001H14.25H15V7.25001H14.25H3.56065L7.53032 3.28034L8.06065 2.75001L6.99999 1.68935L6.46966 2.21968L1.39644 7.2929C1.00592 7.68342 1.00592 8.31659 1.39644 8.70711L6.46966 13.7803Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  home: (props: IconProps) => (
    <svg strokeLinejoin="round" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 6.56062L8.00001 2.06062L3.50001 6.56062V13.5L6.00001 13.5V11C6.00001 9.89539 6.89544 8.99996 8.00001 8.99996C9.10458 8.99996 10 9.89539 10 11V13.5L12.5 13.5V6.56062ZM13.78 5.71933L8.70711 0.646409C8.31659 0.255886 7.68342 0.255883 7.2929 0.646409L2.21987 5.71944C2.21974 5.71957 2.21961 5.7197 2.21949 5.71982L0.469676 7.46963L-0.0606537 7.99996L1.00001 9.06062L1.53034 8.53029L2.00001 8.06062V14.25V15H2.75001L6.00001 15H7.50001H8.50001H10L13.25 15H14V14.25V8.06062L14.4697 8.53029L15 9.06062L16.0607 7.99996L15.5303 7.46963L13.7806 5.71993C13.7804 5.71973 13.7802 5.71953 13.78 5.71933ZM8.50001 11V13.5H7.50001V11C7.50001 10.7238 7.72386 10.5 8.00001 10.5C8.27615 10.5 8.50001 10.7238 8.50001 11Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  speaker: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.74421 10.6976L3 10.5H1.5V5.5H3L3.74421 5.30236L8.5 2.58477V13.4152L3.74421 10.6976ZM3 4L8.5 0.857143L10 0V1.72763V14.2724V16L8.5 15.1429L3 12H1C0.447715 12 0 11.5523 0 11V5C0 4.44772 0.447715 4 1 4H3ZM14.2585 2.96051L14.6728 3.58567C15.5116 4.85121 16 6.3697 16 8C16 9.6303 15.5116 11.1488 14.6728 12.4143L14.2585 13.0395L13.0082 12.2108L13.4225 11.5857C14.1034 10.5582 14.5 9.32657 14.5 8C14.5 6.67343 14.1034 5.44176 13.4225 4.41433L13.0082 3.78916L14.2585 2.96051ZM12.059 4.98506L12.4125 5.64655C12.7876 6.34871 13 7.15067 13 8C13 8.84933 12.7876 9.65129 12.4125 10.3534L12.059 11.0149L10.736 10.3081L11.0895 9.64655C11.3513 9.15657 11.5 8.59676 11.5 8C11.5 7.40324 11.3513 6.84344 11.0895 6.35345L10.736 5.69195L12.059 4.98506Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  speakerOff: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 1.25001V0.0551147L12.9239 0.574593L5.82844 4.00001H3.25001H2.67706L1.33542 3.32919L0.664595 2.99378L-0.00622559 4.33542L0.664595 4.67083L14.6646 11.6708L15.3354 12.0062L16.0062 10.6646L15.3354 10.3292L14 9.66148V9.50001V1.25001ZM12.5 8.91148V2.4449L6.37757 5.40056C6.24198 5.46601 6.09337 5.50001 5.94282 5.50001H5.67706L12.5 8.91148ZM3.50001 8.00001V7.25001H2.00001V8.00001V11C2.00001 11.5523 2.44772 12 3.00001 12H5.82844L12.9239 15.4254L14 15.9449V14.75V13.5V12.75H12.5V13.5V13.5551L6.37757 10.5995C6.24198 10.534 6.09337 10.5 5.94282 10.5H3.50001V8.00001Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  pause: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 2.5V1.75H4V2.5V13.5V14.25H5.5V13.5V2.5ZM12 2.5V1.75H10.5V2.5V13.5V14.25H12V13.5V2.5Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  play: (props: IconProps) => (
    <svg strokeLinejoin="round" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4549 7.22745L13.3229 7.16146L2.5 1.74999L2.4583 1.72914L1.80902 1.4045L1.3618 1.18089C1.19558 1.09778 1 1.21865 1 1.4045L1 1.9045L1 2.63041L1 2.67704L1 13.3229L1 13.3696L1 14.0955L1 14.5955C1 14.7813 1.19558 14.9022 1.3618 14.8191L1.80902 14.5955L2.4583 14.2708L2.5 14.25L13.3229 8.83852L13.4549 8.77253L14.2546 8.37267L14.5528 8.2236C14.737 8.13147 14.737 7.86851 14.5528 7.77638L14.2546 7.62731L13.4549 7.22745ZM11.6459 7.99999L2.5 3.42704L2.5 12.5729L11.6459 7.99999Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  playFill: (props: IconProps) => (
    <svg strokeLinejoin="round" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5528 7.77638C14.737 7.86851 14.737 8.13147 14.5528 8.2236L1.3618 14.8191C1.19558 14.9022 1 14.7813 1 14.5955L1 1.4045C1 1.21865 1.19558 1.09778 1.3618 1.18089L14.5528 7.77638Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  sun: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 0.75V0H7.25V0.75V2V2.75H8.75V2V0.75ZM11.182 3.75732L11.7123 3.22699L12.0659 2.87344L12.5962 2.34311L13.6569 3.40377L13.1265 3.9341L12.773 4.28765L12.2426 4.81798L11.182 3.75732ZM8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM13.25 7.25H14H15.25H16V8.75H15.25H14H13.25V7.25ZM0.75 7.25H0V8.75H0.75H2H2.75V7.25H2H0.75ZM2.87348 12.0659L2.34315 12.5962L3.40381 13.6569L3.93414 13.1265L4.28769 12.773L4.81802 12.2426L3.75736 11.182L3.22703 11.7123L2.87348 12.0659ZM3.75735 4.81798L3.22702 4.28765L2.87347 3.9341L2.34314 3.40377L3.4038 2.34311L3.93413 2.87344L4.28768 3.22699L4.81802 3.75732L3.75735 4.81798ZM12.0659 13.1265L12.5962 13.6569L13.6569 12.5962L13.1265 12.0659L12.773 11.7123L12.2426 11.182L11.182 12.2426L11.7123 12.773L12.0659 13.1265ZM8.75 13.25V14V15.25V16H7.25V15.25V14V13.25H8.75Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  moon: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 8.00005C1.5 5.53089 2.99198 3.40932 5.12349 2.48889C4.88136 3.19858 4.75 3.95936 4.75 4.7501C4.75 8.61609 7.88401 11.7501 11.75 11.7501C11.8995 11.7501 12.048 11.7454 12.1953 11.7361C11.0955 13.1164 9.40047 14.0001 7.5 14.0001C4.18629 14.0001 1.5 11.3138 1.5 8.00005ZM6.41706 0.577759C2.78784 1.1031 0 4.22536 0 8.00005C0 12.1422 3.35786 15.5001 7.5 15.5001C10.5798 15.5001 13.2244 13.6438 14.3792 10.9921L13.4588 9.9797C12.9218 10.155 12.3478 10.2501 11.75 10.2501C8.71243 10.2501 6.25 7.78767 6.25 4.7501C6.25 3.63431 6.58146 2.59823 7.15111 1.73217L6.41706 0.577759ZM13.25 1V1.75V2.75L14.25 2.75H15V4.25H14.25H13.25V5.25V6H11.75V5.25V4.25H10.75L10 4.25V2.75H10.75L11.75 2.75V1.75V1H13.25Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  search: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  chevronDown: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  chevronLeft: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 14.0607L9.96966 13.5303L5.14644 8.7071C4.75592 8.31658 4.75592 7.68341 5.14644 7.29289L9.96966 2.46966L10.5 1.93933L11.5607 2.99999L11.0303 3.53032L6.56065 7.99999L11.0303 12.4697L11.5607 13L10.5 14.0607Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  chevronLeftDouble: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.14647 7.2929C2.75595 7.68343 2.75595 8.31659 3.14647 8.70712L6.96969 12.5303L7.50002 13.0607L8.56068 12L8.03035 11.4697L4.56068 8.00001L8.03035 4.53034L8.56068 4.00001L7.50002 2.93935L6.96969 3.46968L3.14647 7.2929ZM8.14647 7.2929C7.75595 7.68343 7.75595 8.31659 8.14647 8.70712L11.9697 12.5303L12.5 13.0607L13.5607 12L13.0304 11.4697L9.56068 8.00001L13.0304 4.53034L13.5607 4.00001L12.5 2.93935L11.9697 3.46968L8.14647 7.2929Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  chevronRight: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.50001 1.93933L6.03034 2.46966L10.8536 7.29288C11.2441 7.68341 11.2441 8.31657 10.8536 8.7071L6.03034 13.5303L5.50001 14.0607L4.43935 13L4.96968 12.4697L9.43935 7.99999L4.96968 3.53032L4.43935 2.99999L5.50001 1.93933Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  chevronRightDouble: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8536 8.7071C13.2441 8.31657 13.2441 7.68341 12.8536 7.29288L9.03034 3.46966L8.50001 2.93933L7.43935 3.99999L7.96968 4.53032L11.4393 7.99999L7.96968 11.4697L7.43935 12L8.50001 13.0607L9.03034 12.5303L12.8536 8.7071ZM7.85356 8.7071C8.24408 8.31657 8.24408 7.68341 7.85356 7.29288L4.03034 3.46966L3.50001 2.93933L2.43935 3.99999L2.96968 4.53032L6.43935 7.99999L2.96968 11.4697L2.43935 12L3.50001 13.0607L4.03034 12.5303L7.85356 8.7071Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  setting: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.70059 1.73618L7.74488 1.5H8.2551L8.29938 1.73618C8.4406 2.48936 8.98357 3.04807 9.63284 3.27226C9.82296 3.33791 10.008 3.41476 10.1871 3.50207C10.805 3.80328 11.5845 3.7922 12.2172 3.35933L12.4158 3.22342L12.7766 3.5842L12.6407 3.78284C12.2078 4.41549 12.1967 5.19496 12.4979 5.81292C12.5852 5.99203 12.6621 6.17703 12.7277 6.36714C12.9519 7.01642 13.5106 7.55938 14.2638 7.7006L14.5 7.74489V8.25511L14.2638 8.2994C13.5106 8.44062 12.9519 8.98359 12.7277 9.63286C12.6621 9.82298 12.5852 10.008 12.4979 10.1871C12.1967 10.805 12.2078 11.5845 12.6407 12.2172L12.7766 12.4158L12.4158 12.7766L12.2172 12.6407C11.5845 12.2078 10.805 12.1967 10.1871 12.4979C10.008 12.5852 9.82296 12.6621 9.63284 12.7277C8.98357 12.9519 8.4406 13.5106 8.29938 14.2638L8.2551 14.5H7.74488L7.70059 14.2638C7.55937 13.5106 7.0164 12.9519 6.36713 12.7277C6.17702 12.6621 5.99202 12.5852 5.8129 12.4979C5.19495 12.1967 4.41548 12.2078 3.78283 12.6407L3.5842 12.7766L3.22342 12.4158L3.35932 12.2172C3.79219 11.5845 3.80326 10.8051 3.50206 10.1871C3.41475 10.008 3.3379 9.82298 3.27225 9.63285C3.04806 8.98358 2.48935 8.44061 1.73616 8.29939L1.5 8.25511V7.74489L1.73616 7.70061C2.48935 7.55939 3.04806 7.01642 3.27225 6.36715C3.3379 6.17703 3.41475 5.99203 3.50205 5.81291C3.80326 5.19496 3.79218 4.41549 3.35931 3.78283L3.2234 3.5842L3.58418 3.22342L3.78282 3.35932C4.41547 3.79219 5.19494 3.80327 5.8129 3.50207C5.99201 3.41476 6.17701 3.33791 6.36713 3.27226C7.0164 3.04807 7.55937 2.48936 7.70059 1.73618ZM6.49999 0H9.49999L9.77369 1.45974C9.80837 1.64472 9.94454 1.79299 10.1224 1.85441C10.3702 1.93996 10.6111 2.04007 10.8443 2.15371C11.0135 2.2362 11.2148 2.22768 11.3701 2.12137L12.5962 1.28249L14.7175 3.40381L13.8786 4.62987C13.7723 4.78525 13.7638 4.98647 13.8463 5.1557C13.9599 5.38885 14.06 5.62981 14.1456 5.87756C14.207 6.05545 14.3553 6.19161 14.5402 6.2263L16 6.5V9.5L14.5402 9.7737C14.3553 9.80839 14.207 9.94455 14.1456 10.1224C14.06 10.3702 13.9599 10.6112 13.8463 10.8443C13.7638 11.0135 13.7723 11.2148 13.8786 11.3701L14.7175 12.5962L12.5962 14.7175L11.3701 13.8786C11.2147 13.7723 11.0135 13.7638 10.8443 13.8463C10.6111 13.9599 10.3702 14.06 10.1224 14.1456C9.94454 14.207 9.80837 14.3553 9.77369 14.5403L9.49999 16H6.49999L6.22628 14.5403C6.1916 14.3553 6.05544 14.207 5.87755 14.1456C5.6298 14.06 5.38884 13.9599 5.15569 13.8463C4.98645 13.7638 4.78523 13.7723 4.62985 13.8786L3.40381 14.7175L1.28249 12.5962L2.12136 11.3702C2.22767 11.2148 2.23619 11.0136 2.1537 10.8443C2.04006 10.6112 1.93995 10.3702 1.8544 10.1224C1.79297 9.94455 1.6447 9.80838 1.45973 9.7737L0 9.5V6.5L1.45973 6.2263C1.6447 6.19162 1.79297 6.05545 1.8544 5.87756C1.93995 5.62981 2.04005 5.38885 2.1537 5.15569C2.23619 4.98646 2.22766 4.78524 2.12135 4.62986L1.28247 3.40381L3.40379 1.28249L4.62984 2.12136C4.78522 2.22767 4.98644 2.2362 5.15568 2.15371C5.38883 2.04007 5.6298 1.93996 5.87755 1.85441C6.05544 1.79299 6.1916 1.64472 6.22628 1.45975L6.49999 0ZM9.49998 8C9.49998 8.82843 8.82841 9.5 7.99998 9.5C7.17156 9.5 6.49998 8.82843 6.49998 8C6.49998 7.17157 7.17156 6.5 7.99998 6.5C8.82841 6.5 9.49998 7.17157 9.49998 8ZM11 8C11 9.65685 9.65684 11 7.99998 11C6.34313 11 4.99998 9.65685 4.99998 8C4.99998 6.34315 6.34313 5 7.99998 5C9.65684 5 11 6.34315 11 8Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  logout: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 13.5H6.75V15H2C1.44772 15 1 14.5523 1 14V2C1 1.44771 1.44772 1 2 1H6.75V2.5L2.5 2.5L2.5 13.5ZM12.4393 7.24999L10.4697 5.28031L9.93934 4.74998L11 3.68932L11.5303 4.21965L14.6036 7.29288C14.9941 7.6834 14.9941 8.31657 14.6036 8.70709L11.5303 11.7803L11 12.3106L9.93934 11.25L10.4697 10.7197L12.4393 8.74999L5.75 8.74999H5V7.24999H5.75L12.4393 7.24999Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  google: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
        fill="#4285F4"
      ></path>
      <path
        d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
        fill="#34A853"
      ></path>
      <path
        d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
        fill="#FBBC05"
      ></path>
      <path
        d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
        fill="#EA4335"
      ></path>
    </svg>
  ),

  github: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <g clipPath="url(#clip0_872_3147)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_872_3147">
          <rect width="16" height="16" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  ),

  check: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  star: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00001 0.433594L8.65845 1.64093L10.5908 5.18412L14.5577 5.92698L15.9094 6.18011L14.9646 7.17942L12.192 10.1121L12.7113 14.1144L12.8883 15.4782L11.6459 14.8884L8.00001 13.1577L4.35408 14.8884L3.11173 15.4782L3.28869 14.1144L3.80802 10.1121L1.03538 7.17942L0.0906067 6.18011L1.44233 5.92698L5.40922 5.18412L7.34156 1.64093L8.00001 0.433594ZM8.00001 3.56646L6.55565 6.21487L6.38519 6.52743L6.03525 6.59296L3.07014 7.14822L5.14259 9.34029L5.38718 9.59899L5.34137 9.95205L4.95318 12.9436L7.67838 11.65L8.00001 11.4973L8.32163 11.65L11.0468 12.9436L10.6586 9.95205L10.6128 9.59899L10.8574 9.34029L12.9299 7.14822L9.96476 6.59296L9.61482 6.52743L9.44436 6.21487L8.00001 3.56646Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  verticalDots: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 4C7.17157 4 6.5 3.32843 6.5 2.5C6.5 1.67157 7.17157 1 8 1C8.82843 1 9.5 1.67157 9.5 2.5C9.5 3.32843 8.82843 4 8 4ZM8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8C9.5 8.82843 8.82843 9.5 8 9.5ZM6.5 13.5C6.5 14.3284 7.17157 15 8 15C8.82843 15 9.5 14.3284 9.5 13.5C9.5 12.6716 8.82843 12 8 12C7.17157 12 6.5 12.6716 6.5 13.5Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  thumbUp: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.89531 2.23972C6.72984 2.12153 6.5 2.23981 6.5 2.44315V5.25001C6.5 6.21651 5.7165 7.00001 4.75 7.00001H2.5V13.5H12.1884C12.762 13.5 13.262 13.1096 13.4011 12.5532L14.4011 8.55318C14.5984 7.76425 14.0017 7.00001 13.1884 7.00001H9.25H8.5V6.25001V3.51458C8.5 3.43384 8.46101 3.35807 8.39531 3.31114L6.89531 2.23972ZM5 2.44315C5 1.01975 6.6089 0.191779 7.76717 1.01912L9.26717 2.09054C9.72706 2.41904 10 2.94941 10 3.51458V5.50001H13.1884C14.9775 5.50001 16.2903 7.18133 15.8563 8.91698L14.8563 12.917C14.5503 14.1412 13.4503 15 12.1884 15H1.75H1V14.25V6.25001V5.50001H1.75H4.75C4.88807 5.50001 5 5.38808 5 5.25001V2.44315Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  heartFill: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        d="M1.39408 2.14408C3.21165 0.326509 6.13348 0.286219 8 2.02321C9.86652 0.286221 12.7884 0.326509 14.6059 2.14408C16.4647 4.00286 16.4647 7.01653 14.6059 8.87531L8 15.4812L1.39408 8.87531C-0.464691 7.01653 -0.464694 4.00286 1.39408 2.14408Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  startFill: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        d="M7.99999 0.489502L10.5734 5.20807L15.8562 6.19736L12.1638 10.1029L12.8554 15.4329L7.99999 13.1281L3.1446 15.4329L3.83621 10.1029L0.143799 6.19736L5.42663 5.20807L7.99999 0.489502Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  heart: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  information: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.25 7H7H7.74999C8.30227 7 8.74999 7.44772 8.74999 8V11.5V12.25H7.24999V11.5V8.5H7H6.25V7ZM8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  server: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5 1.5L2.5 1.5L2.5 4.5C2.5 5.05228 2.94772 5.5 3.5 5.5L12.5 5.5C13.0523 5.5 13.5 5.05228 13.5 4.5V1.5ZM15 0H13.5H2.5H1V1.5V4.5C1 5.88071 2.11929 7 3.5 7L12.5 7C13.8807 7 15 5.88071 15 4.5V1.5V0ZM2.5 13.5V10.5H13.5V13.5C13.5 14.0523 13.0523 14.5 12.5 14.5H3.5C2.94772 14.5 2.5 14.0523 2.5 13.5ZM1 9H2.5H13.5H15V10.5V13.5C15 14.8807 13.8807 16 12.5 16H3.5C2.11929 16 1 14.8807 1 13.5V10.5V9ZM4.75 13.25C5.16421 13.25 5.5 12.9142 5.5 12.5C5.5 12.0858 5.16421 11.75 4.75 11.75C4.33579 11.75 4 12.0858 4 12.5C4 12.9142 4.33579 13.25 4.75 13.25ZM8 12.5C8 12.9142 7.66421 13.25 7.25 13.25C6.83579 13.25 6.5 12.9142 6.5 12.5C6.5 12.0858 6.83579 11.75 7.25 11.75C7.66421 11.75 8 12.0858 8 12.5ZM10.5 3.5C10.5 3.91421 10.8358 4.25 11.25 4.25C11.6642 4.25 12 3.91421 12 3.5C12 3.08579 11.6642 2.75 11.25 2.75C10.8358 2.75 10.5 3.08579 10.5 3.5ZM8.75 4.25C8.33579 4.25 8 3.91421 8 3.5C8 3.08579 8.33579 2.75 8.75 2.75C9.16421 2.75 9.5 3.08579 9.5 3.5C9.5 3.91421 9.16421 4.25 8.75 4.25Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  closedCaption: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 3.5C0 2.11929 1.11929 1 2.5 1H13.5C14.8807 1 16 2.11929 16 3.5V12.5C16 13.8807 14.8807 15 13.5 15H2.5C1.11929 15 0 13.8807 0 12.5V3.5ZM2 7C2 5.75736 3.00736 4.75 4.25 4.75H5.25C6.49264 4.75 7.5 5.75736 7.5 7H6C6 6.58579 5.66421 6.25 5.25 6.25H4.25C3.83579 6.25 3.5 6.58579 3.5 7V9C3.5 9.41421 3.83579 9.75 4.25 9.75H5.25C5.66421 9.75 6 9.41421 6 9H7.5C7.5 10.2426 6.49264 11.25 5.25 11.25H4.25C3.00736 11.25 2 10.2426 2 9V7ZM10.75 4.75C9.50736 4.75 8.5 5.75736 8.5 7V9C8.5 10.2426 9.50736 11.25 10.75 11.25H11.75C12.9926 11.25 14 10.2426 14 9H12.5C12.5 9.41421 12.1642 9.75 11.75 9.75H10.75C10.3358 9.75 10 9.41421 10 9V7C10 6.58579 10.3358 6.25 10.75 6.25H11.75C12.1642 6.25 12.5 6.58579 12.5 7H14C14 5.75736 12.9926 4.75 11.75 4.75H10.75Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  microphone: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.50098 1.5H7.50098C6.67255 1.5 6.00098 2.17157 6.00098 3V7C6.00098 7.82843 6.67255 8.5 7.50098 8.5H8.50098C9.32941 8.5 10.001 7.82843 10.001 7V3C10.001 2.17157 9.32941 1.5 8.50098 1.5ZM7.50098 0C5.84412 0 4.50098 1.34315 4.50098 3V7C4.50098 8.65685 5.84412 10 7.50098 10H8.50098C10.1578 10 11.501 8.65685 11.501 7V3C11.501 1.34315 10.1578 0 8.50098 0H7.50098ZM7.25098 13.2088V15.25V16H8.75098V15.25V13.2088C11.5607 12.8983 13.8494 10.8635 14.5383 8.18694L14.7252 7.46062L13.2726 7.08673L13.0856 7.81306C12.5028 10.0776 10.4462 11.75 8.00098 11.75C5.55572 11.75 3.49918 10.0776 2.91633 7.81306L2.72939 7.08673L1.27673 7.46062L1.46368 8.18694C2.15258 10.8635 4.44128 12.8983 7.25098 13.2088Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  listOrdered: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.6225 0.872994C3.6225 0.681304 3.53419 0.500304 3.3831 0.382336C3.232 0.264368 3.03499 0.222589 2.84902 0.26908L1.84902 0.51908L1.24511 0.670059L1.54707 1.87789L2.15098 1.72691L2.3775 1.67028V3.75049H2H1.3775V4.99549H2H3H4H4.6225V3.75049H4H3.6225V0.872994ZM7.75 2.12749H7.1275V3.37249H7.75H14.25H14.8725V2.12749H14.25H7.75ZM7.1275 7.37749H7.75H14.25H14.8725V8.62249H14.25H7.75H7.1275V7.37749ZM7.1275 12.6275H7.75H14.25H14.8725V13.8725H14.25H7.75H7.1275V12.6275ZM3.06804 11.7464C3.04537 11.739 3.00818 11.7331 2.94549 11.761L2.25283 12.0688L1.68399 12.3217L1.17834 11.184L1.74719 10.9311L2.43985 10.6233C3.87191 9.98682 5.13017 11.7951 4.03567 12.9167L2.72725 14.2575H4.00001H4.62251V15.5025H4.00001H2.43655C1.44311 15.5025 0.939354 14.307 1.63317 13.596L3.14462 12.0472C3.19253 11.9981 3.1999 11.9611 3.20092 11.9373C3.20227 11.9057 3.19218 11.8633 3.16328 11.8218C3.13438 11.7803 3.09812 11.7561 3.06804 11.7464Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  grid: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 5.5V2.5H5.5V5.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2ZM2.5 13.5V10.5H5.5V13.5H2.5ZM1 10C1 9.44772 1.44772 9 2 9H6C6.55228 9 7 9.44772 7 10V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V10ZM10.5 2.5V5.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6V2C15 1.44772 14.5523 1 14 1H10ZM10.5 13.5V10.5H13.5V13.5H10.5ZM9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V10Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  chevronDoubleLeft: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.14647 7.2929C2.75595 7.68343 2.75595 8.31659 3.14647 8.70712L6.96969 12.5303L7.50002 13.0607L8.56068 12L8.03035 11.4697L4.56068 8.00001L8.03035 4.53034L8.56068 4.00001L7.50002 2.93935L6.96969 3.46968L3.14647 7.2929ZM8.14647 7.2929C7.75595 7.68343 7.75595 8.31659 8.14647 8.70712L11.9697 12.5303L12.5 13.0607L13.5607 12L13.0304 11.4697L9.56068 8.00001L13.0304 4.53034L13.5607 4.00001L12.5 2.93935L11.9697 3.46968L8.14647 7.2929Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  chevronDoubleRight: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8536 8.7071C13.2441 8.31657 13.2441 7.68341 12.8536 7.29288L9.03034 3.46966L8.50001 2.93933L7.43935 3.99999L7.96968 4.53032L11.4393 7.99999L7.96968 11.4697L7.43935 12L8.50001 13.0607L9.03034 12.5303L12.8536 8.7071ZM7.85356 8.7071C8.24408 8.31657 8.24408 7.68341 7.85356 7.29288L4.03034 3.46966L3.50001 2.93933L2.43935 3.99999L2.96968 4.53032L6.43935 7.99999L2.96968 11.4697L2.43935 12L3.50001 13.0607L4.03034 12.5303L7.85356 8.7071Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  sortAscending: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5303 1.21967C12.2374 0.926777 11.7626 0.926777 11.4697 1.21967L9.21967 3.46967L8.68934 4L9.75 5.06066L10.2803 4.53033L11.25 3.56066V13.25V14H12.75V13.25V3.56066L13.7197 4.53033L14.25 5.06066L15.3107 4L14.7803 3.46967L12.5303 1.21967ZM1.75 4H1V5.5H1.75H5.25H6V4H5.25H1.75ZM1.75 8.25H1V9.75H1.75H4.25H5V8.25H4.25H1.75ZM1.75 12.5H1V14H1.75H7.25H8V12.5H7.25H1.75Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  sortDescending: (props: IconProps) => (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  flame: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
    </svg>
  ),
  clockDashed: (props: IconProps) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.35066 2.06247C5.96369 1.78847 6.62701 1.60666 7.32351 1.53473L7.16943 0.0426636C6.31208 0.1312 5.49436 0.355227 4.73858 0.693033L5.35066 2.06247ZM8.67651 1.53473C11.9481 1.87258 14.5 4.63876 14.5 8.00001C14.5 11.5899 11.5899 14.5 8.00001 14.5C4.63901 14.5 1.87298 11.9485 1.5348 8.67722L0.0427551 8.83147C0.459163 12.8594 3.86234 16 8.00001 16C12.4183 16 16 12.4183 16 8.00001C16 3.86204 12.8589 0.458666 8.83059 0.0426636L8.67651 1.53473ZM2.73972 4.18084C3.14144 3.62861 3.62803 3.14195 4.18021 2.74018L3.29768 1.52727C2.61875 2.02128 2.02064 2.61945 1.52671 3.29845L2.73972 4.18084ZM1.5348 7.32279C1.60678 6.62656 1.78856 5.96348 2.06247 5.35066L0.693033 4.73858C0.355343 5.4941 0.131354 6.31152 0.0427551 7.16854L1.5348 7.32279ZM8.75001 4.75V4H7.25001V4.75V7.875C7.25001 8.18976 7.3982 8.48615 7.65001 8.675L9.55001 10.1L10.15 10.55L11.05 9.35L10.45 8.9L8.75001 7.625V4.75Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  archive: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
      <path d="M10 12l4 0" />
    </svg>
  ),
  calendar: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 11h16" />
      <path d="M11 15h1" />
      <path d="M12 15v3" />
    </svg>
  ),
};
