import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/constanst'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // const pointSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 500 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  //Kéo trong column hoặc card
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  //Điểm va chạm cuối cùng
  const lastOverId = useRef(null)

  //Tìm id của column chứa Card
  const findColumnByCardId = (cardId) => {
    return orderedColumns?.find((column) => column.cards?.map((card) => card._id)?.includes(cardId))
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      //Tìm các điểm giao nhau, va chạm - intersection với con trỏ
      const pointerIntersections = pointerWithin(args)
      // If pointerIntersections is empty array => return and not do anything
      if (!pointerIntersections?.length) return
      //Thuật toán phát hiện va chạm và sẻ trả về mảng đã va chạm
      // const intersections = pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)

      //tìm overId đầu tiền trong intersction ở trên
      let overId = getFirstCollision(pointerIntersections, 'id')

      if (overId) {
        const checkColumn = orderedColumns.find((column) => column._id === overId)
        if (checkColumn) {
          //Ghì đè columnId thành card id bằng overId
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id
        }
        lastOverId.current = overId

        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )
  const moveCardBetweenTwoColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDragingCardId,
    activeDragingCardData
  ) => {
    setOrderedColumns((prev) => {
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
      //Clone orderedColumns cũ ra một mảng mởi để xử lí data
      const nextColumns = cloneDeep(prev)
      const nextActiveColumn = nextColumns?.find((column) => column._id === activeColumn._id)
      const nextOverColumn = nextColumns?.find((column) => column._id === overColumn._id)

      // Cloumn cũ
      if (nextActiveColumn) {
        //Xóa card đang kéo từ column của nó khi kéo sang column mới
        nextActiveColumn.cards = nextActiveColumn?.cards?.filter((card) => card._id !== activeDragingCardId)
        // Thêm FE_Placeholder vào nếu Card nằm trong column là 1 mảng rổng: Bị kéo hết đi và k còn cái nào
        if (isEmpty(nextActiveColumn?.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        //Cập nhật lại Id của trong column
        nextActiveColumn.cardOrderIds = nextActiveColumn?.cards?.map((card) => card._id)
      }

      //Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo nó có tồn tại trong OverCloumn hay chưa => nếu tồn tại thì xóa nó đi
        nextOverColumn.cards = nextOverColumn.cards?.filter((card) => card._id !== activeDragingCardId)
        // Thêm cái card đang kéo vào column theo vị trí index
        nextOverColumn.cards = nextOverColumn.cards?.toSpliced(newCardIndex, 0, {
          ...activeDragingCardData,
          columnId: nextOverColumn._id
        })
        // Xóa placeholder card đi nếu nó đang tồn tại khi mảng từ rổng cho đến có 1 hoặc nhiều item kéo vào
        nextOverColumn.cards = nextOverColumn.cards?.filter((card) => !card.FE_Placeholder)

        //Cập nhật lại Id của trong column
        nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map((card) => card._id)
      }
      return nextColumns
    })
  }

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(e?.active?.data?.current.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)
    if (e?.active?.data?.current.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id))
    }
  }

  const handleOnDragOver = (e) => {
    const { active, over } = e
    if (!active || !over) return
    //activeDragingCard -> card đang được kéo
    const {
      id: activeDragingCardId,
      data: { current: activeDragingCardData }
    } = active
    //overCard: là cái card tương tác trên hoặc dưới so với card đang được kéo
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDragingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!overColumn || !activeColumn) return

    if (overColumn._id !== activeColumn._id) {
      moveCardBetweenTwoColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDragingCardId,
        activeDragingCardData
      )
    }
  }
  const handleDragEnd = (e) => {
    const { active, over } = e
    // Kiểm tra nếu không tồn tại over hoặc active thì return (tránh kéo linh tinh ra ngoài)
    if (!over || !active) return
    //Xử lí kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDragingCardId,
        data: { current: activeDragingCardData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDragingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!overColumn || !activeColumn) return
      //Hành động kéo thả card giữa 2 column khác nhau
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenTwoColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragingCardId,
          activeDragingCardData
        )
      } else {
        //hành động kéo thả card trong cùng 1 column

        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex((card) => card._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)
        const dndOrderedCard = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns((prev) => {
          const nextCard = cloneDeep(prev)
          const targetCard = nextCard?.find((column) => column._id === overColumn._id)
          targetCard.cards = dndOrderedCard
          targetCard.cardOrderIds = dndOrderedCard?.map((card) => card._id)

          return nextCard
        })
      }
    }
    //Xử lí kéo thả Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //Lấy vị trí cũ từ active
        const oldColumnIndex = orderedColumns?.findIndex((c) => c._id === active.id)
        //Lấy vị trí mới từ over
        const newColumnIndex = orderedColumns?.findIndex((c) => c._id === over.id)
        //Dùng arrayMove để sắp xếp lại mảng columns ban đầu
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    //set ve null khi ko con` keo' tha
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleOnDragOver}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy} // Thuật toán phát hiện va chạm(áp dụng cho card có hình ảnh)
    >
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} activeDragItemId={activeDragItemId} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
