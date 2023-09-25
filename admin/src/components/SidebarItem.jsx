const SidebarItem = (props) => {
    const active = props.active ? '' : ''
  return (
    <div className="px-5">
        <div className={`py-3 px-6 ${props.active ? ' rounded-lg bg-gradient-to-r from-primary to-[#f99c8c] text-white' : 'hover:text-primary'} flex items-center font-bold duration-300`}>
            <i className={`${props.icon} mr-2.5 text-2xl`}></i>
            <span className="capitalize">
                {props.title}
            </span>
        </div>
    </div>
  )
}

export default SidebarItem