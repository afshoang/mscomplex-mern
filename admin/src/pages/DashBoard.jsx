import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

import { Badge, Table, StatusCard } from '../components';

const chartOptions = {
  series: [{
    name: 'Online Customers',
    data: [40,80,60,50,30,91,65,74]
  },
  {
    name: 'Store Customers',
    data: [40,80,60,50,30,91,65,74,10,50]
  }],
  options: {
    color: ['#6ab04c', '#2980b9'],
      chart: {
          background: 'transparent'
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          curve: 'smooth'
      },
      xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      legend: {
          position: 'top'
      },
      grid: {
          show: false
      }
  }
}

const topCustomers = {
  head: [
    'user',
    'total orders',
    'total spending'
  ],
   body: [
        {
            "username": "john doe",
            "order": "490",
            "price": "$15,870"
        },
        {
            "username": "frank iva",
            "order": "250",
            "price": "$12,251"
        },
        {
            "username": "anthony baker",
            "order": "120",
            "price": "$10,840"
        },
        {
            "username": "frank iva",
            "order": "110",
            "price": "$9,251"
        },
        {
            "username": "anthony baker",
            "order": "80",
            "price": "$8,840"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index} className='capitalize py-4 px-2.5'>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index} className='text-left hover:bg-primary'>
        <td className='capitalize py-4 px-2.5'>{item.username}</td>
        <td className='capitalize py-4 px-2.5'>{item.order}</td>
        <td className='capitalize py-4 px-2.5'>{item.price}</td>
    </tr>
)

const latestOrders = {
    header: [
        "order id",
        "user",
        "total price",
        "date",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            user: "john doe",
            date: "17 Jun 2021",
            price: "$900",
            status: "shipping"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "pending"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "refund"
        }
    ]
}

const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index} className='capitalize py-4 px-2.5'>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index} className='text-left hover:bg-primary'>
        <td className='capitalize py-4 px-2.5'>{item.id}</td>
        <td className='capitalize py-4 px-2.5'>{item.user}</td>
        <td className='capitalize py-4 px-2.5'>{item.price}</td>
        <td className='capitalize py-4 px-2.5'>{item.date}</td>
        <td className='capitalize py-4 px-2.5'>
          <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)

const DashBoard = () => {
  const staticCard = [
    {
        "icon": "bx bx-shopping-bag",
        "count": "1,995",
        "title": "Total sales"
    },
    {
        "icon": "bx bx-cart",
        "count": "2,001",
        "title": "Daily visits"
    },
    {
        "icon": "bx bx-dollar-circle",
        "count": "$2,632",
        "title": "Total income"
    },
    {
        "icon": "bx bx-receipt",
        "count": "1,711",
        "title": "Total orders"
    }
  ]

  return (
    <div>
      <h2 className='mb-8 capitalize text-2xl font-semibold'>DashBoard</h2>

      <div className='grid grid-cols-1 xl:grid-cols-12 gap-3'>
        <div className='xl:col-span-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {
              staticCard.map((item, index) => (
                <div key={index} className=''>
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>

        <div className='xl:col-span-6'>
          <div className='p-7 mb-7 bg-mainBg rounded-main shadow-main-shadow h-[calc(100%-30px)]'>
            <Chart 
              options={chartOptions.options}
              series={chartOptions.series}
              type='line'
              height='100%'
            />
          </div>
        </div>

        <div className='xl:col-span-5'>
          <div className='p-7 mb-7 bg-mainBg rounded-main  shadow-main-shadow'>
            <div className='capitalize'>
              <h3>top khách hàng</h3>
            </div>
            <div className='mt-7'>
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className='text-center capitalize'>
              <Link to='/users'>Xem tất cả</Link>
            </div>
          </div>
        </div>
        <div className='xl:col-span-7'>
          <div className='p-7 mb-7 bg-mainBg rounded-main  shadow-main-shadow'>
            <div className='capitalize'>
              <h3>Đơn hàng gần đây</h3>
            </div>
            <div className='mt-7'>
              <Table
                headData={latestOrders.head}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className='text-center capitalize'>
              <Link to='/orders'>Xem tất cả</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard