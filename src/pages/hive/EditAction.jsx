import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { actionDetailsService, editActionService, deleteActionService } from '../../services/actions.services'
import { Form, Button } from 'react-bootstrap'


function EditAction() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ comment, setComment ] = useState("")
  const [ action, setAction ] = useState("")
  const [ name, setName ] = useState("")

  const handleNameChange = (e) => setName(e.target.value);

  const handleNewComment = (e) => setComment(e.target.value);

  useEffect(() => {
    actionDetails()
  }, [])

  const actionDetails = async () => {
    try {
      const actionDetails = await actionDetailsService(id)
      setAction(actionDetails.data)
    } catch (error) {
      navigate('/error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const updateAction = {
        name,
        comment
      };
      await editActionService(id, updateAction)
      navigate(`/`)
    } catch (error) {
      navigate('/error')
    }
  }


  const handleDeleteAction = async () => {
    try {
      await deleteActionService(id)
      navigate('/')
    } catch (error) {
      navigate('/error')
    }
  }


  return (
    <div>
      <h1>Editar Comentario de {action.name}</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
              <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              placeholder={action.name}
            />    
          </Form.Group>
          <br />
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
          name="resumen"
          onChange={handleNewComment}
          
        >
          <Form.Label>Resumen de la acción</Form.Label>
          <Form.Control as="textarea" rows={3} value={comment} placeholder={action.comment} />
        </Form.Group>
        <br />
        <Button variant="success" type="submit">
            Guardar
        </Button>
      </Form>
      <br />
      <Button variant="success" onClick={handleDeleteAction}>
        Borrar Acción
      </Button>
    </div>
  )
}

export default EditAction