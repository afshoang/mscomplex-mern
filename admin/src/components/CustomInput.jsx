
const CustomInput = props => {
    const { type, label, inputId, inputClass, name, value, onChange, onBlur } = props;
  return (
    <div className="relative mt-6">
        <input 
            type={type} 
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 
            appearance-none  dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-primary peer" 
            placeholder=" "
        />
        <label 
            htmlFor={inputId} 
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 
            scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-primary peer-focus:dark:text-primary
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            {label}
        </label>
    </div>
  )
}

export default CustomInput