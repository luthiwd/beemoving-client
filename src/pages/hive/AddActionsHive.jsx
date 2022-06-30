import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getAllActionsService } from '../../services/actions.services'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { addActionHiveService } from '../../services/hive.services'


function AddActionsHive() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [ actions, setActions ] = useState([])
  const [ imagesfiles, setImagesFiles] = useState([])
  const [ fecha, setFecha ] = useState("")
  const [ allActions, setAllActions ] = useState([])
  
  
  const handleNewAction = (e) => {
      let value = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setActions(value);
    };
  // const handleUploadImages = (e) => {
    
  // };

  // const handleFecha = (e) => {

  // };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateHive = {
        actions: actions,
        imagesfiles,
      };
      await addActionHiveService(id, updateHive)
      // navigate(`/colmenas/${id}`)
    } catch (error) {
      navigate('/error')
    }
  }

  useEffect(() => {
    getAllActions()
  },[])

  const getAllActions = async () => {
    try {
      const getActions = await getAllActionsService()
      setAllActions(getActions.data)
    } catch (error) {
      navigate('/error')
    }
  }

  if (!allActions) {
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
    <div key={id}>Añadir Acción
      <Form onChange={handleSubmit}>
        <div>
        <Form.Select name="actions" multiple onChange={handleNewAction}>
                {allActions.map((eachAction) => {
                  return (
                    <>
                      <option value={eachAction._id}>{eachAction.name}</option>
                    </>
                  );
                })}
              </Form.Select>
        </div>
        {/* <Form.Label htmlFor="image"> Fecha de la Acción </Form.Label>
            <Form.Control
              type="date"
              multiple
              name="fecha"
              onChange={handleFecha}
            />
          <br /> */}
          {/* <Form.Group className="mb-3" >
            <Form.Label name={user.username}> Usuario que Crea: {user.username} </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="image"> Fotos de la Colmena </Form.Label>
            <Form.Control
              type="file"
              multiple
              id="img"
              name="image"
              onChange={handleUploadImages}
            />
          </Form.Group>
          {
            imagesfiles.map((eachFile) => {
              return(
                <img width={"150px"} src={eachFile} alt="foto colmena" />
              )
            })
          }
          <br /> */}
          <Button variant="success" type="submit">
            Añadir Acción
          </Button>
        </Form>
    
    
    </div>
  )
}

export default AddActionsHive