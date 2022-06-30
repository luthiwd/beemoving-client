import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { uploadService } from '../../services/upload.services'
import { editHiveService, oneHiveService } from '../../services/hive.services'

function EditHive() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [ name, setName] = useState("")
  const [ image, setImage ] = useState("")
    
  const handleNameChange = (e) => setName(e.target.value)

  const handleImageChange = async (e) => {
    const uploadForm = new FormData();
    uploadForm.append("image", e.target.files[0]);

    try {
      const response = await uploadService(uploadForm);
      setImage(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editHive = {
        name,
        image,
      };
      await editHiveService(id, editHive);
      navigate(`/colmenas/${id}`)
      window.location.reload()
    } catch (error) {
      navigate('/error')
    }
  }

  useEffect(() => {
    getHiveDetails()
    
  },[])

  //Obtenemos los detalles de la Hive
  const getHiveDetails = async () => {
    try {
      const allHiveDetails = await oneHiveService(id)
      const { name, image } = allHiveDetails.data
      setName(name)
      setImage(image)
    } catch (error) {
      navigate('/error')
    }
  }

  if (!name){
    return (
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    );
  }
  
  return (
    <div key={id}><h3>Editar Colmena</h3> 
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            {/* <label htmlFor="name" >Nombre</label> */}
            <Form.Control
              type="text"
              name="name"
              onChange={handleNameChange}
              value={name}
            />
          </Form.Group>
          <br />
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="image"> Foto de la Colmena </Form.Label>
            <Form.Control
              type="file"
              id="img"
              name="image"
              onChange={handleImageChange}
            />
          </Form.Group>
          <img width={"150px"} src={image} alt="imagen perfil" />
          <br />
          <br />
          <Button variant="success" type="submit">
            Guardar
          </Button>
        </Form>
    </div>
  )
}

export default EditHive