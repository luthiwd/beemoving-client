import React from 'react'
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router'
import { deleteHiveService, oneHiveService} from '../../services/hive.services';
import { Card, Button, Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import ImagesHive from '../../components/ImagesHive';

function HiveDetails() {
  const navigate = useNavigate()
  const { id } = useParams();
  const { user } = useContext(AuthContext)

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
              <Card className="foodDet" border="dark" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{eachAction.name}</Card.Title>
                  <hr />
                  <Card.Subtitle className="mb-2 text-muted">Fecha: {(new Date (eachAction.updatedAt)).toLocaleDateString()}</Card.Subtitle>
                  <Card.Text>
                    {eachAction.comment}
                  </Card.Text>
                  {
                    user._id === eachAction.user._id ? <Link to={`/actions/${eachAction._id}/edit`}>
                    <Button variant="success" >
                      Editar Acción
                    </Button>
                  </Link> : <></>
                  }
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{eachAction.user.username} </small>
                </Card.Footer>
              </Card>
            )
          })         
        )}
        <br />
            <ImagesHive hiveDetails={hiveDetails}/>
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