'use client'
import clsx from 'clsx';

const Input = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
  return (
    <div>
        <label 
        className='
            block
            text-sm
            font-medium
            leading-6
            text-gray-300
        ' htmlFor={id}>
            {label}
            <div className='mt-2'>
                <input 
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(`
                        form-input
                        block
                        w-full
                        rounded-lg
                        border-0
                        py-2
                        px-3
                        bg-gray-800/50
                        text-gray-100
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-700/50
                        placeholder:text-gray-500
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-purple-500
                        sm:text-sm
                        sm:leading-6
                        backdrop-blur-sm`, 
                        errors[id] && "focus:ring-rose-500",
                        disabled && "opacity-50 cursor-default"
                    )}
                />
            </div>
        </label>
    </div>
  )
}

export default Input;
