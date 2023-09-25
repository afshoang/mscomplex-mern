import { useRef } from 'react'

const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        // user click toggle
        if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.toggle('active')
        } else {
            // user click outside toggle and content
            if (content_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('active')
            }
        }
    })
}

const Dropdown = (props) => {
    const dropdownContentRef = useRef(null)
    const dropdownToggletRef = useRef(null)

    clickOutsideRef(dropdownContentRef, dropdownToggletRef)

  return (
    <div className='relative z-10'>
        <button ref={dropdownToggletRef} className='border-0 outline-0 bg-transparent relative'>
            {
                props.icon ? <i className={`${props.icon} text-[2.5rem] text-txtColor`}></i> : ''
            }
            {
                props.badge ? <span className='flex items-center justify-center absolute top-[-12px] right-[-10px] h-[25px] w-[25px] rounded-[50%] bg-primary text-sm'>{props.badge}</span> : ''
            }
            {
                props.customToggle ? props.customToggle() : ''
            }
        </button>
        <div ref={dropdownContentRef} className='absolute top-[100%] right-0 w-max max-w-[400px] bg-mainBg shadow-main-shadow 
        overflow-hidden rounded-main origin-top-right scale-0'>
            {
                props.contentData && props.renderItems ?
                props.contentData.map((item, index) => props.renderItems(item, index)) : ''
            }
            {
                props.renderFooter ? (
                    <div className='p-5'>
                        {props.renderFooter()}
                    </div>
                ) : ''
            }
        </div>
    </div>
  )
}

export default Dropdown