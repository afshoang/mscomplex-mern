const CustomSelect = () => {
    const { label, inputId, inputClass, name, val, onChange, onBlur } = props;
  return (
    <div>
        <label htmlFor={inputId}  className="block mb-2 text-sm font-medium text-gray-900">
            {label}
        </label>
        <select 
            id={inputId}
            name={name}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary
             focus:border-primary block w-full p-2.5"
             onChange={onChange}
        >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>
    </div>
  )
}

export default CustomSelect