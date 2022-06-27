import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../context/auth.context'
import { getAllActionsService } from '../../services/actions.services'
import { uploadService } from '../../services/upload.services'
import { updateHiveService, oneHiveService } from '../../services/hive.services'

function EditHive() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [ name, setName] = useState("")
  const [ actions, setActions ] = useState([])
  const [ image, setImage ] = useState("")
  const [ imageFiles, setImageFiles ] = useState([])
  const [ allActions, setAllActions ] = useState([])
  
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

  const handleActionsChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setActions(value)
    // try {
    //   const addAction = 
    // } catch (error) {
    //   navigate('/error')
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const theHive = {
        name,
        actions,
        image,
        imageFiles,
        user: user
      }
      await updateHiveService(id, theHive)
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
      const { name, actions, image, imagefiles, user } = allHiveDetails.data
      setName(name)
      setActions(actions)
      setImage(image)
      setImageFiles(imagefiles)
      //Obtenemos lista de todas las actions gracias al servicio
      const getActions = await getAllActionsService()
      setAllActions(getActions.data)
    } catch (error) {
      navigate('/error')
    }
  }

  if (!allActions){
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
    <div><h3>Añadir acción</h3> 
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
          <Form.Select name="actions" multiple onChange={handleActionsChange}>
            {allActions.map((eachAction) => {
              return(
                <>
                  <option value={eachAction._id}>{eachAction.name}</option>
                </>
              )
            })}
          </Form.Select>
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
          <div>
          <br />
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="image" multiple> Fotos de estado</Form.Label>
            <Form.Control
              type="file"
              id="img"
              name="image"
              onChange={handleImageFilesChange}
            />
          </Form.Group>
          <img width={"150px"}  alt="imagenes de la colmena" />
            <div>
              {/* <Form.Select name="foods" multiple onChange={handleFoodsChange}>
                {allFoods.map((eachFood) => {
                  return (
                    <>
                      <option value={eachFood._id}>{eachFood.name}</option>
                    </>
                  );
                })}
              </Form.Select> */}
              <br />
            </div>
          </div>
          <Button variant="success" type="submit">
            {" "}
            Guardar{" "}
          </Button>
        </Form>

    </div>
  )
}

export default EditHive