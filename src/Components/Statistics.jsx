const Statistics = () => {
    const stats = [
      {
        label: 'Total Items Reported',
        value: '5,245',
      },
      {
        label: 'Items Successfully Reunited',
        value: '3,102',
      },
      {
        label: 'Total Users Registered',
        value: '8,431',
      },
    ];
  
    return (
      <div className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Platform Statistics</h2>
          <p className="text-center mb-10 text-gray-400">
            Discover the impact of our platform in helping people reconnect with their belongings.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-4xl font-bold mb-2 text-blue-400">{stat.value}</h3>
                <p className="text-lg text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Statistics;