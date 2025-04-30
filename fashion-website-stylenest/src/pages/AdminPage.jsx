import React from 'react'
import StatisticsChart from '../Components/Chart/StatisticsChart'

const AdminPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <StatisticsChart />
            </div>
        </div>
      )
}

export default AdminPage
