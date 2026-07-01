import { useForm } from 'react-hook-form';

function NameField({ config, setConfig }) {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         username: '',
      },
   });

   function submit(data) {
      setConfig({ ...config, name: data.username });
   }

   return (
      <form onSubmit={handleSubmit(submit)}>
         {errors.username && <p>{errors.username.message}</p>}
         <input
            {...register('username', {
               required: 'Username is required',
            })}
         />
         <button type='submit'>Submit</button>
      </form>
   );
}

export default NameField;
