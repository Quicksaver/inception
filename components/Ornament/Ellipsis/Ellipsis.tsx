import { useId } from 'react';

import './Ellipsis.scss';

export default function OrnamentEllipsis() {
  const id = useId();

  return (
    <svg
      className="ornament-ellipsis"
      fill="none"
      viewBox="0 0 390 390"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="195"
        cy="195"
        fill="#ffffff"
        fill-opacity="0.45"
        r="128.5"
        stroke={ `url(#paint0_linear_${id})` }
      />
      <circle
        cx="195"
        cy="195"
        fill="#ffffff"
        fill-opacity="0.45"
        r="194.5"
        stroke={ `url(#paint1_linear_${id})` }
      />
      <circle
        cx="195"
        cy="195"
        fill="#ffffff"
        r="103.5"
        stroke={ `url(#paint2_linear_${id})` }
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={ `paint0_linear_${id}` }
          x1="195"
          x2="195"
          y1="65.9999"
          y2="324"
        >
          <stop stop-color="#bbe3fc" />
          <stop
            offset="1"
            stop-color="#bbe3fc"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={ `paint1_linear_${id}` }
          x1="195"
          x2="195"
          y1="390"
          y2="0"
        >
          <stop
            stop-color="#bbe3fc"
            stop-opacity="0"
          />
          <stop
            offset="1"
            stop-color="#bbe3fc"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={ `paint2_linear_${id}` }
          x1="195"
          x2="195"
          y1="299"
          y2="90.9999"
        >
          <stop
            stop-color="#bbe3fc"
            stop-opacity="0"
          />
          <stop
            offset="1"
            stop-color="#bbe3fc"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
