import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { addNewHiveService } from '../../services/hive.services'
import { uploadService } from '../../services/upload.services'
import { Form, Button} from 'react-bootstrap'


function CreateHive() {
  const navigate = useNavigate()
  const [ name, setName] = useState("")
  
  const [ image, setImage ] = useState("")
  
  const handleNameChange = (e) => setName(e.target.value)
  
  const handleImageChange = async (e) => {
    const uploadForm = new FormData();
    uploadForm.append("image", e.target.files[0])
    try {
      const imageFile = await uploadService(uploadForm)
      setImage(imageFile.data)
    } catch (error) {
      navigate('/error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newHive = {
        name,
        image
      };
      await addNewHiveService(newHive)
      navigate('/')
      window.location.reload()
    } catch (error) {
      navigate('/error')
    }
  }

  return (
    <div className="form-center container-fluid">
      <div className="row col-4 map_section">
        <h3> Añadir Colmena</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="nombre"
              onChange={handleNameChange}
              placeholder="Nombre"
            />
          </Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              id="img"
              name="image"
              onChange={handleImageChange}
            />
          </Form.Group>
          <img width={"150px"} src={image} alt="imagen colmena" />
          <br />
          <Button type="submit" variant="success">
            Agregar
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default CreateHive