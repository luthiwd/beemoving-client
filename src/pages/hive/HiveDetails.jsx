import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import { deleteHiveService, oneHiveService } from '../../services/hive.services';
import { Card, ListGroup, Button, Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'


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
    <div key={id}>
      <h3>
        Detalles de: {hiveDetails.name}
      </h3>
      <div className='card-hive'>
      <Card style={{ width: '18rem' }}>
        <Card.Header>Acciones Realizadas</Card.Header>
        {!hiveDetails.actions ? (
          <h5>No se han realizado acciones sobre esta colmena</h5>
        ) : (
          hiveDetails.actions.map((eachAction) => {
            return (
            <ListGroup variant="flush">
              <ListGroup.Item>{eachAction.name}</ListGroup.Item>
              <ListGroup.Item>{eachAction.user.map((eachUser) => {return(
                <ListGroup.Item>
                {eachUser.username}</ListGroup.Item>
                )})}</ListGroup.Item>
              <Card.Footer>
                <small className="text-muted">Fecha actualizada: {eachAction.updatedAt}</small>
              </Card.Footer>
            </ListGroup>
            )
          })
        )}
          <Link to={`/colmenas/${id}/edit`}>
            <Button variant="success">Editar</Button>
          </Link>
          <br />
          <Link to={`/colmenas/${id}/action`}>
            <Button variant="success">Añadir Acción</Button>
          </Link>
          <br />
          <Button variant="success" onClick={handleDelete}>
            Borrar
          </Button>
      </Card>
          
      </div>
    </div>
  )
}

export default HiveDetails