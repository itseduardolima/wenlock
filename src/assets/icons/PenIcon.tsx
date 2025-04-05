import type React from "react"

interface PenIconProps {
  isHovered?: boolean
}

export const PenIcon: React.FC<PenIconProps> = ({ isHovered = false }) => {
  const fillColor = isHovered ? "#FFFFFF" : "#0b2b25"

  return (
    <svg
      id="Group_47822"
      data-name="Group 47822"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_8275" data-name="Rectangle 8275" width="24" height="24" fill={fillColor} />
        </clipPath>
      </defs>
      <g id="Group_47802" data-name="Group 47802" clipPath="url(#clip-path)">
        <path
          id="Path_35274"
          data-name="Path 35274"
          d="M18.6,1a2.928,2.928,0,0,1,2.107.88c.479.446.916.94,1.4,1.38A2.935,2.935,0,0,1,22.131,7.6c-2.412,2.355-4.78,4.753-7.164,7.134C13,16.7,11.042,18.671,9.064,20.622a4.767,4.767,0,0,1-2.093,1.1c-1.566.454-3.132.912-4.7,1.362A1.01,1.01,0,0,1,.958,21.868c.506-1.8,1.019-3.608,1.608-5.387A3.94,3.94,0,0,1,3.5,15q6.522-6.6,13.1-13.147A2.691,2.691,0,0,1,18.6,1M3.5,20.487c.033.027.066.054.1.081.959-.282,1.912-.587,2.878-.839a3.234,3.234,0,0,0,1.535-.9Q12.591,14.2,17.2,9.587c.115-.115.224-.236.329-.346a.718.718,0,0,0-.077-.138c-.805-.814-1.613-1.624-2.415-2.439-.2-.2-.309-.04-.436.087Q9.788,11.567,4.988,16.4a3.037,3.037,0,0,0-.594,1.052c-.183.477-.282.985-.425,1.477-.152.523-.314,1.042-.472,1.563"
          fill={fillColor}
        />
      </g>
    </svg>
  )
}