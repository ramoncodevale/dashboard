interface CardProps {
  title: string
  content: string
  onRemove?: () => void
}

const Card = ({ title, content, onRemove }: CardProps) => {
  return (
    <div className="mt-5 h-auto w-full max-w-md transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-semibold text-[#363636]">{title}</h4>
        <p className="text-base text-[#363636]">{content}</p>
        {onRemove && (
          <button
            onClick={onRemove}
            className="self-start rounded-md bg-red-500 px-2 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            remover
          </button>
        )}
      </div>
    </div>
  )
}

export default Card
