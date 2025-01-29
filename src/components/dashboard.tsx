import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useState, useCallback, useEffect } from "react"
import Button from "./button"
import Card from "./card"
import Carousel from "./carousel"
import { DropResult } from "react-beautiful-dnd"

const Dashboard = () => {
  const [modal, setModal] = useState(false)
  const [isCarousel, setIsCarousel] = useState(false)
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    sectionId: "",
    cardId: "",
  })

  const [sections, setSections] = useState([
    {
      id: "todo",
      title: "A fazer",
      cards: [
        {
          id: "card-1",
          title: "Comprar mantimentos",
          content: "Ir ao mercado",
          size: "small",
        },

        {
          id: "card-2",
          title: "Estudar React",
          content: "Revisar hooks",
          size: "large",
        },
      ],
    },
    {
      id: "in-design",
      title: "Em Design",
      cards: [
        {
          id: "card-4",
          title: "Criar wireframe",
          content: "Desenhar layout",
          size: "small",
        },
      ],
    },
    {
      id: "in-development",
      title: "Em Desenvolvimento",
      cards: [
        {
          id: "card-5",
          title: "API de filmes",
          content: "Integrar TMDB",
          size: "large",
        },
      ],
    },
    {
      id: "in-progress",
      title: "Em Progresso",
      cards: [
        {
          id: "card-7",
          title: "Testar funcionalidades",
          content: "Escrever testes",
          size: "large",
        },
        {
          id: "card-8",
          title: "Revisar código",
          content: "Verificar código",
          size: "small",
        },
      ],
    },
    {
      id: "carousel",
      title: "Outras Tarefas",
      cards: [
        {
          id: "carousel-card-1",
          title: "Finalizar documentação",
          content: "Completar docs",
          size: "small",
        },
        {
          id: "carousel-card-2",
          title: "Configurar CI/CD",
          content: "Configurar pipeline",
          size: "small",
        },
        {
          id: "carousel-card-3",
          title: "Refatorar código",
          content: "Melhorar desempenho",
          size: "small",
        },
        {
          id: "carousel-card-4",
          title: "Revisar design de UI",
          content: "Verificar interface",
          size: "small",
        },
      ],
    },
  ])

  const [newCardTitle, setNewCardTitle] = useState("")
  const [newCardContent, setNewCardContent] = useState("")

  useEffect(() => {
    const carouselSection = sections.find(
      (section) => section.id === "carousel",
    )
    setIsCarousel(Boolean(carouselSection))
  }, [sections])

  const onDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) return

      const sourceSection = sections.find((s) => s.id === source.droppableId)
      const destinationSection = sections.find(
        (s) => s.id === destination.droppableId,
      )

      if (!sourceSection || !destinationSection) return

      const [movedCard] = sourceSection.cards.splice(source.index, 1)
      destinationSection.cards.splice(destination.index, 0, movedCard)

      setSections([...sections])
    },
    [sections],
  )

  const handleAddCard = useCallback(() => {
    if (!newCardTitle || !newCardContent) return

    const newCard = {
      id: `card-${Date.now()}`,
      title: newCardTitle,
      content: newCardContent,
      size: "small",
    }

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === "carousel"
          ? { ...section, cards: [...section.cards, newCard] }
          : section,
      ),
    )

    setNewCardTitle("")
    setNewCardContent("")
  }, [newCardTitle, newCardContent])

  const confirmDeleteCard = (sectionId: string, cardId: string) => {
    setDeleteModal({ open: true, sectionId, cardId })
  }

  const handleDeleteCard = () => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === deleteModal.sectionId
          ? {
              ...section,
              cards: section.cards.filter(
                (card) => card.id !== deleteModal.cardId,
              ),
            }
          : section,
      ),
    )
    setDeleteModal({ open: false, sectionId: "", cardId: "" })
  }

  const handleShowModal = () => setModal(true)
  const handleCloseModal = () => setModal(false)

  return (
    <>
      {modal && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddCard()
                handleCloseModal()
              }}
              className="relative flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg"
            >
              <h2 className="mb-4 text-lg font-bold text-gray-700">
                Adicionar Novo Cartão
              </h2>
              <input
                type="text"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Título do novo cartão"
                required
                className="mb-4 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                value={newCardContent}
                onChange={(e) => setNewCardContent(e.target.value)}
                placeholder="Conteúdo do novo cartão"
                required
                className="mb-4 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <div className="flex justify-end gap-2">
                <Button
                  className="bg-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </Button>
                <Button className="bg-blue-500 px-5 py-2.5 text-white hover:bg-blue-600">
                  Adicionar
                </Button>
              </div>
            </form>
          </div>
        </>
      )}

      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-gray-700">
              Confirmar Exclusão
            </h2>
            <p className="mb-4 text-gray-600">
              Você tem certeza que deseja remover este cartão?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() =>
                  setDeleteModal({ open: false, sectionId: "", cardId: "" })
                }
                className="bg-gray-300 px-5 py-2.5"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteCard}
                className="px-5 py-2.5 text-white"
                variant="danger"
              >
                Remover
              </Button>
            </div>
          </div>
        </div>
      )}

      {!modal && (
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <Button
            className="px-5 py-2.5 transition-all duration-200 ease-in-out"
            onClick={handleShowModal}
          >
            Adicionar Cartão
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-2 pt-3 md:grid-cols-3 lg:grid-cols-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {sections.map((section) => (
            <Droppable
              key={section.id}
              droppableId={section.id}
              direction={section.id === "carousel" ? "horizontal" : "vertical"}
            >
              {(provided) => (
                <section
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`h-auto items-start rounded-lg bg-[#f3f5f6] p-3 shadow-md transition-all duration-300 ease-in-out ${
                    section.id === "carousel"
                      ? "overflow-x-auto lg:col-span-4"
                      : ""
                  }`}
                >
                  {section.id !== "carousel" && (
                    <>
                      <h3 className="mb-3 text-lg font-bold text-gray-800">
                        {section.title}
                      </h3>
                      <div className="flex flex-col gap-2">
                        {section.cards.map((card, index) => (
                          <Draggable
                            key={card.id}
                            draggableId={card.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-3"
                              >
                                <Card
                                  title={card.title}
                                  content={card.content}
                                  size={card.size}
                                  onRemove={() =>
                                    confirmDeleteCard(section.id, card.id)
                                  }
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    </>
                  )}

                  {section.id === "carousel" && (
                    <div className="flex w-full gap-4 overflow-x-auto">
                      {section.cards.map((card, index) => (
                        <Draggable
                          key={card.id}
                          draggableId={card.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex-shrink-0"
                            >
                              <Carousel
                                title={card.title}
                                content={card.content}
                                onRemove={() =>
                                  confirmDeleteCard(section.id, card.id)
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  )
}

export default Dashboard
