import React, { useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'
const MarkdownEditor = ({ editMarkdown, description, cardId, editCardDetails }) => {
  const [value, setValue] = React.useState(description)

  // Function to handle saving the description
  const handleSaveDescription = async () => {
    const payload = { description: value }

    editCardDetails(cardId, payload, 3)
  }

  useEffect(() => {
    if (!editMarkdown && value !== description) {
      handleSaveDescription()
    }
  }, [editMarkdown])
  return (
    <div className="container wmde-markdown-var">
      {editMarkdown && <MDEditor value={value} onChange={setValue} height="100%" />}
      {!editMarkdown && (
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', padding: '10px', borderRadius: '5px' }} />
      )}
    </div>
  )
}

export default MarkdownEditor
