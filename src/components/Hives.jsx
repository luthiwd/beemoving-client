import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { allHiveService } from '../services/hive.services'
import { Button, Card, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useEffect } from 'react';


function Hives() {
  const navigate = useNavigate()
  const [ listHive, setListHive ] = useState(null)
  
  useEffect(() => {
    getAllHives();
  }, [])

  const getAllHives = async () => {
    try {
      const allHives = await allHiveService()
      setListHive(allHives.data);
    } catch (error) {
      navigate('/error')
    }
  }

  if (!listHive) {
    return (
      <Button variant="success" disabled>
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
    <div className='App'>
        <h1>Colmenas</h1>
      <div className='hiveLi'>
      {
        listHive.map((eachHive) => {
          return(
        <Card key={eachHive._id} className="foodDet" border="dark" style={{ width: "12rem" }}>
          <Card.Header>
            <Link className="list-client" to={`/colmenas/${eachHive._id}`}>
              {eachHive.name}
            </Link>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Link
                className="list-client"
                to={`/colmenas/${eachHive._id}`}
              >
                <img
                  src={eachHive.image}
                  width={"70px"}
                  alt={eachHive.name}
                />
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
          )
        })
      }
    </div>
    </div>
  )
}

export default Hives