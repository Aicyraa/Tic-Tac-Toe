import { useForm } from 'react-hook-form';

function NameField({ config, setConfig }) {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         playerX: '',
         playerO: '',
      },
   });

   function submit({ playerX, playerO }) {
      setConfig({
         ...config,
         playerX: playerX,
         playerO: playerO ? playerO : 'Bot',
      });
   }

   return (
      <form onSubmit={handleSubmit(submit)}>
         <div className='input-group'>
            <label htmlFor='playerX'> Player X </label>
            <input
               {...register('playerX', {
                  required: 'playerX is required',
               })}
            />
            {errors.playerX && <p>{errors.playerX.message}</p>}
         </div>
         {config.mode != 'bot' && (
            <div className='input-group'>
               <label htmlFor='playerO'>Player O</label>
               <input
                  {...register('playerO', {
                     required: 'playerO is required',
                  })}
               />
            </div>
         )}
         {errors.playerO && <p>{errors.playerO.message}</p>}
         <button type='submit'>Submit</button>
      </form>
   );
}

export default NameField;
