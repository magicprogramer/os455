import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
function App() {
  const [drivers, setDrivers] = useState(null);
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate('/form', { state: { drivers } });
  };
  useEffect(() => {
    async function fetchData() {
      const query = `
        query {
          drivers {
            id
            name
            age
            cars {
              model
              name
            }
          }
        }
      `;
      const response = await fetch('http://localhost:3030/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setDrivers(data.data.drivers);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6 bg-gray-100 min-h-screen">
      {drivers?.map((driver, dIndex) => (
        <div
          key={dIndex}
          className="card w-96 bg-white shadow-xl border border-gray-200"
        >
          <div className="card-body">
            <h2 className="card-title text-indigo-600 text-lg">{driver.name}</h2>
            <p className="text-gray-700 mb-4">Age: {driver.age}</p>

            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                Cars owned by {driver.name}
              </li>

              {driver.cars.map((car, i) => (
                <li key={i} className="list-row">
                  <div className="text-4xl font-thin opacity-30 tabular-nums">
                    {driver.name}
                  </div>
                  <div className="list-col-grow">
                    <div>{car.name}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {car.model}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <div className="fixed bottom-4 right-4">
  <button
    onClick={handleAdd}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
  >
    Add Car
  </button>
</div>
    </div>
  );
}

export default App;
