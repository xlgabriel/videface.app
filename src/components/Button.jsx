/**
 * Button component with customizable title, URL, color, and size.
 * Props:
 * - children: button text (title)
 * - href: if present, renders as <a>
 * - onClick: click handler
 * - color: tailwind color class (default: 'bg-blue-500')
 * - textColor: tailwind text color (default: 'text-white')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - className: extra classes
 */

const SIZE_MAP = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-7 text-base',
  lg: 'h-14 px-10 text-lg',
};

const Button = ({
  className = '',
  href,
  onClick,
  children,
  color = 'bg-blue-500',
  textColor = 'text-white',
  size = 'md',
  shadow = 'shadow-md',
  rounded = 'rounded-lg',
  ...rest
}) => {
  const classes = [
    'button',
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-semibold',
    'transition-all',
    'duration-300',
    color,
    textColor,
    SIZE_MAP[size] || SIZE_MAP.md,
    'shadow-[0_4px_10px_0_#007FFFcc]', // sombra azul compacta
    rounded,
    className,
  ].join(' ');

  const content = (
    <span className="relative z-10 w-full text-center">{children}</span>
  );
  if (href) {
    return (
      <a
        href={href}
        className={classes + ' hover:bg-blue-400'}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      className={classes + ' hover:bg-blue-400'}
      onClick={onClick}
      type="button"
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
