import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import FormularioEdicao from './FormularioEdicao';

function formatarTelefone(telefone) {
  if (!telefone) return '';
  const cleaned = ('' + telefone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return telefone;
}

function formatarDocumento(documento) {
  if (!documento) return '';
  const cleaned = ('' + documento).replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cleaned.length === 14) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return documento;
}

function DadosObtidos({ dados }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItem, setExpandedItem] = useState(null);
  const [deletedItemIds, setDeletedItemIds] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItemData, setEditedItemData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dadosState, setDadosState] = useState(dados);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
    setDadosState(dados);
  }, [dados]);

  useEffect(() => {
    if (deleteMessage || updateMessage) {
      const timer = setTimeout(() => {
        setDeleteMessage(null);
        setUpdateMessage(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [deleteMessage, updateMessage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    setExpandedItem(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dadosState
    .filter((item) => !deletedItemIds.includes(item._id))
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleItemClick = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const handleEditItem = (id) => {
    if (confirmEdit) {
      setEditingItemId(id);
      setIsEditing(true);
      setExpandedItem(null);
      const itemToEdit = dadosState.find((item) => item._id === id);
      setEditedItemData(itemToEdit);
    } else {
      setItemToDelete(id);
      setConfirmEdit(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingItemId(null);
    setEditedItemData(null);
  };

  const handleSaveEdit = (updatedData) => {
    const updatedItems = dadosState.map((item) =>
      item._id === updatedData._id ? { ...item, ...updatedData } : item
    );
    setDadosState(updatedItems);
    setEditedItemData(null);
    setIsEditing(false);
    setConfirmEdit(false);
    setUpdateMessage(`Contato ${updatedData.nome} alterado com sucesso, atualize a página`);
  };

  const handleDeleteItem = async (id) => {
    if (confirmDelete) {
      try {
        const response = await fetch(`https://call-list-api-development.up.railway.app/person/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir o item');
        }

        const newDeletedItemIds = [...deletedItemIds, id];
        setDeletedItemIds(newDeletedItemIds);
        setExpandedItem(null);
        setConfirmDelete(false);
        setDeleteMessage('Cadastro excluído com sucesso');
      } catch (error) {
        console.error('Erro ao excluir o item:', error);
        setDeleteMessage('Erro ao excluir o item');
      }
    } else {
      setItemToDelete(id);
      setConfirmDelete(true);
    }
  };

  const handleConfirmNo = () => {
    setConfirmEdit(false);
    setConfirmDelete(false);
    setItemToDelete(null);
  };

  const handleConfirmYes = async () => {
    if (confirmEdit) {
      setEditingItemId(itemToDelete);
      setIsEditing(true);
      setExpandedItem(null);
      const itemToEdit = dadosState.find((item) => item._id === itemToDelete);
      setEditedItemData(itemToEdit);
    } else if (confirmDelete) {
      handleDeleteItem(itemToDelete);
    }
    setConfirmEdit(false);
    setConfirmDelete(false);
    setItemToDelete(null);
  };

  return (
    <div className="dados-obtidos">
      {(deleteMessage || updateMessage) && (
        <div className="message" style={{
          textAlign: 'center',
          backgroundColor: deleteMessage ? (deleteMessage.includes('sucesso') ? 'green' : 'red') : 'green',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '9999'
        }}>
          {deleteMessage || updateMessage}
        </div>

      )}
      {currentItems.map((item, index) => (
        <div key={index} className="dados-box" style={{ margin: '10px', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #ccc', paddingBottom: '10px' }} onClick={() => handleItemClick(index)}>
            <div>
              <p style={{ marginBottom: '5px' }}><strong>Nome:</strong> {editingItemId === item._id && editedItemData ? editedItemData.nome : item.nome}</p>
              <p style={{ marginBottom: '5px' }}><strong>Celular:</strong> {editingItemId === item._id && editedItemData ? formatarTelefone(editedItemData.celular) : formatarTelefone(item.celular)}</p>
            </div>
            <div>
              {expandedItem === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          </div>
          {expandedItem === index && (
            <div style={{ marginTop: '10px', position: 'relative' }}>
              <p style={{ marginBottom: '5px' }}><strong>Documento de Identificação:</strong> {editingItemId === item._id && editedItemData ? formatarDocumento(editedItemData.documento_identificacao) : formatarDocumento(item.documento_identificacao)}</p>
              <p style={{ marginBottom: '5px' }}><strong>Endereço:</strong> {editingItemId === item._id && editedItemData ? editedItemData.endereço : item.endereço}</p>
              <p style={{ marginBottom: '5px' }}><strong>Empresa:</strong> {editingItemId === item._id && editedItemData ? editedItemData.empresa : item.empresa}</p>
              <p style={{ marginBottom: '5px' }}><strong>Setor:</strong> {editingItemId === item._id && editedItemData ? editedItemData.setor : item.setor}</p>
              <p style={{ marginBottom: '5px' }}><strong>Telefone Comercial:</strong> {editingItemId === item._id && editedItemData ? formatarTelefone(editedItemData.comercial) : formatarTelefone(item.comercial)}</p>
              <p style={{ marginBottom: '5px' }}><strong>Outros:</strong> {editingItemId === item._id && editedItemData ? formatarTelefone(editedItemData.outros) : formatarTelefone(item.outros)}</p>
              <p style={{ marginBottom: '5px', fontSize: 'xx-small', fontStyle: 'italic', position: 'absolute', top: 140, left: '50%', transform: 'translateX(-50%)', opacity: '0.5' }}><>id:</> {item._id}</p>
              <div style={{ position: 'absolute', right: 5, top: 120 }}>
                <Button onClick={() => handleEditItem(item._id)} style={{ marginRight: '5px' }} size='small' startIcon={<EditIcon />}>Editar</Button>
                <Button onClick={() => handleDeleteItem(item._id)} size='small' startIcon={<DeleteIcon />}>Excluir</Button>
              </div>
            </div>
          )}
        </div>
      ))}
      {confirmEdit && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(238, 227, 227, 0.9)', padding: '20px', borderRadius: '50px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', zIndex: 9999, textAlign: 'center' }}>
          <p>Tem certeza que deseja editar?</p>
          <Button onClick={handleConfirmNo} size='small' variant="outlined">Não</Button>
          <Button onClick={handleConfirmYes} style={{ margin: '5px' }} size='small' variant="contained" color="primary">Sim</Button>
        </div>
      )}
      {confirmDelete && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(238, 227, 227, 0.9)', padding: '20px', borderRadius: '50px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', zIndex: 9999, textAlign: 'center' }}>
          <p>Tem certeza que deseja excluir {itemToDelete ? dadosState.find(item => item._id === itemToDelete)?.nome : ''}?</p>
          <Button onClick={handleConfirmNo} size='small' variant="outlined">Não</Button>
          <Button onClick={handleConfirmYes} style={{ margin: '5px' }} size='small' variant="contained" color="primary">Sim</Button>
        </div>
      )}
      {isEditing && (
        <FormularioEdicao
          itemEditado={editedItemData}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      )}
      
      <Pagination
        count={Math.ceil((dadosState.length - deletedItemIds.length) / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        size="small"
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
}

export default DadosObtidos;
