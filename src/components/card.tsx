interface CardProps {
  title: string
  content: string
  onRemove?: () => void
}

const Card = ({ title, content, onRemove }: CardProps) => {
  return (
    <div className="mt-5 h-auto w-full max-w-md transform rounded-lg border-b-8 border-[#0079bf] bg-white p-4 shadow-md transition-all duration-150 hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-semibold text-[#333]">{title}</h4>
        <p className="text-sm text-[#5e5e5e]">{content}</p>
        {onRemove && (
          <button
            onClick={onRemove}
            className="self-start rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-600 hover:shadow-md"
          >
            Remover
          </button>
        )}
      </div>
    </div>
  )
}

export default Card
