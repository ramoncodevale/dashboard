import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useState, useCallback, useEffect } from "react"
import Button from "./button"
import Card from "./card"

const Dashboard = () => {
  const [modal, setModal] = useState(false)
  const [sections, setSections] = useState([
    {
      id: "todo",
      title: "To-do-List",
      cards: [
        {
          id: "card-1",
          title: "Comprar mantimentos",
          content: "Ir ao supermercado e comprar itens da lista",
          size: "small",
        },
        {
          id: "card-2",
          title: "Reunião com equipe",
          content: "Discutir os próximos passos do projeto de desenvolvimento",
          size: "medium",
        },
        {
          id: "card-3",
          title: "Estudar React",
          content: "Revisar hooks e context API",
          size: "large",
        },
      ],
    },
    {
      id: "in-design",
      title: "In-Design",
      cards: [
        {
          id: "card-4",
          title: "Criar wireframe",
          content: "Desenhar o layout do site",
          size: "medium",
        },
      ],
    },
    {
      id: "in-development",
      title: "In-Development",
      cards: [
        {
          id: "card-5",
          title: "Implementar tela de login",
          content: "Desenvolver a página de login",
          size: "large",
        },
        {
          id: "card-6",
          title: "Conectar API de filmes",
          content: "Integrar a API do TMDB para mostrar filmes",
          size: "medium",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In-Progress",
      cards: [
        {
          id: "card-7",
          title: "Testar funcionalidades",
          content: "Escrever testes automatizados",
          size: "large",
        },
        {
          id: "card-8",
          title: "Revisar código",
          content: "Verificar se o código está bem estruturado",
          size: "small",
        },
      ],
    },
    {
      id: "carousel",
      title: "",
      cards: [
        {
          id: "carousel-card-1",
          title: "Finalizar documentação",
          content: "Completar a documentação do projeto",
          size: "medium",
        },
        {
          id: "carousel-card-2",
          title: "Configurar CI/CD",
          content: "Configurar o pipeline de integração contínua",
          size: "small",
        },
        {
          id: "carousel-card-3",
          title: "Refatorar código",
          content: "Melhorar o desempenho do código de autenticação",
          size: "large",
        },
        {
          id: "carousel-card-4",
          title: "Revisar design de UI",
          content: "Verificar se a interface está intuitiva e moderna",
          size: "medium",
        },
        {
          id: "carousel-card-5",
          title: "Verificar bugs",
          content: "Investigar os erros reportados pelos usuários",
          size: "small",
        },
        {
          id: "carousel-card-6",
          title: "Atualizar dependências",
          content: "Atualizar bibliotecas e dependências do projeto",
          size: "large",
        },
        {
          id: "carousel-card-7",
          title: "Analisar métricas de desempenho",
          content: "Recolher e analisar dados de uso do aplicativo",
          size: "medium",
        },
        {
          id: "carousel-card-8",
          title: "Criar nova funcionalidade",
          content: "Adicionar opção de filtro nas páginas de produtos",
          size: "small",
        },
        {
          id: "carousel-card-9",
          title: "Revisar testes automatizados",
          content: "Verificar cobertura de testes e adicionar novos",
          size: "large",
        },
      ],
    },
  ])

  const [isCarousel, setIsCarousel] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState("")
  const [newCardContent, setNewCardContent] = useState("")

  useEffect(() => {
    const carouselSection = sections.find(
      (section) => section.id === "carousel",
    )
    setIsCarousel(Boolean(carouselSection))
  }, [sections])

  const onDragEnd = useCallback(
    ({ source, destination }) => {
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
      size: "medium",
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

  const handleRemoveCard = useCallback((sectionId, cardId) => {
    if (window.confirm("Você tem certeza que deseja remover este cartão?")) {
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                cards: section.cards.filter((card) => card.id !== cardId),
              }
            : section,
        ),
      )
    }
  }, [])

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
                  type="button"
                  className="h-[32px] w-[100px] bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="h-[32px] w-[130px] bg-blue-500 text-white hover:bg-blue-600"
                >
                  Adicionar
                </Button>
              </div>
            </form>
          </div>
        </>
      )}

      {!modal && (
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Ramon Dashboard</h1>
          <Button
            className="h-[32px] w-[130px] transition-all duration-200 ease-in-out"
            onClick={handleShowModal}
          >
            Adicionar Cartão
          </Button>
        </div>
      )}

      <div className="flex flex-1 flex-wrap items-stretch gap-[10px] pt-10">
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
                  className={`h-auto w-full bg-[#f3f5f6] p-3 shadow-md transition-all duration-300 ease-in-out ${
                    section.id === "carousel" ? "overflow-x-auto" : ""
                  }`}
                >
                  {section.id !== "carousel" && (
                    <>
                      <h3 className="mb-3 text-lg font-bold text-gray-800">
                        {section.title}
                      </h3>
                      <div
                        className={`${
                          section.id === "todo"
                            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                            : ""
                        }`}
                      >
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
                                    handleRemoveCard(section.id, card.id)
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
                    <div className="flex space-x-4">
                      {section.id === "carousel" && (
                        <div className="flex space-x-4">
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
                                  className="mr-4 flex h-[300px] w-[250px] flex-col" // Tamanho fixo com Tailwind
                                >
                                  <Card
                                    title={card.title}
                                    content={card.content}
                                    size={card.size}
                                    onRemove={() =>
                                      handleRemoveCard(section.id, card.id)
                                    }
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {provided.placeholder}
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
