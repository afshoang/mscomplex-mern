const Badge = props => {
    const badgeType = {
        danger: 'bg-red-500',
        success: 'bg-green-500',
        primary: 'bg-blue-500',
        warning: 'bg-orange-500',
    }
  return (
    <span className={`py-1.5 px-3 text-white rounded-lg shadow-main-shadow ${badgeType[props.type]}`}>
        {props.content}
    </span>
  )
}

export default Badge