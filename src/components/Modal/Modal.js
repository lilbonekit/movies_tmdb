import { useState, useEffect, useRef, forwardRef } from 'react';
import { Close } from '../Icons/Icons';
import './Modal.scss';


const Modal = forwardRef((props, ref) => {
    const [active, setActive] = useState(false)
    const modalRef = useRef(null)
    // Считаем ширину скрола
    const scroll = calcScroll()

    function calcScroll() {
        let div = document.createElement('div')
            div.style.width = '50px'
            div.style.height = '50px'
            div.style.overflowY = 'scroll'
            div.style.visibility = 'hidden'

        document.body.appendChild(div)
        let scrollWidth = div.offsetWidth - div.clientWidth
        div.remove()

        return scrollWidth
    }

    // Использую этот реф для закрытия модалки на оверлей
    useEffect(() => {
        // Если передан внешний реф, то присвоить его внутреннему элементу
        if (ref) {
          ref.current = modalRef.current;
        }
      }, [ref]);
    
    // Всегда возвращать скрол и убирать правый отступ при закрытии
    const closeModalOverlay = (e) => {
        if(e.target === modalRef.current) {
            document.body.style.marginRight = `0px`
            document.body.style.overflow = 'auto'
            // Если есть дополнительная логика, то сделай и её
            if(props.closeModalOverlay) {
                props.closeModalOverlay(e)
            }
        } 
    }


    useEffect(() => {
        setActive(props.active)
        // Если есть проп active, то добавь марджин для body, чтобы не прыгал контент
        if(props.active) {
            document.body.style.overflow = 'hidden'
            document.body.style.marginRight = `${scroll}px`
        }
    }, [props.active])

    return(
        <div
            onClick={closeModalOverlay}
            ref={modalRef}
            className={`modal ${active ? 'modal-active' : ''}`}
            id={props.id}>
            {props.children}
        </div>
    )
})

export const ModalContent = props => {

    // Если контент - это, например, айфрейм, то нужно почистить ему src, при закрытии,
    // а то видео будет дальше играть
    const contentRef = useRef(null)

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('modal-active')
        
        if(props.onClose) {
            // Убираем тот отступ
            document.body.style.marginRight = `0px`
            document.body.style.overflow = 'auto'
            props.onClose()
        }

    }

    return(
        <div ref={contentRef} className="modal__content">
            <div className="modal__content__close" onClick={closeModal}>
                <Close/>
            </div>
            {props.children}
        </div>
    )
}

export default Modal