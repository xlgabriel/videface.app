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
  color = 'bg-[#0A6CFF]',
  textColor = 'text-white',
  size = 'md',
  shadow = 'shadow-md',
  rounded = 'rounded-lg',
  boxShadow,
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
    !boxShadow && 'shadow-[5px_7px_10px_0_rgba(0,0,0,0.4)]', // sombra negra por defecto
    rounded,
    className,
  ].filter(Boolean).join(' ');

  const style = boxShadow ? { boxShadow } : undefined;

  const content = (
    <span className="relative z-10 w-full text-center">{children}</span>
  );
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      className={classes}
      style={style}
      onClick={onClick}
      type="button"
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
