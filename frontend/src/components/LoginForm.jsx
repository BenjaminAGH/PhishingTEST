import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          {...register('email', { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.email && <span className="text-red-500">Campo requerido</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          {...register('password', { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.password && <span className="text-red-500">Campo requerido</span>}
      </div>
      <div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Aceptar</button>
      </div>
    </form>
  );
}

export default LoginForm;
