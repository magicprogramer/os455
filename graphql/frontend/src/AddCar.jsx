import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddCar() {
  const location = useLocation();
  const navigate = useNavigate();
  const drivers = location.state?.drivers || [];
  console.log(drivers);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const mutation = `
      mutation AddCar($driverId: ID!, $model: String!, $name: String!) {
        addCar(driverId: $driverId, model: $model, name: $name) {
          id
          model
          name
        }
      }
    `;

    const variables = {
      driverId: data.driverId,
      model: data.model,
      name: data.name,
    };

    try {
       // console.log(variables);return ;
      const response = await fetch('http://localhost:3030/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const result = await response.json();
      console.log('Car added:', result.data.addCar);

      navigate('/');
    } catch (err) {
      console.error('Error adding car:', err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Add a Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Car Name</label>
          <input
            type="text"
            {...register("name", { required: "Car name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Car Model</label>
          <input
            type="text"
            {...register("model", { required: "Car model is required" })}
            className="input input-bordered w-full"
          />
          {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Assign to Driver</label>
          <select
            {...register("driverId", { required: "Driver selection is required" })}
            className="select select-bordered w-full"
          >
            <option value="">-- Select Driver --</option>
            {drivers.map((driver, index) => (
              <option key={index} value={driver.id}>
                {driver.name} (Age: {driver.age})
              </option>
            ))}
          </select>
          {errors.driverId && <p className="text-red-500 text-sm">{errors.driverId.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
