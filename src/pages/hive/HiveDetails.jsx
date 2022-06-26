import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import { oneHiveService } from '../../services/hive.services';
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
    <div key={hiveDetails._id}>
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
              <ListGroup.Item>{eachAction.user.username}</ListGroup.Item>
              <Card.Footer>
                <small className="text-muted">Fecha actualizada: {eachAction.fecha}</small>
              </Card.Footer>
            </ListGroup>
            )
          })
        )}
          <Link to={`/colmenas/${id}/edit`}>
            <Button variant="success">Añadir Acción</Button>
        </Link>
      </Card>
      
      </div>
    </div>
  )
}

export default HiveDetails