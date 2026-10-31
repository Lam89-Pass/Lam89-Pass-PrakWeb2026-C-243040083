import styles from './Button.module.css';
function Button({ href, variant = 'ghost', size = 'md', className = '', children, ...rest }) {
  const cls = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');

  if (href) {
    const external = /^https?:/.test(href);
    const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={cls} {...extra} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

export default Button;
