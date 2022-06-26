import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../context/auth.context'
import { uploadService } from '../../services/upload.services'

function EditHive() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [ name, setName] = useState("")
  const [ actions, setActions ] = useState([])
  const [ imageFiles, setImageFiles ] = useState("")
  
  const handleNameChange = (e) => setName(e.target.value)
  const handleImageFilesChange = async (e) => {
    const uploadForm = new FormData();
    uploadForm.append("imagesfiles", e.target.files[0])

    try {
      const uploadImages = await uploadService(uploadForm)
      setImageFiles(uploadImages.data)
    } catch (error) {
      navigate('/error')
    }

  }
  const handleActionsChange = (e) => {
    const value = Array.from(
      e.target.selectOptions,
      (option) => option.value
    )
    setActions(value)
  }


  return (
    <div><h3>Añadir acción</h3> 
            <div>
             <Form> 
              <Form.Select name="actions" multiple onChange={handleActionsChange}>
                <option>Elije la Acción</option>
                <option value="Tratamiento">Tratamiento</option>
                <option value="Recolección">Recolección</option>
                <option value="Alimento">Alimento</option>
                <option value="Agua">Agua</option>
                <option value="Revisión General">Revisión General</option>
              </Form.Select>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Notas</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
      </Form>
              <br />
            </div>
            <Button type="submit" variant="success">
            Agregar
          </Button>
    </div>
  )
}

export default EditHive