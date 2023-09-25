import { useEffect, useState } from 'react';

const Table = props => {
    const initDataShow = (props.limit && props.bodyData) ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData

    const [dataShow, setDataShow] = useState(initDataShow)

    useEffect(() => {
        setDataShow((props.limit && props.bodyData) ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData)
    }, [props.bodyData, props.limit])

    let pages = 1

    let range = []

    if (props.limit !== undefined) {
         let page = Math.floor(props.bodyData.length / Number(props.limit))
        pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]
    }
    const [currPage, setCurrPage] = useState(0)

    const handleSelectPage = (page) => {
        const start = Number(props.limit) * page
        const end = start + Number(props.limit)

        setDataShow(props.bodyData.slice(start, end))
        setCurrPage(page)
    }

  return (
    <div>
        <div className="overflow-y-auto">
            <table className="w-full min-w-[400px] border-spacing-0">
                {
                    props.headData && props.renderHead ? (
                        <thead className="bg-secondBg">
                            <tr>
                                {
                                    props.headData.map((item, index) => props.renderHead(item, index))
                                }
                            </tr>
                        </thead>
                    ) : null
                }
                {
                    props.bodyData && props.renderBody ? (
                        <tbody>
                            {
                                dataShow.map((item, index) => props.renderBody(item, index))
                            }
                        </tbody>
                    ) : null
                }
            </table>
        </div>
        {
            pages > 1 ? (
                <div className='flex w-full justify-end items-center mt-5'>
                    {
                        range.map((item, index) => (
                            <div 
                                key={index} 
                                className={`ml-2.5 w-[30px] h-[30px] rounded-[50%] flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white ${currPage === index ? 'bg-primary text-white font-bold' : ''} text-center`}
                                onClick={() => handleSelectPage(index)}
                            >
                                {item + 1}
                            </div>
                        ))
                    }
                </div>
            ) : null
        }
    </div>
  )
}

export default Table