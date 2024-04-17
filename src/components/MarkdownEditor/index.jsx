import React, { useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { updateCardDetail } from '~/apis'
const MarkdownEditor = ({ editMarkdown, description, cardId }) => {
  const [value, setValue] = React.useState(description)

  // Function to handle saving the description
  const handleSaveDescription = async () => {
    try {
      const payload = { description: value }
      await updateCardDetail(cardId, payload)
      // Optionally, you can perform any additional actions after the save operation is successful
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving description:', error)
    }
  }

  useEffect(() => {
    if (!editMarkdown && value !== description) {
      handleSaveDescription()
    }
  }, [editMarkdown])
  return (
    <div className="container">
      {editMarkdown && <MDEditor value={value} onChange={setValue} height="100%" />}
      {!editMarkdown && (
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', padding: '10px', borderRadius: '5px' }} />
      )}
    </div>
  )
}

export default MarkdownEditor
