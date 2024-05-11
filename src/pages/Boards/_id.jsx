import Container from '@mui/material/Container'
import BoardBar from '~/pages/Boards/BoardBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  deleteColumnAPI,
  fetchBoardDetails,
  moveCardBetweenTwoColumnsAPI,
  updateBoardDetailsAPI,
  updateCardDetail,
  updateColumnDetailsAPI
} from '~/apis'
import { isEmpty } from 'lodash'
import { capitalizedFirstLetter, generatePlaceholderCard } from '~/utils/constanst'
import { toast } from 'react-toastify'
import { mapOrder } from '~/utils/sorts'
import { useParams } from 'react-router-dom'
import Loading from '~/components/Loading'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/auth.selector'
import MetaData from '~/components/MetaData'

function Board() {
  const { id } = useParams()
  const [board, setBoard] = useState(null)
  const { userInfo } = useSelector(authSelector)

  useEffect(() => {
    fetchBoardDetails(id).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board?.columns?.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [id])
  // handle api create new column
  const createdNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    // update state board
    const newBoard = { ...board }
    newBoard?.columns?.push(createdColumn)
    newBoard?.columnOrderIds?.push(createdColumn._id)
    setBoard(newBoard)
  }

  // handle api create new card
  const createdNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnAfterAddCard = newBoard?.columns?.find((column) => column._id === createdCard.columnId)
    if (columnAfterAddCard) {
      if (columnAfterAddCard.cards.some((card) => card.FE_Placeholder)) {
        columnAfterAddCard.cards = [createdCard]
        columnAfterAddCard.cardOrderIds = [createdCard._id]
      } else {
        columnAfterAddCard.cards.push(createdCard)
        columnAfterAddCard.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  // dnd column
  const moveColumn = async (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    // Call api update board
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }

  // dnd card inside column
  const moveCardInsideColumn = (dndOrderedCard, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard?.columns?.find((column) => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCard
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  // dnd card between two columns
  const handleMoveCardBetweenTwoColumns = async (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    let prevCardOrderIds = dndOrderedColumns?.find((c) => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }
    // call api
    await moveCardBetweenTwoColumnsAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns?.find((c) => c._id === nextColumnId)?.cardOrderIds
    })
  }
  // delete column
  const deleteColumn = async (columnId) => {
    const newBoard = { ...board }
    newBoard.columnOrderIds = newBoard?.columnOrderIds?.filter((_id) => _id !== columnId)
    newBoard.columns = newBoard?.columns.filter((c) => c._id !== columnId)
    setBoard(newBoard)
    deleteColumnAPI(columnId).then((res) => {
      toast.success(res.deletedResult, { position: 'bottom-right' })
    })
  }

  const editCardDetails = async (cardId, newDataUpdate, type) => {
    const newBoard = { ...board }
    const payload = {
      title: newDataUpdate
    }
    const foundCard = newBoard?.columns?.flatMap((column) => column.cards).find((card) => card._id === cardId)
    let today = new Date()
    if (foundCard.title !== newDataUpdate && type === 0) {
      foundCard.title = newDataUpdate
      await updateCardDetail(cardId, payload)
      setBoard(newBoard)
    }
    const pl = {
      content: newDataUpdate,
      userId: userInfo?._id,
      userDisplayname: userInfo?.firstName + ' ' + userInfo?.lastName,
      userAvatar: userInfo?.avatar,
      createdAt: today.toString()
    }
    if (type === 1) {
      foundCard.comments.push(pl)
      await updateCardDetail(cardId, { comments: [pl] })
      setBoard(newBoard)
    }
    if (type === 3) {
      foundCard.description = newDataUpdate.description
      await updateCardDetail(cardId, newDataUpdate)
      setBoard(newBoard)
    }
    if (type === 4) {
      foundCard.cover = newDataUpdate
      setBoard(newBoard)
    }
  }

  if (!board) {
    return <Loading text="Loading board..." />
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <MetaData title={capitalizedFirstLetter(board?.title)} />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createdNewCard={createdNewCard}
        createdNewColumn={createdNewColumn}
        moveColumn={moveColumn}
        moveCardInsideColumn={moveCardInsideColumn}
        handleMoveCardBetweenTwoColumns={handleMoveCardBetweenTwoColumns}
        deleteColumn={deleteColumn}
        editCardDetails={editCardDetails}
      />
    </Container>
  )
}

export default Board
