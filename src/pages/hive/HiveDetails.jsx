import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router'
import { deleteHiveService, oneHiveService, deleteActionInHiveService } from '../../services/hive.services';
import { Card, ListGroup, Button, Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ImageCards } from '../../components/ImageCards'

function HiveDetails() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [ hiveDetails, setHiveDetails] = useState("")


  useEffect(() => {
    getHiveDetails()
  },[id])

  const getHiveDetails = async () => {
    try {
      const getDetails = await oneHiveService(id)
      setHiveDetails(getDetails.data)
    } catch (error) {
      navigate('/error')
    }
  }

  const handleDelete = async () => {
    
      try {

        await deleteHiveService(id);
        navigate("/colmenas/new");
      } catch (error) {
        navigate("/error");
      }
  };


  const handleDeleteAction = async (idAction) => {
    
    try {


      await deleteActionInHiveService(id, idAction)
      getHiveDetails()
      
    } catch (error) {
      navigate('/error')
    }
  }


  if (!hiveDetails) {
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
    <div key={id} className='App'>
      <h3>
        Detalles de: {hiveDetails.name}
      </h3>
      <div className='hiveLi'>
      
        {!hiveDetails.actions ? (
          <h5>No se han realizado acciones sobre esta colmena</h5>
        ) : (
          hiveDetails.actions.map((eachAction) => {
            return (
              <Card className="foodDet" border="dark" style={{ width: '12rem' }}>
                <Card.Header>{eachAction.name}</Card.Header>
                <div className="list-client">
                  <small>Resumen</small>
                  <Card.Footer> <small> {eachAction.comment}</small></Card.Footer>
                </div>
              <Card.Footer>
                <small className="text-muted">Usuario:{eachAction.user.username} </small>
                <br />
                <small className="text-muted">Fecha actualizada: {(new Date (eachAction.updatedAt)).toLocaleDateString()}</small>
              </Card.Footer>
              
                <Button variant="success"  onClick={() => handleDeleteAction(eachAction._id)}>
                    Borrar Acción
                </Button>
              </Card>
            )
          })         
        )}
        <br />
        {
          !hiveDetails.imagesfiles ? <></> : hiveDetails.imagesfiles.map((eachImage) => {
            return (
              <img  width={"150px"} src={eachImage} alt="imagen colmena" />
            )
          })
        }
                  
      </div>
          <div className="btns-farmer">
            <Link to={`/colmenas/${id}/edit`}>
              <Button variant="success">Editar Colmena</Button>
            </Link>
          <br />
            <Link to={`/colmenas/${id}/action`}>
              <Button variant="success">Añadir Acción</Button>
            </Link>
          <br />
            <Button variant="success" onClick={handleDelete}>
              Borrar Colmena
            </Button>
          </div>
    </div>
  )
}

export default HiveDetails