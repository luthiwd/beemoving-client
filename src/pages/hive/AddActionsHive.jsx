import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Form, Button, Spinner } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import {
  addActionHiveService,
  oneHiveService,
} from "../../services/hive.services";
import { uploadService } from "../../services/upload.services";

function AddActionsHive() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [hive, setHive] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState([]);

  const handleNewName = (e) => setName(e.target.value);
  const handleNewComment = (e) => setComment(e.target.value);

  const handleUploadImages = async (e) => {
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
    e.preventDefault()
    try {
      const addAction = {
        name,
        comment,
        image,
      };
      await addActionHiveService(id, addAction);
      navigate(`/colmenas/${id}`);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getAllActions();
  }, []);

  const getAllActions = async () => {
    try {
      const getHive = await oneHiveService(id);
      setHive(getHive.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (!hive) {
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
    <div key={id} className="form-center container-fluid">
      <Form onSubmit={handleSubmit}>
        <h3>Añadir Acción a {hive.name}</h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nombre Acción</Form.Label>
          <Form.Control
            type="text"
            placeholder="nombre de la acción realizada"
            name="action"
            onChange={handleNewName}
            value={name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label name={user.username}>
            Usuario que Crea: {user.username}
          </Form.Label>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
          name="resumen"
          onChange={handleNewComment}
          placeholder="Escribe un resumen"
        >
          <Form.Label>Resumen de la acción</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="image"> Fotos de la Colmena </Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleUploadImages}
          />
        </Form.Group>
        <img width={"150px"} src={image} alt="imagen colmena" />
        <br />
        <Button variant="success" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
}

export default AddActionsHive;
