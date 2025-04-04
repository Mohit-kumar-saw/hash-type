'use client'

const AuthSocialButton = ({
    icon: Icon,
    onClick
}) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className="
            inline-flex
            w-full
            justify-center
            rounded-lg
            bg-gray-800/50
            px-4
            py-2
            text-gray-300
            hover:text-purple-400
            shadow-sm
            ring-1
            ring-inset
            ring-gray-700/50
            hover:bg-gray-700/50
            transition-all
            backdrop-blur-sm
        "
    >
        <Icon />
    </button>
  )
}

export default AuthSocialButton;
