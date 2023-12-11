import { useState, useEffect, useRef, forwardRef } from 'react';
import { Close } from '../Icons/Icons';
import './Modal.scss';


const Modal = forwardRef((props, ref) => {
    const [active, setActive] = useState(false)
    const modalRef = useRef(null)

    useEffect(() => {
        // Если передан внешний реф, то присвоить его внутреннему элементу
        if (ref) {
          ref.current = modalRef.current;
        }
      }, [ref]);
    
    const closeModalOverlay = () => {
        if(props.closeModalOverlay) {
            document.body.style.overflow = 'auto'
            return props.closeModalOverlay()
        }
    }

    useEffect(() => {
        setActive(props.active)
    }, [props.active])

    return(
        <div onClick={closeModalOverlay}
             ref={modalRef}
             className={`modal ${active ? 'modal-active' : ''}`}
             id={props.id}>
            {props.children}
        </div>
    )
})

export const ModalContent = props => {

    const contentRef = useRef(null)

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('modal-active')
        
        if(props.onClose) {
            document.body.style.overflow = 'auto'
            return props.onClose()
        }

    }

    return(
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <Close/>
            </div>
        </div>
    )
}

export default Modal