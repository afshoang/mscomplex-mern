import { useRef } from 'react'

const Checkbox = props => {
    const inputRef = useRef()

    const handleChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current)
        }
    }
  return (
    <label>
        <input className='opacity-0 h-0 w-0' type="checkbox" ref={inputRef} onChange={handleChange} checked={props.checked} />
        <span className={`inline-block bg-[#F2F2F2] rounded-md text-[#7A7A9D] border
            border-solid ${props.checked ? `border-primary` : `border-[#F2F2F2]`} px-3 text-xs leading-9 cursor-pointer capitalize`}>
            {props.label}
        </span>
    </label>
  )
}

export default Checkbox