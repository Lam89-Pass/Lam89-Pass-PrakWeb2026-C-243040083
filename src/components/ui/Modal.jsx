import { useEffect, useId, useRef } from 'react';
import Button from './Button';
import styles from './Modal.module.css';


function Modal({ open, onClose, title, icon, children }) {
    const ref = useRef(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;

        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();

        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const handleClick = (e) => {
        if (e.target === ref.current) onClose();
    };

    return (
        <dialog
            ref={ref}
            className={styles.dialog}
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={handleClick}
        >
            <div className={styles.content}>
                {icon && <div className={styles.icon}>{icon}</div>}
                <h2 id={titleId} className={styles.title}>{title}</h2>
                <div className={styles.body}>{children}</div>
                <div className={styles.actions}>
                    <Button variant="primary" onClick={onClose} autoFocus>
                        Tutup
                    </Button>
                </div>
            </div>
        </dialog>
    );
}

export default Modal;