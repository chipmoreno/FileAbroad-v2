import { forwardRef, type ReactNode, type SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

function createIcon(name: string, children: ReactNode) {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, strokeWidth = 1.8, ...props }, ref) => (
      <svg
        ref={ref}
        aria-hidden={props['aria-label'] ? undefined : true}
        fill="none"
        height={size}
        viewBox="0 0 24 24"
        width={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        {...props}
      >
        {children}
      </svg>
    ),
  );
  Icon.displayName = name;
  return Icon;
}

export const ArrowRight = createIcon('ArrowRight', <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>);
export const ArrowLeft = createIcon('ArrowLeft', <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>);
export const ArrowDown = createIcon('ArrowDown', <><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></>);
export const ArrowUpRight = createIcon('ArrowUpRight', <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>);
export const ChevronDown = createIcon('ChevronDown', <path d="m6 9 6 6 6-6" />);
export const ChevronDownIcon = ChevronDown;
export const ChevronRight = createIcon('ChevronRight', <path d="m9 18 6-6-6-6" />);
export const ExternalLink = createIcon('ExternalLink', <><path d="M14 5h5v5" /><path d="m10 14 9-9" /><path d="M19 14v5H5V5h5" /></>);

export const Check = createIcon('Check', <path d="m5 12 4 4L19 6" />);
export const X = createIcon('X', <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>);
export const XIcon = X;
export const CheckCircle = createIcon('CheckCircle', <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16.5 8" /></>);
export const CheckCircle2 = CheckCircle;
export const XCircle = createIcon('XCircle', <><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6" /><path d="m15 9-6 6" /></>);
export const Info = createIcon('Info', <><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></>);
export const HelpCircle = createIcon('HelpCircle', <><circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.7 2c-1 .6-1.5 1.1-1.5 2" /><path d="M12 16h.01" /></>);
export const AlertCircle = createIcon('AlertCircle', <><circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 17h.01" /></>);
export const AlertTriangle = createIcon('AlertTriangle', <><path d="M10.3 4.2 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></>);

export const Menu = createIcon('Menu', <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>);
export const Search = createIcon('Search', <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>);
export const Home = createIcon('Home', <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>);

export const Calendar = createIcon('Calendar', <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M3 10h18" /></>);
export const CalendarDays = Calendar;
export const CalendarCheck2 = createIcon('CalendarCheck2', <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M3 10h18" /><path d="m8 15 2 2 4-4" /></>);
export const Clock = createIcon('Clock', <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);

export const User = createIcon('User', <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>);
export const UserRound = User;
export const UserRoundCheck = createIcon('UserRoundCheck', <><circle cx="10" cy="8" r="4" /><path d="M3 21a7 7 0 0 1 12-4.9" /><path d="m16 19 2 2 4-5" /></>);
export const Users = createIcon('Users', <><circle cx="9" cy="8" r="3" /><path d="M3 19a6 6 0 0 1 12 0" /><path d="M16 5.5a3 3 0 0 1 0 5" /><path d="M18 14a5 5 0 0 1 3 5" /></>);
export const GraduationCap = createIcon('GraduationCap', <><path d="m3 10 9-5 9 5-9 5-9-5Z" /><path d="M7 12.5V17c3 2 7 2 10 0v-4.5" /></>);

export const Mail = createIcon('Mail', <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>);
export const Phone = createIcon('Phone', <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.7-1.5-6.5-4.3-8-8l2-2-2-4Z" />);
export const MessageCircle = createIcon('MessageCircle', <><path d="M21 11.5a8.5 8.5 0 0 1-12.8 7.3L3 21l2.2-5.2A8.5 8.5 0 1 1 21 11.5Z" /></>);
export const MessageSquareText = createIcon('MessageSquareText', <><path d="M4 4h16v13H8l-4 4V4Z" /><path d="M8 9h8" /><path d="M8 13h5" /></>);

export const FileText = createIcon('FileText', <><path d="M6 2h8l4 4v16H6V2Z" /><path d="M14 2v5h5" /><path d="M9 12h6" /><path d="M9 16h6" /></>);
export const FileCheck = createIcon('FileCheck', <><path d="M6 2h8l4 4v16H6V2Z" /><path d="M14 2v5h5" /><path d="m9 15 2 2 4-5" /></>);
export const FileCheck2 = FileCheck;
export const FileWarning = createIcon('FileWarning', <><path d="M6 2h8l4 4v16H6V2Z" /><path d="M14 2v5h5" /><path d="M12 11v4" /><path d="M12 18h.01" /></>);
export const Files = createIcon('Files', <><path d="M8 2h8l4 4v14H8V2Z" /><path d="M16 2v5h5" /><path d="M4 6v16h12" /></>);
export const FolderLock = createIcon('FolderLock', <><path d="M3 6h7l2 2h9v12H3V6Z" /><rect x="10" y="12" width="6" height="5" rx="1" /><path d="M11.5 12v-1a1.5 1.5 0 0 1 3 0v1" /></>);
export const FileSearch2 = createIcon('FileSearch2', <><path d="M6 2h8l4 4v7" /><path d="M14 2v5h5" /><circle cx="14" cy="17" r="3" /><path d="m16.5 19.5 2 2" /></>);

export const Shield = createIcon('Shield', <path d="M12 3 5 6v5c0 4.8 2.9 8.4 7 10 4.1-1.6 7-5.2 7-10V6l-7-3Z" />);
export const ShieldCheck = createIcon('ShieldCheck', <><path d="M12 3 5 6v5c0 4.8 2.9 8.4 7 10 4.1-1.6 7-5.2 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></>);
export const LockKeyhole = createIcon('LockKeyhole', <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 14v3" /></>);
export const Globe = createIcon('Globe', <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></>);
export const Globe2 = Globe;
export const MapPin = createIcon('MapPin', <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>);
export const MapPinned = MapPin;

export const Building2 = createIcon('Building2', <><path d="M4 21V5h10v16" /><path d="M14 9h6v12" /><path d="M8 9h2" /><path d="M8 13h2" /><path d="M8 17h2" /></>);
export const Landmark = createIcon('Landmark', <><path d="m3 9 9-5 9 5" /><path d="M5 10h14" /><path d="M6 10v8" /><path d="M10 10v8" /><path d="M14 10v8" /><path d="M18 10v8" /><path d="M3 21h18" /></>);
export const Calculator = createIcon('Calculator', <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M8 6h8v4H8z" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></>);
export const DollarSign = createIcon('DollarSign', <><path d="M12 2v20" /><path d="M17 6.5c-1-1-2.5-1.5-4.5-1.5-2.8 0-4.5 1.3-4.5 3.3 0 5 9 2.2 9 7.2 0 2.1-1.8 3.5-4.8 3.5-2.1 0-3.8-.6-5.2-1.8" /></>);
export const Wallet = createIcon('Wallet', <><path d="M4 5h15v14H4a2 2 0 0 1-2-2V5h2Z" /><path d="M2 7h17" /><path d="M15 11h6v5h-6a2.5 2.5 0 0 1 0-5Z" /></>);
export const Scale = createIcon('Scale', <><path d="M12 3v18" /><path d="M5 6h14" /><path d="m5 6-3 7h6L5 6Z" /><path d="m19 6-3 7h6l-3-7Z" /><path d="M7 21h10" /></>);
export const TrendingDown = createIcon('TrendingDown', <><path d="m3 6 7 7 4-4 7 7" /><path d="M21 10v6h-6" /></>);

export const Download = createIcon('Download', <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 21h16" /></>);
export const Printer = createIcon('Printer', <><path d="M7 8V3h10v5" /><path d="M6 18H4V9h16v9h-2" /><path d="M7 14h10v7H7z" /></>);
export const Share2 = createIcon('Share2', <><circle cx="18" cy="5" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="18" cy="19" r="2" /><path d="m8 11 8-5" /><path d="m8 13 8 5" /></>);
export const Send = createIcon('Send', <><path d="m3 3 18 9-18 9 4-9-4-9Z" /><path d="M7 12h14" /></>);
export const ClipboardCheck = createIcon('ClipboardCheck', <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2" /><path d="m9 13 2 2 4-5" /></>);
export const RefreshCw = createIcon('RefreshCw', <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M6.1 8a7 7 0 0 1 11.4-2L20 8" /><path d="M17.9 16a7 7 0 0 1-11.4 2L4 16" /></>);
export const RefreshCcw = RefreshCw;

export const Sun = createIcon('Sun', <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.9 4.9 1.4 1.4" /><path d="m17.7 17.7 1.4 1.4" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m4.9 19.1 1.4-1.4" /><path d="m17.7 6.3 1.4-1.4" /></>);
export const Moon = createIcon('Moon', <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />);
export const Loader2 = createIcon('Loader2', <><path d="M21 12a9 9 0 1 1-6.2-8.6" /></>);

